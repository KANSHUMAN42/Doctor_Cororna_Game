function init(){

    var canvas= document.getElementById('mycanvas');
    W=canvas.width=1400;H=canvas.height=600;
    pen=canvas.getContext('2d');
    cs=35;
    food=getRandomFood(); 
    gameover=false;

   food_img=new Image();
   food_img.src="assets/corona.jpg";
   
   snake_img=new Image();
   snake_img.src="assets/doctor-character-background_1270-84.jpg";

    snake={
        init_len:5,
        color:'aqua',
        cells:[],
        direction:"right",

        create_snake: function(){
          for(var i=this.init_len;i>0;i--){
             this.cells.push({x:i,y:0});
          }
        },
        draw_snake: function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.drawImage(snake_img,this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },
        update_snake: function(){
              
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
        if(headX==food.x&&headY==food.y){
            food=getRandomFood();
        }
        else{
            this.cells.pop();
        }
            var X,Y;
          if(this.direction=='right'){
             X=headX +1;
            Y= headY;
        }
            else if(this.direction=='left'){
                 X=headX-1;
                 Y=headY;
            }
            else if(this.direction=='up'){
                 X=headX;
                 Y=headY-1;
            }
            else if(this.direction=='down'){
                 X=headX;
                 Y=headY+1;
            }
            this.cells.unshift({x:X,y:Y});
        
        var lastX=Math.round(W/cs);
        var lastY=Math.round(H/cs);
        if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>lastX || this.cells[0].y>lastY){
            gameover=true;
        }
        }  
    };
    snake.create_snake();
    function keyPressed(e){
        console.log("keyPressed",e.key);
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
       else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
        else if (e.key=="ArrowDown"){
            snake.direction="down";
        }

    }
    document.addEventListener('keydown',keyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.draw_snake();
    pen.fillStyle=food.color;
pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);


}

function update(){
    
snake.update_snake();

}

function getRandomFood(){
    var foodX=Math.round((Math.random()*(W-cs)/cs));
    var foodY=Math.round((Math.random()*(H-cs)/cs));

    var food={
        x:foodX,
        y:foodY,
        color:"red"
    };
return food;
}

function gameloop(){
    if(gameover==true){
        clearInterval(f);
        alert("Game is Over You Piece of Shit");
    }
      draw();
      update();

}
init();
    var f=setInterval(gameloop,150);