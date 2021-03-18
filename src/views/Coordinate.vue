<template>
  <div class="container">
    <h1>SVG和Canvas坐标系</h1>
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
        坐标系
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
  </div>
</template>

<script>
export default {};
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
