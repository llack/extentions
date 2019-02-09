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
		var path = "/module/"+name+".html #tools";
		
		$("#toolArea").load(path,function(){
			module.getModule(name);
		});
	}
}

class Module{
	getModule(name) {
		var obj = {
			translation : this.translation
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
