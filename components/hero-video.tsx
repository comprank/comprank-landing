"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const EXPAND_LEAD = 0.5;
const EXPAND_END = 0.28;
const COLLAPSE_START = 0.62;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getScrollPhase(progress: number) {
  if (progress < EXPAND_END) return "preview";
  return progress <= COLLAPSE_START ? "playback" : "closing";
}

function subscribeToReducedMotion(notify: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getPreviewWidth(width: number, height: number, introHeight: number) {
  const availableHeight = Math.max(180, height - introHeight - 24);
  return Math.min(width < 640 ? width - 32 : width * 0.72, 960, Math.min(availableHeight, height * 0.65) * 16 / 9);
}

const controlClassName = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-dark-900/80 px-4 text-base font-medium text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-dark-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400 sm:text-sm";

export function HeroVideo() {
  const sequenceRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackRangeRef = useRef(false);
  const userPausedRef = useRef(false);
  const playFocusRequestedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const viewportWidth = useMotionValue(0);
  const viewportHeight = useMotionValue(0);
  const previewWidth = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: [`start ${EXPAND_LEAD}`, "end end"],
  });
  const subscribeToProgress = useCallback(
    (notify: () => void) => scrollYProgress.on("change", notify),
    [scrollYProgress],
  );
  const phase = useSyncExternalStore(
    subscribeToProgress,
    () => getScrollPhase(scrollYProgress.get()),
    () => "preview",
  );
  const isExpanded = phase === "playback";
  const expansion = useTransform(
    scrollYProgress,
    [0, EXPAND_END, COLLAPSE_START, 1],
    [0, 1, 1, 0],
    { ease: (progress) => progress * progress * (3 - 2 * progress) },
  );
  const width = useTransform(() => {
    const fullWidth = viewportWidth.get();
    const smallWidth = previewWidth.get();
    const amount = expansion.get();
    return fullWidth ? smallWidth + (fullWidth - smallWidth) * amount : "min(calc(100% - 2rem), 60rem)";
  });
  const height = useTransform(() => {
    const fullHeight = viewportHeight.get();
    const previewHeight = previewWidth.get() * 9 / 16;
    const amount = expansion.get();
    return fullHeight ? previewHeight + (fullHeight - previewHeight) * amount : "auto";
  });
  const y = useTransform(() => {
    const fullHeight = viewportHeight.get();
    const previewHeight = previewWidth.get() * 9 / 16;
    const previewTop = scrollYProgress.get() <= COLLAPSE_START ? 24 : (fullHeight - previewHeight) / 2;
    return previewTop * (1 - expansion.get());
  });
  const borderRadius = useTransform(expansion, [0, 1], [24, 0]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reducedMotion) return;
    const intro = sequenceRef.current?.previousElementSibling;
    const observer = new ResizeObserver(() => {
      const bounds = viewport.getBoundingClientRect();
      viewportWidth.set(bounds.width);
      viewportHeight.set(bounds.height);
      previewWidth.set(getPreviewWidth(bounds.width, bounds.height, intro?.getBoundingClientRect().height ?? 0));
    });
    observer.observe(viewport);
    if (intro) observer.observe(intro);
    return () => observer.disconnect();
  }, [reducedMotion, viewportWidth, viewportHeight, previewWidth]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    const video = element;

    function playVideo() {
      if (video.ended) video.currentTime = 0;
      // A browser may block autoplay; the visible play button remains available.
      void video.play().catch(() => {});
    }

    function syncPlayback(progress: number) {
      const inRange = !reducedMotion && getScrollPhase(progress) === "playback";
      if (inRange === playbackRangeRef.current) return;
      playbackRangeRef.current = inRange;
      userPausedRef.current = false;
      if (inRange && !document.hidden) playVideo();
      else video.pause();
    }

    function syncVisibility() {
      if (document.hidden) video.pause();
      else if (playbackRangeRef.current && !userPausedRef.current) playVideo();
    }

    const unsubscribe = scrollYProgress.on("change", syncPlayback);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncVisibility);
    syncPlayback(scrollYProgress.get());

    return () => {
      unsubscribe();
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      playbackRangeRef.current = false;
      video.pause();
    };
  }, [reducedMotion, scrollYProgress]);

  function handlePlay() {
    const video = videoRef.current;
    const sequence = sequenceRef.current;
    if (!video || !sequence) return;
    if (reducedMotion || isExpanded) {
      video.focus();
      void video.play().catch(() => {});
      return;
    }
    playFocusRequestedRef.current = true;
    const scrollViewportHeight = document.documentElement.clientHeight;
    const lead = scrollViewportHeight * EXPAND_LEAD;
    const start = sequence.getBoundingClientRect().top + window.scrollY - lead;
    const scrollDistance = sequence.offsetHeight - scrollViewportHeight + lead;
    window.scrollTo({
      top: start + scrollDistance * (EXPAND_END + COLLAPSE_START) / 2,
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={sequenceRef}
      aria-label="Découvrez CompRank en vidéo"
      className={reducedMotion ? "relative z-10" : "relative z-10 h-[320svh] motion-reduce:h-auto"}
    >
      <div
        ref={viewportRef}
        className={reducedMotion
          ? "relative px-4 pb-8"
          : "sticky top-0 h-svh motion-reduce:relative motion-reduce:h-auto motion-reduce:px-4 motion-reduce:pb-8"}
      >
        {!reducedMotion ? <motion.div aria-hidden="true" className="absolute inset-0 bg-black motion-reduce:hidden" style={{ opacity: expansion }} /> : null}
        <motion.figure
          className={reducedMotion
            ? "relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
            : "absolute left-1/2 top-0 aspect-video overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 motion-reduce:relative motion-reduce:!left-auto motion-reduce:!h-auto motion-reduce:!w-full motion-reduce:!transform-none motion-reduce:!rounded-2xl"}
          style={reducedMotion
            ? { width: "100%", height: "auto", borderRadius: 24, x: 0, y: 0 }
            : { width, height, x: "-50%", y, borderRadius }}
        >
          <video
            ref={videoRef}
            controls={isExpanded || reducedMotion}
            muted={isMuted}
            playsInline
            preload="metadata"
            poster="/comprank-hero-poster.jpg"
            aria-label="Vidéo de présentation de CompRank"
            aria-describedby="hero-video-caption"
            className="block size-full object-contain focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-400 motion-reduce:h-auto"
            onPlay={() => {
              userPausedRef.current = false;
              setIsPlaying(true);
              if (playFocusRequestedRef.current) {
                videoRef.current?.focus();
                playFocusRequestedRef.current = false;
              }
            }}
            onPause={() => {
              if (playbackRangeRef.current && !document.hidden) userPausedRef.current = true;
              setIsPlaying(false);
            }}
            onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
          >
            <source src="/comprank-hero.mp4" type="video/mp4" />
            Votre navigateur ne prend pas en charge la vidéo.{" "}
            <a href="/comprank-hero.mp4">Télécharger la vidéo CompRank</a>.
          </video>

          {phase === "preview" && !reducedMotion ? (
            <Image
              src="/comprank-hero-poster.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) calc(100vw - 32px), 960px"
              className="pointer-events-none object-contain"
            />
          ) : null}

          {isExpanded || reducedMotion ? (
            <div className={`absolute inset-x-4 flex items-center justify-end gap-3 sm:inset-x-6 ${reducedMotion ? "top-4" : "top-20 motion-reduce:top-4"}`}>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={isPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo"}
                  className={controlClassName}
                  onClick={() => {
                    if (isPlaying) {
                      userPausedRef.current = true;
                      videoRef.current?.pause();
                    } else {
                      handlePlay();
                    }
                  }}
                >
                  {isPlaying
                    ? <Pause className="size-5" aria-hidden="true" />
                    : <Play className="size-5" aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  aria-label={isMuted ? "Activer le son" : "Couper le son"}
                  aria-pressed={!isMuted}
                  className={controlClassName}
                  onClick={() => {
                    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
                  }}
                >
                  {isMuted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
                  <span className="hidden sm:inline">{isMuted ? "Activer le son" : "Son activé"}</span>
                </button>
              </div>
            </div>
          ) : null}

          {!isPlaying && !reducedMotion ? (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute bottom-[12%] left-1/2 flex min-h-12 -translate-x-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary-500 px-5 text-base font-semibold text-dark-900 hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm"
            >
              <Play className="size-4 fill-current" aria-hidden="true" />
              Lire la vidéo
            </button>
          ) : null}
          <figcaption id="hero-video-caption" className="sr-only">
            Présentation de CompRank, 32 secondes.
            {reducedMotion ? " Lancez la lecture avec le bouton du lecteur." : " Défilez pour agrandir la vidéo et démarrer la lecture sans son. Continuez pour la mettre en pause."}
          </figcaption>
        </motion.figure>

      </div>
    </section>
  );
}
