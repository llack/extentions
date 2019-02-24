function loadMovieInfo() {
	viewLoader();
	var param = { key : keyIs('movie'), targetDt : $("#movieDate").val() };
	$.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',param,function(data){
		if(data) {
			var td = "";
			data = data.boxOfficeResult.dailyBoxOfficeList;
			for(var i = 0; i < data.length; i++) {
				var naverMinfo = naverPoster(data[i].movieNm);
				td += "<tr align='center' class='mData'>";
				td += "<td>"+data[i].rank+"</td>";
				td += "<td>"+naverMinfo.url+data[i].movieNm+"</td>";
				td += "<td>"+data[i].openDt+"</td>";
				td += "<td>"+number_format(data[i].audiAcc)+"</td>";
				td += "<td>"+number_format(data[i].salesAcc)+"</td>";
				td += "<td>"+naverMinfo.userRating+"</td>";
				td += "</tr>";
			}
			if(data.length == 0) {
				td = "<tr>";
				td += "<td colspan='6' align='center'>NO DATA</td>";
				td += "</tr>";
			}
			removeTable();
			$("#movieTable > tbody:last").append(td);
		}
	});
}
var url = "";
var userRating = "";
function naverPoster(query) {
	$.ajax({
		url: 'https://openapi.naver.com/v1/search/movie.json?query='+query,
		type: 'GET',
		contentType : 'application/json; charset=UTF-8',
		dataType: 'json',
		async : false,
		headers: {
			'X-Naver-Client-Id' : keyIs('naver_mId'),
			'X-Naver-Client-Secret' : keyIs('naver_mPw')
		},
		success: function (result) {
			if(result.items[0].image) {
				url = "<a href='"+result.items[0].link+"' target='_blank' title='네이버로 보기'>";
				url += "<img src='"+result.items[0].image+"' width='89' height='114'/></a><br/>";
				userRating = result.items[0].userRating;
			}
		}
	});
	
	return { url : url , userRating : userRating};
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