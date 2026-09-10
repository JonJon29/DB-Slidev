import { defineMermaidSetup } from "@slidev/types";
import { isDark } from "@slidev/client/logic/dark.ts";

/* DB brand palette — kept in sync with styles/layout.css */
const DB_RED = "#FF002B";
const DB_RED_700 = "#9B000E";
const DB_RED_300 = "#FA9090";
const COLD_BLACK = "#090F1B";
const LILAC = "#AA99FF";
const WHITE = "#FFFFFF";

/**
 * Theme variables for a light slide (plain white background): dark,
 * cold-black nodes with white text.
 */
const lightThemeVariables = {
  background: WHITE,
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
  tertiaryTextColor: COLD_BLACK,
  tertiaryBorderColor: DB_RED_700,
  clusterBkg: WHITE,
  clusterBorder: COLD_BLACK,
  edgeLabelBackground: LILAC,
};

/**
 * Dark-mode counterpart (cold-black slide background): the fills and
 * text colours from the light set are inverted, the DB red accents stay.
 */
const darkThemeVariables: typeof lightThemeVariables = {
  background: COLD_BLACK,
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
  secondaryBorderColor: WHITE,
  tertiaryColor: DB_RED_700,
  tertiaryTextColor: WHITE,
  tertiaryBorderColor: DB_RED_300,
  clusterBkg: COLD_BLACK,
  clusterBorder: WHITE,
  edgeLabelBackground: COLD_BLACK,
};

/**
 * Slidev's <Mermaid> component already switches the base theme
 * (`dark` vs `default`) live when dark mode is toggled. This setup adds
 * the matching DB brand `themeVariables` on top.
 *
 * Note: the setup runs once, so with `colorSchema: auto` the variables
 * reflect the color scheme active at load time; a live toggle needs a
 * page reload to re-pick them. With a fixed `colorSchema: light | dark`
 * (the common case) it is always correct.
 */
export default defineMermaidSetup(() => {
  return {
    theme: "base",
    themeVariables: lightThemeVariables,
  };
});
