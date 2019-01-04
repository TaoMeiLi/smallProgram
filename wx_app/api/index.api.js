const {
	random
} = require('lodash');
const {
	mock_host,
	mock_port
} = require('../dev.config');

const HOST = `http://${mock_host}:${mock_port}`; //小程序规定引用的图片等必须为https完整绝对路径

/*主页*/
module.exports = (app, prefix) => {

	/**
	 * 获得首页数据
	 * =======================================
	 * @prop head_swiper 活动轮播图
	 * @prop activity 公告信息
	 * @prop tables 桌台信息
	 * @prop shops 门店信息
	 */
	app.get(`${prefix}/index`, function(req, res) {

		const {
			login_state
		} = req.query;
		
		res.json({
			errcode: 0, //random(0, 1),
			errmsg: '很抱歉发生了某些错误',
			result: {
				weapp_pagetitle: "微生活(奥林匹克公园站)",
				head_swiper: [ //活动轮播图
					{
						swiper_id: "001",
						title: "",
						pic: "https://yulongge.github.io/images/wxdc/swiper.png",
					},
					{
						swiper_id: "002",
						title: "",
						pic: "https://yulongge.github.io/images/wxdc/swiper.png",
					},
					{
						swiper_id: "003",
						title: "",
						pic: "https://yulongge.github.io/images/wxdc/swiper.png",
					}
				],
				activity: { //公告信息
					discount: [ //活动折扣
						{
							title: "满400减20",
							type: "1" //公告类型（0-默认，1-满，2-赠，3-特，4-折，5-惠）- string类型
						},
						{
							title: "全场活动菜品满200享9折优惠",
							type: "2"
						},
						{
							title: "买烤鱼赠可乐",
							type: "3"
						},
						{
							title: "吃纽约客送你去纽约",
							type: "1"
						},
						{
							title: "全场赠送饮料",
							type: "2"
						},
						{
							title: "啤酒畅饮，来欢快吧",
							type: "3"
						},
						{
							title: "无敌的多么的寂寞，送你一杯酸梅汤",
							type: "1"
						},
					],
					notice: [ //公告
						{
							title: "本店新开业，欢迎品尝",
						},
						{
							title: "试吃进行中: 2018-5-11 至 2018-6-1",
						},
						{
							title: "充一百增二百，火速来报",
						},
						{
							title: "寿司在等你: 八折中...",
						},
						{
							title: "有缘千里来吃粉，新会员五折优惠",
						}
					]
				}
			}
		});
	});

}