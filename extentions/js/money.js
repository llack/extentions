function loadMoney() {
	moneyLoader();
	var param = { authkey : keyIs('money'), searchdate : $("#moneyDate").val() , data : 'AP01'};
	$.get('https://www.koreaexim.go.kr/site/program/financial/exchangeJSON',param,function(result){
		var html = "";
		if(result) {
			var data = result.reverse();
			for(var i = 0; max=data.length, i < max; i++) {
				html += moneyTr(data[i]);
			}
		} else {
			html += "<tr><td colspan='3' align='center'>NO DATA</td></tr>";
		}
		removeMtable();
		$("#moneyTable > tbody:last").append(html);
	});
}
function moneyLoader() {
	removeMtable();
	$("#moneyTable > tbody:last").append("<tr align='center'><td colspan='3'><img src='/image/loader.gif' width='60'/> 환율 정보를 가져오는 중입니다.</td></tr>");
}
function removeMtable() {
	$("#moneyTable").find("tr:gt(0)").remove();
}
function moneyTr(data) {
	let html = "";
	var nm = data.cur_nm.split(" ");
	var unit = data.cur_unit.replace("(100)","");
	unit = unit.replace('CNH','CNY');
	var unitMoney = data.cur_unit.indexOf('100') > -1 ? 100 : 1;
	var nmAddUnit = nm[1] ? nm[1].replace('옌','엔') : unit;
	
	var name = nm[0].replace('위안화','중국').replace('덴마아크','덴마크').replace('말레이지아','말레이시아');
	html += "<tr class='tr_money'>";
	html += "<td align='left' style='border-right:2px solid #d9534f'><img src='/image/flag/"+unit+".png' width='30'/> " +name+" / "+nmAddUnit+"</td>";
	html += "<td align='right' style='padding-right:20px;border-right:2px solid #d9534f'>"+unitMoney+" ("+unit+")</td>";
	html += "<td align='right' style='padding-right:20px'>"+data.kftc_deal_bas_r+"</td>";
	html += "</tr>";
	if(unit == "KRW") {
		html = "";
	}
	return html;
}

function mDatePicker(ele){
	
	var customDate = new Date().getHours() < 11 ? (1000*24)*3600 : 0; 
	var today = new Date(Date.parse(new Date())-customDate);
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