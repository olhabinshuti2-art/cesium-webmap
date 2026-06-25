import { defineConfig } from "vite";
import cesium from "vite-plugin-cesium";

export default defineConfig({
  base: "/cesium-webmap/",
  plugins: [cesium()],
});