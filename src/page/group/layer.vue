<template>
	<draggable :group="{ name: 'form' }" ghost-class="ghost" :list="nav" :animation="300">
		<template v-for="item in nav">
			<div :key="item.index" class="menu__folder" v-if="item.children">
				<div @dblclick="hangeChangeName(item)" @click="handleSetActive(item)"
					@contextmenu.prevent="contain.handleContextMenu && contain.handleContextMenu($event,item)"
					:class="['menu__item--folder',{'is-active':handleGetActive(item) || handleGetActive(item.children),'is-over':contain.overactive===item.index}]">
					<i class="iconfont icon-fold" @click="openFolder(item)" :class="{'is-active':item.menu}"></i>
					<i class="iconfont icon-folder" @click="openFolder(item)"></i>
					<input type="text" @blur="item.isname=false" @keyup.enter="item.isname=false" v-if="item.isname" v-model="item.name">
					<span v-else>{{item.name}}</span>
					<i class="iconfont icon-caidan" style="position: absolute;right: 20px;"
						@click.stop="contain.handleContextMenu && contain.handleContextMenu($event,item,false)"></i>
				</div>
				<div :key="'list'
                 +item.index" class="menu__list" v-show="item.menu">
					<draggable :group="{ name: 'form' }" ghost-class="ghost" :list="item.children" :animation="300">
						<template v-for="citem in item.children">
							<div v-if="!citem.children" :key="citem.index"
								:class="['menu__item',{'is-active':handleGetActive(citem),'is-over':contain.overactive===citem.index}]"
								@click="handleSetActive(citem)"
								@contextmenu.prevent="contain.handleContextMenu && contain.handleContextMenu($event,citem)"
								@mouseover="contain.overactive=citem.index" @mouseout="contain.overactive=undefined">
								<span class="menu__icon">
									<i :class="'iconfont '+citem.icon"></i>
								</span>
								<span>{{citem.name}}</span>
							</div>
							<layer v-else :count="count+1" :key="citem.index" :nav="[citem]"></layer>
						</template>
					</draggable>
				</div>
			</div>
			<div v-else :key="item.index"
				@contextmenu.prevent="contain.handleContextMenu && contain.handleContextMenu($event,item)"
				@click="handleSetActive(item)"
				:class="['menu__item',{'is-active':handleGetActive(item),'is-over': contain.overactive===item.index}]"
				@mouseover="contain.overactive=item.index" @mouseout="contain.overactive=undefined">
				<span class="menu__icon">
					<i :class="'iconfont '+item.icon"></i>
				</span>
				<span>{{item.name}}</span>
			</div>
		</template>
	</draggable>
</template>

<script>
	import {
		uuid
	} from '@/utils/utils'
	import vuedraggable from 'vuedraggable';
	export default {
		name: 'layer',
		inject: ["contain"],
		provide() {
			return {
				contain: this.contain
			};
		},
		components: {
			draggable: vuedraggable
		},
		props: {
			count: {
				type: Number,
				default: 1,
			},
			nav: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		mounted() {
			window.addEventListener('keyup', this.handleKeyup)
		},
		methods: {
			handleKeyup(e) {
				if (e.ctrlKey && e.keyCode === 67) {
					const params = this.contain.findnav(this.contain.active[0], true);
					this.contain.active.forEach(ele => {
						const item = this.contain.findnav(ele, true);
						const obj = this.deepClone(item.obj);
						obj.index = uuid();
						if (obj.children) {
							obj.children.forEach(newEle => {
								newEle.index = uuid()
								newEle.option.index = newEle.index
							})
						} else {
							obj.option.index = obj.index
						}
						if(Array.isArray(params.parent)) {
							params.parent.unshift(obj)
						} else {
							params.parent.children.unshift(obj)
						}
					});
					this.contain.handleInitActive();
				} else if (e.ctrlKey && e.keyCode === 81) {
					if (this.contain.active.length > 0) {
						this.$confirm(`是否删除所选图层?`, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							const params = this.contain.findnav(this.contain.active[0], true);
							this.contain.active.forEach(ele => {
								const item = this.contain.findnav(ele, true);
								if (Array.isArray(params.parent)) {
									params.parent.splice(item.count, 1);
								} else {
									params.parent.children.splice(item.count, 1);
								}
							});
							this.contain.handleInitActive();
						}).catch(() => {})
					}
				}
			},
			handleGetActive(item) {
				if(Array.isArray(item)) {
					let flag = false
					item.forEach(v=>{
						if(this.contain.active.includes(v.index)) {
							flag = true
						}
					})
					return flag
				} else {
					return this.contain.active.includes(item.index);
				}
			},
			handleSetActive(item) {
				if (item.children) {
					let list = item.children.map(ele => ele.index);
					this.contain.selectNav(list);
				} else {
					this.contain.selectNav(item.index);
				}
			},
			hangeChangeName(item) {
				this.$set(item, 'isname', !item.isname)
			},
			openFolder(item) {
				this.$set(item, 'menu', !item.menu)
				item.isname = false;
			},
		}
	}
</script>

<style>
</style>
