<script setup>
import { ref, computed } from 'vue';

const figureList = ['♠', '♣', '♦', '♥', 'angle', 'round'];
const currentFigure = ref(figureList[1]);
const setFigure = val => {
  currentFigure.value = val;
};
const renderFigure = computed(()=> {
  let figure = '';
  let type = currentFigure.value === 'angle' || currentFigure.value === '♦' ? 'polygon' : 'path'
  // 500 / 280
  switch (currentFigure.value) {
    case '♠':
      figure = 'M 250,30 L 350,140 A 50,50 0 1 1 255,200 Q 255,250 305,250 L 195,250 Q 245,250 245,200 A 50,50 0 1 1 150,140 Z'
      break
    case '♣':
      figure = 'M 220,140 A 55,55 0 1 1 280,140 A 50,50 0 1 1 255,200 Q 255,250 305,250 L 195,250 Q 245,250 245,200 A 50,50 0 1 1 225,140 Z'
      break
    case '♦':
      figure = '50% 30px, calc(50% + 80px) 50%, 50% calc(100% - 30px), calc(50% - 80px) 50%'
      break
    case '♥':
      figure = 'M 250,80 A 50,50 0 1 1 350,150 L 250,250 L 150,150 A 50,50 0 1 1 250,80'
      break
    case 'angle':
      figure = '50px 0%, 100% 0%, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0% 100%, 0% 50px'
      break
    case 'round':
      figure = 'M0,0 L450,0 Q450,50 500,50 L500,280 L50,280 Q50,230 0,230 Z'
      break
  }
  return `${type}(${type === 'polygon' ? figure : '"' + figure + '"'})`
})
</script>

<template>
	<main>
		<section class="control_wrap">
			<ul class="figure_area">
				<li v-for="(figure, i) in figureList" :key="i">
					<button @click="setFigure(figure)">{{ figure }}</button>
				</li>
			</ul>
      <div class="render_area">
        <img src="@images/hoodduct.png" alt="">
      </div>
		</section>
	</main>
</template>

<style scoped lang="scss">
.control_wrap {
	padding: 2rem;
}
.figure_area {
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
.render_area {
  width: 500px;
  clip-path: v-bind(renderFigure);
  img {
    max-width: 100%;
    vertical-align: top;
  }
}
</style>
