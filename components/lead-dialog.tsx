"use client";

import * as React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sendLead } from "@/app/actions/lead";
import {
  isHoneypotFilled,
  LEAD_MAX_LENGTHS,
  leadSchema,
  PROFILE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/lead-schema";
import { APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: string;
  timeline: string;
  website: string;
};

const EMPTY_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profile: "",
  timeline: "",
  website: "",
};

type LeadDialogProps = {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function LeadDialog({ children, open, onOpenChange }: LeadDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open ?? internalOpen;

  const [values, setValues] = React.useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  const { execute, result, reset, isExecuting } = useAction(sendLead, {
    onSuccess: ({ data, input }) => {
      // A network/execution failure leaves the hook result empty, which it
      // still reports as a success. Only trust an explicit action payload.
      if (!data?.success) {
        setFailed(true);
        return;
      }
      setSubmitted(true);
      // The server returns a fake success for honeypot submissions: keep them
      // out of the Lead pixel data.
      if (isHoneypotFilled(input.website)) {
        return;
      }
      if (
        process.env.NODE_ENV === "production" &&
        typeof window !== "undefined" &&
        typeof window.fbq === "function"
      ) {
        window.fbq("track", "Lead");
      }
    },
  });

  // Reset the form on each opening, during render rather than in an effect
  // (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  // useAction stays in this always-mounted component: its callbacks run in an
  // effect, so a closed-mid-submit dialog must still fire the Lead pixel.
  const [wasOpen, setWasOpen] = React.useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setValues(EMPTY_VALUES);
      setErrors({});
      setSubmitted(false);
      setFailed(false);
      reset();
    }
  }

  const setOpen = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const setField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setFailed(false);
    execute(parsed.data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col gap-4 py-2 text-center">
            <DialogHeader className="sm:text-center">
              <DialogTitle>Merci !</DialogTitle>
              <DialogDescription>
                On revient vers vous très vite.
              </DialogDescription>
            </DialogHeader>
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center gap-1 text-sm text-primary-400 transition-colors hover:text-primary-300"
            >
              En attendant, explorez CompRank par vous-même
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle>Parlons de votre compétition</DialogTitle>
              <DialogDescription>
                Laissez-nous vos coordonnées, on vous recontacte rapidement pour
                vous aider à lancer votre événement.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lead-firstName"
                  className="text-sm font-medium text-gray-200"
                >
                  Prénom
                </label>
                <Input
                  id="lead-firstName"
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={LEAD_MAX_LENGTHS.firstName}
                  value={values.firstName}
                  onChange={(event) => setField("firstName", event.target.value)}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "lead-firstName-error" : undefined
                  }
                />
                {errors.firstName ? (
                  <p
                    id="lead-firstName-error"
                    role="alert"
                    className="text-xs text-red-400"
                  >
                    {errors.firstName}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lead-lastName"
                  className="text-sm font-medium text-gray-200"
                >
                  Nom
                </label>
                <Input
                  id="lead-lastName"
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={LEAD_MAX_LENGTHS.lastName}
                  value={values.lastName}
                  onChange={(event) => setField("lastName", event.target.value)}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={
                    errors.lastName ? "lead-lastName-error" : undefined
                  }
                />
                {errors.lastName ? (
                  <p
                    id="lead-lastName-error"
                    role="alert"
                    className="text-xs text-red-400"
                  >
                    {errors.lastName}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lead-email"
                className="text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <Input
                id="lead-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={LEAD_MAX_LENGTHS.email}
                value={values.email}
                onChange={(event) => setField("email", event.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "lead-email-error" : undefined}
              />
              {errors.email ? (
                <p
                  id="lead-email-error"
                  role="alert"
                  className="text-xs text-red-400"
                >
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lead-phone"
                className="text-sm font-medium text-gray-200"
              >
                Téléphone{" "}
                <span className="font-normal text-gray-500">(optionnel)</span>
              </label>
              <Input
                id="lead-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={LEAD_MAX_LENGTHS.phone}
                value={values.phone}
                onChange={(event) => setField("phone", event.target.value)}
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm font-medium text-gray-200">
                Vous êtes
              </legend>
              <RadioGroup
                value={values.profile}
                onValueChange={(value) => setField("profile", value)}
                aria-invalid={!!errors.profile}
                aria-describedby={
                  errors.profile ? "lead-profile-error" : undefined
                }
              >
                {PROFILE_OPTIONS.map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
              {errors.profile ? (
                <p
                  id="lead-profile-error"
                  role="alert"
                  className="text-xs text-red-400"
                >
                  {errors.profile}
                </p>
              ) : null}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm font-medium text-gray-200">
                Vous organisez une compétition ?
              </legend>
              <RadioGroup
                value={values.timeline}
                onValueChange={(value) => setField("timeline", value)}
                aria-invalid={!!errors.timeline}
                aria-describedby={
                  errors.timeline ? "lead-timeline-error" : undefined
                }
              >
                {TIMELINE_OPTIONS.map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
              {errors.timeline ? (
                <p
                  id="lead-timeline-error"
                  role="alert"
                  className="text-xs text-red-400"
                >
                  {errors.timeline}
                </p>
              ) : null}
            </fieldset>

            <div className="absolute left-[-9999px]">
              <label htmlFor="lead-website">Ne pas remplir</label>
              <input
                id="lead-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => setField("website", event.target.value)}
              />
            </div>

            {result.serverError || result.validationErrors || failed ? (
              <p className="text-sm text-red-400" role="alert">
                Une erreur est survenue. Réessayez ou écrivez-nous à{" "}
                <a
                  href="mailto:contact@comprank.fr"
                  className="underline hover:text-red-300"
                >
                  contact@comprank.fr
                </a>
                .
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={isExecuting}
              className={cn(isExecuting && "cursor-progress")}
            >
              {isExecuting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Envoi…
                </>
              ) : (
                "Être recontacté"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
