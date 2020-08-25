/*canvasというHTML要素を生成。
canvasはグラフィックを描画するHTMLタグ。
JavaScriptで描画する内容を定義する*/
var c = document.createElement("canvas");
/*canvasを描画するために必要であるcontextを用意。
2dは二次元の意味*/
var ctx = c.getContext("2d");
//canvasの大きさを設定
c.width = 500;
c.height = 350;
/*作製したcontextをHtMLのbodyに追加*/
document.body.appendChild(c);
/*loopという関数を作る。
同じ描画を繰り返す*/

var perm = [];
/*　Math.floor()は小数点以下を無視し整数だけを取る関数。
　　Math.random()*255 は0から255の数字をてきとうにピックアップ*/ 
while (perm.length < 255){
    while (perm.includes(val = Math.floor(Math.random()*255{
    perm.push(val);
    }
}

var lerp = (a, b, t) => a+(b-a)*t;
/*斜面の山を示す.
noise関数はランダムだが自然界にありそうなフィボナッチ的な数*/
var noise = x => {
    return;
}

requestAnimationFrame()メソッドは
ブラウザにアニメーションを行いたいことを知らせ、
指定した関数を呼び出して次の再描画前にアニメーションを
リセットすることを要求する*/
function loop(){
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, c.width, c.height);
    requestAnimationFrame(loop);
}
//loopの実行
loop();

