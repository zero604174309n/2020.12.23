//点击登录按钮弹出登录框
$(".denglu").click(function(){
	$(".userIn").show();
	$(".zz").show();
})
//点击暂不登录时隐藏登录框
$(".guanbi").click(function(){
	$(".userIn").hide();
	$(".zz").hide();
})
//点击确认登录时候拿取用户信息
$(".denglu2").click(function(){
//	用户名      $(".username").val()
//	密码          $(".userpassword").val()
//每次登录时初始化  去掉可能存在的VIP类名
$(".touxiang").removeClass("vip");
//拿取json数据
//	console.log(1)
	$.ajax({
		type:"get",
		url:"user.json",
		success:function(data){
//			console.log(2);
//设置一个变量记录匹配次数防止多次弹出输入失败提示
			let num = 0;
			for (let i = 0;i<data.length;i++) {
				//通过循环验证json中是否有此账号信息
				if($(".username").val()==data[i].username&&$(".userpassword").val()==data[i].password){
					alert("登陆成功");
					$(".touxiang").prop("src",data[i].img);
					$(".userIn").hide();
					$(".zz").hide();
					//如果是VIP用户，添加新类名
					if (data[i].vip=="vip") {
						$(".touxiang").addClass("vip");
					}
				}else{
					num++;
//					console.log(num)
				};
				if(num==data.length){
					alert("账号或密码错误")
				}
			}
		}
	});
})
//选项卡切换
$(".daohang>ul>li").click(function(){
	//获取选项卡下标
	let newIndex=$(this).index();
//	console.log(newIndex);
	$(".xuanxiang>li").eq(newIndex).show();
	$(".xuanxiang>li").eq(newIndex).siblings().hide();
})
//点击新建信息添加新内容
$(".news").click(function(){
	//只有登录后才能操作新建按钮
	if($(".touxiang").attr("src")=="img/头像.jpg"){
		alert("请先登录");
	}else{
		$(".zz").show();
		$(".newContent").show();
	}
})
//点击确认时候新建信息，取消时关闭
$(".xj").click(function(){
//	console.log($(".rd").length)
//遍历查询选中状态
	let $radio;
	for (let i = 0;i<$(".rd").length;i++) {
//		console.log($(".rd").eq(i).prop("checked")==true);
		if($(".rd").eq(i).prop("checked")==true){
//			console.log($(".rd").eq(i).next().text())
//			console.log(1)
			$radio = $(".rd").eq(i).next().text();
		}
	}
//	console.log($radio);
//获取当前时间
	let date = new Date;
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let day = date.getDate();
//拿取第二个json里面的数据
	$.ajax({
		type:"get",
		url:"news.json",
		success:function(data){
			//创建一个随机数(除去前3个已经渲染到页面上的)
			let newNum = parseInt(Math.random()*7+3);
//			console.log(newNum);
			//创建新li和li内的所有内容
			let newLi = $("<li></li>");
			$(".content").append(newLi);
//			console.log(newLi.index());
			let newIndex = newLi.index();
			let newDiv1 = $("<div>"+(newIndex+1)+"</div>");
			let newImg = $("<img/>");
			newLi.append(newDiv1);
			newLi.append(newImg);
			newImg.prop("src",data[newNum].img);
			let newDiv2 = $("<div><h5></h5></div>");
			newLi.append(newDiv2);
			newDiv2.find("h5").text(data[newNum].subject);
			let newsDiv = $("<div><span>"+"开始时间："+year+"/"+month+"/"+day+"(40天)"+"</span><span class='zt'>"+$radio+"</span></div>");
			newDiv2.append(newsDiv);
//			console.log($radio);
//			console.log(newIndex);
//			console.log($(".zt").eq(3).text())
//			console.log($(".zt").eq(newIndex).text());
			if ($radio=="未开始") {
				$(".zt").eq(newIndex).addClass("cw");
			} else if($radio=="进行中"){
				$(".zt").eq(newIndex).addClass("cj");
			}else{
				$(".zt").eq(newIndex).addClass("cc");
			}
			let newDiv3 = $("<div><img src='img/员工账号管理.png'/>"+data[newNum].num+"</div>");
			let newDiv4 = $("<div><img src='img/邀请.png'/>邀请</div>");
			let newDiv5 = $("<div><img src='img/企业图谱.png'/>文字按钮</div>");
			let newDiv6 = $("<div class='del'><img src='img/删除.png'/>删除</div>");
			let newDiv7 = $("<div class='guanli'>管理</div>");
			
			newLi.append(newDiv3);
			newLi.append(newDiv4);
			newLi.append(newDiv5);
			newLi.append(newDiv6);
			newLi.append(newDiv7);
			$(".zz").hide();
			$(".newContent").hide();
		}
	});
})
$(".qxxj").click(function(){
	$(".zz").hide();
	$(".newContent").hide();
})
//鼠标滑到li的时候改变相关配置
$(".content").on("mouseover","li",function(){
	$(this).find("div").eq(4).css("color","blue");
	$(this).find("div").eq(4).find("img").prop("src","img/邀请1.png");
	$(this).find("div").eq(5).css("color","blue");
	$(this).find("div").eq(5).find("img").prop("src","img/企业图谱1.png");
	$(".guanli").eq($(this).index()).css({"color":"white","background":"blue"})
})
$(".content").on("mouseout","li",function(){
	$(this).find("div").eq(4).css("color","black");
	$(this).find("div").eq(4).find("img").prop("src","img/邀请.png");
	$(this).find("div").eq(5).css("color","black");
	$(this).find("div").eq(5).find("img").prop("src","img/企业图谱.png");
	$(".guanli").eq($(this).index()).css({"color":"blue","background":"white"})
})
//点击管理时候出现操作区域
$(".content").on("click",".guanli",function(){
	//判断有无权限
	if ($(".touxiang").attr("src")=="img/头像.jpg") {
		alert("请先登录");
	}else if($(".touxiang").hasClass("vip")){
		$(this).prev().css("visibility","visible");
	}else{
		alert("缺少权限");
	}
})
//点击删除时删除
$(".content").on("click",".del",function(){
	$(this).parent().remove();
	//删除后重新排序
	console.log($(".content>li").length);
	for (let i = 0 ; i<$(".content>li").length;i++) {
		$(".content>li").eq(i).find("div").eq(0).text(i+1);
	}
})
