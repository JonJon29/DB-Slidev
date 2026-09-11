import type { ShikiSetupReturn } from "@slidev/types";
import { defineShikiSetup } from "@slidev/types";

// shiki themes in DB colours (grey 25 / grey 800 surfaces)
interface Palette {
  bg: string;
  fg: string;
  muted: string;
  keyword: string;
  string: string;
  constant: string;
  type: string;
  punctuation: string;
}

const light: Palette = {
  bg: "#F4F4F6", // grey 25
  fg: "#000000",
  muted: "#596273", // grey 600
  keyword: "#C20012", // red 600
  string: "#165C27", // green 700
  constant: "#62588F", // lilac 600
  type: "#4E4770", // lilac 700
  punctuation: "#454D5D", // grey 700
};

const dark: Palette = {
  bg: "#262C38", // grey 800
  fg: "#FFFFFF",
  muted: "#A3A8B2", // grey 200
  keyword: "#FC808C", // red 200
  string: "#8CBC80", // green 300
  constant: "#AA99FF", // lilac 200
  type: "#CCBEFF", // lilac 100
  punctuation: "#C9CCD2", // grey 100
};

function dbTheme(name: string, type: "light" | "dark", c: Palette) {
  return {
    name,
    type,
    fg: c.fg,
    bg: c.bg,
    colors: {
      "editor.background": c.bg,
      "editor.foreground": c.fg,
    },
    tokenColors: [
      { settings: { foreground: c.fg } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: c.muted, fontStyle: "italic" },
      },
      {
        scope: [
          "keyword",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.control",
          "keyword.operator.new",
          "keyword.operator.expression",
          "entity.name.tag",
          "markup.heading",
        ],
        settings: { foreground: c.keyword },
      },
      {
        scope: ["keyword.operator", "punctuation", "meta.brace"],
        settings: { foreground: c.punctuation },
      },
      {
        scope: [
          "string",
          "string.quoted",
          "punctuation.definition.string",
          "markup.inline.raw",
          "meta.embedded.assembly",
        ],
        settings: { foreground: c.string },
      },
      {
        scope: [
          "constant",
          "constant.numeric",
          "constant.language",
          "constant.character",
          "constant.other",
          "variable.other.constant",
          "entity.other.attribute-name",
          "support.constant",
        ],
        settings: { foreground: c.constant },
      },
      {
        scope: [
          "entity.name.type",
          "entity.name.class",
          "entity.name.namespace",
          "entity.other.inherited-class",
          "support.type",
          "support.class",
          "meta.type",
        ],
        settings: { foreground: c.type },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call",
          "variable.function",
        ],
        settings: { foreground: c.fg, fontStyle: "bold" },
      },
      {
        scope: ["variable", "variable.parameter", "variable.other", "meta.object-literal.key"],
        settings: { foreground: c.fg },
      },
      { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
      { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
      {
        scope: ["markup.inserted"],
        settings: { foreground: c.string },
      },
      {
        scope: ["markup.deleted", "invalid"],
        settings: { foreground: c.keyword },
      },
    ],
  };
}

export default defineShikiSetup((): ShikiSetupReturn => {
  return {
    themes: {
      light: dbTheme("db-light", "light", light) as any,
      dark: dbTheme("db-dark", "dark", dark) as any,
    },
  };
});
