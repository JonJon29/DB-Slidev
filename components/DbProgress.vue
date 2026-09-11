<script lang="ts">
let lastSlide = 0;
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useIsSlideActive, useNav, useSlideContext } from "@slidev/client";

const props = defineProps({
  current: { type: Number, default: undefined },
  total: { type: Number, default: undefined },
});

let page = computed(() => 1);
let count = computed(() => 1);
let active = computed(() => false);
let printing = false;
let go: (no: number) => unknown = () => {};
let titleOf: (no: number) => string = () => "";
try {
  const { $page } = useSlideContext();
  const nav = useNav();
  page = $page;
  count = nav.total;
  printing = nav.isPrintMode.value;
  active = useIsSlideActive();
  go = nav.go;
  titleOf = (no) => nav.slides.value[no - 1]?.meta?.slide?.title ?? "";
} catch {
  /* outside a slide */
}

const total = computed(() => Math.max(1, props.total ?? count.value));
const current = computed(() => Math.min(total.value, Math.max(1, props.current ?? page.value)));

// pointer position in bar units
const pos = ref(current.value);
const hovering = ref(false);
const strip = ref<HTMLElement>();

const REACH = 4.5;
const bars = computed(() => {
  const fill = hovering.value ? current.value : pos.value;
  return Array.from({ length: total.value }, (_, i) => {
    const d = Math.abs(i + 1 - pos.value);
    return { past: i + 1 <= fill + 0.5, grow: Math.max(0, 1 - d / REACH) };
  });
});

const hovered = computed(() => Math.min(total.value, Math.max(1, Math.round(pos.value))));
const hoveredTitle = computed(() => titleOf(hovered.value) || `/ ${total.value}`);

// timing from the clip, started after the slide transition
const PER_BAR = 0.13;
const MIN = 0.5;
const MAX = 1.6;
const DELAY = 0.4;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

let frame = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
function stop() {
  cancelAnimationFrame(frame);
  clearTimeout(timer);
  frame = 0;
  timer = undefined;
}

function sweep(from: number, to: number, delay = 0) {
  stop();
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (printing || reduced || from === to) {
    pos.value = to;
    return;
  }
  const duration = Math.min(MAX, Math.max(MIN, Math.abs(to - from) * PER_BAR)) * 1000;
  pos.value = from;
  timer = setTimeout(() => {
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      pos.value = from + (to - from) * ease(t);
      if (t < 1) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    frame = requestAnimationFrame(tick);
  }, delay * 1000);
}

let activatedAt = 0;
watch(
  active,
  (isActive) => {
    if (props.current !== undefined) return;
    if (!isActive) return stop();
    activatedAt = performance.now();
    hovering.value = false;
    const from = lastSlide || current.value;
    lastSlide = current.value;
    sweep(from, current.value, DELAY);
  },
  { immediate: true },
);
watch(current, (v) => (pos.value = v));
onBeforeUnmount(stop);

function toPos(e: PointerEvent | MouseEvent) {
  const r = strip.value!.getBoundingClientRect();
  const pitch = r.width / total.value;
  return Math.min(total.value + 0.49, Math.max(0.51, (e.clientX - r.left) / pitch + 0.5));
}

function onMove(e: PointerEvent) {
  // ignore pointer events while the slide is still sliding in
  if (printing || performance.now() - activatedAt < (DELAY + 0.2) * 1000) return;
  stop();
  hovering.value = true;
  pos.value = toPos(e);
}

function onLeave() {
  if (!hovering.value) return;
  hovering.value = false;
  sweep(pos.value, current.value);
}

function onClick(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  const no = Math.round(toPos(e));
  hovering.value = false;
  if (no !== current.value) go(no);
  else pos.value = no;
}
</script>

<template>
  <div
    ref="strip"
    class="db-progress"
    :class="{ 'db-progress--hover': hovering }"
    :style="{ '--n': total }"
    role="navigation"
    aria-label="Slides"
    @pointerenter="onMove"
    @pointermove="onMove"
    @pointerleave="onLeave"
    @click="onClick"
  >
    <div
      v-if="hovering"
      class="db-progress__tip"
      :style="{ left: `calc((${pos.toFixed(3)} - 0.5) * var(--db-progress-pitch))` }"
    >
      <strong>{{ hovered }}</strong>{{ hoveredTitle }}
    </div>
    <div class="db-progress__marker" :style="{ left: `calc((${pos.toFixed(3)} - 0.5) * var(--db-progress-pitch))` }" />
    <div class="db-progress__bars">
      <a
        v-for="(bar, i) in bars"
        :key="i"
        class="db-progress__cell"
        :href="`#db-slide-${i + 1}`"
        :aria-label="`Slide ${i + 1}`"
        :style="{ left: `calc(${i} * var(--db-progress-pitch))` }"
      >
        <span
          class="db-progress__bar"
          :class="{ 'db-progress__bar--past': bar.past }"
          :style="{
            width: `calc(var(--db-progress-min) + (var(--db-progress-max) - var(--db-progress-min)) * ${bar.grow.toFixed(3)})`,
          }"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
.db-progress {
  --db-progress-pitch: min(var(--db-progress-step), var(--db-progress-width) / var(--n));
  --db-progress-max: calc(var(--db-progress-pitch) * 0.84);
  position: relative;
  width: calc(var(--n) * var(--db-progress-pitch));
  height: var(--db-progress-height);
  margin-top: calc(var(--db-progress-height) * 0.55);
  cursor: pointer;
}

/* hit area */
.db-progress::before {
  content: "";
  position: absolute;
  inset: -0.9rem -0.5rem -0.6rem;
}

.db-progress__bars {
  position: absolute;
  inset: 0;
}

.db-progress__cell {
  position: absolute;
  top: 0;
  bottom: 0;
  width: var(--db-progress-pitch);
  border: none;
  text-decoration: none;
}

.db-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  translate: -50% 0;
  background: var(--db-progress-upcoming);
  transition: background-color 0.15s var(--db-ease-secondary);
}

.db-progress__bar--past {
  background: var(--db-schwelle);
}

.db-progress__marker {
  position: absolute;
  bottom: calc(100% + var(--db-progress-height) * 0.12);
  width: calc(var(--db-progress-height) * 0.45);
  height: calc(var(--db-progress-height) * 0.42);
  translate: -50% 0;
  background: var(--db-progress-marker);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.db-progress__tip {
  position: absolute;
  bottom: calc(100% + var(--db-progress-height) * 0.7);
  translate: -50% 0;
  display: flex;
  gap: 0.5em;
  padding: 0.25rem 0.5rem;
  font-family: "DB Screen Sans", system-ui, sans-serif;
  font-size: 0.7rem;
  line-height: 1.2;
  white-space: nowrap;
  color: var(--db-background);
  background: var(--db-foreground);
  pointer-events: none;
}

.db-progress__tip strong {
  font-family: "DB Screen Head", "DB Screen Sans", system-ui, sans-serif;
  font-weight: 900;
}
</style>
