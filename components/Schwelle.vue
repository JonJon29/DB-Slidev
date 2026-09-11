<script setup lang="ts">
import type { PropType } from "vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useNav, useSlideContext } from "@slidev/client";

// DB Schwelle (marketingportal .../neues-design/Schwelle)
// height = 30 units, bar + following gap = 15 units
//   standard: 15 bars, widths 1..15 -> 225 units long
//   s:        11 bars, widths 3..13 -> 163 units long (use below 32px)
// animation timings measured from the loop video on the Motion Branding page
const UNITS = 30;
const PITCH = 15;
const VARIANTS = {
  standard: { bars: 15, offset: 0 },
  s: { bars: 11, offset: 2 },
} as const;
type Variant = keyof typeof VARIANTS;

const COLORS: Record<string, string> = {
  auto: "var(--db-schwelle)",
  red: "var(--db-schwelle)",
  white: "var(--db-white)",
  lilac: "var(--lilac)",
  subtle: "var(--db-schwelle-subtle)",
};

// motion curves
const EASE_PRIMARY = [0.25, 0, 0.35, 1] as const;
const EASE_SECONDARY = [0, 0, 0.2, 1] as const;
const css = (c: readonly number[]) => `cubic-bezier(${c.join(", ")})`;

// seconds
const FRONT = 0.96; // reveal left -> right
const SETTLE = 0.45; // bar shrinks from grid cell to final width
const OUT_BASE = 0.4; // breakdown: base + step per bar
const OUT_STEP = 0.05;
const HOLD = 2; // loop only
const REST = 0.15;

const props = defineProps({
  // standard | s | auto (s below 32px)
  variant: { type: String as PropType<Variant | "auto">, default: "auto" },
  // thickness when vertical
  height: { type: String, default: "2rem" },
  // red | white | lilac | subtle
  color: { type: String, default: "auto" },
  // 1..2
  stretch: { type: Number, default: 1 },
  orientation: {
    type: String as PropType<"horizontal" | "vertical">,
    default: "horizontal",
  },
  animate: {
    type: [Boolean, String] as PropType<boolean | "in" | "loop">,
    default: false,
  },
});

function toPx(value: string): number | undefined {
  const m = /^([\d.]+)\s*(px|rem|em)$/.exec(value.trim());
  if (!m) return undefined;
  return m[2] === "px" ? Number(m[1]) : Number(m[1]) * 16;
}

const variant = computed<Variant>(() => {
  if (props.variant in VARIANTS) return props.variant as Variant;
  const px = toPx(props.height);
  return px !== undefined && px < 32 ? "s" : "standard";
});

const segments = computed(() => {
  const { bars, offset } = VARIANTS[variant.value];
  return Array.from({ length: bars }, (_, i) => ({
    pos: i * PITCH,
    size: i + 1 + offset,
  }));
});

const length = computed(() => {
  const { bars, offset } = VARIANTS[variant.value];
  return (bars - 1) * PITCH + bars + offset;
});

const stretch = computed(() => Math.min(2, Math.max(1, props.stretch)));
const vertical = computed(() => props.orientation === "vertical");

const viewBox = computed(() =>
  vertical.value ? `0 0 ${UNITS} ${length.value}` : `0 0 ${length.value} ${UNITS}`,
);

const style = computed(() => {
  const factor = ((length.value / UNITS) * stretch.value).toFixed(4);
  const long = `calc(${props.height} * ${factor})`;
  return {
    color: COLORS[props.color] ?? COLORS.auto,
    ...(vertical.value
      ? { width: props.height, height: long }
      : { height: props.height, width: long }),
  };
});

let presenting = false;
let isActive = computed(() => false);
try {
  const { $renderContext, $page } = useSlideContext();
  const { currentSlideNo, isPrintMode } = useNav();
  presenting = $renderContext.value === "slide" && !isPrintMode.value;
  isActive = computed(() => $page.value === currentSlideNo.value);
} catch {
  /* used outside a slide */
}

