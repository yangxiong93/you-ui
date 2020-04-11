<template>
	<view class="you-picker custom-class">
		<toolbar v-if="toolbarPosition === 'top'" :showToolbar="showToolbar" :cancelButtonText="cancelButtonText" :title="title" :confirmButtonText="confirmButtonText" @confirm="emit" @cancel="emit"></toolbar>
		<view v-if="loading" class="you-picker__loading"><loading color="#1989fa" /></view>
		<view class="you-picker__columns" :style="{ height: itemHeight * visibleItemCount + 'px' }" catch:touchmove="noop">
			<picker-column
				class="you-picker__column"
				v-for="(item, index) in simple ? [columns] : columns"
				:key="index"
				:dataIndex="index"
				custom-class="column-class"
				:value-key="valueKey"
				:initial-options="simple ? item : item.values"
				:default-index="item.defaultIndex || defaultIndex"
				:item-height="itemHeight"
				:visible-item-count="visibleItemCount"
				active-class="active-class"
				@change="onChange"
			/>
			<view class="you-picker__mask" :style="{backgroundSize: '100% ' + (itemHeight * visibleItemCount - itemHeight) / 2 + 'px'}" />
			<view class="you-picker__frame you-hairline--top-bottom" :style="{ height: itemHeight + 'px' }" />
		</view>
		<toolbar
			v-if="toolbarPosition === 'bottom'"
			:showToolbar="showToolbar"
			:cancelButtonText="cancelButtonText"
			:title="title"
			:confirmButtonText="confirmButtonText"
		></toolbar>
	</view>
</template>

<script>
import { pickerProps } from './shared';
import toolbar from './toolbar';
import pickerColumn from '@/components/picker-column/index.vue';
export default {
	name: 'youPickerColumn',
	components: {
		toolbar,
		pickerColumn
	},
	props: Object.assign(Object.assign({}, pickerProps), {
		valueKey: {
			type: String,
			default: 'text'
		},
		toolbarPosition: {
			type: String,
			default: 'top'
		},
		columns: {
			type: [Object,Array],
			default: []
		},
		defaultIndex: {
			type: [Number,String],
			default: (v)=>{
				return parseInt(v);
			}
		}
	}),
	beforeCreate() {
		this.children = [];
	},
	computed:{
		simple:function() {
			let columns = this.columns;
			return columns.length && !columns[0].values;
		}
	},
	watch: {
		columns: {
			handler (newV, oldV) {
				if (Array.isArray(newV) && newV.length) {
					this.setColumns().catch(() => { });
				}
            },
			deep: true
         },
	},
	mounted(){
		this.children = this.selectAllComponents('.you-picker__column');
		if (Array.isArray(this.children) && this.children.length) {
			this.setColumns().catch(() => { });
		}
	},
	methods: {
		noop() {},
		setColumns() {
			const data = this;
			const columns = this.simple ? [{ values: data.columns }] : data.columns;
			const stack = columns.map((column, index) => this.setColumnValues(index, column.values));
			return Promise.all(stack);
		},
		emit(type){
			if (this.simple) {
				this.$emit(type, {
					value: this.getColumnValue(0),
					index: this.getColumnIndex(0)
				});
			} else {
				this.$emit(type, {
					value: this.getValues(),
					index: this.getIndexes()
				});
			}
		},
		onChange(event) {
			let that = this;
			let picker = {getValues:that.getValues,setColumnValues:that.setColumnValues};
			if (this.simple) {
				this.$emit('change', {
					picker: picker,
					value: this.getColumnValue(0),
					index: this.getColumnIndex(0)
				});
			} else {
				this.$emit('change', {
					picker: picker,
					value: this.getValues(),
					index: event.dataIndex
				});
			}
		},
		// get column instance by index
		getColumn(index) {
			return this.children[index];
		},
		// get column value by index
		getColumnValue(index) {
			const column = this.getColumn(index);
			return column && column.data.getValue();
		},
		// set column value by index
		setColumnValue(index, value) {
			const column = this.getColumn(index);
			if (column == null) {
				return Promise.reject(new Error('setColumnValue: 对应列不存在'));
			}
			return column.setValue(value);
		},
		// get column option index by column index
		getColumnIndex(columnIndex) {
			return (this.getColumn(columnIndex) || {}).data.currentIndex;
		},
		// set column option index by column index
		setColumnIndex(columnIndex, optionIndex) {
			const column = this.getColumn(columnIndex);
			if (column == null) {
				return Promise.reject(new Error('setColumnIndex: 对应列不存在'));
			}
			return column.setIndex(optionIndex);
		},
		// get options of column by index
		getColumnValues(index) {
			return (this.children[index] || {}).data.options;
		},
		// set options of column by index
		setColumnValues(index, options, needReset = true) {
			const column = this.children[index];
			if (column == null) {
				return Promise.reject(new Error('setColumnValues: 对应列不存在'));
			}
			const isSame = JSON.stringify(column.data.options) === JSON.stringify(options);
			if (isSame) {
				return Promise.resolve();
			}
			return column.$vm.set({options: options}).then(() => {
				if (needReset) {
					column.setIndex(0);
				}
			})
		},
		// get values of all columns
		getValues() {
			return this.children.map(child => child.$vm.getValue());
		},
		// set values of all columns
		setValues(values) {
			const stack = values.map((value, index) => this.setColumnValue(index, value));
			return Promise.all(stack);
		},
		// get indexes of all columns
		getIndexes() {
			return this.children.map(child => child.data.currentIndex);
		},
		// set indexes of all columns
		setIndexes(indexes) {
			const stack = indexes.map((optionIndex, columnIndex) => this.setColumnIndex(columnIndex, optionIndex));
			return Promise.all(stack);
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
