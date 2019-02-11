function miseAPI(sido) {
	$("#sgg").html("<option value=''>데이터 로딩 중입니다.</option>").prop("disabled",true).selectpicker("refresh");
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
			if(xml) {
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
				var sgg = u.map((v)=>("<option value=\""+v+"\">"+v+"</option>")).join("");
				var sggHtml = "<option value=''>선택하세요</option><option value='all'>전체</option>"+sgg;		
				$("#sgg").html(sggHtml).prop("disabled",false).selectpicker("refresh");
				$("#miseData").data("mise",uniqArr);
			}
		}
	});
}