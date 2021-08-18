﻿import { Notification, MessageBox } from 'element-ui'
import Manager from '@/core/Manager'
const manager: Manager = Manager.Instance()

export default () => {
	const message =
		manager.screen.currentScene.id === '-1'
			? '清空回收站？所有组件将不复存在'
			: '清空当前场景？该场景所有组件将进入回收站'
	MessageBox.confirm(message, '确认信息', {
		confirmButtonText: '确认',
		cancelButtonText: '放弃',
	}).then(() => {
		const message =
			manager.screen.currentScene.id === '-1' ? '场景名：回收站' : `场景名：${manager.screen.currentScene.name}`
		Notification({
			title: '清空场景成功',
			type: 'success',
			message: message,
		})
		manager.screen.clearScene()
	})
}
