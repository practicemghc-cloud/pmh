import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, singletonTypes } from "./sanity/schema";
import { structure } from "./sanity/structure";

const singletons = new Set<string>(singletonTypes);

export default defineConfig({
  name: "pmg",
  title: "PMG Healthcare",
  basePath: "/studio",

  projectId: projectId ?? "missing-project-id",
  dataset,

  plugins: [
    structureTool({ structure }),
    // Query playground — handy for developers, hidden from the main menu.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    // Pages and settings exist once each: keep them out of the global
    // "create new" menu so nobody makes a second Home page.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },

  document: {
    // Remove actions that make no sense for a one-of-a-kind document.
    actions: (input, { schemaType }) =>
      singletons.has(schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : input,
  },
});
