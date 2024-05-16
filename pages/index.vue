<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';

const priceList = [0, 5000, 20000, 50000, 90000, 95000, 100000];

const currentPrice = ref(priceList[0]);
const barEl = ref(null);
const tipEl = ref(null);
const setPrice = val => {
	currentPrice.value = val;
	if (tipEl.value) calcPos();
};
const percentageVal = computed(() => {
	return (currentPrice.value / priceList[priceList.length - 1]) * 100;
});
const tipPos = ref(null);
const arrowPos = ref(null);
const progressWidth = ref(0);
const setProgressWidth = () => {
	if (!barEl.value) {
		nextTick(() => {
			progressWidth.value = barEl.value.offsetWidth;
		});
	} else {
		progressWidth.value = barEl.value.offsetWidth;
	}
};
const calcPos = async () => {
	let tipWidth = 0;
	await nextTick(() => {
		tipWidth = tipEl.value.offsetWidth;
	});
	const currentProgressWidth = (percentageVal.value / 100) * progressWidth.value;
	// 초기화
	tipPos.value = 0;
	arrowPos.value = 0;
	// 왼쪽
	if (currentProgressWidth < tipWidth / 2) {
		tipPos.value = currentProgressWidth - tipWidth / 2;
		arrowPos.value = Math.abs(tipPos.value) + 4 + 6 > tipWidth / 2 ? tipPos.value + 4 + 6 : tipPos.value;
	}
	// 오르쪽
	else if (progressWidth.value - currentProgressWidth < tipWidth / 2) {
		tipPos.value = tipWidth / 2 - (progressWidth.value - currentProgressWidth);
		arrowPos.value = tipPos.value + 4 + 6 > tipWidth / 2 ? tipPos.value - 4 - 6 : tipPos.value;
	}
};

onMounted(async () => {
	await setProgressWidth();
	await calcPos();
	window.addEventListener('resize', setProgressWidth);
});
onBeforeUnmount(() => {
	window.removeEventListener('resize', setProgressWidth);
});
</script>

<template>
	<main>
		<ul class="price_area">
			<li v-for="(price, i) in priceList" :key="i">
				<button @click="setPrice(price)">{{ price.toLocaleString() }}</button>
			</li>
		</ul>
		<section>
			<div class="progress_area">
				<progress ref="barEl" max="100" :value="percentageVal"></progress>
				<p
					ref="tipEl"
					class="tooltip"
					:class="{ is_on: arrowPos !== null && tipPos !== null }"
					:style="[{ left: `${percentageVal}%` }, { '--tipPos': tipPos }, { '--arrowPos': arrowPos }]"
				>
					{{ currentPrice.toLocaleString() }}원
				</p>
				<span>{{ priceList[priceList.length - 1].toLocaleString() }}원</span>
			</div>
		</section>
	</main>
</template>

<style scoped>
.price_area {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	list-style: none;
}
.price_area button {
	min-width: 100px;
	padding: 4px 8px;
	color: #555;
	border: 1px solid #ccc;
	background: #f0f0f0;
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
}
.progress_area .tooltip {
	display: flex;
	position: absolute;
	bottom: 100%;
	align-items: center;
	justify-content: center;
	margin-top: 0;
	margin-bottom: 10px;
	margin-left: calc(var(--tipPos) * -1px);
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
.progress_area .tooltip.is_on {
	opacity: 1;
	transition: opacity 0.3s;
}
.progress_area .tooltip::before {
	display: block;
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -4px;
	border-top: 6px solid #000;
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	transform: translateX(calc(var(--arrowPos) * 1px));
}
.progress_area span {
	display: block;
	margin: 4px 0;
	color: #787878;
	font-size: 13px;
	text-align: right;
}
</style>
