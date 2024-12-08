<script setup>
// 1. teleport로 바텀시트를 구현한다. (body 태그가 닫히기 바로 전)
// 2. 바텀시트는 각 금액 버튼 클릭 시 열리며, dim 영역 또는 바텀시트 내 "확인" 버튼 클릭 시 닫힌다.
// 3. 페이지 내 input과 "확인"버튼을 추가하며 input에는 숫자만 입력 가능하다.
//  - 단, 입력하는 금액에는 제한이 없다.
//  - "확인" 버튼 클릭 시에도 바텀시트가 열린다.
// 4. input에 입력된 값이 프로그레스바의 max값을 넘을 경우 percentage는 100%로 처리한다.
// 5. 프로그레스바의 우측 하단에는 max값에 대한 정보를 보여준다. (해당 이미지의 “7일”과 같이)

import { ref, onUpdated  } from 'vue';

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

onUpdated(() => {
  if(props.isOpenBottomsheet) {
    const progressbarWidth = progressbar.value.clientWidth;
    handleTooltipPosition(progressbarWidth);
  }
});

</script>

<template>
  <teleport to="body">
    <aside class="bottomsheet" v-if="isOpenBottomsheet" @click="$emit('closeBottomsheet')">
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
        <footer class="bottomsheet-foot">
          <button type="button" @click="$emit('closeBottomsheet')">{{ buttonTitle }}</button>
        </footer>
      </div>
    </aside>
  </teleport>
</template>
  
<style scoped lang="scss">
.bottomsheet {
  position: fixed;
  inset: 0;
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &-container {
    position: absolute;
    width: calc(100% - 40px);
    left: 0;
    bottom: 0;
    padding: 100px 20px 16px;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    animation-name: toTop;
    animation-duration: 0.3s;
    @keyframes toTop {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(0);
      }
    }
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
  