<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";
import { configs, useSlideContext } from "@slidev/client";

const props = defineProps({
  layout: { type: String, default: "default" },
  class: { type: [String, Array, Object] as PropType<unknown>, default: undefined },
  logo: { type: Boolean, default: undefined },
  schwelle: { type: [Boolean, String] as PropType<boolean | string>, default: undefined },
  footer: { type: Boolean, default: undefined },
  center: { type: Boolean, default: false },
});

const { $frontmatter, $page, $nav } = useSlideContext();
const frontmatter = $frontmatter as Record<string, unknown>;
const themeConfig = (configs.themeConfig ?? {}) as Record<string, unknown>;

const showLogo = computed(
  () => (props.logo ?? frontmatter.logo ?? themeConfig.logo ?? true) !== false,
);

const schwelleColor = computed(() => {
  const value = props.schwelle ?? frontmatter.schwelle ?? themeConfig.schwelle ?? true;
  if (value === false) return null;
  return typeof value === "string" ? value : "auto";
});

const showFooter = computed(
  () => (props.footer ?? frontmatter.footer ?? true) !== false,
);
const footerText = computed(() =>
  typeof frontmatter.footer === "string"
    ? frontmatter.footer
    : String(themeConfig.footer ?? ""),
);
const pageNumbers = computed(() => themeConfig.pageNumbers !== false);
const showProgress = computed(
  () => (frontmatter.progress ?? themeConfig.progress ?? false) === true,
);
const total = computed(() => $nav.value?.total ?? 0);
</script>

<template>
  <div
    class="slidev-layout db-slide"
    :class="[
      props.layout,
      props.class,
      { 'db-slide--logo': showLogo, 'db-slide--center': center },
    ]"
  >
    <DbLogo v-if="showLogo" class="db-slide__logo" additive="" />
    <div class="db-slide__body">
      <slot />
    </div>
    <footer
      v-if="showFooter && (footerText || pageNumbers)"
      class="db-slide__footer"
    >
      <span v-if="footerText" class="db-slide__footer-text">{{ footerText }}</span>
      <span v-if="pageNumbers" class="db-slide__page">{{ $page }} / {{ total }}</span>
    </footer>
    <DbProgress v-if="showProgress" class="db-slide__progress" />
    <Schwelle
      v-else-if="schwelleColor"
      class="db-slide__schwelle"
      variant="s"
      height="1.25rem"
      :stretch="2"
      :color="schwelleColor"
    />
  </div>
</template>

<style scoped>
.db-slide {
  display: flex;
  flex-direction: column;
}

.db-slide__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.db-slide--center .db-slide__body {
  justify-content: center;
}

.db-slide__logo {
  position: absolute;
  top: var(--db-margin-y);
  right: var(--db-margin-x);
  z-index: 2;
}

/* keep the first headline clear of the logo */
.db-slide--logo .db-slide__body > :deep(:is(h1, h2):first-child),
.db-slide--logo .db-slide__body > :deep(.db-cols > .db-cols__col:last-child > :is(h1, h2):first-child),
.db-slide--logo .db-slide__body > :deep(.db-cols__header > :is(h1, h2):first-child) {
  padding-right: calc(var(--db-logo-height) * 2);
}

.db-slide__footer {
  position: absolute;
  left: var(--db-margin-x);
  bottom: 0.9rem;
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  line-height: 1;
  color: var(--db-muted);
}

.db-slide__progress {
  position: absolute;
  right: var(--db-margin-x);
  bottom: 0.9rem;
}

.db-slide__schwelle {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
