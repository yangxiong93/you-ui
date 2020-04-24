<template>
	<view :class="[customClass, tag, plain ? 'van-hairline--surround' : '']"
	  :style="color && !plain ? 'background-color: ' + color + ';' : '' + textColor || (color && plain) ? 'color: ' + (textColor || color) : ''"
	>
	  <slot />
	  <you-icon
	    v-if="closeable"
	    name="cross"
	    custom-class="van-tag__close"
	    @click="onClose"
	  />
	</view>
	
</template>

<script>
	import utils from '../wxs/utils.js';
	import youIcon from '@/components/icon/index.vue';
	
	export default {
		components:{
			youIcon
		},
		props:{
			size: String,
			mark: Boolean,
			color: String,
			plain: Boolean,
			round: Boolean,
			textColor: String,
			type: {
			    type: String,
			    default: 'default'
			},
			closeable: Boolean,
			customClass: String,
		},
		computed: {
			tag: function(){
				let {type, size, mark, plain, round} = this;
				return utils.bem('tag', [type, size, { mark, plain, round }])
			}
		},
		methods: {
		    onClose() {
		        this.$emit('close');
		    }
		}
	}
</script>

<style>
	@import './index.css';
</style>

