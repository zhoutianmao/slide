var ImgBox = function(config){
	this.index = 0;
	this.num = 48;
	this.div = config.div;
	this.timer = null;
	this.animate_flag = 1;
	this.width_li = config.width_li;

	this.init();
	this.circle();
}

ImgBox.prototype ={
	init : function(){
		var me = this;
		$('#next').click(function(event){
			me.next_img();
		});

		$('#pre').click(function(){
			me.pre_img();
		});

		$('#select li').click(function(){
			var aimItemIndex = $(this).index();
			me.select(aimItemIndex);
		});
	},

	/*
	*往后切换效果	
	*/
	next_img : function(){
		var me = this;
		var offset = this.width_li * -1;0
		me.div.find('ul').stop().animate(
			{
				'left' : offset
			},'slow',function(){
				var firstItem = $(this).find('li').first();
				$(this).append(firstItem);
				$(this).css('left', '0');
				me.circle();
			});
		},

		/*
		*往前切换效果
		*/
		pre_img : function(){
			var me = this;
			var ul_op = me.div.find('ul');
			
			var lastItem = me.div.find('ul li').last();
			ul_op.prepend(lastItem);

			var offset = this.width_li * -1;
			ul_op.css('left', offset + 'px');
			ul_op.stop().animate(
			{
				'left' : 0
			},'slow',function(){
				me.circle();
			});
		},

		/*
		*选中指示点	
		*/
		circle : function(){
			var li_ob = this.div.find('ul li');
			var li_select = $('#select ul li');
			var currentItem = li_ob.first();
			var currentIndex = currentItem.attr("index");
			li_select.removeClass('active');
			currentIndex --;
			li_select.eq(currentIndex).addClass('active');
		},

		/*
		*选择操作
		*/
		select : function(index){
			var me = this;
			if(me.animate_flag == 0){
				return;
			}
			var li_up = me.div.find('ul li');
			var ul_up = me.div.find('ul');
			var li_buttom = $('#select ul li');
			var currentItem = li_up.first();
			var currentItemClone = currentItem.clone();
			var currentIndex = currentItem.attr('index');
			currentIndex--;
			var offset = li_up.width() * -1;
			if(index > currentIndex){
				me.animate_flag = 0;
				for(var i = 0; i < index - currentIndex; i++){
					var currentFirstItem = me.div.find('ul li').first();
					me.div.find('ul').append(currentFirstItem);
				}
				me.div.find('ul').prepend(currentItemClone);
				me.div.find('ul').animate(
					{
						left :  offset
					},'slow',function(){
						$(this).css('left','0');
						currentItemClone.remove();
						me.circle();
						me.animate_flag = 1;
					});
			}else{
				me.animate_flag = 0;
				for(var i = 0; i < currentIndex - (index + 1); i++){
					var currentLastItem = me.div.find('ul li').last();
					me.div.find('ul').prepend(currentLastItem);
					console.log(i);
				}
				me.div.find('ul').prepend(currentItemClone);
				me.div.find('ul').prepend(me.div.find('ul li').last());
				me.div.find('ul').css('left',offset + 'px');
				me.div.find('ul').animate(
					{
						left : 0
					},'slow',function(){
						currentItemClone.remove();
						me.circle();
						me.animate_flag = 1;
					});
			}
			//li_buttom.removeClass('active');
			
		}
}
