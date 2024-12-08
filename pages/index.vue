<template>
  <main class="contents">
    <div class="button-area">
      <button
        type="button"
        class="price-btn"
        ref="priceBtn"
        @click="getPrice(i)"
        v-for="(buttonItem, i) in buttonItems"
        :key="i"
      >
        {{ buttonItem.price.toLocaleString() }}원
      </button>
    </div>
    <div class="progress-area" ref="progressArea">
      <div
        class="progress-bar"
        ref="progressBar"
        :style="{
          width: `${progressPercent}%`,
        }"
      >
        <span
          class="tooltip"
          ref="tooltip"
          :class="{
            maxLeft: isTooltipPosition === -1,
            maxRight: isTooltipPosition === 1,
          }"
          >{{ price.toLocaleString() }}원</span
        >
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";

const price = ref(0);
const progressArea = ref(null);
const progressPercent = ref(0);
const maxPrice = 100000;
const tooltip = ref(null);
const progressBar = ref(null);
const isTooltipPosition = ref(-1);
let buttonItems = ref([
  { price: 0 },
  { price: 1000 },
  { price: 5000 },
  { price: 10000 },
  { price: 50000 },
  { price: 90000 },
  { price: 95000 },
  { price: 100000 },
]);

function getPrice(i) {
  price.value = buttonItems.value[i].price;
  progressPercent.value = (price.value / maxPrice) * 100;
  //console.log(price.value, progressPercent.value);
  isTooltipPosition.value = 0;
  nextTick(() => {
    setTooltipPosition();
  });
}
function setTooltipPosition() {
  if (tooltip.value) {
    const tooltipRect = tooltip.value.getBoundingClientRect();
    const progressAreaRect = progressArea.value.getBoundingClientRect();
    if (
      tooltipRect.left < progressAreaRect.left ||
      tooltipRect.left - progressAreaRect.left <= 1
    ) {
      isTooltipPosition.value = -1;
    } else if (
      tooltipRect.right > progressAreaRect.right ||
      tooltipRect.right - progressAreaRect.right >= -1
    ) {
      isTooltipPosition.value = 1;
    } else {
      isTooltipPosition.value = 0;
    }
  }
}
</script>

<style scoped>
.contents {
  padding: 20px;
}
.price-btn {
  min-width: 60px;
  margin: 0 5px;
}
.progress-area {
  position: relative;
  margin-top: 60px;
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
}
.progress-area .progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: black;
}
.tooltip {
  position: absolute;
  min-width: 70px;
  padding: 6px 16px;
  left: 100%;
  transform: translateX(-50%);
  bottom: calc(100% + 10px);
  border-radius: 3px;
  background: black;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
}
.tooltip::after {
  display: block;
  content: "";
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  background: black;
  transform: rotate(45deg);
}
.tooltip.maxLeft {
  left: 0;
  transform: translateX(0);
}
.tooltip.maxLeft::after {
  left: 2px;
  margin-left: 16px;
}
.tooltip.maxRight {
  left: auto;
  right: 0;
  transform: translateX(0);
}
.tooltip.maxRight::after {
  left: calc(100% - 10px);
  margin-left: -16px;
}
</style>
