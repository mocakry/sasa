define(['jquery-1.11.3'], function() {
	return {
		tiaozhuan: (function() {
			var btns = $('#must-check button,#limited-offer li button,#list a,#new-arrival a');
			btns.click(function() {
				location.href = "details.html";
			});
		})(),
		menu: (function() {
			var alltype = $('#header .header-below .alltype');
			var below = $('#header .header-below .alltype-b');
			var li = $('#header .header-below .alltype-b ul.main>li');
			alltype.mouseenter(function() {
				$(this).css('position', 'relative');
				below.slideDown(1000);
				below.css('position', 'absolute');
				below.css('z-index', '99');
			});
			alltype.mouseleave(function() {
				below.slideUp(1000);
			});
			li.bind({
				mouseover: function() {
					$(this).css('background', '#fff');
					$(this).css('color', '#ec3e7d');
					$(this).children('a').css('color', '#ec3e7d');
				},
				mouseout: function() {
					$(this).css('background', '#ec3e7d');
					$(this).css('color', '#fff');
					$(this).children('a').css('color', '#fff');
				}
			});
		})(),
		lunbo: (function() {
			var img = [];
			$.ajax({
				type: "get",
				url: "php/lunbo.php",
				dataType: 'json',
				async: true
			}).done(function(data) {
				var num = 0;
				var btns = $('#banner .xiaoyuandian span');
				var pics = $('#banner img');
				for(var i = 0; i < data.length; i++) {
					img[i] = data[i].url;
				}
				pics.each(function(i) {
					$(this).attr('src', img[i]);
					$(this).css('display', 'none');
				});
				pics.eq(0).css('display', 'block');
				btns.each(function(i) {
					$(this).attr('index', i);
					$(this).mouseover(function() {
						num = $(this).attr('index');
						lb();
					});
				});

				function lb() {
					btns.each(function(i) {
						$(this).removeClass('active');
					});
					pics.slideUp(1000);
					btns.eq(num).addClass('active');
					pics.eq(num).slideDown(1000);
				}
				var timer = setInterval(function() {
					num++;
					if(num >= 7) {
						num = 0;
					}
					lb();
				}, 3000);
			})
		})(),
		xiala: (function() {
			var li = $('#login ul.allist li:first');
			var xialakuai = $('#login ul.allist li:first-child .account');
			li.bind({
				mouseover: function() {
					xialakuai.slideDown(1000);
				},
				mouseout: function() {
					xialakuai.slideUp(1000);
				}
			});
		})(),
		information: (function() {
			$.ajax({
				type: "get",
				url: "php/information.php",
				dataType: 'json',
				async: true
			}).done(function(data) {
				var img1 = $('#must-check .must .pic img');
				var biaoti1 = $('#must-check .must .p1');
				img1.each(function(i) {
					$(this).attr('src', data[i].url);
				});
				biaoti1.each(function(i) {
					$(this).html(data[i].title);
				});
				var img2 = $('#limited-offer ul .produ img');
				var biaoti2 = $('#limited-offer ul .xiangqing p');
				var price1 = $('#limited-offer ul .xiangqing .price span');
				img2.each(function(i) {
					$(this).attr('src', data[i + 9].url);
				});
				biaoti2.each(function(i) {
					$(this).html(data[i + 9].title);
				});
				price1.each(function(i) {
					$(this).html(data[i + 9].price);
				});
				var img3 = $('#list .box .spic img');
				var biaoti3 = $('#list .box .sintro p a');
				var price2 = $('#list .box .sprice span');
				img3.each(function(i) {
					$(this).attr('src', data[i + 19].url);
				});
				biaoti3.each(function(i) {
					$(this).html(data[i + 19].title);
				});
				price2.each(function(i) {
					$(this).html(data[i + 19].price);
				});
				var img4 = $('#new-arrival .pic-m img');
				var biaoti4 = $('#new-arrival a');
				var price3 = $('#new-arrival .sprice span');
				img4.each(function(i) {
					$(this).attr('src', data[i + 25].url);
				});
				biaoti4.each(function(i) {
					$(this).html(data[i + 25].title);
				});
				price3.each(function(i) {
					$(this).html(data[i + 25].price);
				});
			})
		})(),
		showorhide: (function() {
			var hidden = $('#header .alltype-b .hidden');
			var li = $('#header .alltype-b li:first');
			li.bind({
				mouseover: function() {
					hidden.css('display', 'block');
				},
				mouseout: function() {
					hidden.css('display', 'none');
				}
			});
		})(),
		fixed: (function() {
			var li = $('#fixed li');
			//var hide = $('# fixed li').eq(5);
			li.bind({
				mouseover: function() {
					$(this).find('.cang').show();
				},
				mouseout: function() {
					$(this).find('.cang').hide();
				}
			});
			/* $(document).scroll(function(){
			 	if($(this).scrollTop()>0){
			 		hide.show();
			 	}else{
			 		hide.hide();
			 	}
			 });*/
		})(),
		search: (function() {
			var input = $('#header .search-t input');
			var contain = $('#header .search-t .contain');
			var ul = contain.children('ul');

			function callback(data) {
				alert(1);
				/*var html = '';
				for(var i = 0; i < 4; i++) {
					html += "<li>" + data.s[i] + "</li>";
				}
				console.log(html);
				//	ul.append(html);*/
			}
			input.on('input', function() {
				var cscript = document.createElement('script');
				cscript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&p=3&req=2&csor=0&cb=baidu';
				document.body.appendChild(cscript);
				console.log(cscript);
				contain.css('display', 'block');
			});
		})()
	}
})