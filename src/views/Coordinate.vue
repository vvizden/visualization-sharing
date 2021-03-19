<template>
  <div class="container">
    <h1>SVG和Canvas坐标系</h1>
    <div class="g-container">
      <svg
        class="page-navigation"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="marker"
            markerWidth="4"
            markerHeight="4"
            refX="8"
            refY="4"
            viewBox="0 0 8 8"
            orient="auto-start-reverse"
            fill="#869ad7"
          >
            <path d="M 0 0 L 8 4 L 0 8 Z"></path>
          </marker>
        </defs>
        <path
          d="M 16 16 L 400 16 L 400 400 L 16 400 Z"
          stroke-linecap="round"
          stroke-width="2"
          fill="#e3e3e3"
        />
        <g>
          <path
            d="M 16 16 L 16 380"
            stroke="#869ad7"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            marker-end="url(#marker)"
          />
          <text
            x="16"
            y="390"
            font-family="Helvetica"
            font-size="14"
            font-weight="bold"
            fill="#000000"
            text-anchor="middle"
            dominant-baseline="central"
          >
            Y
          </text>
        </g>
        <g>
          <path
            d="M 16 16 L 380 16"
            stroke="#869ad7"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            marker-end="url(#marker)"
          />
          <text
            x="390"
            y="16"
            font-family="Helvetica"
            font-size="14"
            font-weight="bold"
            fill="#000000"
            text-anchor="middle"
            dominant-baseline="central"
          >
            X
          </text>
        </g>
        <circle r="4" cx="16" cy="16" fill="#fb5253"></circle>
        <text
          x="200"
          y="200"
          font-family="Helvetica"
          font-size="18"
          font-weight="bold"
          fill="#fb5253"
          text-anchor="middle"
          dominant-baseline="central"
        >
          SVG
        </text>
        <text
          x="20"
          y="24"
          font-family="Helvetica"
          font-size="14"
          fill="#fb5253"
          dominant-baseline="central"
        >
          (0, 0)
        </text>
      </svg>
      <canvas ref="canvasInstance"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { setupCanvas } from "@/utils/CanvasUtils";

const canvasInstance = ref(null);

onMounted(() => {
  const width = 400;
  const height = 400;

  canvasInstance.value.style.width = width + "px";
  canvasInstance.value.style.height = height + "px";

  const ctx = setupCanvas(canvasInstance.value);

  ctx.save();

  // 画背景
  ctx.fillStyle = "#e3e3e3";
  ctx.fillRect(16, 16, width, height);

  // 画X轴
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = "#869ad7";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(16, 16);
  ctx.lineTo(380, 16);
  ctx.stroke();

  ctx.restore();
  ctx.save();

  // 画marker
  ctx.fillStyle = "#869ad7";
  ctx.beginPath();
  ctx.moveTo(380, 16);
  ctx.lineTo(372, 20);
  ctx.lineTo(372, 12);
  ctx.fill();
  // 文字
  ctx.font = "bold 14px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";
  ctx.fillText("X", 390, 16);

  // 画Y轴
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = "#869ad7";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(16, 16);
  ctx.lineTo(16, 380);
  ctx.stroke();

  ctx.restore();
  ctx.save();

  // 画marker
  ctx.fillStyle = "#869ad7";
  ctx.beginPath();
  ctx.moveTo(16, 380);
  ctx.lineTo(20, 372);
  ctx.lineTo(12, 372);
  ctx.fill();
  // 文字
  ctx.font = "bold 14px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";
  ctx.fillText("Y", 16, 390);

  ctx.restore();
  ctx.save();

  // 画圆点
  ctx.beginPath();
  ctx.arc(16, 16, 4, 0, Math.PI * 2, true);
  ctx.fillStyle = "#fb5253";
  ctx.fill();
  // 画（0，0）
  ctx.font = "14px Helvetica";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fb5253";
  ctx.fillText("(0, 0)", 20, 24);

  ctx.restore();
  ctx.save();

  // 文字 canvas
  ctx.font = "bold 18px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fb5253";
  ctx.fillText("Canvas", 200, 200);
});
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.g-container {
  display: flex;
  align-items: center;
}
</style>
