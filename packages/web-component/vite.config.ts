import { defineConfig } from "vite";
import fs from "node:fs";
import { IsDev } from "./src/utils";

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

          if (IsDev) {
            return {
              code: `export default \`${content}\``,
              map: null,
            };
          } else {
            let _content = content.replaceAll("\r", "").replaceAll("\n", " ");

            while (_content.includes("  ")) {
              _content = _content.replaceAll("  ", " ");
            }

            return {
              code: `export default \`${_content}\``,
              map: null,
            };
          }
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
