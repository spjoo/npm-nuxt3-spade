<script setup>
import { ref, onMounted, onUpdated, nextTick } from 'vue';

const priceList = [0, 5000, 20000, 50000, 90000, 95000, 100000];
const arrowMargin = 6;
const priceLast = priceList.length - 1;
const currentPrice = ref(priceList[0]);
const progressValue = ref(null);
const tooltipRef = ref(null);
const progressBarRef = ref(null);

const toolTipLeft = ref(0);
const toolTipRight = ref(0);

const toolTipPosX = ref(0);
const pointPos = ref(0);

const getCurrentPrice = price => {
	currentPrice.value = price;
	progressValue.value = (price / priceList[priceLast]) * 100;

	nextTick(() => {
		widthCalc();
	});
};

const widthCalc = () => {
	if (!tooltipRef.value || !progressBarRef.value) return;

	const toolTipWidth = tooltipRef.value.offsetWidth;
	const leftOffset = tooltipRef.value.offsetLeft;
	const progressWidth = progressBarRef.value.offsetWidth;

	//툴팁 왼쪽 값
	toolTipLeft.value = Math.floor(toolTipWidth / 2 - leftOffset + toolTipPosX.value);
	//툴팁 오른쪽 값
	toolTipRight.value = Math.floor(progressWidth - (toolTipWidth / 2 + leftOffset - toolTipPosX.value));

	//초기화
	toolTipPosX.value = 0;
	pointPos.value = 0;

	//왼쪽
	if (-toolTipLeft.value < 0) {
		toolTipPosX.value = toolTipLeft.value;
		pointPos.value = toolTipPosX.value;

		if (toolTipWidth / 2 - pointPos.value < arrowMargin) {
			pointPos.value = toolTipPosX.value - arrowMargin - 4;
		}
	}
	//오른쪽
	else if (toolTipRight.value < 0) {
		toolTipPosX.value = toolTipRight.value;
		pointPos.value = toolTipPosX.value;

		if (toolTipWidth / 2 + toolTipPosX.value < arrowMargin) {
			pointPos.value = toolTipPosX.value + arrowMargin + 4;
		}
	}
};

onUpdated(() => {});
onMounted(() => {});

//https://velog.io/@yeonsubaek/Vue.js-rel-reactive-%EC%82%AC%EC%9A%A9%EB%B2%95%EA%B0%92-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0
</script>

<template>
	<main>
		<ul class="price_area">
			<li v-for="(price, i) in priceList" :key="i">
				<button @click="getCurrentPrice(price)">
					{{ price.toLocaleString() }}
				</button>
			</li>
		</ul>
		<section>
			<div class="progress_area">
				<progress ref="progressBarRef" max="100" :value="progressValue"></progress>

				<p
					ref="tooltipRef"
					class="tooltip"
					:class="progressValue == null ? '' : 'on'"
					:style="[{ left: `${progressValue}%` }, { marginLeft: `${toolTipPosX}px` }]"
				>
					{{ currentPrice.toLocaleString() }}원
				</p>
				<!--				<span>{{ currentPrice.toLocaleString() }}원</span>-->
				<span>{{ priceList[priceLast].toLocaleString() }}원</span>
			</div>
		</section>
	</main>
</template>

<style scoped>
main {
	width: 100%;
	margin: 0 auto;
}
.price_area {
	display: flex;
	flex-wrap: wrap;
	gap: 0.8rem;
	list-style: none;
	margin: 0 auto;
	padding: 0;
}
.price_area button {
	min-width: 100px;
	padding: 4px 8px;
	color: #555;
	border: 1px solid #ccc;
	background: #f0f0f0;
	cursor: pointer;
}
.progress_area {
	position: relative;
	margin-top: 50px;
}
.progress_area progress {
	width: 100%;
	height: 16px;
	appearance: none;
}
.progress_area progress::-webkit-progress-bar {
	overflow: hidden;
	background: #f0f0f0;
	border: 0 none;
	border-radius: 12px;
}
.progress_area progress::-webkit-progress-value {
	background: #43f15e;
	border-radius: 12px;
	transition: all 0.3s;
}
.progress_area .tooltip {
	display: flex;
	position: absolute;
	bottom: 100%;
	align-items: center;
	justify-content: center;
	margin-top: 0;
	margin-bottom: 10px;
	padding: 6px 8px;
	background: #000;
	border-radius: 4px;
	color: #fff;
	font-size: 13px;
	line-height: 1;
	white-space: nowrap;
	opacity: 0;
	transform: translateX(-50%);
}
.progress_area .tooltip.on {
	opacity: 1;
	transition: opacity 0.3s;
}
.progress_area .tooltip::before {
	display: block;
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: v-bind(-pointPos + 'px');
	transform: translateX(-50%);
	border-top: 6px solid #000;
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
}
.progress_area span {
	display: block;
	margin: 4px 0;
	color: #787878;
	font-size: 13px;
	text-align: right;
}
</style>
