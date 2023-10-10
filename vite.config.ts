import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; //引入svg需要用到插件
import { viteMockServe } from "vite-plugin-mock"; //mock插件提供方法

export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === "serve", //保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: { "@": path.resolve("./src") },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE, // 获取服务器地址
          changeOrigin: true, // 是否代理跨域
          rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写
        },
      },
    },
  };
});
