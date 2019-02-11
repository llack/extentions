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
			'미세먼지' : 'mise'
	}
	return obj[name];
}

class Module{
	getModule(name) {
		var obj = {
			translation : this.translation,
			'미세먼지' : this.mise
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
	sido = sido.split(", ").map(function(v){
		var selected = (v == "인천") ? "selected" : ""; 
		return "<option value=\""+v+"\" "+selected+">"+v+"</option>";
	});
	$("#sido").html(sido).selectpicker();
	
	$("#goDataUrl").click(function(){
		window.open('https://www.data.go.kr/','_blank');
	});
	//miseAPI("인천");
	
	$("#sido").change(function(){
		miseAPI(this.value);
	});
}

function miseAPI(sido) {
	var param = { 	serviceKey : "T3BVHS8wlgBzTf3uq4bANdXJZwkzkYYikGLVOejRu8hDCgiJkru95Z%2FCN8qxDH%2BlhZkxgiUPZDvdiNDOZwJa1Q%3D%3D",
					numOfRows : "30",
					pageNo : "1",
					sidoName : sido,
					searchCondition	: "DAILY"
				};
	var xmlParam = "";
	for (var key in param) {
		xmlParam += key + "=" + param[key] + "&";
	}
	xmlParam = xmlParam.substr(0,xmlParam.length-1);
	$.ajax({
		
		url : "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?"+xmlParam,
		type : "GET",
		headers : {
			'Content-Type' : 'text/xml;charset=utf-8'
		},
		dataType : "xml",
		success : function(xml) {
			var data = $.xml2json(xml);
			data = data.body.items.item;
			var u = [];
			var uniqArr = {};
			for (var i = 0; max = data.length, i < max; i++) {
				if(u.indexOf(data[i].cityName) === -1) {
					u.push(data[i].cityName);
					uniqArr[i] = data[i];
				}
			}
			console.log(uniqArr);
		}
	});
}
function selectControl(id,kr) {
	var other = (id == "src_lang") ? $("#target_lang") : $("#src_lang");

	if(kr != "kr") {
		other.selectpicker('val','kr');
	} else {
		if(other.val() == "kr") {
			other.selectpicker('val','en');
		}
	}
}

function kakaoTransAPI() {
	var query = $("#beforeText").val().trim();
	var src_lang = $("#src_lang").val();
	var target_lang = $("#target_lang").val();
	if(query == "") {
		$("#afterText").val("");
		return;
	}
	$.ajax({
		url: 'https://kapi.kakao.com/v1/translation/translate',
		type: 'POST',
		data: { query : query, src_lang : src_lang, target_lang : target_lang},
		headers: {
			'Authorization' : 'KakaoAK 9867b83a94c2e1f05e77828792433dc7',
			'Content-Type' : 'application/x-www-form-urlencoded'
		},
		contentType : 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function (data) {
			try	{
				var text = data.translated_text[0];
				text = (text == ".") ? "" : text;
				$("#afterText").val(text);
			} catch (e) {
				$("#afterText").val("");
			}
		}
	});
}
