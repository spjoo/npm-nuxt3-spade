<script setup>
import {ref, computed, onMounted, onBeforeUnmount, nextTick} from 'vue';
const directionList = ['Horizontal', 'Vertical'];
const typeList = ['round', 'angle'];
const currentDirection = ref(directionList[0]);
const currentType = ref(typeList[0]);
const isDown = ref(false);
const ticketEl = ref(null);
const bodyEl = ref(null);
const footEl = ref(null);

const ticketWidth = ref(0);
const bodyWidth = ref(0);
const footWidth = ref(0);

const setType =  val => {
  currentType.value = val;
  nextTick(()=>{
    setSize()
  })
};
const setDirection = val => {
  currentDirection.value = val;
};
const setClass = computed(()=> {
  return currentDirection.value.toLowerCase().slice(0, 3)
})
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et bibendum velit. Morbi porttitor vulputate purus, sit amet pretium risus vehicula tincidunt. Pellentesque pellentesque mauris libero, vel ultrices massa maximus sit amet. Fusce elementum sollicitudin sem. Vivamus consectetur magna nec nisl accumsan, sed sodales libero dapibus. Vestibulum a velit euismod, porttitor erat at, rhoncus ante. Nullam ultricies et risus id pulvinar.\n' +
    '\n' +
    'Aliquam consectetur urna et neque pharetra, sed condimentum lacus varius. Duis accumsan condimentum placerat. Phasellus imperdiet vitae purus nec congue. Pellentesque efficitur neque non venenatis dapibus. Nam fringilla id ante ut semper. Fusce varius sollicitudin convallis. Suspendisse enim dui, porta in sapien nec, pretium varius purus. Maecenas nec malesuada velit, eu elementum enim. Integer dui leo, tincidunt non porttitor in, hendrerit tincidunt erat. Pellentesque id accumsan nibh.'

const renderBodyPath = computed(()=> {
  let result
  switch (currentDirection.value) {
    case 'Horizontal':
      result = currentType.value === 'angle' ?
          `0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%`:
          `M0,0 L${bodyWidth.value - 10},0 Q${bodyWidth.value - 10},10 ${bodyWidth.value},10  L${bodyWidth.value},390 Q${bodyWidth.value - 10},390 ${bodyWidth.value - 10},400  L0,400 Z`
      break
    case 'Vertical':
      result = currentType.value === 'angle' ?
          `0% 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px)`:
          `M0,0 L${ticketWidth.value},0 L${ticketWidth.value},390 Q${ticketWidth.value - 10},390 ${ticketWidth.value - 10},400 L10,400 Q10,390 0,390 Z`
      break
  }
  return currentType.value === 'angle' ? `polygon(${result})`: `path("${result}")`
})
const renderFootPath = computed(()=> {
  let result
  switch (currentDirection.value) {
    case 'Horizontal':
      result = currentType.value === 'angle' ?
          `10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px`:
          `M10,0 L${footWidth.value},0 L${footWidth.value},400 L10,400 Q10,390 0,390 L0,10 Q10,10 10,0  Z`
      break
    case 'Vertical':
      result = currentType.value === 'angle' ?
          `10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 0% 100%, 0% 10px`:
          `M10,0 L${ticketWidth.value - 10},0 Q${ticketWidth.value - 10},10 ${ticketWidth.value},10 L${ticketWidth.value},99999 L0,99999 L0,10 Q10,10 10,0 Z`
      break
  }
  return currentType.value === 'angle' ? `polygon(${result})`: `path("${result}")`
})
const setSize = () => {
  ticketWidth.value = ticketEl.value.offsetWidth
  bodyWidth.value = bodyEl.value.offsetWidth
  footWidth.value = footEl.value.offsetWidth
}
onMounted(()=> {
  setSize()
  window.addEventListener('resize', setSize)
})
onBeforeUnmount(()=>{
  window.removeEventListener('resize', setSize)
})

</script>

<template>
  <main>
    <section class="control_wrap">
      <ul class="control_area">
        <li v-for="(dir, i) in directionList" :key="i">
          <button @click="setDirection(dir)">{{ dir }}</button>
        </li>
      </ul>
      <ul class="control_area">
        <li v-for="(type, i) in typeList" :key="i">
          <button @click="setType(type)">{{ type }}</button>
        </li>
      </ul>
      <article ref="ticketEl" class="ticket_area" :class="setClass">
        <div ref="bodyEl" class="ticket_body">
          <img src="@images/img_profile.jpg" alt="">
        </div>
        <div ref="footEl" class="ticket_foot">
          <button v-if="currentDirection === 'Horizontal'" @click="isDown = true">{{ isDown ? '다운로드\n완료' : '다운로드'}}</button>
          <p v-else>{{ lorem }}</p>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
.control_wrap {
  padding: 2rem;
}
.control_area {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  list-style: none;
  button {
    min-width: 100px;
    padding: 4px 8px;
    color: #555;
    border: 1px solid #ccc;
    background: #f0f0f0;
  }
}
.ticket_area {
  display: flex;
  filter: drop-shadow(0 0 5px rgba(0,0,0,.2));
  &>div {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .ticket_body {
    position: relative;
    height: 400px;
    background-color: #fef498;
    padding: 50px;
    clip-path: v-bind(renderBodyPath);
    &:before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 3px solid #fff;
    }
  }
  .ticket_foot {
    padding: 20px;
    background: #fff;
    clip-path: v-bind(renderFootPath);
  }
  &.hor {
    .ticket_body {
      flex: 1;
      &:before {
        right: 0;
        bottom: 0;
        border-right: 8px dotted #fff;
        margin-right: -4px;
      }
    }
    .ticket_foot {
      flex: none;
      min-width: 80px;
      button {
        height: calc(100% + 40px);
        margin: -20px;
        padding: 20px;
        border: 0 none;
        background: transparent;
        white-space: pre-line;
      }
    }
  }

  &.ver {
    flex-direction: column;
    .ticket_body {
    }
    .ticket_foot {
      flex: none;
      min-height: 80px;
      p {
        font-size: 13px;
        line-height: 1.4;
      };
    }
  }
}
</style>