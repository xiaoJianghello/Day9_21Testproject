
function getStr(that) {
	var submitLogin = $('#submitLogin');
	// console.log(submitLogin);
	
	$.ajax({ // 发向服务端的数据
		url: "/getStr.do",
		type: "post",
		data: {
			name: 123,
			age: 30
		},
		dataType: "json",
		success: function(result) {
			// 这里客户端获得服务器的json数据
			// 可以在这里对json数据处理后放到网站上
			// console.log(typeof result);
			// console.log(result);
			// 并把它呈现在页面上
		},
		error: function(error) {
			console.log("ajax访问出错")
		}
	});
}

// $(function() {
// 	$('#form1').submit(function() { //当提交表单时，会发生 submit 事件。
// 		$.ajax({
// 			type: "POST",
// 			data: {
// 				name: 'test',
// 				fuck: 'fuck you'
// 			},
// 			url: "/getWeibo.do",
// 			// beforeSend: function() {
// 			//     $("#btn-submit").attr("disabled", true);//提交表单前的处理，防止用户多次点击【登陆】，重复提交表单
// 			//     $("#btn-submit").val("正在登陆...");
// 			// },
// 			success: function(result) {
// 				console.log(result);
// 			},
// 			error: function(error) {
// 				console.log("ajax访问出错");
// 			}
// 		});
// 	});
// });