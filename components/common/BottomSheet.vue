<script setup>
// 1. teleport로 바텀시트를 구현한다. (body 태그가 닫히기 바로 전)
// 2. 바텀시트는 각 금액 버튼 클릭 시 열리며, dim 영역 또는 바텀시트 내 "확인" 버튼 클릭 시 닫힌다.
// 3. 페이지 내 input과 "확인"버튼을 추가하며 input에는 숫자만 입력 가능하다.
//  - 단, 입력하는 금액에는 제한이 없다.
//  - "확인" 버튼 클릭 시에도 바텀시트가 열린다.
// 4. input에 입력된 값이 프로그레스바의 max값을 넘을 경우 percentage는 100%로 처리한다.
// 5. 프로그레스바의 우측 하단에는 max값에 대한 정보를 보여준다. (해당 이미지의 “7일”과 같이)

import { defineEmits, defineProps } from 'vue';

defineEmits(['closeBottomsheet']);
const props = defineProps({
  buttonTitle: String,
  isOpenBottomsheet: Boolean,
});

</script>

<template>
  <teleport to="body">
    <aside class="bottomsheet" v-if="isOpenBottomsheet" @click="$emit('closeBottomsheet')">
      <div class="bottomsheet-container">
        <main class="bottomsheet-body">
          <slot name="main"></slot>
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
  