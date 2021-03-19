<template>
  <div class="container">
    <h1>Canvas 地图</h1>
    <div ref="canvasContainer" class="canvas-container">
      <canvas ref="canvasInstance"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { setupCanvas } from "@/utils/CanvasUtils";

import worldGeoJSON from "@/assets/world-geojson.json";

function drawPoints(ctx, points) {
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.fill();
  // ctx.stroke();
}

const canvasContainer = ref(null);
const canvasInstance = ref(null);

onMounted(() => {
  const { width, height } = canvasContainer.value.getBoundingClientRect();

  // 投影
  function projection([longitude, latitude]) {
    const x = (width * (180 + longitude)) / 360;
    const y = height * (1.0 - (90 + latitude) / 180);
    return [x, y];
  }

  canvasInstance.value.style.width = width + "px";
  canvasInstance.value.style.height = height + "px";

  const ctx = setupCanvas(canvasInstance.value);

  ctx.fillStyle = "#888";
  // ctx.fillStyle = "transparent";
  // ctx.strokeStyle = "#000";

  const features = worldGeoJSON.features;
  features.forEach((item) => {
    const { geometry } = item;
    if (geometry.type === "MultiPolygon") {
      const coordinates = geometry.coordinates;
      if (coordinates) {
        coordinates.forEach((contours) => {
          contours.forEach((path) => {
            const points = path.map(projection);
            drawPoints(ctx, points);
          });
        });
      }
    } else if (geometry.type === "Polygon") {
      const contours = geometry.coordinates;
      contours.forEach((path) => {
        const points = path.map(projection);
        drawPoints(ctx, points);
      });
    }
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
