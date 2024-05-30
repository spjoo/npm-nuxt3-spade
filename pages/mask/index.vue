<script setup>
// 하트, 클로버, 스페이드, 다이아몬드, 이미지 속 2개의 도형의 버튼을 만든다.
// 하단에 원하는 이미지를 배치한다.
// 버튼을 누를 경우, 각 모양에 맞게 이미지가 잘리도록 처리한다.
import { ref, reactive, onMounted } from 'vue';

const width = ref(null);
const height = ref(null);
const image = ref(null);
let activeFigure = ref(null);

onMounted(() => {
  width.value = image.value.clientWidth;
  height.value = image.value.clientHeight;
  window.addEventListener('resize', () => {
    width.value = image.value.clientWidth;
    height.value = image.value.clientHeight;
    makeClipPath();
  })
})

const maskButtons = reactive([
  {
    title: '하트',
    name: 'heart',
    isActive: false,
  },
  {
    title: '클로버',
    name: 'clover',
    isActive: false,
  },
  {
    title: '스페이드',
    name: 'spade',
    isActive: false,
  },
  {
    title: '다이아몬드',
    name: 'diamond',
    isActive: false,
  },
  {
    title: '도형1',
    name: 'figure1',
    isActive: false,
  },
  {
    title: '도형2',
    name: 'figure2',
    isActive: false,
  }
]);

const makeClipPath = () => {
  let clipPath = null;
  switch(activeFigure.value) {
    case 'diamond':
      clipPath = `m${width.value / 2} 0 Q ${width.value / 2} ${height.value / 2} 0 ${height.value / 2} Q ${width.value / 2} ${height.value / 2} ${width.value / 2} ${height.value} Q ${width.value / 2} ${height.value / 2} ${width.value} ${height.value / 2} Q ${width.value / 2} ${height.value / 2} ${width.value / 2} 0`;
      break;
    case 'figure1':
      clipPath = `m${width.value / 10} 0 L 0 ${width.value / 10} L 0 ${height.value} L${width.value - width.value / 10} ${height.value} L ${width.value} ${height.value - width.value / 10} L ${width.value} 0 z`;
      break;
    case 'figure2':
      clipPath = `m${width.value / 10} 0 Q ${width.value / 10} ${width.value / 10} 0 ${width.value / 10} L 0 ${height.value} L${width.value - width.value / 10} ${height.value} Q ${width.value - width.value / 10} ${height.value - width.value / 10} ${width.value} ${height.value - width.value / 10} L ${width.value} 0 z`;
      break;
  }
  image.value.style.clipPath = `path('${clipPath}')`
}

const handleButtonChange = (index) => {
  maskButtons.forEach((button, idx) => {
    button.isActive = idx === index;
  });
  activeFigure.value = maskButtons[index].name;
  makeClipPath();
};
</script>

<template>
  <main class="contents">
    <section class="button_section">
      <ul>
        <li v-for="(button, index) in maskButtons" :key="index">
          <button type="button" :class="{active: button.isActive}" @click="handleButtonChange(index)">
            {{ button.title }}
          </button>
        </li>
      </ul>
    </section>
    <section class="image_section">
      <div class="image_wrapper">
        <img ref="image" src="/public/images/maru.jpeg" alt="마루"/>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.contents {
  padding: 20px;
  background-color: black;
  .button_section {
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
  .image_section {
    margin-top: 20px;
    .image_wrapper {
      img {
        width: 100%;
      }
    }
  }
}
</style>
