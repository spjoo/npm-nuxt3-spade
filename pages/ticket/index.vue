<script setup>
// 1. 위 네가지 모양의 티켓을 만든다.
// 2. 티켓의 상단 부분에는 로고와 티켓에 관련된 텍스트를 기재한다
// ex) 50% 할인

// 3. 1번과 3번
//  a. 티켓의 하단 부분에 버튼을 배치한다.
//  - 버튼은 토글 기능을 통해 다운로드<->완료로 변환 가능하게 한다.
//  - 해당 영역은 가로가 가변적이며 최소 80px을 가진다.
//  b. 전체 가로는 가변적이며, 세로는 고정 400px이다.

// 4. 2번과 4번
//  a. 티켓의 하단 부분에 티켓 번호/유효기간 등의 텍스트를 기재한다.
//  - 해당 영역은 세로가 가변적이며 최소 80px을 가진다.
//  b. 가로는 가변적이며, 세로는 상단 고정 400px이다.

// 5. 중간 점선(절취선)과 그림자까지 구현한다.
import { ref, reactive, onMounted, onUpdated } from 'vue';

const visual = ref(null);
const info = ref(null);
const borderGap = ref(null);
const isVertical = ref(true); // 티켓 방향
const isRound = ref(false); // 라운드 여부
const isDownload = ref(false); // 다운로드 여부

const handlePath = () => {
  const visualWidth = visual.value.clientWidth;
  const visualHeight = visual.value.clientHeight;
  const infoWidth = info.value.clientWidth;
  const infoHeight = info.value.clientHeight;
  const gap = visualWidth / 20;
  let visualPath = null;
  let infoPath = null;

  if (isVertical.value) {
    visualPath = `m0 0 L 0 ${visualHeight - gap} ${isRound.value ? `Q ${gap} ${visualHeight - gap}` : 'L'} ${gap} ${visualHeight} L ${visualWidth - gap} ${visualHeight} ${isRound.value ? `Q ${visualWidth - gap} ${visualHeight - gap}` : 'L'} ${visualWidth} ${visualHeight - gap} L ${visualWidth} 0 Z`;

    infoPath = `m${gap} 0 ${isRound.value ? `Q ${gap} ${gap}` : 'L'} 0 ${gap} L 0 ${infoHeight} L ${infoWidth} ${infoHeight} L ${infoWidth} ${gap} ${isRound.value ? `Q ${infoWidth - gap} ${gap}` : 'L'} ${infoWidth - gap} 0 Z`;
  } else {
    visualPath = `m0 0 L ${visualWidth - gap} 0 ${isRound.value ? `Q ${visualWidth - gap} ${gap}` : 'L'} ${visualWidth} ${gap} L ${visualWidth} ${visualHeight - gap} ${isRound.value ? `Q ${visualWidth - gap} ${visualHeight - gap}` : 'L'} ${visualWidth - gap} ${visualHeight} L 0 ${visualHeight} Z`;

    infoPath = `m0 ${gap} ${isRound.value ? `Q ${gap} ${gap}` : 'L'} ${gap} 0 L ${infoWidth} 0 L ${infoWidth} ${infoHeight} L ${gap} ${infoHeight} ${isRound.value ? `Q ${gap} ${infoHeight - gap}` : 'L'} 0 ${infoHeight - gap}`;
  }

  visual.value.style.clipPath = `path("${visualPath}")`;
  info.value.style.clipPath = `path("${infoPath}")`;
}

onMounted(() => {
  borderGap.value = `${visual.value.clientWidth / 10}px`;
  handlePath();
  window.addEventListener('resize', () => {
    borderGap.value = `${visual.value.clientWidth / 10}px`;
    handlePath();
  })
})

onUpdated(() => {
  handlePath();
});

const toggleVertical = () => {
  isVertical.value = !isVertical.value;
}
const toggleRound = () => {
  isRound.value = !isRound.value;
}
const toggleDownload = () => {
  isDownload.value = !isDownload.value;
}

