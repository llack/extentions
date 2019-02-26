function miseAPI(sido) {
	$("#sgg").html("<option value=''>데이터 로딩 중입니다.</option>").prop("disabled",true).selectpicker("refresh");
	var param = { 	serviceKey : keyIs('mise'),
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
			if(xml) {
				var data = $.xml2json(xml);
				data = data.body.items.item;
				var u = [];
				var uniqArr = [];
				for (var i = 0; max = data.length, i < max; i++) {
					if(u.indexOf(data[i].cityName) === -1) {
						u.push(data[i].cityName);
						uniqArr[i] = data[i];
					}
				}
				var sgg = u.map((v)=>("<option value=\""+v+"\">"+v+"</option>")).join("");
				var sggHtml = "<option value=''>선택하세요</option><option value='all'>전체</option>"+sgg;		
				$("#sgg").html(sggHtml).prop("disabled",false).selectpicker("refresh");
				$("#miseData").data("mise",uniqArr);
			}
		}
	});
}
function setSgg(sgg) {
	var data = $("#miseData").data("mise");
	var html = "";
	if(sgg == "all") {
		miseHtml(data);
	} else {
		var result = data.filter((v)=>(v.cityName == sgg));
		miseHtml(result);
	}
}
function miseHtml(data) {
	$("#miseContents").html("");
	for (var i = 0; i < data.length; i++) {
		var html = $("#miseContents").html();
		
		var num = (isNaN(data[i].pm10Value)) ? 0 : data[i].pm10Value;
		html += '<div id="specificChart'+i+'" class="donut-size" style="display:none">';
		html += '<div class="pie-wrapper">';
		html += '<span class="label">';
		html += '<span class="num">'+num+'</span><span class="smaller">'+data[i].cityName+'</span>';
		html += '</span>';
		html += '<div class="pie">';
		html += '<div class="left-side half-circle"></div>';
		html += '<div class="right-side half-circle"></div>';
		html += '</div>';
		html += '<div class="shadow"></div>';
		html += '</div>';
		html += '</div>';
		$("#miseContents").html(html);
		updateDonutChart("#specificChart"+i,num);
	}
	
	if(data.length > 1) {
		$(".pie-wrapper").css("margin","0px");
		$(".donut-size").css({"display":'','float':'left'});
	} else {
		$(".pie-wrapper").css("margin","0px auto");
		$(".donut-size").css({"display":'','float':'none'});
	}
}
function updateDonutChart (el, percent) {
    percent = Math.round(percent);
    var realValue = percent;
    var color = "";
    if (percent > 100) {
        percent = 100;
    } else if (percent < 0) {
        percent = 0;
    }
    var deg = Math.round(360 * (percent / 100));
    
    if (percent > 50) {
        $(el + ' .pie').css('clip', 'rect(auto, auto, auto, auto)');
        $(el + ' .right-side').css('transform', 'rotate(180deg)');
    } else {
        $(el + ' .pie').css('clip', 'rect(0, 1em, 1em, 0.5em)');
        $(el + ' .right-side').css('transform', 'rotate(0deg)');
    }
	$(el + ' .right-side').css('border-width', '0.1em');
	$(el + ' .left-side').css('border-width', '0.1em');
	$(el + ' .shadow').css('border-width', '0.1em');

    $(el + ' .num').text(realValue);
    $(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
    
    if(realValue <= 30) {
    	color = "#32a1ff";
    } else if(realValue <= 81) {
    	color = "#00c73c";
    } else if(realValue <= 150) {
    	color = "#fd9b5a";
    } else {
    	color = "#ff5959";
    }
    
    $(el + ' .pie-wrapper .half-circle').css("border","0.1em solid "+color);
}








