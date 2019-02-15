window.onload=function(){
	
	getPrefix();
	$(".selectpicker").selectpicker();

	 $(".copy").click(function(){
        fn_copy(this.id);
    });

	$('[data-toggle="tooltip"]').tooltip();

	$("#copyColor").change(function(){
		var prefix = $("#sharp").prop("checked") ? "#" : "";
		var color = prefix+this.value;
		$("#copyColor").val(color);
		
		var rgb = color.replace(/#/g,'');
		var r = parseInt(rgb.substr(0,2),16);
		var g = parseInt(rgb.substr(2,2),16);
		var b = parseInt(rgb.substr(4,2),16);
		$("#rgb").val("rgb("+r+","+g+","+b+")");
	});
	
	$("#toolChange").change(function(){
		$("#nowTool").text(this.value);

		var name = this.value.toLowerCase();
		moduleLoad(name);
	});

	$("#sharp").change(function(){
		setPrefix($(this));
	});
}
function setPrefix(ele) {
	if(ele.prop("checked")) {
		localStorage.setItem("cpre",true);
	} else {
		localStorage.setItem("cpre",false);
	}
}
function getPrefix() {
	var cpre = localStorage.getItem('cpre');
	var checked = (cpre == "true") ? true : false;
	$("#sharp").prop("checked",checked);
}

function fn_copy(id) {
    var copyText = document.getElementById(id);
	copyText.select();
	document.execCommand("Copy");
}

function moduleLoad(name) {
	var module = new Module();
	if(name == "colorpicker") {
		console.log('load : colorpicker');
		$("body").css({width: '300px', height : '450px'})
		$("#main").show();
		$("#toolArea").empty();
	} else {
		$("#main").hide();
		var path = "/module/"+getPage(name)+".html #tools";
		
		$("#toolArea").load(path,function(){
			module.getModule(name);
		});
	}
}
function getPage(name) {
	var obj = {
			translation : 'translation',
			'미세먼지' : 'mise',
			'날씨' : 'weather'
	}
	return obj[name];
}

class Module{
	getModule(name) {
		var obj = {
			translation : this.translation,
			'미세먼지' : this.mise,
			'날씨' : this.weather
		}
		obj[name]();
	}
}

Module.prototype.translation = function() {
	$("body").css({width: '800px', height : '500px'})
	console.log('load : translation');
	
	$(".selectpicker").selectpicker();

	$("#beforeText").keyup(function(){
		
		//setInterval(kakaoTransAPI,2000);
		kakaoTransAPI();
	});

	$("#src_lang").change(function(){
		selectControl(this.id,this.value);
		kakaoTransAPI();
	});

	$("#target_lang").change(function(){
		selectControl(this.id,this.value);
		kakaoTransAPI();
	});

}

Module.prototype.mise = function() {
	$("body").css({width: '800px', height : '600px'})
	console.log('load : 미세먼지 API');
	
	var sido = "서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종";
	var mylastSido = localStorage.getItem('sido') || "인천";
	sido = sido.split(", ").map(function(v){
		var selected = (v == mylastSido) ? "selected" : ""; 
		return "<option value=\""+v+"\" "+selected+">"+v+"</option>";
	});
	$("#sido").html(sido);
	$(".selectpicker").selectpicker();
	$("#goDataUrl").click(function(){
		window.open('https://www.data.go.kr/');
	});
	miseAPI(mylastSido);
	$("#sido").change(function(){
		$("#miseContents").html("");
		localStorage.setItem('sido',this.value);
		miseAPI(this.value);
	});
	
	$("#sgg").change(function(){
		setSgg(this.value);
	});
}

Module.prototype.weather = function() {
	$("body").css({width: '800px', height : '600px'})
	console.log('load : Kakao Maps API & SKT Weather Planet API');

	$("#address").focus();
	$("#address").keyup(function(e){
		var keycode = e.keyCode || e.which;
		
		if(keycode == 13) {
			getXy(this.value);
		}
	});
	
	$("#goAddress").click(function(){
		viewType('address');
	});
	viewType('weather');
}




