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
    <div class="input-area">
      <input type="number" ref="priceInput" />
      <button type="button" @click="getInputPrice">확인</button>
    </div>
  </main>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop" @click="close">
      <div class="modal-content" @click.stop>
        <div class="progress-wrap">
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
                :style="{
                  marginLeft: overflowTooltipSize + 'px',
                  '--tailPosition': overflowTailSize + 'px',
                }"
                >{{ price.toLocaleString() }}원</span
              >
            </div>
          </div>
          <p class="max-price">{{ maxPrice }}원</p>
        </div>
        <button @click="close">확인</button>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
const price = ref(0);
const progressArea = ref(null);
const progressAreaWidth = ref(0);
const progressPercent = ref(0);
const overflowTooltipSize = ref(0); // 넘친 툴팁 사이즈
const overflowTailSize = ref(0); // 말꼬리 사이즈
const tooltip = ref(null);
const buttonItems = ref([
  { price: 0 },
  { price: 1000 },
  { price: 5000 },
  { price: 10000 },
  { price: 50000 },
  { price: 90000 },
  { price: 95000 },
  { price: 100000 },
]);
const priceInput = ref(null);

const maxPrice = computed(() => {
  return buttonItems.value.reduce((max, buttonItem) => {
    return buttonItem.price > max ? buttonItem.price : max;
  }, 0);
});
const show = ref(false);

const getPrice = (i) => {
  price.value = buttonItems.value[i].price;
  progressPercent.value = (price.value / maxPrice.value) * 100;
  open();
  nextTick(() => {
    progressBarCheck();
  });
};

const getInputPrice = () => {
  const inputPrice = parseInt(priceInput.value.value);
  if (!isNaN(inputPrice)) {
    if (inputPrice > maxPrice.value) {
      price.value = maxPrice.value;
    } else if (inputPrice < 0) {
      price.value = 0;
    } else {
      price.value = inputPrice;
    }
    progressPercent.value = (price.value / maxPrice.value) * 100;
  }
  open();
  nextTick(() => {
    progressBarCheck();
  });
};

const progressBarCheck = () => {
  progressAreaWidth.value = progressArea.value.clientWidth;
  if (!progressAreaWidth.value) {
    progressAreaWidth.value = progressArea.value.clientWidth;
    if (progressAreaWidth.value === 0) {
      nextTick(() => {
        progressBarCheck();
      });
      return false;
    }
  }
  const tooltipHalfWidth = tooltip.value.clientWidth / 2;
  const tooltipPositionLeft =
    (progressPercent.value / 100) * progressAreaWidth.value;
  // 좌측 넘침 체크
  if (tooltipPositionLeft - tooltipHalfWidth < 0) {
    overflowTooltipSize.value = (tooltipPositionLeft - tooltipHalfWidth) * -1;
    overflowTailSize.value =
      16 + 4 < tooltipPositionLeft
        ? tooltipPositionLeft - tooltipHalfWidth
        : tooltipPositionLeft - tooltipHalfWidth + 16 + 4;
  }
  //우측 넘침 체크
  else if (tooltipPositionLeft + tooltipHalfWidth > progressAreaWidth.value) {
    overflowTooltipSize.value =
      (tooltipPositionLeft + tooltipHalfWidth - progressAreaWidth.value) * -1;
    overflowTailSize.value =
      16 + 4 < progressAreaWidth.value - tooltipPositionLeft
        ? tooltipPositionLeft + tooltipHalfWidth - progressAreaWidth.value
        : tooltipPositionLeft +
          tooltipHalfWidth -
          progressAreaWidth.value -
          16 -
          4;
  } else {
    overflowTooltipSize.value = 0;
    overflowTailSize.value = 0;
  }
};

const close = () => {
  show.value = false;
};
const open = () => {
  show.value = true;
};

const handleResize = () => {
  if (show.value) progressBarCheck;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.contents {
  padding: 20px;
}
.price-btn {
  min-width: 50px;
  margin: 0 5px;
}
.progress-area {
  position: relative;
  margin-top: 60px;
  width: 100%;
  height: 20px;
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
.progress-area .tooltip {
  position: absolute;
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
.progress-area .tooltip::after {
  display: block;
  content: "";
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 8px;
  height: 8px;
  margin-left: var(--tailPosition);
  background: black;
  transform: translateX(-50%) rotate(45deg);
}
.progress-wrap .max-price {
  margin: 10px 0 0;
  text-align: right;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.modal-content {
  position: absolute;
  left: 0;
  bottom: 0;
  background: white;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
}
</style>
