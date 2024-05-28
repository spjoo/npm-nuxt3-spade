<script setup>
import { ref, nextTick, computed } from 'vue';

const priceList = [0, 5000, 20000, 50000, 90000, 95000, 100000];
const arrowMargin = 6; //최소마진
const priceLast = priceList.length - 1; // 가격
const LastPrice = priceList[priceLast];
const currentPrice = ref(priceList[0]);
const tooltipRef = ref(null);
const progressBarRef = ref(null);

const toolTipStatus = ref(false);
const toolTipLeft = ref(0);
const toolTipRight = ref(0);
const toolTipPosX = ref(0);
const pointPos = ref(0);

const isBottomSheet = ref(false);

const progressValue = computed(() => {
	return (currentPrice.value / priceList[priceLast]) * 100;
});

const openBottomSheet = (name, data) => {
	if (name === 'price_btn') {
		currentPrice.value = data;
		toolTipStatus.value = true;
		nextTick(() => {
			console.log(tooltipRef.value);
			widthCalc();
			console.log(tooltipRef.value);
		});
		console.log(tooltipRef.value);
	}
	isBottomSheet.value = true;
};
const closeBottomSheet = () => {
	isBottomSheet.value = false;
};
const widthCalc = () => {
	// if (!tooltipRef.value || !progressBarRef.value) return;
	console.log(tooltipRef.value);

	// const toolTipWidth = tooltipRef.value.offsetWidth;
	// const leftOffset = tooltipRef.value.offsetLeft;
	// const progressWidth = progressBarRef.value.offsetWidth;
	//
	// console.log(tooltipRef.value);
	// //툴팁 왼쪽 값
	// toolTipLeft.value = Math.floor(toolTipWidth / 2 - leftOffset + toolTipPosX.value);
	// //툴팁 오른쪽 값
	// toolTipRight.value = Math.floor(progressWidth - (toolTipWidth / 2 + leftOffset - toolTipPosX.value));
	//
	// //초기화
	// toolTipPosX.value = 0;
	// pointPos.value = 0;
	//
	// //왼쪽
	// if (-toolTipLeft.value < 0) {
	// 	toolTipPosX.value = toolTipLeft.value;
	// 	pointPos.value = toolTipPosX.value;
	//
	// 	if (toolTipWidth / 2 - pointPos.value < arrowMargin) {
	// 		pointPos.value = toolTipPosX.value - arrowMargin - 4;
	// 	}
	// }
	// //오른쪽
	// else if (toolTipRight.value < 0) {
	// 	toolTipPosX.value = toolTipRight.value;
	// 	pointPos.value = toolTipPosX.value;
	//
	// 	if (toolTipWidth / 2 + toolTipPosX.value < arrowMargin) {
	// 		pointPos.value = toolTipPosX.value + arrowMargin + 4;
	// 	}
	// }
};
</script>

<template>
	<main id="main">
		<ul class="price_area">
			<li v-for="(price, i) in priceList" :key="i">
				<button @click="openBottomSheet('price_btn', price)">
					{{ price.toLocaleString() }}
				</button>
			</li>
		</ul>

		<Teleport to="body">
			<div v-if="isBottomSheet" class="bottom_sheet">
				<div class="bottom_sheet_wrap">
					<div class="bottom_sheet_bar"></div>
					<div class="bottom_sheet_inner">
						<div class="progress_area">
							<progress ref="progressBarRef" max="100" :value="progressValue"></progress>

							<p
								ref="tooltipRef"
								class="tooltip"
								:class="toolTipStatus ? 'on' : ''"
								:style="[{ left: `${progressValue}%` }, { marginLeft: `${toolTipPosX}px` }]"
							>
								{{ currentPrice.toLocaleString() }}원
							</p>
							<span>{{ LastPrice.toLocaleString() }}원</span>
						</div>
					</div>
					<div class="btn_area">
						<button @click="closeBottomSheet()">확인</button>
					</div>
				</div>

				<div class="dim" @click="closeBottomSheet()"></div>
			</div>
		</Teleport>
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

/*바텀시트*/
.bottom_sheet {
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100dvh;
	z-index: 100;
}
.bottom_sheet_wrap {
	position: absolute;
	bottom: 0;
	width: 100%;
	max-height: 80%;
	min-height: 50%;
	border-radius: 2rem 2rem 0 0;
	background: #fff;
	z-index: 101;
}
.bottom_sheet_bar {
	padding: 1rem;
	position: relative;
}
.bottom_sheet_bar:before {
	content: '';
	width: 2rem;
	height: 0.2rem;
	background: #ccc;
	position: absolute;
	left: 50%;
	top: 50%;
	border-radius: 0.2rem;
	transform: translate(-50%, -50%);
}
.bottom_sheet_inner {
	padding: 2rem;
	max-height: 25rem;
	min-height: 11.5rem;
	overflow-y: auto;
}
.btn_area {
	padding: 1.5rem 2rem;
}
.btn_area button {
	width: 100%;
	border: none;
	font-size: 1rem;
	color: #333;
	padding: 1rem;
	border-radius: 0.5rem;
}
.dim {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 100;
}
/*프로그레스바 스타일*/
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
