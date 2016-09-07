//1.获取要操作的对象
var game = document.getElementById("game");
var birdEle = document.getElementById("bird");

//游戏结束
var gameOver = false; 

//重力加速度
var g = 0.4; 

//天空对象
var sky = {
	//天空位置
    position: 0 
};

//小鸟对象
var bird = {
    entity: birdEle,
    //小鸟往右飞是通过移动天空的位置实现的
    speedX: 8, 
    speedY: 0,
    x: birdEle.offsetLeft,
    y: birdEle.offsetTop
};

//2 水平方向移动背景图

var timer = null;
timer = setInterval(function() {
    if (!gameOver) {
        //天空向左移动的距离就是小鸟向右飞行的速度，所以让天空在当前位置上每隔一段时间就自减一段距离。
        sky.position = sky.position - bird.speedX;
        game.style.backgroundPositionX = sky.position + "px";
		
		//小鸟加速运动
        bird.speedY = bird.speedY + g; 
        var step = bird.speedY;
        bird.y = bird.y + step;

        //4.碰撞检测
        if (bird.y > game.offsetHeight - birdEle.offsetHeight) {
            bird.y = game.offsetHeight - birdEle.offsetHeight;
            gameOver = true;
            clearInterval(timer);
        }
        if (bird.y < 0) {
            bird.y = 0;
            gameOver = true;
            clearInterval(timer);
        }
        bird.entity.style.top = bird.y + "px";
    }
}, 25);

//在页面上点击，让小鸟飞
document.onclick = function() {
        bird.speedY = -8;
    }
    //5 添加管子
function Pipe(positionX) {
    this.x = positionX;
    //管子宽度
    this.width = 52; 
    this.upPipeY = 0;
    this.upPipeH = parseInt(Math.random() * 175) + 100;
    this.downPipeY = this.upPipeH + 200;

    //整个游戏页面的高度为600
    this.downPipeH = 600 - this.downPipeY; 

    //根据上述属性创建div
    var divUp = document.createElement("div");
    divUp.className = "pipeU";
    divUp.style.width = this.width + "px";
    divUp.style.height = this.upPipeH + "px";
    divUp.style.left = this.x + "px";
    divUp.style.top = this.upPipeY + "px";

    var divDown = document.createElement("div");
    divDown.className = "pipeD";
    divDown.style.width = this.width + "px";
    divDown.style.height = this.downPipeH + "px";
    divDown.style.left = this.x + "px";
    divDown.style.top = this.downPipeY + "px";
    game.appendChild(divUp);
    game.appendChild(divDown);
    //用于保存当前变量
    var that = this 

    //移动管子
    setInterval(function() {
        that.x = that.x - 1;
        if (that.x < -52) {
            that.x = 800;
        }

        if (!gameOver) {
            //计算完后还要设置位置
            divUp.style.left = that.x + "px";
            divDown.style.left = that.x + "px";
        }

        //管子的碰撞检测
        var downCrash = (bird.x + 34 > that.x) && (bird.x < that.x + 52) && (bird.y + 25 > that.downPipeY);
        var upCrash = (bird.x + 34 > that.x) && (bird.x < that.x + 52) && (bird.y < that.upPipeH);
        if (downCrash || upCrash) {
            gameOver = true;        
        }

    }, 10);
}

for (var i = 0; i < 4; i++) {
    new Pipe(400 + 200 * i);
}
