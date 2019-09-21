const express = require('express'); // 导入express模块
const ejs = require('ejs'); // 加入ejs模块
const app = express(); // 创建express
const url = require('url');

// app.set('view engine', 'ejs'); 把ejs注入到express, 并设置视图后缀名为ejs
app.set('view engine', 'html'); // 这个是设置后缀名为html
app.engine('.html', require('ejs').__express);

let dealData = require('getdata');
dealData.getData(0); // 不能省略
// 初始化变量不能省

let userData = require('userData');
// 直接调用没有效果 要在get post调用才有用

// 可能这个时候数据库还没有初始化
// console.log(userData.getUser(123), 'Test');

// 对用户数据库操作的模块

// 3.引入body-parser模块 获得前端后手提交的数据
let bodyParser = require('body-parser');
// 4.创建 application/x-www-form-urlencoded 编码解析 接收post的数据流所用
let urlencodedParser = bodyParser.urlencoded({
	extended: false
});

// 尝试跨域
app.use('*', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', 'http://xiaojiang');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    //res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

// 设置视图文件的目录为: dirname + '/views';
// 可设置任意位置为视图文件根目录 缺省是路径为当前文件所在的目录下的views目录
// 就像下面
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));


app.get('/', function(req, res) {
	// console.log(dealData.getData(0))
	let loginFlag = {
		idFlag: false,
		pwd: false
	};
	let resultSet = dealData.getData(0);
	resultSet.loginFlag = loginFlag;
	res.render('index', resultSet);
});
//  这个东西是按顺序匹配的
app.post('/login', urlencodedParser, function(req, res) {
	var userId = req.body.userId;
	var pwd = req.body.pwd;
	let loginFlag = {
		idFlag: false,
		pwd: false
	};

	// console.log('post用户的id是: ' + userId);
	// console.log('post用户的密码是: ' + pwd);

	userData.getUser(userId);
	// 这个地方有异步
	// 如果不事先载入文件就会出错
	setTimeout(function() {
		var personData = userData.getUser(userId);
		// 如果不进行异步处理实现加载数据库就会返回undefined 就是没有执行到返回语句就会直接按默认没有返回执行
		// 判断是否有结果, 如果没有pwd 或 用户名其中之一直接重绘
		if(personData.userMessage != undefined) {
			// 如果数组长度不为零 判断数组是否为空
			if (personData.userMessage.length != 0) {
				// 用户名正确
				// console.log(personData.userMessage.length, 'personData.userMessage')
				if (personData.userMessage[0].id == userId) {
					loginFlag.idFlag = true;
					// 密码正确
					if (personData.userMessage[0].pwd == pwd) {
						loginFlag.pwd = true;
					} else {
			
					}
				}
				// 使用数据库做处理
				// 验证账号 并选择弹窗 通过在result 中多加属性 来验证判断
				let resultSet = dealData.getData(0);
				resultSet.loginFlag = loginFlag;
				resultSet.userMessage = personData.userMessage[0];
				// 必须使用render发出resultset数组来接收数据 不然会报错
				res.render('index', resultSet);
			} else {
				let loginFlag = {
					idFlag: false,
					pwd: false
				};
				let resultSet = dealData.getData(0);
				resultSet.loginFlag = loginFlag;
				res.render('index', resultSet);
			}
		} else {
			let loginFlag = {
				idFlag: false,
				pwd: false
			};
			let resultSet = dealData.getData(0);
			resultSet.loginFlag = loginFlag;
			res.render('index', resultSet);
		}
	}, 10)
});

// app.get('/game-frist.html', function(req, res) {
// 	// 获得get请求的参数 这是express参数key(属性名)
// 	// console.log(req.query.id);
// 	res.render('game-frist');
// });

app.get('/page*', function(req, res) {
	let path = parseInt(url.parse(req.url).pathname.substr(5));
	// 同样构成了异步
	let resultset = dealData.getData(path);

	if (typeof path == 'number') {
		// 因该是因为浏览器内置的cookie什么的
		// 这里需要停一段时间
		setTimeout(function() {
			let loginFlag = {
				idFlag: false,
				pwd: false
			};
			let resultSet = dealData.getData(path);
			resultSet.loginFlag = loginFlag;
			res.render('index', resultSet);
		}, 30)
		// res.render('index', resultset);
	} else {
		// res.render('index', dealData.getData(0));
	}
});

app.listen(9999, function() {
	console.log('服务器正在监听客户端的请求...');
})