<template>
	<demo-block title="基础用法" padding>
		<you-cell title="Fade" @click="onClickFade" is-link />
		<you-cell title="Fade Up" @click="onClickFadeUp" is-link />
		<you-cell title="Fade Down" @click="onClickFadeDown" is-link />
		<you-cell title="Fade Left" @click="onClickFadeLeft" is-link />
		<you-cell title="Fade Right" @click="onClickFadeRight" is-link />
		<you-cell title="Slide Up" @click="onClickSlideUp" is-link />
		<you-cell title="Slide Down" @click="onClickSlideDown" is-link />
		<you-cell title="Slide Left" @click="onClickSlideLeft" is-link />
		<you-cell title="Slide Right" @click="onClickSlideRight" is-link />
		<you-cell title="Custom" @click="onClickCustom" is-link />

		<you-transition :show="show" :name="name" custom-class="block" />
		<you-transition
			:show="showCustom"
			name=""
			:duration="{ enter: 300, leave: 1000 }"
			custom-class="block"
			enter-class="you-enter-class"
			enter-active-class="you-enter-active-class"
			leave-active-class="you-leave-active-class"
			leave-to-class="you-leave-to-class"
			bind:before-enter="onBeforeEnter"
			bind:enter="onEnter"
			bind:after-enter="onAfterEnter"
			bind:before-leave="onBeforeLeave"
			bind:leave="onLeave"
			bind:after-leave="onAfterLeave"
		/>
	</demo-block>
</template>

<script>
import demoBlock from '@/components/demo-block/index.vue';
import youCell from '@/components/cell/index.vue';
import youTransition from '@/components/transition/index.vue';

export default {
	components: {
		demoBlock,
		youCell,
		youTransition
	},
	data() {
		return {
			show: false,
			name: 'fade',
			showCustom: false
		};
	},
	methods: {
		onClickFade() {
			this.trigger('fade');
		},

		onClickFadeUp() {
			this.trigger('fade-up');
		},

		onClickFadeDown() {
			this.trigger('fade-down');
		},

		onClickFadeLeft() {
			this.trigger('fade-left');
		},

		onClickFadeRight() {
			this.trigger('fade-right');
		},

		onClickSlideUp() {
			this.trigger('slide-up');
		},

		onClickSlideDown() {
			this.trigger('slide-down');
		},

		onClickSlideLeft() {
			this.trigger('slide-left');
		},

		onClickSlideRight() {
			this.trigger('slide-right');
		},

		trigger(name) {
			this.name = name; 
			this.show = true;
			setTimeout(() => {
				this.show = false;
			}, 500);
		},

		onClickCustom() {
			this.showCustom = true;
			setTimeout(() => {
				this.showCustom = false;
			}, 1000);
		},

		onBeforeEnter() {
			console.log('before enter');
		},

		onEnter() {
			console.log('enter');
		},

		onAfterEnter() {
			console.log('after enter');
		},

		onBeforeLeave() {
			console.log('before leave');
		},

		onLeave() {
			console.log('leave');
		},

		onAfterLeave() {
			console.log('after leave');
		}
	}
};
</script>

<style>
.block {
	position: fixed;
	top: 50%;
	left: 50%;
	width: 100px;
	height: 100px;
	margin: -50px 0 0 -50px;
	background-color: #1989fa;
}

.you-enter-active-class,
.you-leave-active-class {
	transition-property: background-color, transform;
}

.you-enter-class,
.you-leave-to-class {
	background-color: red;
	transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
</style>
