// vite.config.ts
import path from "path";
import { defineConfig } from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+vite@4.2.1_6yunucjcl4g6chxuif73yri7xi/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.1.0_vite@4.2.1+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Icons from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.15.3/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.15.3/node_modules/unplugin-icons/dist/resolver.mjs";
import AutoImport from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.15.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Inspect from "file:///D:/coding/qianduan/%E9%A1%B9%E7%9B%AE/blog/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-inspect@0.7.18_vite@4.2.1/node_modules/vite-plugin-inspect/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\coding\\qianduan\\\u9879\u76EE\\blog";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": pathSrc
    }
  },
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon"
        })
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts")
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, "components.d.ts")
    }),
    Icons({
      autoInstall: true
    }),
    Inspect()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RpbmdcXFxccWlhbmR1YW5cXFxcXHU5ODc5XHU3NkVFXFxcXGJsb2dcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGluZ1xcXFxxaWFuZHVhblxcXFxcdTk4NzlcdTc2RUVcXFxcYmxvZ1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kaW5nL3FpYW5kdWFuLyVFOSVBMSVCOSVFNyU5QiVBRS9ibG9nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0J1xuY29uc3QgcGF0aFNyYyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoU3JjLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIC8vIEF1dG8gaW1wb3J0IGZ1bmN0aW9ucyBmcm9tIFZ1ZSwgZS5nLiByZWYsIHJlYWN0aXZlLCB0b1JlZi4uLlxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IFZ1ZSBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFyZWYsIHJlYWN0aXZlLCB0b1JlZiBcdTdCNDlcbiAgICAgIGltcG9ydHM6IFsndnVlJ10sXG5cbiAgICAgIC8vIEF1dG8gaW1wb3J0IGZ1bmN0aW9ucyBmcm9tIEVsZW1lbnQgUGx1cywgZS5nLiBFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAod2l0aCBzdHlsZSlcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKFx1NUUyNlx1NjgzN1x1NUYwRilcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG5cbiAgICAgICAgLy8gQXV0byBpbXBvcnQgaWNvbiBjb21wb25lbnRzXG4gICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcbiAgICAgICAgICBwcmVmaXg6ICdJY29uJyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuXG4gICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCAnYXV0by1pbXBvcnRzLmQudHMnKSxcbiAgICB9KSxcblxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIC8vIEF1dG8gcmVnaXN0ZXIgaWNvbiBjb21wb25lbnRzXG4gICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgICBJY29uc1Jlc29sdmVyKHtcbiAgICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSxcbiAgICAgICAgfSksXG4gICAgICAgIC8vIEF1dG8gcmVnaXN0ZXIgRWxlbWVudCBQbHVzIGNvbXBvbmVudHNcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgXSxcblxuICAgICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aFNyYywgJ2NvbXBvbmVudHMuZC50cycpLFxuICAgIH0pLFxuXG4gICAgSWNvbnMoe1xuICAgICAgYXV0b0luc3RhbGw6IHRydWUsXG4gICAgfSksXG5cbiAgICBJbnNwZWN0KCksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUixPQUFPLFVBQVU7QUFDM1MsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGFBQWE7QUFScEIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBRTdDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBO0FBQUE7QUFBQSxNQUdULFNBQVMsQ0FBQyxLQUFLO0FBQUE7QUFBQTtBQUFBLE1BSWYsV0FBVztBQUFBLFFBQ1Qsb0JBQW9CO0FBQUE7QUFBQTtBQUFBLFFBSXBCLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFFQSxLQUFLLEtBQUssUUFBUSxTQUFTLG1CQUFtQjtBQUFBLElBQ2hELENBQUM7QUFBQSxJQUVELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQTtBQUFBO0FBQUEsUUFHVCxjQUFjO0FBQUEsVUFDWixvQkFBb0IsQ0FBQyxJQUFJO0FBQUEsUUFDM0IsQ0FBQztBQUFBO0FBQUE7QUFBQSxRQUdELG9CQUFvQjtBQUFBLE1BQ3RCO0FBQUEsTUFFQSxLQUFLLEtBQUssUUFBUSxTQUFTLGlCQUFpQjtBQUFBLElBQzlDLENBQUM7QUFBQSxJQUVELE1BQU07QUFBQSxNQUNKLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUVELFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
