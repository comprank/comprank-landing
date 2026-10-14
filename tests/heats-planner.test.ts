import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HeatsPlanner } from "../components/heats-planner";
// @ts-expect-error Bun executes these tests; production intentionally has no @types/bun dependency.
import { describe, expect, test } from "bun:test";

test("planner renders labeled controls, computed default and explicit downloads", () => {
  const html = renderToStaticMarkup(createElement(HeatsPlanner));
  expect(html).toContain("09:57");
  expect(html).toContain("57 min");
  expect(html).toContain("Exporter le planning CSV");
  expect(html).toContain("modele-planning-heats.csv");
  expect(html).toContain("<fieldset");
  expect(html).toContain("<caption");
  expect(html).toContain("récupération");
});
import { calculateHeats, formatPlannerTime, exportHeatsCsv, type PlannerInput } from "../lib/heats-planner";

const example = (): PlannerInput => ({ startTime: "09:00", blocks: [{ division: "Exemple équipes", workout: "Workout 1", participants: "20", lanes: "6", duration: "12", transition: "3", pause: "0" }] });

describe("sequential heats", () => {
  test("midnight displays next day without timezone dependence", () => {
    const result = calculateHeats({ ...example(), startTime: "23:45" });
    if (!result.ok) throw new Error("Expected valid plan");
    expect(formatPlannerTime(result.start)).toBe("23:45");
    expect(formatPlannerTime(result.end)).toBe("00:42 J+1");
    expect(formatPlannerTime(1440)).toBe("00:00 J+1");
  });
  test("CSV has BOM, semicolons, CRLF, quoted labels and safe formula prefixes", () => {
    for (const label of ['=SUM(1;2)', '+cmd', '-1', '@cmd', '\tcmd', '\rcmd', '  =cmd', '\n=cmd']) {
      const input = example(); input.blocks[0].division = label;
      const result = calculateHeats(input);
      if (!result.ok) throw new Error("Expected valid plan");
      const csv = exportHeatsCsv(result);
      expect(csv.startsWith('\uFEFF')).toBe(true);
      expect(csv).toContain(`"'${label}";`);
      expect(csv).toContain('\r\n');
    }
    const input = example(); input.blocks[0].workout = 'WOD "A"; test\nligne';
    const result = calculateHeats(input);
    if (!result.ok) throw new Error("Expected valid plan");
    expect(exportHeatsCsv(result)).toContain('"WOD ""A""; test\nligne"');
  });
  test("caps total duration and allocation before generating rows", () => {
    const input = example();
    input.blocks = Array.from({ length: 12 }, () => ({ ...input.blocks[0], participants: "1000", lanes: "1" }));
    const result = calculateHeats(input);
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("Expected limit");
    expect(result.errors.join(" ")).toContain("24 h");
  });
  test("rejects invalid numeric fields and block count", () => {
    for (const key of ["lanes", "duration", "transition", "pause"] as const) {
      for (const value of ["", "-1", "2.5", "999999"]) {
        const input = example(); input.blocks[0][key] = value;
        expect(calculateHeats(input).ok).toBe(false);
      }
    }
    const input = example(); input.blocks = Array(13).fill(input.blocks[0]);
    expect(calculateHeats(input).ok).toBe(false);
  });
  test("exact division, one heat and pauses before consecutive blocks", () => {
    const input = example();
    input.blocks[0].participants = "12";
    input.blocks[0].pause = "5";
    input.blocks.push({ ...input.blocks[0], participants: "1", pause: "10" });
    const result = calculateHeats(input);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("Expected valid plan");
    expect(result.heats.map(h => [h.start, h.end, h.occupiedLanes])).toEqual([[545,557,6],[560,572,6],[582,594,1]]);
    expect(result.totalMinutes).toBe(54);
  });
  test("rejects blank, zero, negative, fractional, nonfinite and extreme inputs", () => {
    for (const value of ["", " ", "0", "-1", "1.5", "NaN", "Infinity", "1e9", "100000000000000"]) {
      const input = example();
      input.blocks[0].participants = value;
      expect(calculateHeats(input).ok).toBe(false);
    }
  });
  test("requires blocks, labels and strict time", () => {
    expect(calculateHeats({ startTime: "09:00", blocks: [] }).ok).toBe(false);
    for (const time of ["", "24:00", "9:00", "12:60"]) expect(calculateHeats({ ...example(), startTime: time }).ok).toBe(false);
    const input = example();
    input.blocks[0].division = " ";
    expect(calculateHeats(input).ok).toBe(false);
  });
  test("illustrative partial heat and no transition after final heat", () => {
    const result = calculateHeats(example());
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("Expected valid plan");
    expect(result.heats.map(h => [h.start, h.end, h.occupiedLanes])).toEqual([[540,552,6],[555,567,6],[570,582,6],[585,597,2]]);
    expect(result.totalMinutes).toBe(57);
    expect(result.end).toBe(597);
  });
});
