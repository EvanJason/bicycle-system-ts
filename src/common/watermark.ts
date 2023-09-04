//单独写一个ts存放水印方法
let watermark: any = {};

let setWatermark = (str, option: any = {}) => {
	let id = 'evanjason';
	if (document.getElementById(id) !== null) {
		document.body.removeChild(document.getElementById(id));
	}

	//创建一个画布
	let can = document.createElement('canvas');
	//设置画布的长宽
	can.width = option.w || 380;
	can.height = option.h || 200;

	let cans = can.getContext('2d');
	//旋转角度
	cans.rotate((-40 * Math.PI) / 180);
	cans.font = 'lighter 18px 微软雅黑';
	//设置填充绘画的颜色、渐变或者模式
	cans.fillStyle = 'rgba(0, 0, 0, 0.15)';
	//设置文本内容的当前对齐方式
	cans.textAlign = 'left';
	//设置在绘制文本时使用的当前文本基线
	cans.textBaseline = 'middle';
	//在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
	cans.fillText(str, can.width / 64, can.height / 1);
	let div = document.createElement('div');
	div.id = id;
	div.style.pointerEvents = 'none';
	div.style.top = option.top || '100px';
	div.style.left = option.left || '180px';
	div.style.position = 'fixed';
	div.style.zIndex = '9999999999';
	div.style.transform = 'rotate(15deg)';
	div.style.width = option.width || document.documentElement.clientWidth + 'px';
	div.style.height = option.height || document.documentElement.clientHeight + 'px';
	div.style.background = `url(${can.toDataURL('image/png')}) left top repeat`;
	document.body.appendChild(div);
	return id;
};

// 该方法只允许调用一次
watermark.set = (str, option) => {
	let id = setWatermark(str, option);
	setInterval(() => {
		if (!document.getElementById(id)) {
			id = setWatermark(str, option);
		}
	}, 500);
	window.onresize = () => {
		setWatermark(str, option);
	};
};

export default watermark;
