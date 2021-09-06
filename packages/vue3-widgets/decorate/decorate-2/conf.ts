import conf from '@dorring/sdk/core/Widget/conf'
const type = 'dorring-decorate-2'
const avatar = require('./avatar.png')

export default new conf({
	width: 200,
	height: 40,
	type,
	avatar,
	version: '1.0.0',
	backgroundColor: ['rgba(40, 80, 102,1)', 'rgba(40, 80, 102,0)'],
	name: '渐变背景',
})
