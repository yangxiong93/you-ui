<template>
	<view
	  v-if="inited"
	  :class="[customClass,classes,'you-transition']"
	  :style="'transition-duration:' + currentDuration + 'ms;' + 'display:' + display + ';' + customStyle"
	  @click.stop="onClick"
	>
	  <slot />
	</view>
</template>

<script>
	import { transition } from '../mixins/transition.js';
	export default {
		name: 'youTransition',
		mixins: [transition(true)],
		methods: {
			onClick(){
				this.$emit('click');
			}
		}
	}
</script>


<style>
@import '../common/index.css';
@import './index.css';
.you-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	background-color: var(--overlay-background-color, rgba(0, 0, 0, 0.7));
}
</style>
