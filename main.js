//各変数の定義
let result = "";

let is_calc = false;

window.onload = function() {
  result = document.getElementById(`result`);
}

//ACキー
function reset() {
  result.value = "0";
  is_calc = false;
}

//数字キー
function num_click(val) {
  //計算済みの場合に数字キーを押すとresultを初期化
  if(is_calc) result.value = "0";
  is_calc = false;
  //0が入力された時resultに"0"を設定
  if(result.value == "0" && val == "0") {
    result.value = "0";
  } else if(result.value == "0" && val == "00") {
    result.value ="0"; 
  } else if(result.value == "0" && val == ".") {  //初期値の場合に.が入力された場合resultに0.を設定
    result.value = "0.";
  } else if(result.value == "0") {
    result.value = val;
  } else {
    result.value += val;
  }
}

//演算子キー
function ope_click(val) {
  if(is_calc) is_calc = false;

  if(is_ope_last()){
    result.value = result.value.slice(0, -1) + val;
  } else {
    result.value += val;
  }
}

// =キークリック
function equal_click() {
  if(is_ope_last())  result.value = result.value.slice(0, -1); //最後のキーが演算子の場合に演算子を排除

  let temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))(); //計算結果及び×と÷の置き換え
  if(temp == Infinity || Number.isNaN(temp)) { //最大値を超える演算の場合
    result.value = "Error";
  } else {
    result.value = temp;
    is_calc = true;
  }
}

// 入力されている値が演算子かどうか
function is_ope_last() {
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}