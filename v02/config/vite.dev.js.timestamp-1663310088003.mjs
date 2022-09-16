// config/vite.dev.js
import {
  defineConfig
} from "vite";
import PATH from "node:path";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// config/pluginSSRBuiltUrl.js
var pluginSSRBuiltUrl = (base) => {
  const queryRE = /\?.*$/s;
  const hashRE = /#.*$/s;
  const cleanUrl = (url) => url.replace(hashRE, "").replace(queryRE, "");
  const virtualId = "\0virtual:ssr-vue-built-url";
  let config;
  return {
    name: "built-url",
    enforce: "post",
    configResolved(_config) {
      config = _config;
    },
    resolveId(id) {
      if (id === virtualId) {
        return id;
      }
    },
    load(id) {
      if (id === virtualId) {
        return {
          code: `export const __ssr_vue_processAssetPath = (url) => '${base}' + url`,
          moduleSideEffects: "no-treeshake"
        };
      }
    },
    transform(code, id) {
      const cleanId = cleanUrl(id);
      if (config.build.ssr && (cleanId.endsWith(".js") || cleanId.endsWith(".vue")) && !code.includes("__ssr_vue_processAssetPath")) {
        return {
          code: `import { __ssr_vue_processAssetPath } from '${virtualId}';__ssr_vue_processAssetPath;` + code,
          sourcemap: null
        };
      }
    }
  };
};
var experimentalBuiltUrl = () => {
  return {
    renderBuiltUrl(filename, {
      hostType,
      type,
      ssr
    }) {
      if (ssr && type === "asset" && hostType === "js") {
        return {
          runtime: `__ssr_vue_processAssetPath(${JSON.stringify(filename)})`
        };
      }
    }
  };
};

// config/pluginVirtualModule.js
var pluginVirtualModule = () => {
  const virtualFile = "@virtual-file";
  const virtualId = "\0" + virtualFile;
  const nestedVirtualFile = "@nested-virtual-file";
  const nestedVirtualId = "\0" + nestedVirtualFile;
  return {
    name: "virtual-module",
    resolveId(id) {
      if (id === virtualFile) {
        return virtualId;
      } else if (id === nestedVirtualFile) {
        return nestedVirtualId;
      }
    },
    load(id) {
      if (id === virtualId) {
        return `export { msg } from "@nested-virtual-file";`;
      } else if (id === nestedVirtualId) {
        return `export const msg = "[success] from conventional virtual file"`;
      }
    }
  };
};
var pluginVirtualModule_default = pluginVirtualModule;

// config/pluginVirtualFoo.js
var pluginVirtualFoo = (command, ssrBuild) => {
  return {
    name: "virtual",
    resolveId(id) {
      if (id === "@foo") {
        return id;
      }
    },
    load(id, options) {
      const ssrFromOptions = (options == null ? void 0 : options.ssr) ?? false;
      if (id === "@foo") {
        const v1 = command === "build" && !!ssrBuild !== ssrFromOptions ? `defineConfig ssrBuild !== ssr from load options` : "hi";
        return `export default { msg: '${v1}' }`;
      }
    }
  };
};
var pluginVirtualFoo_default = pluginVirtualFoo;

