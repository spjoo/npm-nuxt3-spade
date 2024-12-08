<template>
  <main>
    <ul>
      <li class="head">
        <p>주차</p>
        <p>링크</p>
      </li>
      <li>
        <p>5월 2-3주차</p>
        <nuxt-link to="/progressbar/">프로그레스바 바텀시트</nuxt-link>
      </li>
      <li>
        <p>5월 4주차-6월 1주차</p>
        <nuxt-link to="/mask/">반응형 마스크 및 그림자</nuxt-link>
      </li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
ul {
  max-width: 720px;
  margin: 0 auto;
  li {
    padding: 0 10px;
    display: flex;
    font-size: 16px;
    border: 1px solid gray;
    &.head {
      color: white;
      background-color: black;
    }
    p {
      min-width: 200px;
      padding: 10px 0;
      &:first-child {
        margin-right: 10px;
        border-right: 1px solid gray;
      }
    }
    a {
      display: inline-block;
      padding: 10px 0;
      color: black;
    }
  }
}
</style>