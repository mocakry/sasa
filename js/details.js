define(['jquery-1.11.3', 'jquery.cookie'], function() {
	return {
		fdj: (function() {
			var spic = $('#details .pics .showpic .contain-spic');
			var spicimg = $('#details .pics .showpic .contain-spic img');
			var bf = $('#details .pics .showpic .bf');
			var sf = $('#details .pics .showpic .contain-spic .sf');
			var bpic = bf.children('img');
			var wrap = $('#details .pics .showpic');
			var ul = $('#details .pics .somepics .tupian ul');
			var li = $('#details .pics .somepics .tupian li');
			spic.mouseover(function() {
				sf.css('visibility', 'visible');
				bf.css('visibility', 'visible');
				var width = spicimg.innerWidth() * bf.innerWidth() / bpic.innerWidth();
				var height = spicimg.innerHeight() * bf.innerHeight() / bpic.innerHeight();
				sf.css('width', width);
				sf.css('height', height);
				var scale = bf.innerWidth() / sf.innerWidth();
				$(this).mousemove(function(e) {
					var l = e.pageX - wrap.offset().left - sf.innerWidth() / 2;
					var t = e.pageY - wrap.offset().top - sf.innerHeight() / 2;
					if(l < 0) {
						l = 0;
					} else if(l >= spicimg.innerWidth() - sf.innerWidth()) {
						l = spicimg.innerWidth() - sf.innerWidth();
					}
					if(t < 0) {
						t = 0;
					} else if(t >= spicimg.innerHeight() - sf.innerHeight()) {
						t = spicimg.innerHeight() - sf.innerHeight();
					}
					sf.css('left', l);
					sf.css('top', t);
					bpic.css('left', -scale * l);
					bpic.css('top', -scale * t);
				});
				spic.mouseout(function() {
					sf.css('visibility', 'hidden');
					bf.css('visibility', 'hidden');
				});
			});
			ul.width(li.eq(0).width() * li.length + li.length * 10);
			li.bind({
				mouseover: function() {
					$(this).css("border", "5px solid #e5cbb2");
					$(this).css("width", "94px");
					$(this).css("height", "50px");
				},
				mouseout: function() {
					$(this).css("border", "1px solid #ccc");
					$(this).css("width", "104px");
					$(this).css("height", "60px");
				},
				click: function() {
					spicimg.attr('src', $(this).children('img').attr('src'));
					bpic.attr('src', $(this).children('img').attr('src'));
				}
			});
		})(),
		num: (function() {
			var left = $('#details .detail .xiangxi .buy li:first span:first');
			var right = left.siblings('span');
			var num = left.next();
			left.click(function() {
				var n = num.val();
				n--;
				if(n <= 1) {
					n = 1;
				}
				num.val(n);
			});
			right.click(function() {
				var n = num.val();
				n++;
				num.val(n);
			});
		})(),
		cookie: (function() {
				var num = $('#details .detail .xiangxi .buy li:first input');
				var arrsid = [];
				var arrnum = [];
				var btn = $('#details .detail .buy li:last a');
				btn.click(function() {
						var sid = 1;
						var i = 0;
						alert(arrsid.length);
						for(; i < arrsid.length; i++) {
							if(sid == arrsid[i]) {
								alert(1);
								arrnum[i] = parseInt(arrnum[i])+parseInt(num.val());
								alert(arrnum[i]);
								break;
							}
						}
						if(i == arrsid.length) {
							arrsid.push(sid);
							arrnum.push(num.val());
						}
					addCookie('sid', arrsid, 7); 
					addCookie('num', arrnum, 7);
				});
		})()
}
})