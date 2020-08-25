/*canvasというHTML要素を生成。
canvasはグラフィックを描画するHTMLタグ。
JavaScriptで描画する内容を定義する*/
var c = document.createElement("canvas");
/*canvasを描画するために必要であるcontextを用意。
2dは二次元の意味*/
var ctx = c.getContext("2d");
//canvasの大きさを設定
c.width = 1000;
c.height = 500;
/*作製したcontextをHtMLのbodyに追加*/
document.body.appendChild(c);
/*loopという関数を作る。
同じ描画を繰り返す*/

var perm = [];
/*　Math.floor()は小数点以下を無視し整数だけを取る関数。
　　Math.random()*255 は0から255の数字をてきとうにピックアップ*/ 
while (perm.length < 255){
    while (perm.includes(val = Math.floor(Math.random()*255))){
    perm.push(val);
    }
}

var lerp = (a, b, t) => a+(b-a)*(1 - Math.cos(t * Math.PI)) / 2;
/*斜面の山を示す.
noise関数はランダムだが自然界にありそうなフィボナッチ的な数*/
var noise = x => {
    x = x * 0.01 % 255;
    return lerp (perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

/*プレイヤーの描画
 */
var player = new function(){
    this.x = c.width / 2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;
    this.grounded = 0;

    this.img = new Image();
    this.img.src = "image/moto.png";


    this.draw = function(){
        var p1 = c.height - noise(t + this.x)*0.25;
        var p2 = c.height - noise(t + 5 + this.x)*0.25;
        
        var grounded = 0

        if(p1 - 15 > this.y){
            this.ySpeed += 0.1;//重力によりバイクが落ちるスピードが上がっていく
        }else{
            this.ySpeed -= this.y - (p1 - 15);//バイクのバウンド
            this.y = p1 - 15;

            grounded = 1;
        }

        if(!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5){
            playing = false;
            this.rSpeed = 5;
            k.ArrowUp = 1;
            this.x -= speed * 2.5;
        }

        var angle = Math.atan2((p2 - 15) - this.y, (this.x + 5) - this.x);//向かい来る斜面の座標からバイクの角度を決定

        // this.rot = angle;

        this.y += this.ySpeed;

        if(grounded && playing) {
            this.rot -= (this.rot - angle)*0.5;
            this.rSpeed = this.rSpeed - (angle - this.rot);
        }

        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.5;
        this.rot -=this.rSpeed * 0.1;

        if(this.rot > Math.PI) this.rot = -Math.PI;
        if(this.rot < -Math.PI) this.rot = Math.PI;
        


        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.drawImage(this.img, -15, -15, 30, 30);

        ctx.restore();
    }
}

var t = 0;
var speed = 0;
var playing = true;
var k = {ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0};



/*requestAnimationFrame()メソッドは
ブラウザにアニメーションを行いたいことを知らせ、
指定した関数を呼び出して次の再描画前にアニメーションを
リセットすることを要求する*/
function loop(){
    speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.1;
    t += 3 * speed;
    ctx.fillStyle = "skyblue"; //背景色を定義
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "black"; //山の色を定義

    ctx.beginPath(); //山の線を描画
    ctx.moveTo(0, c.height);
    for (var i = 0; i < c.width; i++){
        ctx.lineTo(i, c.height - noise(t + i) * 0.25);    //山の斜面を左から右へ描画
    }
    ctx.lineTo(c.width, c.height);

    ctx.fill();

    player.draw();
    requestAnimationFrame(loop);
}
/*キー操作 */
onkeydown = d => k[d.key] = 1;
onkeyup = d => k[d.key] = 0;

//loopの実行
loop();

