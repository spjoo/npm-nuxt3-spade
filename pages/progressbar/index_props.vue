<script setup>
// 금액 버튼 클릭 시 해당 금액에 맞는 Progress 진행률 및 진행률에 따른 Tooltip의 위치를 설정
// Tooltip 아래에 화살표는 기본 중앙 정렬이나 좌/우측에서는 화살표가 진행률에 맞춰서 이동
// (예: 좌측에 있을 때는 진행률에 따라 좌측으로 화살표가 이동되어야 할 수 있음)
// Tooltip의 화살표는 항상 Tooltip 영역 범위 안에 있어야 하며 좌/우측 최소 6px의 마진이 있어야 함
// Tooltip은 Progress bar의 영역을 벗어날 수 없음

import { ref, reactive } from 'vue';
import BottomSheet from '../../components/common/BottomSheetProps.vue';

const isOpenBottomsheet = ref(false);
const showBottomsheet = () => {
  isOpenBottomsheet.value = true;
}
const closeBottomsheet = () => {
  isOpenBottomsheet.value = false;
}

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

const customPriceValue = ref(null);
const maxPrice = Math.max(...prices.map(price => price.price));
let activePrice = ref(prices.find(price => price.isActive ? price.isActive : prices[0]).price);

const progressPercentage = computed(() => {
  if (activePrice.value > maxPrice) {
    return '100%';
  } else {
    return `${activePrice.value / maxPrice * 100}%`;
  };
});

const handleButtonChange = (index) => {
  prices.forEach((button, idx) => {
    button.isActive = idx === index;
  });
  activePrice.value = prices[index].price;
  showBottomsheet();
};

const handleChangecustomPrice = () => {
  if (customPriceValue.value !== null && customPriceValue.value !== '') {
    activePrice.value = customPriceValue.value;
    showBottomsheet();
  } else {
    alert('값을 입력해주세요.');
  }
};
</script>

<template>
  <main class="contents">
    <div class="button_container">
      <ul>
        <li v-for="(button, index) in prices" :key="index">
          <button
            type="button"
            :class="{ active: button.isActive}" 
            @click="handleButtonChange(index)"
          >
            {{ button.price.toLocaleString() }}
          </button>
        </li>
      </ul>
    </div>
    <div class="input-container">
      <label for="customPrice">커스텀 가격</label>
      <input v-model="customPriceValue" id="customPrice" type="number" />
      <button type="button" @click="handleChangecustomPrice">확인</button>
    </div>
  </main>
  <ClientOnly>
    <BottomSheet
    :maxPrice="maxPrice"
    :customPriceValue ="customPriceValue"
    :progressPercentage="progressPercentage"
    :activePrice="activePrice"
    buttonTitle="확인"
    :isOpenBottomsheet="isOpenBottomsheet"
    @closeBottomsheet="closeBottomsheet"
  />
  </ClientOnly>
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
  }
  .input-container {
    margin-top: 20px;
    display: flex;
    align-items: center;
    label {
      font-size: 14px;
      font-weight: 700;
    }
    input {
      margin-left: 10px;
      padding: 4px 6px;
      border-radius: 10px;
    }
    button {
      margin-left: 10px;
      padding: 4px 6px;
      color: white;
      outline: none;
      border-radius: 10px;
      background-color: black;
    }
  }
}
</style>