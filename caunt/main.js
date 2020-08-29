var n;													// 数値格納用
var number;											// 数値表示部分のDOM取得用						
const STORAGE_KEY = "COUNTER";		// ローカルストレージキー

/*
 * スワイプイベント設定
 */
function setSwipe(elem) {
	let t = document.querySelector(elem);
	let startX;		// タッチ開始 x座標
	let startY;		// タッチ開始 y座標
	let moveX;	// スワイプ中の x座標
	let moveY;	// スワイプ中の y座標
	let dist = 30;	// スワイプを感知する最低距離（ピクセル単位）
	
	// タッチ開始時： xy座標を取得
	t.addEventListener("touchstart", function(e) {
		e.preventDefault();
		startX = e.touches[0].pageX;
		startY = e.touches[0].pageY;
	});
	
	// スワイプ中： xy座標を取得
	t.addEventListener("touchmove", function(e) {
		e.preventDefault();
		moveX = e.changedTouches[0].pageX;
		moveY = e.changedTouches[0].pageY;
	});
	
	// タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
	t.addEventListener("touchend", function(e) {
		if (startX > moveX && startX > moveX + dist) {		// 右から左にスワイプ
			sub();	// 数値を－１する
		}
		else if (startX < moveX && startX + dist < moveX) {	// 左から右にスワイプ
			add();			// 数値を＋１する
		}
	});
}

/*
 * ローカルストレージチェックし、前回最後に表示していた数値データを取得
 */
function checkStorageKey(){
	// ローカルストレージチェック
	let ret = localStorage.getItem(STORAGE_KEY);
	console.log("保存状態: " + ret);
	
	// キーが存在するかのチェック
	if(ret !== null){		// 戻り値がnull：保存データあり
		n = Number(ret);	// 数値化して変数に代入（ローカルストレージデータは文字列のため計算できるようにする）
	}
	else{						// 戻り値が存在：保存データなし
		n = 0;					// 0を代入
	}
	console.log("n = " + n);
}

/*
 * ローカルストレージに現在表示中の番号を保存
 */
function setStorageKey(){
	localStorage.setItem(STORAGE_KEY, n);
}

/*
 * 数値を＋１する
 */
function add(){
	n ++;
	setNumber();	// 表示とローカルストレージ保存
}

/*
 * 数値を－１する
 */
function sub(){
	n --;
	setNumber();	// 表示とローカルストレージ保存
}

/*
 * 数値を画面に表示後、ローカルストレージに保存
 */
function setNumber(){
	// 数値を表示
	number.innerHTML = n;
	// ストレージに表示中の数値を保存
	setStorageKey();
}

/*
 * 起動時の処理
 */
window.addEventListener("load", function(){
	// 数値表示部分のDOM取得
	number = document.getElementById("number");
		
	// ローカルストレージをチェック
	checkStorageKey();

	// 数値を画面に表示
	setNumber();

	// スワイプイベント設定
	setSwipe("#contents");
});