const mode = computed<false | "in" | "loop">(() => {
  if (!props.animate || !presenting) return false;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  return props.animate === "loop" ? "loop" : "in";
});

const svg = ref<SVGSVGElement>();
const mounted = ref(false);
let running: Animation[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;

function timeAt(curve: readonly number[], progress: number): number {
  const [x1, y1, x2, y2] = curve;
  const at = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (at(mid, y1, y2) < progress) lo = mid;
    else hi = mid;
  }
  return at((lo + hi) / 2, x1, x2);
}

function bars(): SVGRectElement[] {
  return Array.from(svg.value?.querySelectorAll("rect") ?? []);
}

const scale = (v: number) => (vertical.value ? `scaleY(${v})` : `scaleX(${v})`);
const clipped = () => (vertical.value ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)");

// returns duration in ms
function buildUp(): number {
  const rects = bars();
  const n = rects.length;
  const pivot = Math.round(n * 0.47);
  let end = FRONT;

  running.push(
    svg.value!.animate([{ clipPath: clipped() }, { clipPath: "inset(0 0 0 0)" }], {
      duration: FRONT * 1000,
      easing: css(EASE_PRIMARY),
      fill: "both",
    }),
  );

  // when the front passes each bar's right edge
  const reveal = segments.value.map(
    (s) => FRONT * timeAt(EASE_PRIMARY, (s.pos + s.size) / length.value),
  );

  rects.forEach((rect, i) => {
    const size = segments.value[i].size;
    const from = i === 0 ? 1 : (PITCH + 1) / size;
    // gaps open from the middle outwards, thin bars settle last
    const start =
      i + 1 > pivot
        ? reveal[i]
        : Math.max(reveal[i], reveal[pivot - 1] + 0.1 + (pivot - 1 - i) * 0.04);
    end = Math.max(end, start + SETTLE);
    running.push(
      rect.animate([{ transform: scale(from) }, { transform: scale(1) }], {
        duration: SETTLE * 1000,
        delay: start * 1000,
        easing: css(EASE_SECONDARY),
        fill: "both",
      }),
    );
  });

  return end * 1000;
}

// returns duration in ms
function breakdown(): number {
  const rects = bars();
  rects.forEach((rect, i) => {
    running.push(
      rect.animate([{ transform: scale(1) }, { transform: scale(0) }], {
        duration: (OUT_BASE + OUT_STEP * (i + 1)) * 1000,
        easing: "linear",
        fill: "both",
      }),
    );
  });
  return (OUT_BASE + OUT_STEP * rects.length) * 1000;
}

function stop() {
  clearTimeout(timer);
  timer = undefined;
  running.forEach((a) => a.cancel());
  running = [];
}

function start() {
  stop();
  if (!svg.value || !mode.value) return;
  const cycle = () => {
    stop();
    const up = buildUp();
    if (mode.value !== "loop") return;
    timer = setTimeout(() => {
      const down = breakdown();
      timer = setTimeout(cycle, down + REST * 1000);
    }, up + HOLD * 1000);
  };
  cycle();
}

onMounted(() => (mounted.value = true));
watch(
  [isActive, mounted, mode],
  ([active, ready, m]) => (active && ready && m ? start() : stop()),
  { immediate: true },
);
onBeforeUnmount(stop);
</script>

<template>
  <svg
    ref="svg"
    class="db-schwelle"
    :class="{
      'db-schwelle--vertical': vertical,
      [`db-schwelle--${variant}`]: true,
    }"
    :viewBox="viewBox"
    preserveAspectRatio="none"
    :style="style"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      v-for="(s, i) in segments"
      :key="i"
      :x="vertical ? 0 : s.pos"
      :y="vertical ? s.pos : 0"
      :width="vertical ? UNITS : s.size"
      :height="vertical ? s.size : UNITS"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped>
.db-schwelle {
  display: block;
  flex: none;
}

/* bars scale towards their trailing edge */
.db-schwelle rect {
  transform-box: fill-box;
  transform-origin: 100% 50%;
}

.db-schwelle--vertical rect {
  transform-origin: 50% 100%;
}
</style>
