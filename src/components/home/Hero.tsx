'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LOADER_TOTAL_S } from '@/lib/timing';
import { easeLuxe, staggerChildren, wordReveal } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import { CONTENT_FADE_START, ENTRANCE_DROP_PX, ENTRANCE_WINDOW, HERO_CAKE_ASPECT } from '@/lib/heroCake';
import { HeroCake } from './HeroCake';
import { FloatingIcon } from '../ui/FloatingIcon';
import { Button } from '../ui/Button';
import { FlowerMark, PistachioMark, StrawberryMark } from '../ui/ingredient-icons';

const HEADLINE = 'Handcrafted Happiness';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // The scroll "story": nothing moves until the visitor starts scrolling.
  // The cake drops in from above fully assembled, then explodes apart
  // layer by layer (per-layer motion lives in <HeroCake>), holds apart,
  // and reassembles before the section fades into the next one. The
  // headline drifts at a different rate (parallax) throughout.
  const cakeGroupY = useTransform(scrollYProgress, ENTRANCE_WINDOW, [-ENTRANCE_DROP_PX, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, CONTENT_FADE_START, 1], [1, 1, 0]);
  const bgColor = useTransform(scrollYProgress, [0, 1], ['#FBF4EA', '#E9D6B4']);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative"
      style={{ height: reduceMotion ? '100svh' : '220vh' }}
    >
      <motion.div
        style={{ backgroundColor: reduceMotion ? '#FBF4EA' : bgColor }}
        className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[var(--fc-header-h)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,#f1e6d3_0%,transparent_55%),radial-gradient(circle_at_10%_85%,#efe0cc_0%,transparent_50%)]" />
        <div className="fc-grain pointer-events-none absolute inset-0" />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : contentOpacity }}
          className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-0"
        >
          <motion.div style={{ y: reduceMotion ? 0 : textY }} className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeLuxe, delay: LOADER_TOTAL_S }}
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-fc-gold"
            >
              <span className="h-px w-8 bg-current" />
              Amman&apos;s Handcrafted Cake Studio
            </motion.div>

            <h1 className="mt-6 font-fc-serif text-[clamp(2.8rem,7.5vw,5.6rem)] font-medium leading-[0.98] tracking-tight text-fc-cocoa">
              <motion.span
                initial="hidden"
                animate="show"
                variants={staggerChildren(0.12, LOADER_TOTAL_S + 0.15)}
                className="block"
              >
                {HEADLINE.split(' ').map((word, i) => (
                  <span key={word} className="mr-4 inline-block overflow-hidden pb-2 align-bottom last:mr-0">
                    <motion.span
                      variants={wordReveal}
                      className={`inline-block ${i === 1 ? 'italic text-fc-gold' : ''}`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeLuxe, delay: LOADER_TOTAL_S + 0.55 }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-fc-cocoa-light"
            >
              Beautiful cakes, made with love for your sweetest moments — handcrafted in small batches
              in AlJubiha, Amman.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeLuxe, delay: LOADER_TOTAL_S + 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button size="lg" onClick={() => scrollToId('cakes')}>
                Explore Cakes
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId('custom')}>
                Order Now
              </Button>
            </motion.div>
          </motion.div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-[min(84vw,460px)]" style={{ aspectRatio: HERO_CAKE_ASPECT }}>
              <motion.div style={{ y: reduceMotion ? 0 : cakeGroupY }} className="absolute inset-0">
                <HeroCake scrollYProgress={scrollYProgress} reduceMotion={reduceMotion} />
              </motion.div>

              <FloatingIcon className="left-[-8%] top-[8%] h-10 w-10 text-fc-blush/70" duration={7}>
                <StrawberryMark className="h-full w-full" />
              </FloatingIcon>
              <FloatingIcon className="bottom-[10%] right-[-6%] h-9 w-9 text-fc-sage/70" duration={8.5} delay={1}>
                <PistachioMark className="h-full w-full" />
              </FloatingIcon>
              <FloatingIcon className="right-[6%] top-[-4%] h-7 w-7 text-fc-gold/70" duration={6.5} delay={0.5}>
                <FlowerMark className="h-full w-full" />
              </FloatingIcon>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: reduceMotion ? 1 : scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fc-cocoa-light/60 lg:flex"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: LOADER_TOTAL_S + 1.1 }}
            className="text-[10px] uppercase tracking-[0.3em]"
          >
            Scroll
          </motion.span>
          <span className="h-8 w-px animate-pulse bg-current" />
        </motion.div>
      </motion.div>
    </section>
  );
}
