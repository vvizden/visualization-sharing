<template>
  <div class="container">
    <h1>大坝水位示意图</h1>
    <h2>SVG + D3.js</h2>
    <div ref="d3Container" class="chart"></div>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted, ref } from "vue";

const d3Container = ref(null);

onMounted(() => {
  // 画布大小
  const width = 800;
  const height = 400;

  // svg
  const svg = d3
    .select(d3Container.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  // 边距
  const svgMargin = {
    top: 30,
    right: 20,
    bottom: 20,
    left: 0,
  };

  // 实测数据
  const WATER_WIDTH = 200;
  const WATER_HEIGHT = 300;
  const DAM_HEIGHT = 400;
  const DAM_INNER_WIDTH = 100;
  const DAM_MIDDLE_WIDTH = 200;
  const DAM_OUTER_WIDTH = 600;

  const damInnerStartX = WATER_WIDTH / 2;
  const damMiddleStartX = damInnerStartX + DAM_INNER_WIDTH;
  const damOuterStartX = damMiddleStartX + DAM_MIDDLE_WIDTH;
  const damOuterEndX = damOuterStartX + DAM_OUTER_WIDTH;

  // 水面积实际数据
  const waterData = [
    { x: 0, y: WATER_HEIGHT },
    { x: WATER_WIDTH, y: WATER_HEIGHT },
  ];

  // 大坝面积实际数据
  const damData = [
    { x: damInnerStartX, y: 0 },
    { x: damMiddleStartX, y: DAM_HEIGHT },
    { x: damOuterStartX, y: DAM_HEIGHT },
    { x: damOuterEndX, y: 0 },
  ];

  // 合并坐标数据
  const waterDamData = waterData.concat(damData);

  // 大坝实际数据与画布像素的比例
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(waterDamData.map((d) => d.x)))
    .rangeRound([svgMargin.left, width - svgMargin.right]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(waterDamData.map((d) => d.y)))
    .rangeRound([height - svgMargin.bottom, svgMargin.top]);

  // 面积
  const area = d3
    .area()
    .x((d) => xScale(d.x))
    .y1((d) => yScale(d.y))
    .y0(() => yScale(0));

  // 画水面积
  svg.append("path").attr("d", area(waterData)).attr("fill", "#2196f3");

  // 画大坝面积
  svg.append("path").attr("d", area(damData)).attr("fill", "#c1c1c1");

  const data = [
    { name: "#1", value: 200 },
    { name: "#2", value: 80 },
    { name: "#3", value: 20 },
  ];
  Object.assign(data, {
    columns: Array(2)[("槽", "水位")],
    format: "%",
    x: "槽",
    y: "水位(m)",
  });

  const margin = {
    top: svgMargin.top,
    right: svgMargin.right,
    bottom: svgMargin.bottom,
    left: xScale(damOuterStartX),
  };

  const color = d3.scaleOrdinal(d3.schemeSet2).domain(data.map((d) => d.name));

  // x axis
  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.8);

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].name)
          .tickSizeOuter(0)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", width - margin.right)
          .attr("y", 14)
          .attr("font-size", "14px")
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(data.x)
      );

  // y axis
  const y = d3
    .scaleLinear()
    .domain(d3.extent(waterDamData.map((d) => d.y)))
    .nice()
    .range([height - margin.bottom, margin.top]);

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call((g) =>
        g
          .append("text")
          .attr("x", 0)
          .attr("y", 14)
          .attr("font-size", "14px")
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(data.y)
      );

  svg
    .append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => y(0) - y(d.value))
    .attr("width", x.bandwidth())
    .attr("fill", (d) => color(d.name));

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);
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
</style>
