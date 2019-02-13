function getXy(address) {
	makeTables();
	return;
	$("#w_notice").hide().html("");
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
				
				
				search_weather(data[0].y,data[0].x);
			}
		}
	});
}

function makeTables(data) {
	var test = $("#datatables").DataTable({
		data : [
			{
		        "name":       "Tiger Nixon",
		        "position":   "System Architect",
		        "salary":     "$3,120",
		        "office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		    	"name":       "Tiger Nixon",
		    	"position":   "System Architect",
		    	"salary":     "$3,120",
		    	"office":     "Edinburgh"
		    },
		    {
		        "name":       "Garrett Winters",
		        "position":   "Director",
		        "salary":     "$5,300",
		        "office":     "Edinburgh"
		    }
		]
		,columns: [
	        { data: 'name' },
	        { data: 'position' },
	        { data: 'salary' },
	        { data: 'office' }
	    ]
		
	});
	
	console.log(test);
	
}
function search_weather(lat,lon) {
	//console.log(lat.lon);
}

