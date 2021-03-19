<template>
  <div class="container">
    <h1>SVG + D3.js 地图</h1>
    <div ref="svgContainer" class="svg-container"></div>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted, ref } from "vue";

import worldGeoJSON from "@/assets/world-geojson.json";

const svgContainer = ref(null);

onMounted(() => {
  const { width, height } = svgContainer.value.getBoundingClientRect();

  const svg = d3
    .select(svgContainer.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

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

  // 地理路径生成器
  const path = d3.geoPath().projection(projection);

  // 绘制世界地图
  const worldBase = svg
    .selectAll("path")
    .data(worldGeoJSON.features.filter((d, i) => i !== 21))
    .join("path")
    .attr("d", (d) => path(d))
    .attr("fill", "#888");
  // .attr("fill", "transparent")
  // .attr("stroke", "#000");

  // // 着色
  // let level = [
  //   "1-9人",
  //   "10-99人",
  //   "100-499人",
  //   "500-999人",
  //   "1000-9999人",
  //   "10000人及以上",
  // ];
  // // 颜色比例尺
  // const red = d3.scaleOrdinal(d3.schemeReds[6]).domain(level);
  // worldBase.style("fill", (d) => {
  //   const name = d.properties.name;
  //   const countryJSON = countriesData.dailyReports[0].countries.filter(
  //     (item) => item.country === name
  //   );
  //   const count = countryJSON.length > 0 ? countryJSON[0].confirmed : 0;
  //   let levelIndex =
  //     count < 10
  //       ? 0
  //       : count < 100
  //       ? 1
  //       : count < 500
  //       ? 2
  //       : count < 1000
  //       ? 3
  //       : count < 10000
  //       ? 4
  //       : 5;
  //   return red(level[levelIndex]);
  // });
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

.svg-container {
  width: 100%;
  flex: 1;
}
</style>
