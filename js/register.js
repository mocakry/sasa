define(['jquery-1.11.3'], function() {
	return {
		register: (function() {
			var input = $('#register .biaodan li input');
			var user = /^[a-zA-Z]{1}\w{5,29}$/gi;
			var username = $('#register .biaodan li:first input');
			var pdusername = $('#register .biaodan li:first .username');
			var pswyz = /^\w{6,16}$/gi;
			var psw = $('#register .biaodan li:nth-child(2) input');
			var pdpassword = $('#register .biaodan li:nth-child(2) .password');
			var pswagain = $('#register .biaodan li:nth-child(3) input');
			var pdpswagain = $('#register .biaodan li:nth-child(3) .pswagain');
			var yzm = $('#register .biaodan li.yzm input');
			var yzmnr = $('#register .biaodan li.yzm span');
			var flash = $('#register .biaodan li.yzm b');
			var pdyzm = $('#register .biaodan li.yzm .yzmpd');
			var btn = $('#register .biaodan li.btn input');
			var check = $('#register .biaodan li.check input');
			input.bind({
				mouseover: function() {
					$(this).css("border", "1px solid #ec3e7d");
					$(this).css("cursor", "context-menu");
				},
				mouseout: function() {
					$(this).css("border", "1px solid #ccc");
				}
			});
			username.change(function() {
				if(user.test(username.val())) {
					$.ajax({
						type: "post",
						url: "php/pdcf.php",
						data: {
							username: username.val()
						},
						async: false
					}).done(function(data) {
						if(data) {
							username.val('');
							pdusername.html('用户名有重复!请重新输入');
						} else {
							pdusername.html('用户名可用');
						}
					});
				} else {
					username.val('');
					pdusername.html('请重新输入！');
				}
			});
			function charCode(char){
				if(char>=48&&char<=57){
					return 1;
				}else if(char>=65&&char<=90){
					return 2;
				}else if(char>=97&&char<=122){
					return 4;
				}else{
					return 8;
				}
			}
			psw.on('input',function(){
                var val = psw.val();
                var end1 = 0,
					end2 = 0,
					end3 = 0,
					end4 = 0,
					result = 0;
                for(var i=0; i<val.length;i++){
						if(charCode(val.charCodeAt(i)) == 1){
							end1 = 1;
						}else if(charCode(val.charCodeAt(i)) == 2){
							end2 = 1;
						}else if(charCode(val.charCodeAt(i)) == 4){
							end3 = 1;
						}else if(charCode(val.charCodeAt(i)) == 8){
							end4 = 1;
						}					
						result = end1 + end2 + end3 + end4;					
					}
                var pd = $('#register .biaodan li:nth-child(2) span');
                pd.css('display','inline-block');
                switch(result){
                	case 1:
                	case 2:{
                		pd.html("弱");
                	    break;
                	   }
                	case 3:{
                		pd.html("中");
                	    break;
                	   }
                	case 4:pd.html("强");
                }
			});
			psw.change(function() {
				if(pswyz.test(psw.val())) {
					pdpassword.html('密码符合规范');
				} else {
					psw.val('');
					pdpassword.html('请重新输入');
				}
			});
			pswagain.change(function() {
				if(pswagain.val() == psw.val()) {
					pdpswagain.html('两次输入密码一致');
				} else {
					pswagain.val('');
					pdpswagain.html('两次输入密码不一致，请重新输入');
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
			flash.css('cursor', 'pointer');
			flash.click(function() {
				yanzhen();
			});
			yzm.change(function() {
				if(yzm.val() == yzmnr.html()) {
					pdyzm.html('验证码正确!');
				} else {
					yzm.val('');
					pdyzm.html('验证码出错!');
					yanzhen();
				}
			});

			function fuxuan() {
				var judge = 0;
				for(var i = 0; i < check.length; i++) {
					if(check[i].checked) {
						judge++;
					}
				}
				if(judge == check.length) {
					return true;
				} else {
					return false;
				}
			}
			btn.click(function() {
				if(username.val() && psw.val() && pswagain.val() && yzm.val() && fuxuan()) {
					$.ajax({
						type: "post",
						url: "php/importdata.php",
						data: {
							username: username.val(),
							password: psw.val()
						},
						async: true
					});
				} else {
					alert("您还有信息未填写或勾选");
				}
				alert(1);
			});
		})()
	}
})