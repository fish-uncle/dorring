export const customConfig = [
	{
		prop: 'title',
		label: '标题',
		type: 'func-select',
		options: ['a', 'b'],
	},
]
import { WidgetTask } from '@/index'

export default new WidgetTask({
	widgetApi: {
		data: JSON.stringify({ title: '标题' }),
	},
	widgetLayout: {
		width: 480,
		height: 43,
	},
	widgetTypeId: '装饰图',
	widgetIs: 'test-normal2',
	widgetAvatar: require('./snapshot.png'),
	widgetConfig: {
		title: 'a',
		backgrounds: [
			{
				background: '/static/icons/s-progress1-1.svg',
				title: '开户(户)',
			},
		],
	},
})