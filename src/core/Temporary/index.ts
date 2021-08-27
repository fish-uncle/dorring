import Factory from '@/core/Base/factory'

export default class Temporary extends Factory<Temporary> {
	vLine = [] // 参考线
	hLine = []
	zoom = 1 // 放大缩小比例
	offsetX = 0 // 画布偏移量
	offsetY = 0
	editorContentDrag = false // 画布拖动
	editorContentDragging = false // 画布拖动中
	editorContentStartX = 0
	editorContentStartY = 0
	sceneRightMenu = false // 右键场景
	sceneRightMenuX = 0
	sceneRightMenuY = 0
	widgetRightMenu = false // 右键单个组件
	widgetRightMenuX = 0
	widgetRightMenuY = 0
	widgetsRightMenu = false // 右键多个组件
	widgetsRightMenuX = 0
	widgetsRightMenuY = 0
	draggable: {} // 拖动参数

	clearRightMenu() {
		this.widgetRightMenu = false
		this.widgetsRightMenu = false
		this.sceneRightMenu = false
	}

	scrollLeft(step = 10) {
		this.offsetX -= step
	}

	scrollRight(step = 10) {
		this.offsetX += step
	}

	scrollTop(step = 10) {
		this.offsetY += step
	}

	scrollBottom(step = 10) {
		this.offsetY -= step
	}

	zoomIn(step = 2) {
		this.zoom = +((this.zoom * 100 + step) / 100).toFixed(2)
	}

	zoomOut(step = 2): void {
		if (this.zoom * 100 > 20) {
			this.zoom = +((this.zoom * 100 - step) / 100).toFixed(2)
		}
	}

	clear() {
		this.vLine = []
		this.hLine = []
	}

	constructor() {
		super()
	}
}
