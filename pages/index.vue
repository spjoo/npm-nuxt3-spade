<script setup>
import { computed, ref } from "vue";
const rankList = ref([
  {
    id: "1",
    rank: "3",
  },
  {
    id: "2",
    rank: "2",
  },
  {
    id: "3",
    rank: "1",
  },
  {
    id: "4",
    rank: "5",
  },
  {
    id: "5",
    rank: "8",
  },
  {
    id: "6",
    rank: "6",
  },
  {
    id: "7",
    rank: "4",
  },
  {
    id: "8",
    rank: "7",
  },
]);
const sortRank = computed(() => {
  return rankList.value.sort(function (a, b) {
    return a.rank - b.rank;
  });
});

//버튼클릭으로 정렬할때
// const rankSort = [...rankList.value];
// const sortState = ref(false);
//
// const sort = () => {
//   rankList.value.sort(function (a, b) {
//     return a.rank - b.rank;
//   });
//   sortState.value = true;
// };
// const return_sort = () => {
//   rankList.value = [...rankSort];
//   sortState.value = false;
// };
</script>
<template>
  <main id="main">
    <div class="grid">
      <button
        class="item"
        v-for="item in sortRank"
        :key="item.id"
        :class="'rank' + item.rank"
      >
        <span>{{ item.rank }}</span>
      </button>
    </div>
  </main>

  <!--버튼 클릭으로 순위 정렬-->
  <!--  <main id="main">-->
  <!--    <div class="grid">-->
  <!--      <button-->
  <!--        class="item"-->
  <!--        v-for="item in rankList"-->
  <!--        :key="item.id"-->
  <!--        :class="sortState ? 'rank' + item.rank : ''"-->
  <!--      >-->
  <!--        <span>{{ item.rank }}</span>-->
  <!--      </button>-->
  <!--    </div>-->

  <!--    <div class="btnarea">-->
  <!--      <button @click="sort">순위 정렬</button>-->
  <!--      <button @click="return_sort">되돌리기</button>-->
  <!--    </div>-->
  <!--  </main>-->
  <!--버튼 클릭으로 순위 정렬-->
</template>

<style scoped>
main {
  font-size: 1.4rem;
  box-sizing: border-box;
  padding: 2rem;
  width: 100%;
  margin: 0 auto;
  min-width: 35rem;
  overflow-x: hidden;
}
.grid {
  display: grid;
  grid-template-rows: repeat(8, 5rem);
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  width: 100%;
  margin: 0 auto;
  max-width: 50rem;
}
.item {
  border: 0.3rem solid #555;
  border-radius: 1rem;
  text-align: center;
  line-height: 5rem;
  position: relative;
  overflow: hidden;
  outline-width: 7rem;
  outline-color: #00ff11;
}
.item span {
  display: inline-block;
  font-size: 2rem;
  color: #111;
  position: relative;
}
.item:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.item.rank1 {
  grid-row: span 3;
  grid-column: 2;
}
.item.rank1:before {
  background-color: #ff6347;
}
.item.rank2 {
  grid-row: span 2;
  grid-column: 1;
}
.item.rank2:before {
  background-color: #ffa500;
}
.item.rank3 {
  grid-row: 3 / span 1;
  grid-column: 3;
}
.item.rank3:before {
  background-color: #32cd32;
}
.item.rank4,
.item.rank5,
.item.rank6,
.item.rank7,
.item.rank8 {
  grid-column: span 3;
}
.item.rank4:before,
.item.rank5:before,
.item.rank6:before,
.item.rank7:before,
.item.rank8:before {
  background-color: #496bc7;
}
.item.rank4:before {
  opacity: 0.9;
}
.item.rank5:before {
  opacity: 0.7;
}
.item.rank6:before {
  opacity: 0.5;
}
.item.rank7:before {
  opacity: 0.3;
}
.item.rank8:before {
  opacity: 0.2;
}

.btnarea {
  width: 100%;
  margin: 0 auto;
  margin-top: 5rem;
  max-width: 50rem;
  text-align: center;
}
.btnarea button {
  width: 100%;
  padding: 1rem;
  color: #555;
  border: 1px solid #ccc;
  background: #f0f0f0;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0.5rem 0;
}
</style>
