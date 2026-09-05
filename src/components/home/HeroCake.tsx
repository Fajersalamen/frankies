'use client';

import type { MotionValue } from 'framer-motion';
import { motion, useTransform } from 'framer-motion';
import {
  EXPLODE_STEP_PERCENT,
  EXPLODE_WINDOW,
  HERO_CAKE_LAYERS,
  LAYER_STAGGER,
  REASSEMBLE_WINDOW,
  REST_SEAM_CLOSE_PERCENT,
  type HeroCakeLayer,
} from '@/lib/heroCake';

interface CakeLayerProps {
  layer: HeroCakeLayer;
  index: number;
  top: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}

/**
 * One physical slice of the cake (the fruit topper, or a sponge disc with
 * its cream layer). Moves independently along Y only, driven entirely by
 * scroll position — no time-based animation, no rotation, no crossfade.
 */
function CakeLayer({ layer, index, top, scrollYProgress, reduceMotion }: CakeLayerProps) {
  const stagger = index * LAYER_STAGGER;
  const explodeStart = EXPLODE_WINDOW[0] + stagger;
  const explodeEnd = EXPLODE_WINDOW[1] + stagger;
  const reassembleStart = REASSEMBLE_WINDOW[0] + stagger;
  const reassembleEnd = REASSEMBLE_WINDOW[1] + stagger;

  // Distance from the visual center of the 4-layer stack: outer layers
  // (topper, bottom disc) travel further than inner ones, so the stack
  // bursts outward symmetrically rather than shifting as one block.
  const centerIndex = (HERO_CAKE_LAYERS.length - 1) / 2;
  const restPercent = -REST_SEAM_CLOSE_PERCENT * index;
  const explodedPercent = restPercent + (index - centerIndex) * EXPLODE_STEP_PERCENT;

  const y = useTransform(
    scrollYProgress,
    [0, explodeStart, explodeEnd, reassembleStart, reassembleEnd, 1],
    [`${restPercent}%`, `${restPercent}%`, `${explodedPercent}%`, `${explodedPercent}%`, `${restPercent}%`, `${restPercent}%`],
  );

  return (
    <div className="absolute inset-x-0" style={{ top: `${top}%`, height: `${layer.heightPercent}%` }}>
      <motion.div style={{ y: reduceMotion ? '0%' : y }} className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={layer.src}
          alt={layer.alt}
          aria-hidden={layer.alt === '' ? true : undefined}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}

interface HeroCakeProps {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}

export function HeroCake({ scrollYProgress, reduceMotion }: HeroCakeProps) {
  let cumulativeTop = 0;

  return (
    <>
      {HERO_CAKE_LAYERS.map((layer, index) => {
        const top = cumulativeTop;
        cumulativeTop += layer.heightPercent;
        return (
          <CakeLayer
            key={layer.src}
            layer={layer}
            index={index}
            top={top}
            scrollYProgress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        );
      })}
    </>
  );
}