// config/configBuild.js
var configBuild = (root) => {
  const indexHtmlFile = root + "/server/index.html";
  return {
    minify: false,
    emptyOutDir: true,
    ssrManifest: true,
    assetsDir: "assets__",
    rollupOptions: {
      input: {
        main: indexHtmlFile
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          } else if (/woff|woff2/i.test(extType)) {
            extType = "font";
          }
          return `assets__/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets__/js/[name].js",
        entryFileNames: "[name].js"
      }
    }
  };
};
var configBuild_default = configBuild;

// config/vite.dev.js
var __vite_injected_original_dirname = "C:\\tfs\\SiteCore\\sitecore-v2-nuxt-source\\sc\\test\\v02\\config";
var __vite_injected_original_filename = "C:\\tfs\\SiteCore\\sitecore-v2-nuxt-source\\sc\\test\\v02\\config\\vite.dev.js";
globalThis.__vite_test_filename = __vite_injected_original_filename;
globalThis.__vite_test_dirname = __vite_injected_original_dirname;
var vite_dev_default = defineConfig(async ({
  command,
  mode,
  ssrBuild
}) => {
  const base = "/test/";
  const root = process.cwd();
  let __pathRuntimeCom = root + "/iot-runtime/src/templates/";
  console.log("\nROOT = ", root);
  console.log(`RUNTIME = ${__pathRuntimeCom}`);
  return {
    base,
    resolve: {
      alias: {
        "^runtimecom": __pathRuntimeCom
      }
    },
    plugins: [
      vuePlugin(),
      vueJsx(),
      pluginVirtualFoo_default(command, ssrBuild),
      pluginVirtualModule_default(),
      pluginSSRBuiltUrl(base)
    ],
    experimental: experimentalBuiltUrl(),
    build: configBuild_default(root),
    ssr: {
      noExternal: [
        "example-external-component"
      ]
    },
    optimizeDeps: {
      exclude: ["example-external-component"]
    }
  };
});
export {
  vite_dev_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29uZmlnL3ZpdGUuZGV2LmpzIiwgImNvbmZpZy9wbHVnaW5TU1JCdWlsdFVybC5qcyIsICJjb25maWcvcGx1Z2luVmlydHVhbE1vZHVsZS5qcyIsICJjb25maWcvcGx1Z2luVmlydHVhbEZvby5qcyIsICJjb25maWcvY29uZmlnQnVpbGQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXFxcXHZpdGUuZGV2LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi90ZnMvU2l0ZUNvcmUvc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2Uvc2MvdGVzdC92MDIvY29uZmlnL3ZpdGUuZGV2LmpzXCI7aW1wb3J0IHtcclxuICBkZWZpbmVDb25maWdcclxufSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgUEFUSCBmcm9tICdub2RlOnBhdGgnXHJcblxyXG5pbXBvcnQgdnVlUGx1Z2luIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5cclxuaW1wb3J0IHtcclxuICBwbHVnaW5TU1JCdWlsdFVybCxcclxuICBleHBlcmltZW50YWxCdWlsdFVybFxyXG59IGZyb20gJy4vcGx1Z2luU1NSQnVpbHRVcmwnXHJcbmltcG9ydCBwbHVnaW5WaXJ0dWFsTW9kdWxlIGZyb20gJy4vcGx1Z2luVmlydHVhbE1vZHVsZSdcclxuaW1wb3J0IHBsdWdpblZpcnR1YWxGb28gZnJvbSAnLi9wbHVnaW5WaXJ0dWFsRm9vJ1xyXG5pbXBvcnQgY29uZmlnQnVpbGQgZnJvbSAnLi9jb25maWdCdWlsZCdcclxuXHJcblxyXG4vLyBwcmVzZXJ2ZSB0aGlzIHRvIHRlc3QgbG9hZGluZyBfX2ZpbGVuYW1lICYgX19kaXJuYW1lIGluIEVTTSBhcyBWaXRlIHBvbHlmaWxscyB0aGVtLlxyXG4vLyBpZiBWaXRlIGluY29ycmVjdGx5IGxvYWQgdGhpcyBmaWxlLCBub2RlLmpzIHdvdWxkIGVycm9yIG91dC5cclxuZ2xvYmFsVGhpcy5fX3ZpdGVfdGVzdF9maWxlbmFtZSA9IF9fZmlsZW5hbWVcclxuZ2xvYmFsVGhpcy5fX3ZpdGVfdGVzdF9kaXJuYW1lID0gX19kaXJuYW1lXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKHtcclxuICBjb21tYW5kLFxyXG4gIG1vZGUsXHJcbiAgc3NyQnVpbGRcclxufSkgPT4ge1xyXG4gIC8vY29uc3QgZGF0YSA9IGF3YWl0IGFzeW5jRnVuY3Rpb24oKVxyXG5cclxuICBjb25zdCBiYXNlID0gJy90ZXN0LydcclxuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKVxyXG4gIGxldCBfX3BhdGhSdW50aW1lQ29tID0gcm9vdCArICcvaW90LXJ1bnRpbWUvc3JjL3RlbXBsYXRlcy8nO1xyXG4gIGNvbnNvbGUubG9nKCdcXG5ST09UID0gJywgcm9vdCk7XHJcbiAgY29uc29sZS5sb2coYFJVTlRJTUUgPSAke19fcGF0aFJ1bnRpbWVDb219YCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdecnVudGltZWNvbSc6IF9fcGF0aFJ1bnRpbWVDb21cclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZVBsdWdpbigpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgcGx1Z2luVmlydHVhbEZvbyhjb21tYW5kLCBzc3JCdWlsZCksXHJcbiAgICAgIHBsdWdpblZpcnR1YWxNb2R1bGUoKSxcclxuICAgICAgcGx1Z2luU1NSQnVpbHRVcmwoYmFzZSksXHJcbiAgICBdLFxyXG4gICAgZXhwZXJpbWVudGFsOiBleHBlcmltZW50YWxCdWlsdFVybCgpLFxyXG4gICAgYnVpbGQ6IGNvbmZpZ0J1aWxkKHJvb3QpLFxyXG4gICAgc3NyOiB7XHJcbiAgICAgIG5vRXh0ZXJuYWw6IFtcclxuICAgICAgICAvLyB0aGlzIHBhY2thZ2UgaGFzIHVuY29tcGlsZWQgLnZ1ZSBmaWxlc1xyXG4gICAgICAgICdleGFtcGxlLWV4dGVybmFsLWNvbXBvbmVudCdcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBleGNsdWRlOiBbJ2V4YW1wbGUtZXh0ZXJuYWwtY29tcG9uZW50J11cclxuICAgIH1cclxuICB9O1xyXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXFxcXHBsdWdpblNTUkJ1aWx0VXJsLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi90ZnMvU2l0ZUNvcmUvc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2Uvc2MvdGVzdC92MDIvY29uZmlnL3BsdWdpblNTUkJ1aWx0VXJsLmpzXCI7Ly8gRXhhbXBsZSBvZiBhIHBsdWdpbiB0aGF0IGluamVjdHMgYSBoZWxwZXIgZnJvbSBhIHZpcnR1YWwgbW9kdWxlIHRoYXQgY2FuXG4vLyBiZSB1c2VkIGluIHJlbmRlckJ1aWx0VXJsXG5cbmNvbnN0IHBsdWdpblNTUkJ1aWx0VXJsID0gKGJhc2UpID0+IHtcblx0Y29uc3QgcXVlcnlSRSA9IC9cXD8uKiQvc1xuXHRjb25zdCBoYXNoUkUgPSAvIy4qJC9zXG5cdGNvbnN0IGNsZWFuVXJsID0gKHVybCkgPT4gdXJsLnJlcGxhY2UoaGFzaFJFLCAnJykucmVwbGFjZShxdWVyeVJFLCAnJylcblx0Y29uc3QgdmlydHVhbElkID0gJ1xcMHZpcnR1YWw6c3NyLXZ1ZS1idWlsdC11cmwnXG5cdGxldCBjb25maWdcblxuXHRyZXR1cm4ge1xuXHRcdG5hbWU6ICdidWlsdC11cmwnLFxuXHRcdGVuZm9yY2U6ICdwb3N0Jyxcblx0XHRjb25maWdSZXNvbHZlZChfY29uZmlnKSB7XG5cdFx0XHRjb25maWcgPSBfY29uZmlnXG5cdFx0fSxcblx0XHRyZXNvbHZlSWQoaWQpIHtcblx0XHRcdGlmIChpZCA9PT0gdmlydHVhbElkKSB7XG5cdFx0XHRcdHJldHVybiBpZFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bG9hZChpZCkge1xuXHRcdFx0aWYgKGlkID09PSB2aXJ0dWFsSWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb2RlOiBgZXhwb3J0IGNvbnN0IF9fc3NyX3Z1ZV9wcm9jZXNzQXNzZXRQYXRoID0gKHVybCkgPT4gJyR7YmFzZX0nICsgdXJsYCxcblx0XHRcdFx0XHRtb2R1bGVTaWRlRWZmZWN0czogJ25vLXRyZWVzaGFrZSdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dHJhbnNmb3JtKGNvZGUsIGlkKSB7XG5cdFx0XHRjb25zdCBjbGVhbklkID0gY2xlYW5VcmwoaWQpXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGNvbmZpZy5idWlsZC5zc3IgJiZcblx0XHRcdFx0KGNsZWFuSWQuZW5kc1dpdGgoJy5qcycpIHx8IGNsZWFuSWQuZW5kc1dpdGgoJy52dWUnKSkgJiZcblx0XHRcdFx0IWNvZGUuaW5jbHVkZXMoJ19fc3NyX3Z1ZV9wcm9jZXNzQXNzZXRQYXRoJylcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvZGU6IGBpbXBvcnQgeyBfX3Nzcl92dWVfcHJvY2Vzc0Fzc2V0UGF0aCB9IGZyb20gJyR7dmlydHVhbElkfSc7X19zc3JfdnVlX3Byb2Nlc3NBc3NldFBhdGg7YCArXG5cdFx0XHRcdFx0XHRjb2RlLFxuXHRcdFx0XHRcdHNvdXJjZW1hcDogbnVsbCAvLyBubyBzb3VyY2VtYXAgc3VwcG9ydCB0byBzcGVlZCB1cCBDSVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGV4cGVyaW1lbnRhbEJ1aWx0VXJsID0gKCkgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdHJlbmRlckJ1aWx0VXJsKGZpbGVuYW1lLCB7XG5cdFx0XHRob3N0VHlwZSxcblx0XHRcdHR5cGUsXG5cdFx0XHRzc3Jcblx0XHR9KSB7XG5cdFx0XHRpZiAoc3NyICYmIHR5cGUgPT09ICdhc3NldCcgJiYgaG9zdFR5cGUgPT09ICdqcycpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRydW50aW1lOiBgX19zc3JfdnVlX3Byb2Nlc3NBc3NldFBhdGgoJHtKU09OLnN0cmluZ2lmeShmaWxlbmFtZSl9KWBcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IHtcblx0cGx1Z2luU1NSQnVpbHRVcmwsXG5cdGV4cGVyaW1lbnRhbEJ1aWx0VXJsLFxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXFxcXHBsdWdpblZpcnR1YWxNb2R1bGUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Rmcy9TaXRlQ29yZS9zaXRlY29yZS12Mi1udXh0LXNvdXJjZS9zYy90ZXN0L3YwMi9jb25maWcvcGx1Z2luVmlydHVhbE1vZHVsZS5qc1wiO1xuY29uc3QgcGx1Z2luVmlydHVhbE1vZHVsZSA9ICgpID0+IHtcblx0Y29uc3QgdmlydHVhbEZpbGUgPSAnQHZpcnR1YWwtZmlsZSdcblx0Y29uc3QgdmlydHVhbElkID0gJ1xcMCcgKyB2aXJ0dWFsRmlsZVxuXHRcblx0Y29uc3QgbmVzdGVkVmlydHVhbEZpbGUgPSAnQG5lc3RlZC12aXJ0dWFsLWZpbGUnXG5cdGNvbnN0IG5lc3RlZFZpcnR1YWxJZCA9ICdcXDAnICsgbmVzdGVkVmlydHVhbEZpbGVcblx0XG5cdHJldHVybiB7XG5cdFx0bmFtZTogJ3ZpcnR1YWwtbW9kdWxlJyxcblx0XHRyZXNvbHZlSWQoaWQpIHtcblx0XHRcdGlmIChpZCA9PT0gdmlydHVhbEZpbGUpIHtcblx0XHRcdFx0cmV0dXJuIHZpcnR1YWxJZFxuXHRcdFx0fSBlbHNlIGlmIChpZCA9PT0gbmVzdGVkVmlydHVhbEZpbGUpIHtcblx0XHRcdFx0cmV0dXJuIG5lc3RlZFZpcnR1YWxJZFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bG9hZChpZCkge1xuXHRcdFx0aWYgKGlkID09PSB2aXJ0dWFsSWQpIHtcblx0XHRcdFx0cmV0dXJuIGBleHBvcnQgeyBtc2cgfSBmcm9tIFwiQG5lc3RlZC12aXJ0dWFsLWZpbGVcIjtgXG5cdFx0XHR9IGVsc2UgaWYgKGlkID09PSBuZXN0ZWRWaXJ0dWFsSWQpIHtcblx0XHRcdFx0cmV0dXJuIGBleHBvcnQgY29uc3QgbXNnID0gXCJbc3VjY2Vzc10gZnJvbSBjb252ZW50aW9uYWwgdmlydHVhbCBmaWxlXCJgXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBwbHVnaW5WaXJ0dWFsTW9kdWxlO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx0ZnNcXFxcU2l0ZUNvcmVcXFxcc2l0ZWNvcmUtdjItbnV4dC1zb3VyY2VcXFxcc2NcXFxcdGVzdFxcXFx2MDJcXFxcY29uZmlnXFxcXHBsdWdpblZpcnR1YWxGb28uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Rmcy9TaXRlQ29yZS9zaXRlY29yZS12Mi1udXh0LXNvdXJjZS9zYy90ZXN0L3YwMi9jb25maWcvcGx1Z2luVmlydHVhbEZvby5qc1wiO2NvbnN0IHBsdWdpblZpcnR1YWxGb28gPSAoY29tbWFuZCwgc3NyQnVpbGQpID0+IHtcblxuXHRyZXR1cm4ge1xuXHRcdG5hbWU6ICd2aXJ0dWFsJyxcblx0XHRyZXNvbHZlSWQoaWQpIHtcblx0XHRcdGlmIChpZCA9PT0gJ0Bmb28nKSB7XG5cdFx0XHRcdHJldHVybiBpZFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bG9hZChpZCwgb3B0aW9ucykge1xuXHRcdFx0Y29uc3Qgc3NyRnJvbU9wdGlvbnMgPSBvcHRpb25zPy5zc3IgPz8gZmFsc2Vcblx0XHRcdGlmIChpZCA9PT0gJ0Bmb28nKSB7XG5cdFx0XHRcdC8vIEZvcmNlIGEgbWlzbWF0Y2ggZXJyb3IgaWYgc3NyQnVpbGQgaXMgZGlmZmVyZW50IGZyb20gc3NyRnJvbU9wdGlvbnNcblx0XHRcdFx0Y29uc3QgdjEgPSAoY29tbWFuZCA9PT0gJ2J1aWxkJyAmJiAhIXNzckJ1aWxkICE9PSBzc3JGcm9tT3B0aW9ucykgP1xuXHRcdFx0XHRcdGBkZWZpbmVDb25maWcgc3NyQnVpbGQgIT09IHNzciBmcm9tIGxvYWQgb3B0aW9uc2AgOiAnaGknXG5cdFx0XHRcdHJldHVybiBgZXhwb3J0IGRlZmF1bHQgeyBtc2c6ICcke3YxfScgfWBcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IHBsdWdpblZpcnR1YWxGb287XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHRmc1xcXFxTaXRlQ29yZVxcXFxzaXRlY29yZS12Mi1udXh0LXNvdXJjZVxcXFxzY1xcXFx0ZXN0XFxcXHYwMlxcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHRmc1xcXFxTaXRlQ29yZVxcXFxzaXRlY29yZS12Mi1udXh0LXNvdXJjZVxcXFxzY1xcXFx0ZXN0XFxcXHYwMlxcXFxjb25maWdcXFxcY29uZmlnQnVpbGQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Rmcy9TaXRlQ29yZS9zaXRlY29yZS12Mi1udXh0LXNvdXJjZS9zYy90ZXN0L3YwMi9jb25maWcvY29uZmlnQnVpbGQuanNcIjtjb25zdCBjb25maWdCdWlsZCA9IChyb290KSA9PiB7XHJcblxyXG4gIGNvbnN0IGluZGV4SHRtbEZpbGUgPSByb290ICsgJy9zZXJ2ZXIvaW5kZXguaHRtbCdcclxuICAvL2NvbnNvbGUubG9nKCdCVUlMRC5pbmRleEh0bWxGaWxlID0gJywgaW5kZXhIdG1sRmlsZSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtaW5pZnk6IGZhbHNlLFxyXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgICBzc3JNYW5pZmVzdDogdHJ1ZSxcclxuICAgIC8vb3V0RGlyOiBgLi9idWlsZGAsXHJcbiAgICAvL21hbmlmZXN0OiB0cnVlLFxyXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzX18nLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBpbnB1dDoge1xyXG4gICAgICAgIG1haW46IGluZGV4SHRtbEZpbGUsXHJcbiAgICAgICAgLy9tYWluOiByZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcclxuICAgICAgICAvL25lc3RlZDogcmVzb2x2ZShfX2Rpcm5hbWUsICduZXN0ZWQvaW5kZXguaHRtbCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZXh0VHlwZSA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJykuYXQoMSk7XHJcbiAgICAgICAgICBpZiAoL3BuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljby9pLnRlc3QoZXh0VHlwZSkpIHtcclxuICAgICAgICAgICAgZXh0VHlwZSA9ICdpbWcnO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgvd29mZnx3b2ZmMi9pLnRlc3QoZXh0VHlwZSkpIHtcclxuICAgICAgICAgICAgZXh0VHlwZSA9ICdmb250JztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vcmV0dXJuIGBhc3NldHNfXy8ke2V4dFR5cGV9L1tuYW1lXS1baGFzaF1bZXh0bmFtZV1gO1xyXG4gICAgICAgICAgcmV0dXJuIGBhc3NldHNfXy8ke2V4dFR5cGV9L1tuYW1lXVtleHRuYW1lXWA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2NodW5rRmlsZU5hbWVzOiAnYXNzZXRzX18vanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgLy9lbnRyeUZpbGVOYW1lczogJ2Fzc2V0c19fL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzX18vanMvW25hbWVdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjb25maWdCdWlsZDtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFc7QUFBQSxFQUN4VztBQUFBLE9BQ0s7QUFDUCxPQUFPLFVBQVU7QUFFakIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sWUFBWTs7O0FDSG5CLElBQU0sb0JBQW9CLENBQUMsU0FBUztBQUNuQyxRQUFNLFVBQVU7QUFDaEIsUUFBTSxTQUFTO0FBQ2YsUUFBTSxXQUFXLENBQUMsUUFBUSxJQUFJLFFBQVEsUUFBUSxFQUFFLEVBQUUsUUFBUSxTQUFTLEVBQUU7QUFDckUsUUFBTSxZQUFZO0FBQ2xCLE1BQUk7QUFFSixTQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxlQUFlLFNBQVM7QUFDdkIsZUFBUztBQUFBLElBQ1Y7QUFBQSxJQUNBLFVBQVUsSUFBSTtBQUNiLFVBQUksT0FBTyxXQUFXO0FBQ3JCLGVBQU87QUFBQSxNQUNSO0FBQUEsSUFDRDtBQUFBLElBQ0EsS0FBSyxJQUFJO0FBQ1IsVUFBSSxPQUFPLFdBQVc7QUFDckIsZUFBTztBQUFBLFVBQ04sTUFBTSx1REFBdUQ7QUFBQSxVQUM3RCxtQkFBbUI7QUFBQSxRQUNwQjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxVQUFVLE1BQU0sSUFBSTtBQUNuQixZQUFNLFVBQVUsU0FBUyxFQUFFO0FBQzNCLFVBQ0MsT0FBTyxNQUFNLFFBQ1osUUFBUSxTQUFTLEtBQUssS0FBSyxRQUFRLFNBQVMsTUFBTSxNQUNuRCxDQUFDLEtBQUssU0FBUyw0QkFBNEIsR0FDMUM7QUFDRCxlQUFPO0FBQUEsVUFDTixNQUFNLCtDQUErQywyQ0FDcEQ7QUFBQSxVQUNELFdBQVc7QUFBQSxRQUNaO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0Q7QUFFQSxJQUFNLHVCQUF1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
