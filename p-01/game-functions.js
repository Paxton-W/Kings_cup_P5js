let currentNumber = 0;
let currentText;
let bg_clr = {r:14,g:93,b:124}

let desc_wd_x = 50;
let desc_wd_y = 300;

let never_current, categories_current;
let king_cup_times = 0;

let if_case_6 = false;
let if_case_13 = false;
let if_new_change = false;
let friends_drink = [];
let name1, name2;

let set_delays = -70;

function background_control(){
  background(bg_clr.r,bg_clr.g,bg_clr.b);
  if(bg_clr.r>0){bg_clr.r-=9};
  if(bg_clr.g>53){bg_clr.g-=9};
  if(bg_clr.b>89){bg_clr.b-=3}
}

function draw_credit(){
  push()
    fill(255,100);
    textSize(10);
    text('Drinking Game',10,height-4);
    textSize(10);
    text('By Paxton',300,height-4);
    text('ver.1.0',350,height-4);
    text('King : '+king_cup_times,width/2,height-4)
    textAlign(CENTER);
    textSize(25);
  pop()
}

function draw_center_items(){
  //draw center ellipse
  push()
    fill(center_e_clr)
    noStroke();
    ellipse(width/2,height/2,220);
  pop()

  //draw the center king sign
  push()
    fill(255,70);
    textSize(25);
    textAlign(CENTER);
    if(king_cup_times>3){
      fill(255,255,0)
    }
    text('G',width/2+35-4,410);
    if(king_cup_times>2){
      fill(255,255,0)
    }
    text('N',width/2+10-4,410);
    if(king_cup_times>1){
      fill(255,255,0)
    }
    text('I',width/2-10-4,410);
    if(king_cup_times>0){
      fill(255,255,0)
    }
    text('K',width/2-30-4,410);
  pop()

  //draw the center big current number
  push()
    fill(255)
    textSize(150);
    textAlign(CENTER);
    text(currentNumber,width/2,height/2+40);
  pop()

}

function draw_drink_mate_lines(){
  push()
  fill(255);
  for(let i = 0;i<friends_drink.length-1;i+=2){
    push()
        fill(244, 127, 48)
        textStyle(BOLD)
        textSize(20);
        text(friends_drink[i+1],40,height-80+i*9);
        textStyle(ITALIC)
        textSize(15);
        fill(237, 164, 116)
        text(" needs to drink when ",60+friends_drink[i+1].length*11,height-80+i*9);
        textStyle(BOLD)
        textSize(20);
        fill(244, 127, 48)
        text(friends_drink[i],60+150+friends_drink[i+1].length*11,height-80+i*9);
        textStyle(ITALIC)
        textSize(15);
        fill(237, 164, 116)
        text("drink",80+150+friends_drink[i+1].length*11+friends_drink[i].length*11,height-80+i*9);
    pop()
    push()
        rotate(PI)
        fill(244, 127, 48)
        textStyle(BOLD)
        textSize(20);
        text(friends_drink[i+1],-width+40,-80+i*9);
        textStyle(ITALIC)
        textSize(15);
        fill(237, 164, 116)
        text(" needs to drink when ",-width+60+friends_drink[i+1].length*11,-80+i*9);
        textStyle(BOLD)
        textSize(20);
        fill(244, 127, 48)
        text(friends_drink[i],-width+60+150+friends_drink[i+1].length*11,-80+i*9);
        textStyle(ITALIC)
        textSize(15);
        fill(237, 164, 116)
        text("drink",-width+80+150+friends_drink[i+1].length*11+friends_drink[i].length*11,-80+i*9);
    pop()
  }
  pop();
}

function draw_current_task(){
  push()
    fill(255);
    textSize(30);
    textAlign(CENTER);
    
    text(currentText,width/2,height-100)

    rotate(PI/2)
    text(currentText,height/2,-50)

    rotate(PI/2)
    text(currentText,-width/2,-100)

    rotate(PI/2)
    text(currentText,-height/2,width-50)
  pop()
}

function if_game_over(){
  if(king_cup_times>=4){
    winsound.play();
    fill(255,0,0,140)
    rect(0,0,width,height)
    fill(255)
    rect(0,200,width,200)
    fill(0);
    textAlign(CENTER)
    textSize(30);
    text('You are the drinking KING!',width/2,260);
    textSize(50);
    text('Game Over',width/2,350)
    game_over = true;
  }
}

function friends_drink_record(){
  name1 = prompt("Please enter your name:", "Jerry");
  friends_drink.push(name1)
  name2 = prompt("Who you select?", "Aiden"); 
  friends_drink.push(name2)
}