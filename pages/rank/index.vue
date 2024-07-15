<script setup>
import {computed} from 'vue';
const rankData = [
  {
    name: 'A',
    point: 100,
  },
  {
    name: 'B',
    point: 50,
  },
  {
    name: 'C',
    point: 70,
  },
  {
    name: 'D',
    point: 70,
  },
  {
    name: 'E',
    point: 30,
  },
  {
    name: 'F',
    point: 40,
  }
];
rankData.sort((a, b) => b.point - a.point || b.name - a.name)
const setRankData = computed(() => {
  let equ = 1
  let currentRank = 0
  let point = 0
  return rankData.map(v => {
    if(point !== v.point) {
      point = v.point
      currentRank += equ === 0 ? 1 : equ
      equ = 1
    } else {
      equ++
    }
    return {...v, rank: currentRank}
  })
})

console.log(setRankData)
</script>

<template>
  <main>
    <section class="rank_wrap">
      <h1>순위</h1>
      <ul class="rank_area">
        <li v-for="(item, i) in setRankData" :key="i" :class="`rank${item.rank}`">
          <article class="rank_item">
            <strong class="rank">{{item.rank}}</strong>
            <p>{{item.name}}</p>
            <span>{{item.point}}</span>
          </article>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped lang="scss">
.rank_wrap {
  padding: 2rem;
}
.rank_area {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 10px;
  li {
    min-width: calc((100% - 20px) / 3);
    box-sizing: border-box;
    .rank {
      padding: 10px;
      font-size: 14px;
    }
    p {
      font-size: 18px;
    };
    span {
      display: block;
      padding: 10px;
      font-size: 12px;
      color: #555;
    }
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #eee;
      border-radius: 16px;
    }
    &.rank2 {
      margin-top: 10px;
    }
    &.rank3 {
      margin-top: 20px;
    }
    &.rank2:nth-child(2) {
      order: -1;
    }
    &:nth-child(n + 4) {
      width: 100%;
      margin-top: 0;
      article {
        min-height: 50px;
        flex-direction: row;
        align-items: center;
        p {
          flex: 1;
        };
      }
    }
  }
}
</style>