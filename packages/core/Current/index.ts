import Factory from '@/core/Base/factory'
import Widget from '@/core/Widget'

export default class Current extends Factory<Current> {
	rulerContainerId: string
	xRoomL2 = 238
	xRoomR1 = 335
	yRoom = 60
	autoAlignGuide = true // 大屏平台状态 是否自动贴靠参考线
	currentEventDisabled = true // 拖动模式/预览模式 控制组件内部事件关闭
	sceneAnimate = '' // 当前场景动画
	activeWidgetId = '' // 被激活的场景对应组件
	activeSceneId: number | string = 0 // 被激活的场景id
	contentMove = false // 是否按下了 空格 键，启动内容区拖动
	widgetMove = false // 组件点击开始拖拽
	fullscreen = false // 大屏平台状态 是否全屏
	zoom = 1 // 当前标尺zoom
	zoomStep = 0.02 // 当前标尺zoom步长
	offsetX = 0 // 当前位置x
	offsetY = 0 // 当前位置y
	currentWidget = {} // 当前组件
	currentWidgetList: string[] = [] // 当前选中组件-多组件
	currentSceneIndex: number | string = 0 // 当前场景
	currentCreateSceneList: Array<number | string> = [] // 当前打开的场景集合
	currentWidgetListConfig = {
		// 当前选中组件-多组件配置
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		z: 0,
	}
	currentRightSettingIndex = 0

	constructor(obj: any) {
		super()
		this.rulerContainerId = obj.rulerContainerId
	}

	clear(): void {
		this.contentMove = false
		this.widgetMove = false
		this.activeSceneId = 0
		this.currentRightSettingIndex = 0
		this.activeWidgetId = ''
		this.sceneAnimate = ''
		this.currentWidget = {}
		this.currentSceneIndex = 0
		this.currentWidgetList = []
		this.currentCreateSceneList = []
		this.currentWidgetListConfig = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			z: 0,
		}
	}

	taggerXRoomL2(): void {
		this.xRoomL2 = this.xRoomL2 > 0 ? 0 : 238
	}
	taggerXRoomR1(): void {
		this.xRoomR1 = this.xRoomR1 > 0 ? 0 : 335
	}
	/* 放大画布 */
	zoomIn(step = 2): void {
		this.zoom = +((this.zoom * 100 + step) / 100).toFixed(2)
	}
	/* 缩小画布 */
	zoomOut(step = 2): void {
		if (this.zoom * 100 > 20) {
			this.zoom = +((this.zoom * 100 - step) / 100).toFixed(2)
		}
	}
	/* 画布还原最佳比例 */
	resetZoom({ screenWidth, screenHeight }: any = {}): void {
		const dom: HTMLElement = document.getElementById(this.rulerContainerId)
		const rulerOffsetWidth = dom.offsetWidth - 18
		let zoom = ~~((rulerOffsetWidth / screenWidth) * 100) / 100
		if (zoom % 2 !== 0) zoom = zoom - 0.1
		if (zoom < 0.2) {
			zoom = 0.2
		}
		this.zoom = zoom
		const rulerOffsetHeight = dom.offsetHeight
		this.offsetX = (rulerOffsetWidth - screenWidth) * 0.5
		this.offsetY = (rulerOffsetHeight - screenHeight) * 0.5
	}
	/* 选中组件 */
	selectWidget(widget: Widget): void {
		if (this.currentWidgetList.includes(widget.id)) {
			this.currentWidgetList.splice(this.currentWidgetList.indexOf(widget.id), 1)
		} else {
			this.currentWidgetList = [...this.currentWidgetList, widget.id]
		}
		if (this.currentWidgetList.length == 1) {
			this.currentWidget = widget
		} else {
			this.currentWidget = null
		}
	}
	/* 取消选中组件 */
	unSelectWidget(): void {
		this.currentWidget = null
		this.currentWidgetList = []
	}
	/* 取消选中组件集合 */
	unSelectWidgetList(): void {
		this.currentWidgetList = []
	}
	selectWidgetList(config: any): void {
		this.currentWidgetListConfig = config
	}
	/* 选中场景 */
	selectSceneIndex(val: number | string): void {
		if (val === undefined || val === null) return
		this.currentSceneIndex = val
		window.cakeV.scene ? (window.cakeV.scene.state.index = val) : void 0 // 兼容老版本
		this.activeSceneId = val
		let event = new CustomEvent('SceneIndex', { detail: { index: val } })
		document.dispatchEvent(event)
		event = null
	}
	/* 打开场景 */
	openScene(id: number | string, animate?: string): void {
		this.sceneAnimate = animate || this.sceneAnimate
		this.activeSceneId = id
		this.currentCreateSceneList.push(id)
	}
	/* 关闭场景 */
	closeScene(id: string): void {
		const index = this.currentCreateSceneList.findIndex(v => v === id)
		if (index === -1) return
		this.activeSceneId = id
		this.activeWidgetId = ''
	}
}
