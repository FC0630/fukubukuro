<script type="text/javascript">
counter();

function counter() {
	var c_name,count;
	//cookie名
	c_name = "cookie_count";

	//cookieの読込
	count = loadCookie(c_name);
	if (count == "") {
		//データがない場合
		count = 1;
	} else {
		//データがある場合
		count++;
	}

	//countを表示
	document.getElementById("countnumber").innerHTML = count;
	
	//cookieの保存
	saveCookie(c_name,count,60);
}

//cookie読込
function loadCookie(c_name) {
	var s,n,m,c_data;
	//cookieの読み込み
	c_data = document.cookie;
	//cookie名
	c_name = c_name + "=";
	//有効なcookie名を調べる
	n = c_data.indexOf(c_name,0);
	if (n > -1) {
		//cookieのデータ部分を取り出す
		m = c_data.indexOf(";",n + c_name.length);
		if (m == -1) m = c_data.length;
		s = c_data.substring(n + c_name.length,m);
		//デコード
		return unescape(s);
	} else {
		return "";
	}
}

//cookie保存
function saveCookie(c_name,c_data,c_day) {
	var n,c_date,c_limit;
	//有効期限
	c_date = new Date(); 
	n = c_date.getTime() + (1000*60*60*24*c_day);
	c_date.setTime(n); 
	c_limit = c_date.toGMTString();
	//cookieの書き出し
	document.cookie = c_name + "=" + escape(c_data) + "; expires=" + c_limit;
}
</script>
