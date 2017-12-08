define(['jquery-1.11.3'], function() {
	return {
		login: (function() {
			var input = $('#login-true .biaodan ul li input');
			var username = $('#login-true .biaodan ul li:first input');
			var psw = $('#login-true .biaodan ul li:nth-child(2) input');
			var yzm = $('#login-true .biaodan li.yzm input');
			var yzmnr = $('#login-true .biaodan li.yzm span');
			var flash = $('#login-true .biaodan li.yzm b');
			var btn = $('#login-true .biaodan li.btn input');
			input.bind({
				mouseover: function() {
					$(this).css("border", "1px solid #ec3e7d");
					$(this).css("cursor", "context-menu");
				},
				mouseout: function() {
					$(this).css("border", "1px solid #ccc");
				}
			});

			function yanzhen() {
				var arr = [];
				var all = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
				for(var i = 0; i < 4; i++) {
					var j = Math.floor(Math.random() * all.length);
					arr.push(all[j]);
				}
				yzmnr.html(arr.join(''));
			}
			yanzhen();
			flash.click(function() {
				yanzhen();
			});
			yzm.change(function() {
				if(yzm.val() != yzmnr.html()) {
					yzm.val('');
					yanzhen();
				}
			});
			btn.click(function() {
				if(username.val() && psw.val() && yzm.val()) {
					$.ajax({
						type: "post",
						url: "php/yzzh.php",
						data: {
							username: username.val(),
							password: psw.val()
						},
						async: true
					}).done(function(data) {
						if(data) {
							location.href = "index.html";
						} else {
							username.val('');
							psw.val('');
							yzm.val('');
							yanzhen();
							alert('用户名或密码不正确');
						}
					});
				}
			});
		})()
	}
})