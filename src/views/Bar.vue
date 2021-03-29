<template>
  <div class="container">
    <h1>HTML + CSS + D3.js</h1>
    <div ref="d3Container" class="chart"></div>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted, ref } from "vue";

const d3Container = ref(null);

const data = [
  {
    x: "一月",
    y: 60,
  },
  {
    x: "二月",
    y: 80,
  },
  {
    x: "三月",
    y: 30,
  },
  {
    x: "四月",
    y: 20,
  },
  {
    x: "五月",
    y: 40,
  },
  {
    x: "六月",
    y: 70,
  },
];

const chartWidth = 400;
const chartHeight = 400;

onMounted(() => {
  let xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.x))
    .range([0, chartWidth])
    .paddingInner(0.3)
    .paddingOuter(0.4)
    .round(true);

  const bandwidth = xScale.bandwidth();
  const step = xScale.step();

  const interval = step - bandwidth;

  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((e) => e.y))])
    .range([0, chartHeight]);

  d3.select(d3Container.value)
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "bar-item")
    .style("margin-right", () => `${interval}px`)
    .style("width", () => `${bandwidth}px`)
    .style("height", (d) => `${yScale(d.y)}px`);
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

.chart {
  width: 400px;
  height: 400px;
}

.chart::v-deep(.bar-item) {
  display: inline-block;
  background-color: #3e82f7;
}
</style>
