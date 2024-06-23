<script setup>
import { ref, reactive, onMounted, onUpdated } from "vue";
const horizonRef = ref(null);

const getCalc = (horizon) => {
  const width = horizon?.value.clientWidth;
  const height = horizon?.value.clientHeight;
  console.log(width);

  const horizonPath = `m 0 0 L ${width - 40} 0 L ${width} 40 L ${width} ${height - 40} L ${width - 40} ${height} L 0 ${height} Z`;
  horizon.value.style.background = "orange";
  horizon.value.style.clipPath = `path("${horizonPath}")`;

  return { width, height };
};
onMounted(() => {
  getCalc(horizonRef);
  window.addEventListener("resize", () => {
    nextTick(() => {
      getCalc(horizonRef);
    });
  });
});

onUpdated(() => {
  nextTick(() => {
    getCalc(horizon);
  });
});
</script>

<template>
  <main>
    <div class="ticket-wrap">
      <div ref="horizonRef" class="flex-box left">
        <span>50% 할인</span>
      </div>
      <div class="flex-box right">
        <button>다운 완료</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.ticket-wrap {
  padding: 10px;
  width: 100%;
  height: 300px;
  display: flex;
  filter: drop-shadow(-1px 8px 12px rgba(50, 50, 0, 0.5));
}
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.left {
  flex: 1;
  position: relative;
}
.left:after {
  content: "";
  width: 1px;
  height: 100%;
  border-right: 1px dotted blue;
  position: absolute;
  right: 0;
}
.right {
  background: red;
  width: 80px;
  clip-path: path("m 40 0 L 0 40 L 0 240 L 60 300 L 80 300 L 80 0 Z");
}
</style>
