<script setup>
import BaseBottomSheet from '~/components/common/BaseBottomSheet.vue';
import { ref, computed, nextTick, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	currentPrice: {
		type: Number,
		default: null,
	},
	maxPrice: {
		type: Number,
		default: null,
	},
});

const $emit = defineEmits(['update:modelValue']);
const isShow = computed({
	get() {
		return props.modelValue;
	},
	set() {
		$emit('update:modelValue');
	},
});

const barEl = ref(null);
const tipEl = ref(null);

const percentageVal = computed(() => {
	const percent = props.currentPrice / props.maxPrice;
	if (tipEl.value) calcPos();
	return (percent > 1 ? 1 : percent < 0 ? 0 : percent) * 100;
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
		tipPos.value = Math.floor(currentProgressWidth - tipWidth / 2);
		arrowPos.value = tipPos.value < 4 + 6 ? tipPos.value + 4 + 6 : tipPos.value;
	}
	// 오르쪽
	else if (progressWidth.value - currentProgressWidth < tipWidth / 2) {
		tipPos.value = Math.floor(tipWidth / 2 - (progressWidth.value - currentProgressWidth));
		arrowPos.value = tipPos.value > 4 + 6 ? tipPos.value - 4 - 6 : tipPos.value;
	}
};

onMounted(async () => {
	await setProgressWidth();
});
</script>

<template>
	<BaseBottomSheet v-model="isShow" title="결제 금액">
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
				<p>{{ maxPrice.toLocaleString() }}원</p>
			</div>
		</section>
		<template #foot>
			<div class="btn_area">
				<button @click="isShow = false">확인</button>
			</div>
		</template>
	</BaseBottomSheet>
</template>

<style scoped lang="scss">
.progress_area {
	position: relative;
	margin-top: 50px;
	progress {
		width: 100%;
		height: 16px;
		appearance: none;
		&::-webkit-progress-bar {
			overflow: hidden;
			background: #f0f0f0;
			border: 0 none;
			border-radius: 12px;
		}
		&::-webkit-progress-value {
			background: #43f15e;
			border-radius: 12px;
		}
	}
	.tooltip {
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
		&.is_on {
			opacity: 1;
			transition: opacity 0.3s;
		}
		&::before {
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
	}
	& > p {
		margin-top: 0.8rem;
		font-size: 14px;
		text-align: right;
		opacity: 0.5;
	}
}
.btn_area {
	display: flex;
	gap: 0.8rem;
	button {
		flex: 1;
		padding: 1rem;
		background: #000;
		color: #fff;
		font-size: 1.4rem;
	}
}
</style>
