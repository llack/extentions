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
			'Authorization' : 'KakaoAK '+keyIs('kakao'),
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