import { defineMermaidSetup } from "@slidev/types";
import { watch } from "vue";
import { isDark } from "@slidev/client/logic/dark.ts";

/* DB brand palette — see styles/tokens.css */
const DB_RED = "#FF002B"; // DB Red 400
const DB_RED_700 = "#9E000F";
const DB_RED_300 = "#FA4A59";
const COLD_BLACK = "#090F1B"; // Grey 900
const LILAC = "#AA99FF"; // Lilac 200
const WHITE = "#FFFFFF";
const GREY_100 = "#C9CCD2";
const GREY_700 = "#454D5D";

/**
 * Theme variables for a light slide (plain white background): dark,
 * cold-black nodes with white text.
 */
const lightThemeVariables = {
  background: WHITE,
  stroke: WHITE,
  primaryColor: WHITE,
  mainBkg: COLD_BLACK,
  primaryTextColor: WHITE,
  nodeTextColor: WHITE,
  primaryBorderColor: COLD_BLACK,
  lineColor: DB_RED,
  textColor: WHITE,
  titleColor: COLD_BLACK,
  secondaryColor: COLD_BLACK,
  secondaryTextColor: COLD_BLACK,
  secondaryBorderColor: COLD_BLACK,
  tertiaryColor: COLD_BLACK,
  tertiaryTextColor: WHITE,
  tertiaryBorderColor: DB_RED_700,
  clusterBkg: WHITE,
  clusterBorder: GREY_100,
  edgeLabelBackground: LILAC,
};

/**
 * Dark-mode counterpart (cold-black slide background): the fills and
 * text colours from the light set are inverted, the DB red accents stay.
 */
const darkThemeVariables: typeof lightThemeVariables = {
  background: COLD_BLACK,
  stroke: WHITE,
  primaryColor: WHITE,
  mainBkg: WHITE,
  primaryTextColor: COLD_BLACK,
  nodeTextColor: COLD_BLACK,
  primaryBorderColor: DB_RED,
  lineColor: DB_RED,
  textColor: WHITE,
  titleColor: WHITE,
  secondaryColor: LILAC,
  secondaryTextColor: COLD_BLACK,
  secondaryBorderColor: DB_RED,
  tertiaryColor: DB_RED_700,
  tertiaryTextColor: COLD_BLACK,
  tertiaryBorderColor: DB_RED_300,
  clusterBkg: COLD_BLACK,
  clusterBorder: GREY_700,
  edgeLabelBackground: LILAC,
};

/**
 * `defineMermaidSetup` is evaluated exactly once — Slidev caches it in a
 * singleton promise — so it can't return a fresh value per color scheme.
 * Instead we return a *stable* object reference and mutate it in place
 * whenever `isDark` changes.
 *
 * Slidev's <Mermaid> component re-renders every diagram when `isDark`
 * flips (its render effect reads `isDark.value`), and each re-render
 * re-reads this object via `mermaid.initialize(...)`, so mutating it is
 * what makes the switch live without a page reload. `flush: "sync"`
 * guarantees the object is updated before the diagrams re-render.
 */
const themeVariables = {
  ...(isDark.value ? darkThemeVariables : lightThemeVariables),
};

watch(
  isDark,
  (dark) => {
    Object.assign(
      themeVariables, // pointer shenanigans: mutate the stable object reference
      dark ? darkThemeVariables : lightThemeVariables,
    );
  },
  { flush: "sync" },
);

export default defineMermaidSetup(() => {
  return {
    theme: "base",
    themeVariables,
    fontFamily: '"DB Screen Sans", system-ui, sans-serif',
  };
});
