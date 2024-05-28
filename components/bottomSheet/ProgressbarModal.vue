<template>
	<teleport to="body">
		<div class="modal">
			<div class="blank" @click="$emit('close')"></div>
			<div class="modal-content">
				<div ref="boxRef" class="range_box">
					<input v-model="sliderValue" type="range" readonly />
					<div ref="tipRef" class="tooltip" :style="{ left: inputValue }">
						<p>{{ commas(price) }}원</p>
						<span class="arrow" :style="{ left: arrowValue === null ? '50%' : arrowValue }"></span>
					</div>
				</div>
				<button @click="$emit('close')">확인</button>
			</div>
		</div>
	</teleport>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
export default {
	props: {
		price: {
			type: Number,
			default: 0,
		},
	},
	setup(props) {
		const maxAmount = 100000; // 최대 금액
		const priceValue = ref(props.price); // price 값을 복사
		const sliderValue = ref(0); // input 값
		const boxRef = ref(null);
		const boxWidth = ref(0);
		const tipRef = ref(null);
		const tipWidth = ref(0);

		//숫자 3자리수 콤마 코드
		function commas(x) {
			try {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			} catch (e) {
				return '0';
			}
		}
		// 요소넓이 계산
		function measureMaxWidth() {
			nextTick(() => {
				if (boxRef.value) {
					boxWidth.value = boxRef.value.offsetWidth;
				}
				if (tipRef.value) {
					tipWidth.value = tipRef.value.offsetWidth;
				}
			});
		}
		// 금액 백분율 계산
		const sliderValuePercentage = e => {
			const result = (e / maxAmount) * 100;
			return result;
		};
		// 툴팁 이동값 계산
		const inputValue = computed(() => {
			const valueWidth = (sliderValue.value / 100) * boxWidth.value;
			const tipHalf = tipWidth.value / 2;
			const result =
				valueWidth > boxWidth.value - tipHalf
					? `${boxWidth.value - tipWidth.value}px`
					: `${valueWidth - tipHalf <= 0 ? 0 : valueWidth - tipHalf}px`;
			return result;
		});
		// 툴팁 화살표 이동값 계산
		const arrowValue = computed(() => {
			// 툴팁절반 tipHalf
			const valueWidth = (sliderValue.value / 100) * boxWidth.value;
			const tipHalf = tipWidth.value / 2;
			let result = null;
			// 요건의 6px + 화살표 넓이 6px = 12px
			if (valueWidth - tipHalf <= 0) {
				result =
					tipHalf - 12 < tipHalf - valueWidth
						? `calc(50% - ${Math.floor(tipHalf - 12)}px)`
						: `calc(50% - ${Math.floor(tipHalf - valueWidth)}px)`;
			} else if (valueWidth > boxWidth.value - tipHalf) {
				result =
					Math.abs(boxWidth.value - tipHalf - valueWidth) < tipHalf - 12
						? `calc(50% + ${Math.floor(Math.abs(boxWidth.value - tipHalf - valueWidth))}px)`
						: `calc(50% + ${Math.floor(tipHalf - 12)}px)`;
			} else {
				result = null;
			}
			return result;
		});
		// props 값 변경 시 로컬 상태 업데이트
		watch(
			() => props.price,
			newPrice => {
				priceValue.value = newPrice;
			},
		);

		onMounted(() => {
			sliderValue.value = sliderValuePercentage(priceValue.value);
			measureMaxWidth();
			window.addEventListener('resize', measureMaxWidth);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('resize', measureMaxWidth);
		});

		return {
			sliderValue,
			commas,
			inputValue,
			arrowValue,
			boxRef,
			boxWidth,
			tipRef,
			tipWidth,
			sliderValuePercentage,
		};
	},
};
</script>

<style scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}
.blank {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
	position: relative;
	width: 100vw;
	padding: 50px 40px;
	background-color: white;
	border-radius: 5px;
}
.modal-content button {
	width: 100%;
	box-shadow: none;
	background: #097cff;
	color: #fff;
	border: none;
	padding: 15px 0;
	border-radius: 8px;
}
.range_box {
	position: relative;
	width: 100%;
	padding-top: 50px;
	margin: 0 auto 80px;
}
input[type='range'] {
	display: block;
	width: 100%;
	height: 15px;
	margin: 0;
	overflow: hidden;
	background-color: #dfdfdf;
	border-radius: 10px;
	pointer-events: none;
	-webkit-appearance: none;
}
input[type='range']::-webkit-slider-runnable-track {
	height: 10px;
	color: #097cff;
	margin-top: -1px;
	-webkit-appearance: none;
}
input[type='range']::-webkit-slider-thumb {
	width: 0;
	height: 10px;
	cursor: ew-resize;
	background: #097cff;
	box-shadow: -100vw 0 0 100vw #097cff;
	-webkit-appearance: none;
}
.tooltip {
	position: absolute;
	top: 22px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
}
.tooltip p {
	padding: 2px 16px;
	min-width: 18px;
	font-size: 13px;
	background: #333;
	color: #fff;
	border-radius: 5px;
	white-space: nowrap;
	margin: 0;
}
.arrow {
	display: block;
	position: absolute;
	top: 19px;
	left: 50%;
	transform: translateX(-50%);
	border-top: 6px solid #333;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-bottom: 0px solid transparent;
}
</style>
