window.onresize = function() {
	judge();
}
// 可能加载的时候大小就不对
window.onload = function() {
	judge();
}

document.onscroll = function() {
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	var colLand = document.querySelector('.col-md');
	var centerBox = document.querySelector('.goods-box');
	
	if (window.pageYOffset > 2500 && (colLand.style.display == 'block')) {
		colLand.style.display = 'none';
		// 缓动
		slowAnima(150, centerBox, 'marginLeft');
	}
	
	if(window.pageYOffset == 0 && (colLand.style.display == 'none')) {
		// 缓动浮出效果
		slowAnima(0, centerBox, 'marginLeft');
		// 透明浮出
		colLand.style.display = 'block';
		colLand.style.opacity = 0.1;
		slowAnima(1, colLand, 'opacity', 0.15, 40, 0.01);
	}
}

var reTime;
var reTime2;

function slowAnima(target, Box, type, coeffic, smaTime, errRange) {
	let computBox = getComputedStyle(Box);
	coeffic = coeffic || 0.15;
	smaTime = smaTime || 40;
	errRange = errRange || 0.05;
	if(type == 'marginLeft') {
		clearInterval(reTime);
		var marLeft;
		reTime = setInterval(function() {
			let computBox = getComputedStyle(Box);
			let margLeft = parseFloat(computBox.marginLeft);
			Box.style.marginLeft = margLeft + (target - margLeft) * coeffic + 'px';
			if(Math.abs(target - margLeft) < errRange) {
				clearInterval(reTime);
			}
		}, smaTime)
	} else if(type == 'opacity') {
		clearInterval(reTime2);
		reTime2 = setInterval(function() {
			let computBox = getComputedStyle(Box);
			let opac = parseFloat(computBox.opacity);
			Box.style.opacity = opac + (target - opac) * coeffic;
			if(Math.abs(target - opac) < errRange) {
				clearInterval(reTime2);
			}
		}, smaTime)
	}
}

function judge() {
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	var colLand = document.querySelector('.col-md');
	var centerBox = document.querySelector('.goods-box');

	if (width < 1300) {
		colLand.style.display = 'none';
		centerBox.style.marginLeft = "150px";
	} else {
		colLand.style.display = 'block';
		centerBox.style.marginLeft = "0px";
	}
}