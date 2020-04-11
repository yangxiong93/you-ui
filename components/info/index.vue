<template>
	<view
	  v-if="info !== null && info !== '' || dot"
	  class="custom-class you-info"
	  :class="info"
	  :style="customStyle"
	>{{ dot ? '' : info }}</view>
</template>

<script>
import utils from '../wxs/utils.js';
export default {
	name: 'youInfo',
	props: {
		customStyle: {
			type: String,
			default: ''
		},
		dot: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		info: function() {
			let dot = this.dot;
			let info = utils.bem('info', { dot });
			return info
		}
	}
}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
