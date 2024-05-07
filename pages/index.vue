<script setup>
// 금액 버튼 클릭 시 해당 금액에 맞는 Progress 진행률 및 진행률에 따른 Tooltip의 위치를 설정
// Tooltip 아래에 화살표는 기본 중앙 정렬이나 좌/우측에서는 화살표가 진행률에 맞춰서 이동
// (예: 좌측에 있을 때는 진행률에 따라 좌측으로 화살표가 이동되어야 할 수 있음)
// Tooltip의 화살표는 항상 Tooltip 영역 범위 안에 있어야 하며 좌/우측 최소 6px의 마진이 있어야 함
// Tooltip은 Progress bar의 영역을 벗어날 수 없음

const tooltip = ref(null);
const arrow = ref(null);
const currentbar = ref(null);
const progressbar = ref(null);
const minMargin = 6;
let tooltipLeft = 0;
let arrowLeft = 0;

const prices = reactive([
  { price: 0, isActive: true },
  { price: 1000, isActive: false },
  { price: 5000, isActive: false },
  { price: 10000, isActive: false },
  { price: 50000, isActive: false },
  { price: 90000, isActive: false },
  { price: 95000, isActive: false },
  { price: 100000, isActive: false },
]);
const maxPrice = Math.max(...prices.map(price => price.price));
let activePrice = ref(prices.find(price => price.isActive ? price.isActive : prices[0]).price);

const progressPercentage = computed(() => {
  return `${activePrice.value / maxPrice * 100}%`;
});

const handleTooltipPosition = async () => {
  await nextTick(); // DOM 업데이트가 처리될 때까지 기다림
  
  const progressbarWidth = progressbar.value.clientWidth;
  const progressbarPosLeft = progressbar.value.offsetLeft;
  const currentbarWidth = currentbar.value.clientWidth;
  const tooltipWidth = tooltip.value.clientWidth / 2;
  const tooltipPosLeft = tooltip.value.offsetLeft;
  // 좌측을 넘을 때
  if (progressbarWidth < currentbarWidth + tooltipWidth) {
    tooltipLeft = progressbarWidth - (currentbarWidth + tooltipWidth * 2);
    arrowLeft = minMargin < progressbarWidth - currentbarWidth
    ? currentbarWidth + tooltipWidth - progressbarWidth
    : currentbarWidth + tooltipWidth - progressbarWidth - minMargin;
  // 우측을 넘을 때
  } else if (tooltipPosLeft - progressbarPosLeft <= 0) {
    tooltipLeft = ((tooltipPosLeft + 20) - tooltipWidth);
    arrowLeft = minMargin < tooltipPosLeft
    ? tooltipPosLeft - tooltipWidth
    : tooltipPosLeft - tooltipWidth + minMargin;
  } else {
    tooltipLeft = -tooltipWidth;
    arrowLeft = 0;
  }
  tooltip.value.style.transform = `translateX(${tooltipLeft}px)`;
  arrow.value.style.marginLeft = `${arrowLeft}px`;
}

onMounted(() => {
  handleTooltipPosition();
});

const handleButtonChange = (index) => {
  prices.forEach((button, idx) => {
    button.isActive = idx === index;
  });
  activePrice.value = prices[index].price;
  handleTooltipPosition();
};

</script>

<template>
  <main class="contents">
    <div class="button_container">
      <ul>
        <li v-for="(button, index) in prices" :key="index">
          <button type="button" :class="{ active: button.isActive}" @click="handleButtonChange(index)">{{ button.price.toLocaleString() }}</button>
        </li>
      </ul>
    </div>
    <div class="progress-bar_container">
      <div class="progress-bar" ref="progressbar">
        <div class="current-bar" ref="currentbar" :style="{ '--progress-width': progressPercentage }">
          <span class="tooltip_container" ref="tooltip">
            {{ activePrice.toLocaleString() }}
            <span class="arrow" ref="arrow"></span>
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.contents {
  padding: 20px;
  .button_container {
  ul {
    display: flex;
    gap: 10px;
    list-style: none;
  }
  button {
    padding: 4px 6px;
    color: black;
    border: 1px solid black;
    outline: none;
    border-radius: 10px;
    background-color: white;
    &.active {
      color: white;
      border: none;
      background-color: black;
    }
  }
  & + .progress-bar_container {
    margin-top: 20px;
  }
}
.progress-bar {
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  background-color: #d8d8d8;
  .current-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--progress-width);
    height: 100%;
    border-radius: 10px;
    background-color: #0077ff;
    .tooltip_container {
      position: absolute;
      top: calc(100% + 10px);
      left: 100%;
      padding: 10px 16px;
      color: white;
      border-radius: 4px;
      background-color: black;
      .arrow {
        display: inline-block;
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-top: 3px solid transparent;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 6px solid black;
      }
    }
  }
}
}
</style>
