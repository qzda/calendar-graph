import { defineConfig } from "vite";
import fs from "node:fs";

const virtualModuleId = "virtual:template";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "Template Load",
      resolveId(id) {
        if (id === virtualModuleId) {
          return "\0" + virtualModuleId;
        }
      },
      load(id) {
        if (id === "\0" + virtualModuleId) {
          const content = fs.readFileSync("src/template.html", "utf-8");
          return {
            code: `export default \`${content}\``,
            map: null,
          };
        }
      },

      handleHotUpdate(ctx) {
        if (ctx.file.endsWith(".html")) {
          ctx.server.hot.send({
            type: "full-reload",
          });
          ctx.server.moduleGraph.invalidateAll();
          return [];
        }
      },
    },
  ],
});
