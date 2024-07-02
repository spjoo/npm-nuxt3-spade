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
  const w = width.value;
  const h = height.value;
  switch(activeFigure.value) {
    case 'heart':
      clipPath = `m${w / 2} ${h / 4} Q ${w / 2 - w / 10} 0 ${w / 4} 0 Q 0 0 0 ${h / 4} Q 0 ${h / 2 - w / 10} ${w / 10} ${h / 2} L ${w / 2} ${h} L ${w - w / 10} ${h / 2} Q ${w} ${h / 2 - w / 10} ${w} ${h / 4} Q ${w} 0 ${w - w / 4} 0 Q ${w / 2 + w / 10} 0 ${w / 2} ${h / 4} z`;
      break;
    case 'spade':
      clipPath = `m${w / 2} 0 L ${w / 4} ${h / 2  - h / 4} Q ${w / 10} ${h / 2 - w / 10} ${w / 10} ${h / 2} Q ${w / 10} ${h / 2 + h / 4} ${w / 4} ${h / 2 + h / 4} Q ${w / 2 - 5} ${h / 2 + h / 4} ${w / 2 - 5} ${h / 2 + h / 8} Q ${w / 2 - 5} ${h} ${w / 2 - w / 4} ${h} L ${w - w / 4} ${h} Q ${w / 2 + 5} ${h} ${w / 2 + 5} ${h / 2 + h / 8} Q ${w / 2 + 5} ${h / 2 + h / 4} ${w - w / 4} ${h / 2 + h / 4} Q ${w - w / 10} ${h / 2 + h / 4} ${w - w / 10} ${h / 2} Q ${w - w / 10} ${h / 2 - w / 10} ${w - w / 4} ${h / 2 - h / 4} L ${w / 2} 0`;
      break;
    case 'clover':
      clipPath = `m${w / 2} 0 Q ${w / 4 + w / 50} 0 ${w / 4} ${h / 4} Q ${w / 4} ${h / 2 - 10 - h / 10} ${w / 2 - w / 5} ${h / 2 - h / 10} Q ${w / 10} ${h / 2 - h / 10} ${w / 10} ${h / 2 + 10} Q ${w / 10} ${h - h / 4 - w / 50} ${w / 4} ${h - h / 4} Q ${w / 2 - 5 - w / 10} ${h - h / 4} ${w / 2 - 5} ${h / 2 + h / 10} Q ${w / 2} ${h} ${w / 4} ${h} L ${w - w / 4} ${h} Q ${w / 2} ${h} ${w / 2 + 5} ${h / 2 + h / 10} Q ${w / 2 + w / 10} ${h / 2 + h / 10 + w / 10} ${w - w / 4} ${h - h / 4} Q ${w - w / 10} ${h - h / 4} ${w - w / 10} ${h / 2 + 10} Q ${w - w / 10} ${h / 2 - 10 - w / 10} ${w / 2 + w / 5} ${h / 2 - h / 10} Q ${w - w / 4} ${h / 2 - h / 10 - w / 50} ${w - w / 4} ${h / 4} Q ${w - w / 4 - w / 50} 0 ${w / 2} 0`;
      break;
    case 'diamond':
      clipPath = `m${w / 2} 0 Q ${w / 2 - w / 5} ${h / 2} 0 ${h / 2} Q ${w / 2 - w / 5} ${h / 2} ${w / 2} ${h} Q ${w / 2 + w / 5} ${h / 2} ${w} ${h / 2} Q ${w / 2 + w / 5} ${h / 2} ${w / 2} 0`;
      break;
    case 'figure1':
      clipPath = `m${w / 10} 0 L 0 ${w / 10} L 0 ${h} L${w - w / 10} ${h} L ${w} ${h - w / 10} L ${w} 0 z`;
      break;
    case 'figure2':
      clipPath = `m${w / 10} 0 Q ${w / 10} ${w / 10} 0 ${w / 10} L 0 ${h} L${w - w / 10} ${h} Q ${w - w / 10} ${h - w / 10} ${w} ${h - w / 10} L ${w} 0 z`;
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
    position: relative;
    margin-top: 20px;
    .image_wrapper {
      filter: drop-shadow(-1px 8px 12px rgba(50, 50, 0, 0.5));
      img {
        width: 100%;
      }
    }
  }
}
</style>
