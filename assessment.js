'user strict';
const userNameInput = document.getElementById('user-name');　//　入力エリア
const assessmentButton = document.getElementById('assessment'); // 診断ボタン
const resultDivided = document.getElementById('result-area');　//　結果表示エリア
const tweetDivided = document.getElementById('tweet-area');　//　ツイートボタン

/**
 * 指定した要素(タグ)の子要素をすべて削除する関数
* @param　{HTMLElement} element HTMLの要素
*/
function removeAllchildren(element) {　//　elementでresultDividedを受け取って
  // 診断結果表示エリアの子要素がある限りループする
  while (element.firstChild) {
    // 診断結果表示エリアの最初の子要素を削除する
    element.removeChild(element.firstChild);
  }
}

//　診断ボタンが押された時の処理　
assessmentButton.onclick = () => {
  const userName = userNameInput.value; // ユーザー入力を取得
  if (userName.length === 0) {　// (userName === "")でもOK
    return;　// 入力が空の空だったら処理を中断
  }

  // 診断エリアの作成
  // ▼▼▼　今ある診断結果を削除する ▼▼▼
  removeAllchildren(resultDivided); // 結果表示エリアの子要素をすべて削除
   // ▼▼▼ 診断を実行して結果を表示する ▼▼▼
  const header = document.createElement('h3'); // h3タグを新しく作る
  header.innerText = '診断結果';　// h3タグにテキストを設定する
  resultDivided.appendChild(header);　// h3タグを診断結果表示エリアに追加する

  const p = document.createElement('p'); // pタグを新しく作る
  // assessment関数を実行して、pタグに診断結果を設定する
  const result =assessment(userName); //　診断結果を取得
  p.innerText = result;
  resultDivided.appendChild(p);

  const img = document.createElement('img');  // imgタグを診断結果表示エリアに追加
  img.setAttribute('src', 'mike.png');
  resultDivided.appendChild(img);

 //　ツイートエリアの作成
  removeAllchildren(tweetDivided);　// ツイート表示エリアの子要素をすべて削除
 //  ツイートボタンを設置する
  const anchor = document.createElement('a');　// aタグを新しく作る
  //　リンク先を作成
  const href = 'https://twitter.com/intent/tweet?button_hashtag=' 
  + encodeURIComponent ('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href',href);　//　リンク先を設定
  //　widgets.jsがツイートボタンに変換するためのマーカー
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text',result); // ツイート本文
  anchor.innerText = 'Tweet #あなたのいいところ'; // ボタンの表示内容
  tweetDivided.appendChild(anchor); // aタグをHTML上(ツイートエリア)に表示
  
  //　widgets.js の設定
  const script = document.createElement('script'); // scriptタグを新しく作る
  // 読み込むjsファイル(Twitterが提供しているwidgets.jsファイルを読み込む)
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);　//　scriptタグをHTML上(ツイートエリア)に設置
}

// 入力欄でEnterキーを押したときにも診断するようにする
userNameInput.onkeydown = function(event) { // アロー演算子では = event =>{
  if(event.key === 'Enter'){
      assessmentButton.onclick(); //　.onclick();で実行させる
  }
} 

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
* 名前の文字列をパラメーターとして渡すと、診断結果を返す関数
* @param {string} userName ユーザーの名前
* @return {string} 診断結果
*/
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  //　文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  // TODO {userName} をユーザーの名前に置き換える
  result = result.replaceAll('{userName}', userName);
  return result; // 診断結果
}

console.log(assessment('太郎'));

//　テスト
console.assert(
  assessment('太郎') ===
  '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

//　「入力が同じ名前なら、同じ診断結果を出力する」処理が正しいかテスト
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
