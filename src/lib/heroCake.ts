/**
 * Source-of-truth data + tuning constants for the hero's scroll-driven
 * "cake explosion" visual. All four layer images are cropped from a single
 * real photo of the cake fully exploded (see reference/cake-hero/), so
 * stacking them with zero gap reconstructs the assembled cake exactly —
 * the same four images serve both the assembled and exploded states.
 */

export interface HeroCakeLayer {
  src: string;
  alt: string;
  /** This layer's height as a % of the total stack height. */
  heightPercent: number;
}

export const HERO_CAKE_LAYERS: HeroCakeLayer[] = [
  {
    src: '/images/cakes/hero-explode/01-fruit.webp',
    alt: 'Frankies signature naked chocolate cake, topped with fresh strawberries, blackberries and raspberries',
    heightPercent: 30.4348,
  },
  {
    src: '/images/cakes/hero-explode/02-disc-top.webp',
    alt: '',
    heightPercent: 25.8152,
  },
  {
    src: '/images/cakes/hero-explode/03-disc-middle.webp',
    alt: '',
    heightPercent: 20.788,
  },
  {
    src: '/images/cakes/hero-explode/04-disc-bottom.webp',
    alt: '',
    heightPercent: 22.962,
  },
];

/** width / height of the cropped stack — keeps the display box the same
 *  shape as the source photograph, on every screen size. */
export const HERO_CAKE_ASPECT = 658 / 736;

// ---------------------------------------------------------------------
// Explosion timeline. Everything here is a fraction of the hero's scroll
// story (scrollYProgress, 0 = section just pinned, 1 = section about to
// release) or a percentage of a layer's own rendered height — never a
// raw pixel guess — so the whole thing scales cleanly from phone to
// desktop. Tweak these to change pacing/spacing without touching the
// component's rendering logic.
//
// There is no entrance animation: the cake is fully assembled and
// static the moment the page loads. It only starts moving once the
// visitor scrolls past EXPLODE_WINDOW[0].

/** Scroll window where the topmost layer starts/finishes exploding apart.
 *  Lower layers repeat this same window, shifted later by LAYER_STAGGER
 *  per layer, producing a top-to-bottom cascade instead of every layer
 *  moving in lockstep. */
export const EXPLODE_WINDOW: [number, number] = [0.08, 0.32];
/** Scroll window where the topmost layer starts/finishes reassembling. */
export const REASSEMBLE_WINDOW: [number, number] = [0.58, 0.82];
/** Extra scroll-progress delay added per layer index (0 = fruit topper). */
export const LAYER_STAGGER = 0.02;

/** How far a layer travels at full explosion, as a % of its own height,
 *  multiplied by its distance from the vertical center of the stack —
 *  so outer layers (fruit topper, bottom disc) travel further than the
 *  inner ones, which reads as a natural outward burst. Kept modest so the
 *  exploded layers never have to travel further than the reserved "stage"
 *  margins below can contain (see STAGE_ASPECT). */
export const EXPLODE_STEP_PERCENT = 32;

/** Each layer's crop line sits at a scanline that isn't 100% empty in the
 *  source photo, which leaves a hairline gap when every layer sits at
 *  y = 0. Pulling each layer up slightly (cumulative by index, as a % of
 *  its own height) closes that seam so the "assembled" state reads as one
 *  solid cake. */
export const REST_SEAM_CLOSE_PERCENT = 5;

/** Content (text + cake) starts fading out this far into the scroll,
 *  finishing at progress 1. Kept after the last layer's reassembly
 *  finishes so the cake is always shown fully formed before it fades. */
export const CONTENT_FADE_START = 0.9;

// ---------------------------------------------------------------------
// The "stage": exploded layers travel outside the assembled cake's own
// box, so the cake is rendered inside a taller, invisible, clipped
// "stage" box that reserves exactly enough room above/below to contain
// the topmost/bottommost layer at full explosion — never more, never
// less — so the cake can never visually overlap the headline text below
// it, however EXPLODE_STEP_PERCENT or the layer heights are tuned.

const CENTER_INDEX = (HERO_CAKE_LAYERS.length - 1) / 2;
function travelFraction(index: number) {
  return (Math.abs(index - CENTER_INDEX) * EXPLODE_STEP_PERCENT) / 100;
}

const firstLayer = HERO_CAKE_LAYERS[0]!;
const lastLayer = HERO_CAKE_LAYERS[HERO_CAKE_LAYERS.length - 1]!;

/** Extra room reserved above/below the cake, as a fraction of the cake's
 *  own (assembled) height. */
export const STAGE_TOP_MARGIN = travelFraction(0) * (firstLayer.heightPercent / 100);
export const STAGE_BOTTOM_MARGIN = travelFraction(HERO_CAKE_LAYERS.length - 1) * (lastLayer.heightPercent / 100);

const stageGrowth = 1 + STAGE_TOP_MARGIN + STAGE_BOTTOM_MARGIN;

/** width / height of the full stage (cake + reserved explosion room). */
export const STAGE_ASPECT = HERO_CAKE_ASPECT / stageGrowth;
/** Where the assembled-cake box sits inside the stage, as a % from the top. */
export const CAKE_BOX_TOP_PERCENT = (STAGE_TOP_MARGIN / stageGrowth) * 100;
/** The assembled-cake box's height, as a % of the stage's height. */
export const CAKE_BOX_HEIGHT_PERCENT = (1 / stageGrowth) * 100;
