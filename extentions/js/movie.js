function loadMovieInfo() {
	viewLoader();
	var param = { key : keyIs('movie'), targetDt : $("#movieDate").val() };
	$.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',param,function(data){
		if(data) {
			var td = "";
			data = data.boxOfficeResult.dailyBoxOfficeList;
			for(var i = 0; i < data.length; i++) {
				td += "<tr align='center' class='mData'>";
				td += "<td></td>";
				td += "<td>"+data[i].rank+"</td>";
				td += "<td>"+data[i].movieNm+"</td>";
				td += "<td>"+data[i].openDt+"</td>";
				td += "<td>"+number_format(data[i].audiAcc)+"</td>";
				td += "<td>"+number_format(data[i].salesAcc)+"</td>";
				td += "<td></td>";
				td += "</tr>";
			}
			if(data.length == 0) {
				td = "<tr>";
				td += "<td></td>";
				td += "<td colspan='5' align='center'>NO DATA</td>";
				td += "<td></td>";
				td += "</tr>";
			}
			removeTable();
			$("#movieTable > tbody:last").append(td);			
		}
	});
}

function setDatepicker(ele){
	var today = new Date(Date.parse(new Date())-(1000*24)*3600);
	today = ""+today.getFullYear() + pz(today.getMonth()+1) + pz(today.getDate()); // yymmdd
	
	$(ele).val(today).datepicker({
		dateFormat : 'yymmdd',
		prevText: '이전 달',
	    nextText: '다음 달',
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토'],
	})
}

function viewLoader() {
	removeTable();
	$("#movieTable > tbody:last").append("<tr align='center'><td colspan='7'><img src='/image/loader.gif' width='60'/> 데이터 집계 중입니다.</td></tr>");
}

function removeTable() {
	$("#movieTable").find("tr:gt(1)").remove();
}
function initMdata() {
	$(".mData").each(function(i,e) {
		if($(e).find("td:first").html() != "") {
			$(this).find("td:first,td:last").prop("colspan",1);	
			var addTd = "<td></td>"+$(e).html()+"<td></td>";
			$(e).html(addTd);
		}	
		$(this).css({'height':40,'font-size':'13px','border':'none'});
	});
}
$(document).on('mouseover','.mData',function(){
	initMdata();
	if($(this).find("td:first").html() == "") {
		$(this).find("td:first,td:last").remove();
		$(this).find("td:first,td:last").prop("colspan",2);
		$(this).css({'height':40,'font-size':'17px','border-bottom':'2px solid #d9534f','border-top':'1px solid #d9534f'});
	}
});

$(document).on('mouseout','.mData',function(){
	initMdata();
});