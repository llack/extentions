function getXy(address) {
	$("#w_notice").hide().html("");
	if (address.trim() == "") {
		$("#w_notice").html("검색 결과가 없습니다.").show();
		return;
	}
	$.ajax({
		url: 'https://dapi.kakao.com/v2/local/search/address.json',
		type: 'GET',
		data: { query : address},
		headers: {
			'Authorization' : 'KakaoAK '+keyIs('kakao')
		},
		contentType : 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function (result) {
			var data = result.documents;
			if(data.length == 0) {
				$("#w_notice").html("검색 결과가 없습니다.").show();
			} else {
				var arr = [];
				$("#xyData").data("xy",data);
				
				for(var i = 0; max=data.length, i < max; i++) {
					var address = road_address = building = x = y = addressNo = "";
					var rd = data[i].road_address;
					var ad = data[i].address;
					if(rd) {
						building = (rd.building_name != "") ? ","+rd.building_name : "";
						road_address = rd.address_name + building; 
						addressNo = (ad) ? " "+ad.main_address_no : "";
						if(ad) {
							addressNo += (ad.sub_adderss_no != "") ? "-"+ad.sub_adderss_no : "";
						}
						address = rd.region_1depth_name + " " + rd.region_2depth_name + " " + rd.region_3depth_name + addressNo + building;
					} else {
						address = ad.address_name;
						road_address = '-';
					}
					var s = "<a id='"+data[i].y+"_"+data[i].x+"' class='search_weather' style='cursor:pointer'>";
					var e = "</a>";
					address = (address != "-") ? s+address+e : "-"; 
					road_address = (road_address != "-") ? s+road_address+e : "-"; 
					arr.push([address,road_address]);
				}
				makeTables(arr);
			}
		}
	});
}
var table = null;
function makeTables(data) {
	if(table) {
		table.destroy();
		$("#datatables").empty();
	}
	table =	$("#datatables").DataTable({
		data : data
		,columns: [
	        { title: "지번주소" },
            { title: "도로명주소" },
	    ],
	    "scrollY":        "200px",
        "scrollCollapse": true,
        "paging" : false,
        "ordering" : false,
        "language": { 
        	"info": "",
            "infoEmpty": "",
            "infoFiltered" : "",
            "zeroRecords" : "검색된 결과가 없습니다.",
            "search" : "검색"
        }
	});
}
function search_weather(lat,lon) {
	$.ajax({
		url: 'https://api2.sktelecom.com/weather/forecast/3days',
		type: 'GET',
		data: { lat : lat , lon : lon, appkey : keyIs('skt'), version : 1},
		contentType : 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function (result) {
			if(result) {
				viewType('weather');
				localStorage.setItem('wData',JSON.stringify(result));
			}
		}
	});
}

function viewType(type) {
	var weather = address = "";
	if(type == "address") {
		weather = 'none';
		address = 'table';
	} else {
		weather = 'table';
		address = 'none';
	}
	$("#weatherTable").css('display',weather);
	$("#addressTable").css('display',address);
}
$(document).on('click','.search_weather',function(){
	var xy = this.id.split("_");
	search_weather(xy[0],xy[1]);
});

function setWeatherData() {
	var data = JSON.parse(localStorage.getItem('wData'));
	data = data.weather.forecast3days[0];
	$("#timeRelease").html(data.timeRelease);
	
	if(data.fcst3hour.sky) {
		var sky = data.fcst3hour.sky;
		var temp = data.fcst3hour.temperature;
		var humidity = data.fcst3hour.humidity;
		
		var skyArr = [];
		for(var i=4; i <=67; i+=3 ) {
			var param = {};
			if(sky['name'+i+'hour'] != "") {
				param.hour = i;
				param.skyCode = sky['code'+i+'hour'];
				param.skyName = sky['name'+i+'hour'];
			}
			if(temp['temp'+i+'hour'] != "") {
				param.temp = temp['temp' + i + 'hour'];
			}
			
			if(humidity['rh' + i + 'hour'] != "") {
				param.humidity = humidity['rh' + i + 'hour'];
			}
			
			if(Object.keys(param).length > 0) {
				skyArr.push(param);
			}
		}
		console.log(skyArr);
	}
}





