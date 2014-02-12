sumeru.router.add(

	{
		pattern: '/guess',
		action: 'App.guess'
	}

);

//sumeru.router.setDefault('App.itworks');


App.guess = sumeru.controller.create(function(env, session){

	env.onrender = function(doRender){
		doRender("guess", ['none','z']);
		// initConfig();
	};
	var wordstring=[];
	var fathercount=4;
	var soncount=1;
	var peoplecount=fathercount-soncount;
	var sonword="";

	env.onready=function(){
		initGuess();
		document.getElementById('restart').addEventListener('click', restart);
		document.getElementById('setting_game').addEventListener('click', underwordsetting);
		document.getElementById('punish').addEventListener('click', punish);
		$("#alter_guess").hide();
		// $("#talk_turn").html(Math.floor(Math.random()*10+1))
	}	

	var restart=function(){
		// env.close();
		env.redirect('/fanpai',{'fathercount':fathercount,'soncount':Math.max(soncount,1)},true);
		initGuess();
	}

	var underwordsetting=function(){
		env.redirect('/undercover_setting',{'fathercount':fathercount,'soncount':Math.max(1,soncount)},true);
	}

	var punish=function(){
		// env.callSubController('/punish',{})
		env.redirect('/punish',{},true);
	}


	var initGuess=function(){
		initConfig();
		$("#guesscontent").html("");
		for (var i = 1; i <=wordstring.length; i++) {
			if((i-1)%3==0)
			{
				$("#guesscontent").append('<br/>');
			}
			 var temhtml="<button id='under_"+i+"'  type='button'class='btn btn-default' style='width:31%;margin:1%;padding:15px' onclick=''>"+i+"</button>"
			$("#guesscontent").append(temhtml);
			document.getElementById('under_'+i).addEventListener('click', tapindex);
		};
	}

	var initConfig=function(){
		// console.log("undercoverword"+session.get("content");
		wordstring=session.get("content").split(",");
		fathercount=wordstring.length;
		soncount=parseInt(session.get("soncount"));
		sonword=session.get("sonword");
		peoplecount=fathercount-soncount;
		console.log(peoplecount+":peoplecount");
	}

	var tapindex=function(){
		// initConfig();
		var index=this.id.split('_')[1];
		$("#under_"+index).attr("disabled", "disabled");
		if(wordstring[index-1]!=sonword)
		{
			peoplecount--;
			// $("#under_"+index).html("冤死"+wordstring[index-1]);
			$("#under_"+index).html("出局");
			$("#talk_turn").html("从第"+Math.floor(Math.random()*10+1)+"位开始发言")
		}else{
			soncount--;
			// $("#under_"+index).html("卧底"+wordstring[index-1]);
			$("#under_"+index).html("出局");
			$("#talk_turn").html("从第"+Math.floor(Math.random()*10+1)+"位开始发言")
		}


		console.log(peoplecount+":peoplecount");
		console.log(soncount+":soncount");

		if(peoplecount<=soncount){
			$("#alter_guess").html("卧底胜利");
			$("#alter_guess").show();
			disableallbutton();
			$("#talk_turn").hide();
		}
		else if(soncount<=0){
			$("#alter_guess").html("卧底失败");
			$("#alter_guess").show();
			disableallbutton();
			$("#talk_turn").hide();
		}
		$("#showcount").html("平民人数:"+peoplecount+"卧底人数:"+soncount);
	}
	var disableallbutton=function(){
		// console.log(+":disable");
		for (var i=0;i<fathercount;i++)
		{
			var index=i+1;
			$("#under_"+index).attr("disabled", "disabled");
			$("#under_"+index).html(index+"号:"+wordstring[index-1]);
			console.log(index+":disable");
		}	
	}
});