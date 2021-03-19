<template>
  <div class="container">
    <h1>Canvas + D3.js 地图</h1>
    <div ref="canvasContainer" class="canvas-container">
      <canvas ref="canvasInstance"></canvas>
    </div>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import { setupCanvas } from "@/utils/CanvasUtils";

import worldGeoJSON from "@/assets/world-geojson.json";

const canvasContainer = ref(null);
const canvasInstance = ref(null);

onMounted(() => {
  const { width, height } = canvasContainer.value.getBoundingClientRect();

  canvasInstance.value.style.width = width + "px";
  canvasInstance.value.style.height = height + "px";

  // 地图投影-墨卡托投影
  const projection = d3.geoMercator();
  //坐标映射
  projection.fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    worldGeoJSON
  );

  // 配置绘制环境
  const ctx = setupCanvas(canvasInstance.value);
  ctx.fillStyle = "#888";
  // ctx.fillStyle = "transparent";
  // ctx.strokeStyle = "#000";

  // 地理路径生成器
  const path = d3.geoPath().projection(projection).context(ctx);

  // 绘制世界地图
  worldGeoJSON.features
    .filter((d, i) => i !== 21)
    .forEach((d) => {
      ctx.beginPath();
      path(d);
      ctx.fill();
      // ctx.stroke();
    });
});
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.canvas-container {
  width: 100%;
  flex: 1;
}
</style>
