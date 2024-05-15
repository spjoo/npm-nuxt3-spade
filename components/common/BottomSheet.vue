<script setup>
// 1. teleport로 바텀시트를 구현한다. (body 태그가 닫히기 바로 전)
// 2. 바텀시트는 각 금액 버튼 클릭 시 열리며, dim 영역 또는 바텀시트 내 "확인" 버튼 클릭 시 닫힌다.
// 3. 페이지 내 input과 "확인"버튼을 추가하며 input에는 숫자만 입력 가능하다.
//  - 단, 입력하는 금액에는 제한이 없다.
//  - "확인" 버튼 클릭 시에도 바텀시트가 열린다.
// 4. input에 입력된 값이 프로그레스바의 max값을 넘을 경우 percentage는 100%로 처리한다.
// 5. 프로그레스바의 우측 하단에는 max값에 대한 정보를 보여준다. (해당 이미지의 “7일”과 같이)

import { ref, defineEmits, defineProps, onMounted } from 'vue';

const bottomSheet = ref(null);
defineEmits(['closeBottomsheet']);
const props = defineProps({
  buttonTitle: String,
  isOpenBottomsheet: Boolean,
});

onMounted(() => {
  document.body.appendChild(bottomSheet.value);
});

</script>

<template>
  <teleport to="body">
    <div ref="bottomSheet" class="bottomsheet" :class="{active: isOpenBottomsheet}" @click="$emit('closeBottomsheet')">
      <div class="bottomsheet-container">
        <main class="bottomsheet-body">
          <slot name="main"></slot>
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
  