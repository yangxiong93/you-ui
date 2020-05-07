<template>
	<you-transition :show="show" custom-class="you-overlay" :custom-style="'z-index:' + zIndex + ';' + customStyle" :duration="duration" @click="onClick" catch:touchmove="noop">
		<slot></slot>
	</you-transition>
</template>

<script>
import youTransition from '@/components/transition/index.vue';
export default {
	name: 'youOverlay',
	components: {
		youTransition
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		customStyle: {
			type: String,
			default: ''
		},
		duration: {
			type: null,
			default: 300
		},
		zIndex: {
			type: Number,
			default: 1
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
		},
		// for prevent touchmove
		noop() { }
	}
};
</script>

<style>
@import '../common/index.css';
</style>
