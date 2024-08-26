<script setup>
// - 순위를 위 이미지와 같은 형태로 구현한다.
// - 4등 이하부터는 동일한 길이의 리스트 형태로 나열한다.
// - 공동 순위는 3명까지 가능하며 접근성을 고려하여 구현한다.
import { reactive, computed } from 'vue';

const scoreList = reactive([
  { name: '뽀로로', score: 100 },
  { name: '크롱', score: 70 },
  { name: '에디', score: 80 },
  { name: '포비', score: 10 },
  { name: '루피', score: 20 },
  { name: '패티', score: 100 },
])

const sortedScoreList = computed(() => {
  return [...scoreList].sort((a, b) => b.score - a.score);
})

const podiumOrder = computed(() => {
  const podium = [];
  let rank = 1;
  for (let i = 0; i < sortedScoreList.value.length; i++) {
    if (i > 0 && sortedScoreList.value[i].score < sortedScoreList.value[i - 1].score) {
      rank = i + 1
    }
    if (rank > 3) break;
    podium.push({ ...sortedScoreList.value[i], rank });
  }
  podium.sort((a, b) => a.rank - b.rank);

  return podium;
})

const otherScores = computed(() => {
  const podiumNames = podiumOrder.value.map(item => item.name)
  return sortedScoreList.value.filter(item => !podiumNames.includes(item.name))
})
</script>

<template>
  <main class="contents">
    <section class="rank-section">
      <ul class="podium" role="list" aria-label="Top 3">
        <li 
          v-for="(item, index) in podiumOrder" 
          :key="item.name" 
          :class="`rank-${item.rank}`"
          role="listitem"
          :aria-label="`${item.rank}등 ${item.name}, 점수 ${item.score}`"
        >
        <button>
          <span>{{ item.rank }}등</span>
          <p>{{ item.name }}: {{ item.score }}</p>
        </button>
        </li>
      </ul>
      <ul class="other-list" aria-label="Other Scores">
        <li v-for="item in otherScores" :key="item.name">
          <button>
            {{ item.name }}: {{ item.score }}
          </button>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped lang="scss">
.contents {
  padding: 20px;
  button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
  }
  .podium {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 200px;
    li {
      margin: 0 10px;
      padding: 10px;
      flex: 1;
      background-color: lightgray;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      &:nth-child(1) {
        order: 2;
      }
      &:nth-child(2) {
        order: 1;
      }
      &:nth-child(3) {
        order: 3;
      }
      &.rank {
        &-1 {
          height: 150px;
          background-color: gold;
          }
        &-2 {
          height: 100px;
          background-color: silver;
        }
        &-3 {
          height: 50px;
          background-color: #914f24;
        }
      }
    }
    span {
      position: absolute;
      top: 10px;
    }
  }
  .other-list {
    margin-top: 20px;
    padding: 0;
    list-style: none;
    li {
      height: 100px;
      background-color: lightgrey;
      & + li {
        margin-top: 10px;
      }
    }
  }
}
</style>
