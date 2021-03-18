<template>
  <svg
    class="page-navigation"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path class="arrow" :d="topTrianglePathD" @click.stop="handlePrevClick" />
    <path
      class="arrow"
      :d="bottomTrianglePathD"
      @click.stop="handleNextClick"
    />
  </svg>
</template>

<script>
import { routes } from "../router/index.js";
const paths = routes.map((r) => r.path);

let currentPathIndex = 0;
const getPrevPath = () => {
  if (currentPathIndex === 0) {
    return;
  }

  currentPathIndex--;
  return paths[currentPathIndex];
};

const getNextPath = () => {
  if (currentPathIndex === paths.length - 1) {
    return;
  }

  currentPathIndex++;
  return paths[currentPathIndex];
};
</script>

<script setup>
import { ref, onMounted, onUnmounted, computed, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const width = ref(100);
const height = ref(100);
const padding = ref(8);

const widthHalf = computed(() => {
  return width.value >> 1;
});

const heightHalf = computed(() => {
  return height.value >> 1;
});

const triangleHeight = computed(() => {
  return heightHalf.value - padding.value * 2;
});

const getRealX = (x) => {
  return widthHalf.value + x;
};

const getRealY = (y) => {
  return heightHalf.value - y;
};

const topTrianglePathD = computed(() => {
  return `M ${getRealX(0)} ${getRealY(
    triangleHeight.value + padding.value
  )} L ${getRealX(triangleHeight.value)} ${getRealY(
    padding.value
  )} L ${getRealX(-triangleHeight.value)} ${getRealY(padding.value)} Z`;
});

const bottomTrianglePathD = computed(() => {
  return `M ${getRealX(0)} ${getRealY(
    -triangleHeight.value - padding.value
  )} L ${getRealX(triangleHeight.value)} ${getRealY(
    -padding.value
  )} L ${getRealX(-triangleHeight.value)} ${getRealY(-padding.value)} Z`;
});

const handlePrevClick = () => {
  const path = getPrevPath();

  if (path) {
    router.push(path);
  }
};
const handleNextClick = () => {
  const path = getNextPath();

  if (path) {
    router.push(path);
  }
};
</script>

<style scoped>
.page-navigation {
  position: fixed;
  top: 0;
  right: 0;
}

.arrow {
  fill: #ddd;
  cursor: pointer;
}

.arrow:hover {
  fill: #888;
}
</style>
