"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import pmgLogo from "@/assets/PMGLOGO.svg";

const ease = [0.22, 1, 0.36, 1] as const;

const ECG_PATH =
  "M0 24 H96 L112 24 L128 8 L144 40 L160 16 L176 24 H288 L304 24 L320 4 L336 44 L352 18 L368 24 H480";

export default function ComingSoon() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.16,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 32,
      filter: reduceMotion ? "none" : "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0.01 : 1, ease },
    },
  };

  const lineReveal: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.85, ease },
    },
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-pmg-primary text-pmg-mist">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_110%,var(--pmg-ink)_0%,var(--pmg-primary)_55%,color-mix(in_srgb,var(--pmg-primary)_85%,var(--pmg-mint))_100%)]" />
        <div className="aurora-shift absolute left-1/2 top-[20%] h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--pmg-mint)_28%,transparent)_0%,transparent_65%)] blur-3xl" />
        <div className="sheen absolute -left-[20%] top-[-10%] h-[140%] w-[50%] bg-[linear-gradient(105deg,transparent_25%,color-mix(in_srgb,var(--pmg-mist)_8%,transparent)_50%,transparent_75%)] blur-3xl" />
        <div className="drift absolute -left-[18%] top-[8%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--pmg-sage)_26%,transparent)_0%,transparent_70%)] blur-3xl" />
        <div className="breathe absolute -right-[14%] bottom-[-10%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--pmg-mint)_24%,transparent)_0%,transparent_72%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_40%,color-mix(in_srgb,var(--pmg-ink)_35%,transparent)_100%)]" />
      </div>

      <motion.main
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16 sm:px-10 lg:px-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="relative mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <motion.div
            className="relative mb-12 flex h-44 w-44 items-center justify-center sm:mb-14 sm:h-56 sm:w-56"
            variants={fadeUp}
          >
            <span
              aria-hidden
              className="pulse-ring absolute inset-[8%] rounded-full border-2 border-pmg-mist/60"
            />
            <span
              aria-hidden
              className="pulse-ring pulse-ring-delay-1 absolute inset-[8%] rounded-full border-2 border-pmg-mint/65"
            />
            <span
              aria-hidden
              className="pulse-ring pulse-ring-delay-2 absolute inset-[8%] rounded-full border-2 border-pmg-sage/55"
            />
            <div className="logo-beat relative z-10 flex h-[4.75rem] w-[14rem] items-center justify-center sm:h-24 sm:w-[17rem]">
              <Image
                src={pmgLogo}
                alt="PMG"
                priority
                className="h-auto w-full drop-shadow-[0_12px_40px_rgba(92,199,141,0.28)]"
              />
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-[clamp(2.6rem,8vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.03em] text-pmg-mist"
            variants={fadeUp}
          >
            <motion.span className="block" variants={lineReveal}>
              Care is
            </motion.span>
            <motion.span
              className="mint-glow block text-pmg-mint"
              variants={lineReveal}
            >
              on the way.
            </motion.span>
          </motion.h1>

          <motion.div
            className="orb-float mt-8 w-full max-w-md"
            variants={fadeUp}
          >
            <svg
              viewBox="0 0 480 48"
              fill="none"
              className="mx-auto h-10 w-full text-pmg-mint"
              aria-hidden
            >
              <path
                d={ECG_PATH}
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.22"
              />
              <path
                className="ecg-path"
                d={ECG_PATH}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="ecg-sweep"
                d={ECG_PATH}
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.p
            className="mt-8 max-w-lg text-balance text-lg font-medium leading-snug text-pmg-sage sm:text-xl"
            variants={fadeUp}
          >
            A new home for our healthcare family —
            <br />
            precision, trust, and care, arriving soon.
          </motion.p>
        </div>
      </motion.main>
    </div>
  );
}