const tickets = reactive(
  {
    bgColor: '#5e0080',
    logoSrc: 'logo_marketkurly.jpeg',
    title: '<strong>50%</strong> 할인',
    info: [
      '최소 21,000원 이상 구매 시 할인쿠폰 적용 가능합니다.',
      '일부 가게에서는 쿠폰 사용이 불가할 수 있습니다.',
      '다른 쿠폰과 중복 사용하실 수 없습니다.',
      '쿠폰은 다른 계정으로 양도할 수 없습니다.',
      '최소 21,000원 이상 구매 시 할인쿠폰 적용 가능합니다.',
      '일부 가게에서는 쿠폰 사용이 불가할 수 있습니다.',
      '다른 쿠폰과 중복 사용하실 수 없습니다.',
      '쿠폰은 다른 계정으로 양도할 수 없습니다.',
    ],
  },
)
</script>

<template>
  <main class="contents">
    <section class="button-section">
      <ul>
        <li>
          <button type="button" :class="{toggle: isVertical}" @click="toggleVertical">
            방향: {{ isVertical ? '수직' : '수평' }}
          </button>
        </li>
        <li>
          <button type="button" :class="{toggle: isRound}" @click="toggleRound">
            라운드: {{ isRound ? 'O' : 'X' }}
          </button>
        </li>
      </ul>
    </section>
    <section class="ticket-section">
      <article class="ticket" :class="{horizontal: !isVertical}">
        <div ref="visual" class="ticket-visual-area" :style="[{backgroundColor: tickets.bgColor}, {'--gap': borderGap}]">
          <div class="ticket-visual-container">
            <div class="ticket-visual">
              <img :src="`/images/${tickets.logoSrc}`" alt=""/>
            </div>
            <p v-html="tickets.title"></p>
          </div>
        </div>
        <div ref="info" class="ticket-text-area">
          <div class="ticket-text-container">
            <ul v-if="isVertical">
              <li v-for="(list, i) in tickets.info" :key="i">{{ list }}</li>
            </ul>
            <button v-else type="button" :class="{toggle: isDownload}" @click="toggleDownload">
              {{ isDownload ? '완료' : '다운로드' }}
            </button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
.contents {
  padding: 20px;
  button {
    padding: 4px 6px;
    color: black;
    border: 1px solid black;
    outline: none;
    border-radius: 10px;
    background-color: white;
    white-space: nowrap;
    &.toggle {
      color: white;
      border: none;
      background-color: black;
    }
  }
  .button-section {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 10;
    ul {
      display: flex;
      list-style: none;
      li + li {
        margin-left: 10px;
      }
    }
  }
  .ticket-section {
    .ticket {
      position: relative;
      font-size: 0;
      filter: drop-shadow(-1px 8px 12px rgba(50, 50, 0, 0.5));
      &.horizontal {
        display: flex;
        .ticket-visual-area {
          height: 400px;
          flex: 1;
          &::before {
            width: 1px;
            height: calc(100% - var(--gap));
            top: 50%;
            left: initial;
            right: -2px;
            bottom: initial;
            transform: translateY(-50%);
            border-bottom: none;
            border-right: 5px dotted #fff;
          }
        }
        .ticket-text-area {
          min-width: 80px;
          height: 400px;
          .ticket-text-container {
            padding: 20px;
          }
        }
      }
      &-visual-area {
        display: flex;
        position: relative;
        height: 400px;
        align-items: center;
        justify-content: center;
        &::before {
          content: '';
          display: block;
          width: calc(100% - var(--gap));
          height: 1px;
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          border-bottom: 5px dotted #fff;
        }
        .ticket-visual-container {
          display: flex;
          padding: 20px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .ticket-visual {
            width: 20%;
            min-width: 150px;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            font-size: 30px;
            color: #fff;
            strong {
              font-weight: 700;
              font-size: 60px;
            }
          }
        }
      }
      &-text-area {
        display: flex;
        min-height: 80px;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        .ticket-text-container {
          padding: 40px;
          ul {
            color: #000;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
