import { defineConfig } from "vite";
import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    (() => {
      const virtualModuleId = "virtual:template";
      const resolvedVirtualModuleId = "\0" + virtualModuleId;
      return {
        name: "Template Load",
        resolveId(id: any) {
          if (id === virtualModuleId) {
            return resolvedVirtualModuleId;
          }
        },
        load(id: any) {
          if (id === resolvedVirtualModuleId) {
            // 虚拟模块会被浏览器缓存，更新模版时记得关闭缓存
            const content = fs.readFileSync("src/template.html", "utf-8");
            return {
              code: `export default \`${content}\``,
              map: null,
            };
          }
        },
      };
    })(),
  ],
});
