<script setup>
import { computed, defineProps, defineEmits } from 'vue';
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	isClose: {
		type: Boolean,
		default: true,
	},
	title: {
		type: String,
		default: '',
	},
});
const $emit = defineEmits(['update:modelValue']);
const handleOpen = computed({
	get() {
		return props.modelValue;
	},
	set() {
		$emit('update:modelValue');
	},
});
</script>

<template>
	<client-only>
		<teleport to="body">
			<aside v-if="handleOpen" class="bottom_sheet_wrap" @click.self="handleOpen = false">
				<div class="bottom_sheet" :class="{ has_title: props.title }">
					<header v-if="props.title" class="bottom_sheet_head">
						<h2>{{ props.title }}</h2>
					</header>
					<div class="bottom_sheet_body">
						<slot></slot>
					</div>
					<footer v-if="$slots.foot" class="bottom_sheet_foot">
						<slot name="foot"></slot>
					</footer>
					<button v-if="props.isClose" @click="handleOpen = false">
						<i class="close">
							<span class="is_blind"></span>
						</i>
					</button>
				</div>
			</aside>
		</teleport>
	</client-only>
</template>

<style scoped lang="scss">
.bottom_sheet_wrap {
	position: fixed;
	inset: 0;
	z-index: 100;
	background: rgba(0, 0, 0, 0.7);
	box-sizing: border-box;
	.bottom_sheet {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: absolute;
		inset: auto 0 0;
		padding: 2rem;
		background: #fff;
		border-radius: 1.6rem 1.6rem 0 0;
		.bottom_sheet_head {
			display: flex;
			line-height: 3rem;
			h2 {
				font-size: 2rem;
				line-height: 3rem;
			}
		}
		&.has_title {
			.bottom_sheet_head {
				padding-right: 3rem;
			}
			& > button {
				position: absolute;
				top: 2rem;
				right: 2rem;
			}
		}
		& > button {
			position: relative;
			order: -1;
			width: 3rem;
			height: 3rem;
			margin-left: auto;
			margin-right: -8px;
			background: transparent;
			border: 0 none;
			&:before,
			&:after {
				display: block;
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				width: 2rem;
				height: 2px;
				margin-left: -1rem;
				margin-top: -1px;
				background: #000;
			}
			&:before {
				transform: rotate(45deg);
			}
			&:after {
				transform: rotate(-45deg);
			}
		}
	}
}
</style>
