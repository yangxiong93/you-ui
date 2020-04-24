<template>
		<button
		  :id="id"
		  :class="[customClass, button, hairline ? 'you-hairline--surround' : '']"
		  hover-class="you-button--active hover-class"
		  :lang="lang"
		  :style="baseStyle + customStyle"
		  :open-type="openType"
		  :business-id="businessId"
		  :session-from="sessionFrom"
		  :send-message-title="sendMessageTitle"
		  :send-message-path="sendMessagePath"
		  :send-message-img="sendMessageImg"
		  :show-message-card="showMessageCard"
		  :app-parameter="appParameter"
		  :aria-label="ariaLabel"
		  @tap="onClick"
		  @getuserinfo="bindGetUserInfo"
		  @contact="bindContact"
		  @getphonenumber="bindGetPhoneNumber"
		  @error="bindError"
		  @launchapp="bindLaunchApp"
		  @opensetting="bindOpenSetting"
		>
		  <template v-if="loading">
		    <you-loading
		      customClass="loading-class"
		      :size="loadingSize"
		      :type="loadingType"
		      :color="type === 'default' ? '#c9c9c9' : 'white'"
		    />
		    <view
		      v-if="loadingText"
		      class="you-button__loading-text"
		    >
		      {{ loadingText }}
		    </view>
		  </template>
		  <template v-else>
		    <you-icon
		      v-if="icon"
		      size="1.2em"
		      :name="icon"
		      class="you-button__icon"
		      customStyle="line-height: inherit;"
		    />
		    <view class="you-button__text">
		      <slot />
		    </view>
		  </template>
		</button>
</template>

<script>
	import { button } from '../mixins/button.js';
	import { openType } from '../mixins/open-type.js';
	import { basic } from '../mixins/basic.js';
	import utils from '../wxs/utils.js';
	import youIcon from '@/components/icon/index.vue';
	import youLoading from '@/components/loading/index.vue';
	
	export default {
		name: 'youButton',
		components: {
			youIcon,
			youLoading
		},
		mixins: [button(), openType(), basic()],
		props: {
			icon: String,
			plain: Boolean,
			block: Boolean,
			round: Boolean,
			square: Boolean,
			loading: Boolean,
			hairline: Boolean,
			disabled: Boolean,
			loadingText: String,
			customStyle: String,
			loadingType: {
				type: String,
				default: 'circular'
			},
			type: {
				type: String,
				default: 'default'
			},
			size: {
				type: String,
				default: 'normal'
			},
			loadingSize: {
				type: String,
				default: '20px'
			},
			color: String,
			customClass: '',
		},
		computed: {
			button: function(){
				let {type, size, block, round, plain, square, loading, disabled, hairline} = this;
				return utils.bem('button', [type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }])
			},
			baseStyle:function(){
				let style = '';
				let color  =this.color;
				if (color) {
				    style += `color: ${this.plain ? color : 'white'};`;
				    if (!this.plain) {
				        // Use background instead of backgroundColor to make linear-gradient work
				        style += `background: ${color};`;
				    }
				    // hide border when color is linear-gradient
				    if (color.indexOf('gradient') !== -1) {
				        style += 'border: 0;';
				    }
				    else {
				        style += `border-color: ${color};`;
				    }
					return style
				}else{
					return ''
				}
			}
		},
		methods: {
			onClick() {
				if (!this.loading) {
					this.$emit('click');
				}
			},
			noop() { }
		}
	}
</script>

<style>
	@import './index.css';
</style>
