define(['jquery-1.11.3', 'jquery.cookie'], function() {
	return {
		cart: (function() {
			zongjiaqian();
			var hidden = $('#cart .cart-form ul.hidden');
			var price = $('#cart .cart-form ul.hidden .price');
			var zongjia = $('#cart .cart-form ul.hidden .zongjia');
			var left = $('#cart .cart-form ul.hidden .many span').eq(0);
			var right = $('#cart .cart-form ul.hidden .many span').eq(1);
			var num = left.next();
			function zongjiaqian() {
				var price = $('#cart .cart-form ul.hidden .price');
				var zongjia = $('#cart .cart-form ul.hidden .zongjia');
				var left = $('#cart .cart-form ul.hidden .many span').eq(0);
				var right = $('#cart .cart-form ul.hidden .many span').eq(1);
				var allmoney = $('#cart .check li').eq(3).find('span');
				var num = left.next();
				var p = parseInt(price.html().substring(1)) * parseInt(num.val());
				zongjia.html(p);
				allmoney.html(p);
			}
			left.click(function() {
				var n = num.val();
				n--;
				if(n <= 1) {
					n = 1;
				}
				num.val(n);
				zongjiaqian();
			});
			right.click(function() {
				var n = num.val();
				n++;
				num.val(n);
				zongjiaqian();
			});
			var data = [{
				sid: 1,
				url: 'http://cn04.alicdn.sasa.com/public/images/b3/00/55/f37c05766aa706c1f3ceee4b76aebe62a029d3e1.jpg?1506063593#h',
				title: '滋晶雪肤美白乳  (125毫升) ',
				price: '￥445.0'
			}];
			if(getCookie('sid') && getCookie('num')) {
				var s = getCookie('sid').split(',');
				var n = getCookie('num').split(',');
				console.log(s, n);
				for(var i = 0; i < s.length; i++) {
					creategoods(s[i], n[i]);
				}
			}

			function cookietoarray() {
				if(getCookie('sid')) {
					arrsid = getCookie('sid').split(',');
				} else {
					arrsid = [];
				}
				if(getCookie('num')) {
					arrnum = getCookie('num').split(',');
				} else {
					arrnum = [];
				}
			}

			function creategoods(sid, num) {
				for(var i = 0; i < data.length; i++) {
					if(data[i].sid == sid) {
						var clone = hidden.clone(true);
						clone.find('.pic img').attr({
							src: data[i].img,
							sid: data[i].sid
						});
						clone.find('.name a').html(data[i].title);
						clone.find('.price').html(data[i].price);
						clone.find('.many input').val(num);
						clone.css('display', 'block');
						$('#cart .cart-form').append(clone);
					}
				}
			}
		
		})()
	}
})