<script setup>
import { onMounted, ref } from 'vue';

const btnList = [
	{ shape: '하트', name: 'heart' },
	{ shape: '클로버', name: 'clover' },
	{ shape: '스페이드', name: 'spade' },
	{ shape: '다이아몬드', name: 'diamond' },
	{ shape: '도형01', name: 'shape01' },
	{ shape: '도형02', name: 'shape02' },
];

const shapeName = ref();
const imgareaRef = ref();
const svgWidth = ref(0);
const svgHeight = ref(0);

const imgMask = v => {
	shapeName.value = v;
};

onMounted(() => {
	const w = imgareaRef.value.offsetWidth;
	const h = imgareaRef.value.offsetHeight;
	svgWidth.value = w;
	svgHeight.value = h;
});
</script>

<!--
1. 하트, 클로버, 스페이드 ,다이아몬드 + 이미지의 두 모양의 버튼을 만든다.
2. 하단에 원하는 이미지를 배치한다.
3. 버튼을 누를 경우 각 모양에 맞게 이미지가 잘리도록 처리한다.
clip-path, svg mask 처리 방식있음
-->

<template>
	<main id="main">
		<ul class="btn_list">
			<li v-for="(item, i) in btnList" :key="i">
				<button @click="imgMask(item.name)">{{ item.shape }}</button>
			</li>
		</ul>

      <div class="imgarea_inner">
        <div ref="imgareaRef" class="imgarea" :class="shapeName">
          <img src="../assets/img/img.png" alt="" />
        </div>
      </div>

		<!--		<svg viewBox="-450 -450 900 900">-->
		<!--		<svg :viewBox="`${-svgWidth / 2} ${-svgHeight / 2} ${svgWidth} ${svgHeight}`" width="480px" height="480px">-->
		<!--			&lt;!&ndash;하트&ndash;&gt;-->
		<!--			<clipPath id="heart_shape">-->
		<!--				<path-->
		<!--					d="M 10, 30 A 20, 20 0, 0, 1 50, 30 A 20, 20 0, 0, 1 90, 30 Q 90, 60 50, 90 Q 10, 60 10, 30 z"-->
		<!--					style="transform: scale(4.8)"-->
		<!--				/>-->
		<!--			</clipPath>-->

		<!--			&lt;!&ndash;클로버&ndash;&gt;-->
		<!--			<clipPath id="clover_shape">-->
		<!--				<path-->
		<!--					d="M145,225 C83,5 412,19 342,225 C570,201 484,538 269,387 L 293, 480 L 183, 480 L 208, 384 C-42,546 -58,162 145,225 z"-->
		<!--				/>-->
		<!--			</clipPath>-->

		<!--			&lt;!&ndash;스페이드&ndash;&gt;-->
		<!--			<clipPath id="spade_shape">-->
		<!--				<path-->
		<!--					d="M6,257 C 25,200 89, 210 240, 30 C 320, 130 424, 211 445, 230 C507,271 466,461 270,387 L 293, 480 L 183, 480 L 208, 384 C14,479 -24,273 17,236 z"-->
		<!--				/>-->
		<!--			</clipPath>-->

		<!--			&lt;!&ndash;다이아몬드&ndash;&gt;-->
		<!--			<clipPath id="diamond_shape">-->
		<!--				<polygon points="50% 0, 90% 50%, 50% 100%, 10% 50%" />-->
		<!--			</clipPath>-->

		<!--			&lt;!&ndash;모양01&ndash;&gt;-->
		<!--			<clipPath id="shape01_shape">-->
		<!--				<polygon points="25% 0, 100% 0, 100% 75%, 75% 100%, 0% 100%, 0% 25%" />-->
		<!--			</clipPath>-->

		<!--			&lt;!&ndash;모양02&ndash;&gt;-->
		<!--			<clipPath id="shape02_shape">-->
		<!--				<path d="M0,96 C -84,96 77, 123 96, 0  L 480, 0 L 480, 384 C 428, 383 370, 393 350, 480 L 0 480 z" />-->
		<!--			</clipPath>-->
		<!--		</svg>-->
	</main>
</template>

<style scoped>
main {
	width: 100%;
	margin: 0 auto;
}
.btn_list {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: 0;
	list-style: none;
	gap: 0.3rem;
}
.btn_list > li > button {
	padding: 0.4rem;
	color: #555;
	border: none;
	background: #f0f0f0;
	cursor: pointer;
	font-size: 1rem;
	line-height: 1rem;
	width: 7rem;
	height: 3rem;
}
.imgarea_inner {
	filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
}
.imgarea {
	width: 48rem;
	height: 48rem;
	margin: 0 auto;
	overflow: hidden;
	margin-top: 5rem;
}
.imgarea img {
	display: block;
	width: 100%;
}

.imgarea.heart {
	clip-path: path('M 40 120 A 50 50 0 1 1 240 120 L 240 120 A 50 50 0 1 1 440 120 Q 440 200 240 440 Q 40 200 40 120 Z');
}
.imgarea.clover {
	clip-path: path(
		'M 200 200 A 100 100 0 1 1 280 200 A 100 100 0 1 1 280 360 L 320 480 L 160 480 L 200 360 A 100 100 0 1 1 200 200 Z'
	);
}
.imgarea.spade {
	clip-path: path(
		'M 240 40 Q 320 160 440 240 A 40 40 0 1 1 280 360 L 320 480 L 160 480 L 200 360 A 50 50 0 1 1 40 240 Q 160 160 240 40 Z'
	);
}
.imgarea.diamond {
	clip-path: polygon(50% 0, 90% 50%, 50% 100%, 10% 50%);
}
.imgarea.shape01 {
	clip-path: polygon(25% 0, 100% 0, 100% 75%, 75% 100%, 0% 100%, 0% 25%);
}
.imgarea.shape02 {
	clip-path: path('M 0 120 Q 120 120 120 0 L 480 0 L 480 360 Q 360 360 360 480 L 0 480 L 0 120 Z');
}
</style>
