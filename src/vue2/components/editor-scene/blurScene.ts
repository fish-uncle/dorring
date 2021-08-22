import { reactive } from 'vue'
import Manager from '@/core/Manager'

const manager: Manager = Manager.Instance()
const state = reactive({ manager })

export default (id,data) => {
	if (state.manager.screen.currentScene.name.replace(/[\r\n]/g, '') === '') {
		state.manager.screen.currentScene.name = '未命名场景'
		data.dom[id].focus()
		setTimeout(() => {
			data.dom[id].select()
		})
	} else {
		data.editScene[id] = false
	}
}
