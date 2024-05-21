<script setup>
// 1. teleport로 바텀시트를 구현한다. (body 태그가 닫히기 바로 전)
// 2. 바텀시트는 각 금액 버튼 클릭 시 열리며, dim 영역 또는 바텀시트 내 "확인" 버튼 클릭 시 닫힌다.
// 3. 페이지 내 input과 "확인"버튼을 추가하며 input에는 숫자만 입력 가능하다.
//  - 단, 입력하는 금액에는 제한이 없다.
//  - "확인" 버튼 클릭 시에도 바텀시트가 열린다.
// 4. input에 입력된 값이 프로그레스바의 max값을 넘을 경우 percentage는 100%로 처리한다.
// 5. 프로그레스바의 우측 하단에는 max값에 대한 정보를 보여준다. (해당 이미지의 “7일”과 같이)

import { ref, onMounted, onUpdated  } from 'vue';

const bottomSheet = ref(null);
defineEmits(['closeBottomsheet']);
const props = defineProps({
  maxPrice: Number,
  customPriceValue: Number,
  buttonTitle: String,
  isOpenBottomsheet: Boolean,
  activePrice: Number,
  progressPercentage: String,
});

const tooltip = ref(null);
const arrow = ref(null);
const currentbar = ref(null);
const progressbar = ref(null);
const minMargin = 6;
let tooltipLeft = 0;
let arrowLeft = 0;

const handleTooltipPosition = (progressbarWidth) => {
  const currentbarWidth = currentbar.value.clientWidth;
  const tooltipWidth = tooltip.value.clientWidth / 2;
  const arrowWidth = arrow.value.offsetWidth / 2;
  // 좌측을 넘을 때
  if (currentbarWidth < tooltipWidth) {
    tooltipLeft = -currentbarWidth;
    arrowLeft = minMargin < currentbarWidth
    ? currentbarWidth - arrowWidth
    : minMargin;
  }
  // 우측을 넘을 때
  else if (progressbarWidth < currentbarWidth + tooltipWidth) {
    tooltipLeft = progressbarWidth - (currentbarWidth + tooltipWidth * 2);
    arrowLeft = minMargin < progressbarWidth - currentbarWidth
    ? progressbarWidth - currentbarWidth + arrowWidth
    : (tooltipWidth * 2) - (arrowWidth * 2) - minMargin;
  }
  else {
    tooltipLeft = -tooltipWidth;
    arrowLeft = tooltipWidth - arrowWidth;
  }
  tooltip.value.style.transform = `translateX(${tooltipLeft}px)`;
  arrow.value.style.transform = `translateX(${arrowLeft}px)`;
}
onMounted(() => {
  const progressbarWidth = progressbar.value.clientWidth;
  handleTooltipPosition(progressbarWidth);
});
onUpdated(() => {
  const progressbarWidth = progressbar.value.clientWidth;
  handleTooltipPosition(progressbarWidth);
  document.body.appendChild(bottomSheet.value);
});


</script>

<template>
  <teleport to="body">
    <div ref="bottomSheet" class="bottomsheet" :class="{active: isOpenBottomsheet}" @click="$emit('closeBottomsheet')">
      <div class="bottomsheet-container">
        <main class="bottomsheet-body">
          <div class="progress-bar_container">
            <div class="progress-bar" ref="progressbar">
              <div class="current-bar" ref="currentbar" :style="{ '--progress-width': progressPercentage }">
                <span class="tooltip_container" ref="tooltip">
                  {{ activePrice.toLocaleString() }}
                  <span class="arrow" ref="arrow"></span>
                </span>
              </div>
            </div>
            <p class="max-price">{{ maxPrice.toLocaleString() }}원</p>
          </div>
        </main>
        <div class="bottomsheet-foot">
          <button type="button" @click="$emit('closeBottomsheet')">{{ buttonTitle }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>
  
<style scoped lang="scss">
.bottomsheet {
  position: fixed;
  inset: 0;
  pointer-events: none;
  &::before {
    content: '';
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &.active {
    z-index: 10;
    pointer-events: initial;
    &::before {
      display: block;
    }
    .bottomsheet-container {
      bottom: 0;
    }
  }
  &-container {
    position: absolute;
    width: calc(100% - 40px);
    left: 0;
    bottom: -100%;
    padding: 100px 20px 16px;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    transition-delay: 0.3s;
    transition: bottom ease-in-out 0.3s;
  }
  &-body {
    .max-price {
      margin-top: 10px;
      text-align: right;
      font-size: 13px;
      font-weight: 700;
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
          bottom: calc(100% + 10px);
          left: 100%;
          padding: 10px 16px;
          color: white;
          border-radius: 4px;
          background-color: black;
          .arrow {
            display: inline-block;
            position: absolute;
            left: 0;
            top: 100%;
            border-top: 6px solid black;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 3px solid transparent;
          }
        }
      }
    }
  }
  &-foot {
    width: 100%;
    margin-top: 20px;
    button {
      width: 100%;
      padding: 10px 12px;
      color: white;
      outline: none;
      border-radius: 20px;
      background-color: black;
    }
  }
}
</style>
  