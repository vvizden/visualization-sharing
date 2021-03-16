<script lang="ts">
import { PropType, defineComponent, onMounted, ref, toRefs } from "vue";
import { select } from "d3-selection";

export default defineComponent({
  props: {
    data: {
      required: true,
      type: Array as PropType<number[]>,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const barContainer = ref(null);

    onMounted(() => {
      select(barContainer.value)
        .selectAll("div")
        .data(data.value)
        .enter()
        .append("div")
        .attr("class", "bar-item")
        .style("height", (d) => `${d}px`);
    });

    return { data, barContainer };
  },
});
</script>

<template>
  <div class="bar-container" ref="barContainer"></div>
</template>

<style scoped>
.bar-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
.bar-container:deep(.bar-item) {
  width: 50px;
  background-color: royalblue;
  margin-left: 8px;
}
</style>
