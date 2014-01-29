sumeru.router.add(

	{
		pattern: '/fanpai',
		action: 'App.fanpai'
	}

);

//sumeru.router.setDefault('App.itworks');

App.fanpai = sumeru.controller.create(function(env, session){
	env.onrender = function(doRender){
		doRender("fanpai", ['push','left']);
	};
	var wordstrings=[];
	var fathercount=3;
	var soncount=1;
	env.onready=function(){
		wordstrings=getWord(fathercount,soncount);
		document.getElementById('nextbtn').addEventListener('click', showword);
	}



	var nowindex=1;
	var shownumb=false;
	var showword=function(){
		if(nowindex>fathercount)
		{
			$("#wanbin").hide();
			 env.redirect('/guess');
		}

		if(!shownumb)
		{
			$("#wanbin").html(wordstrings[nowindex-1]);
			nowindex++;
		}
		else{
			$("#wanbin").html(nowindex);
		}
		// document.getElementById('nextbtn').addEventListener('click', hideword);
		shownumb=!shownumb;
	}




	var getWord=function(fathercount,soncount){
		var words=[
		'台灯_电灯',
       	'玫瑰_月季',
		'若曦_晴川',
		'孟非_乐嘉',
		'牛奶_豆浆',
		'保安_保镖',
		'白菜_生菜',
		'辣椒_芥末',
		'金庸_古龙',
		'赵敏_黄蓉',
		'海豚_海狮'];
		var selectword= words[parseInt(Math.random()*words.length)];
		var tem=selectword.split('_');
		var fatherindex = parseInt(Math.random());
		var sonindex=Math.abs(fatherindex-1);
		var retrunarr=new Array(10);
		for (var i = fathercount-1; i >= 0; i--) {
			retrunarr[i]=tem[fatherindex];	
		};

		for (var i = soncount-1; i >= 0; i--) {
			var randomindex=parseInt(Math.random()*fathercount);
			while(retrunarr[randomindex]==tem[sonindex])
			{
				randomindex=parseInt(Math.random()*fathercount);
			}
			retrunarr[randomindex]=tem[sonindex];
		};

		for (var i = fathercount-1; i >= 0; i--) {
			console.log(retrunarr[i]+i);
		};

		return retrunarr;


	}

});