let greeting = []
let currentNumber = 0;
let currentText;
let bg_clr = {r:14,g:93,b:124}

let hitSound, hitsound2;


let desc_wd_x = 50;
let desc_wd_y = 300;

let never_current, categories_current;
let king_cup_times = 0;
let game_over = false;

let if_case_6 = false;
let if_case_13 = false;
let if_new_change = false;
let friends_drink = [];
let name1, name2;



let set_delays = -70;

function preload() {
  soundFormats('mp3');
  hitSound = loadSound('assets/Newhit');
  soundFormats('wav');
  hitsound2 = loadSound('assets/chillhit');
  winsound = loadSound('assets/Horn');
}

function setup() {
  createCanvas(480, 720);
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  if(game_over){
    return;
  }
  background(bg_clr.r,bg_clr.g,bg_clr.b);
  if(bg_clr.r>0){bg_clr.r-=9};
  if(bg_clr.g>53){bg_clr.g-=9};
  if(bg_clr.b>89){bg_clr.b-=3}
  fill(255,50)
  noStroke();
  ellipse(width/2,height/2,220);
  push()
  fill(255,100);
  textSize(20);
  text('Drinking Game',10,715);
  textSize(15);
  text('By Paxton',350,715);
  text('ver.1.0',430,715);
  text('King : '+king_cup_times,width/2,715)
  textAlign(CENTER);
  textSize(25);
  pop()
  push()
  fill(255,70);
  textSize(25);
  textAlign(CENTER);
  if(king_cup_times>3){
    fill(255,255,0)
  }
  text('G',width/2+35,430);
  if(king_cup_times>2){
    fill(255,255,0)
  }
  text('N',width/2+10,430);
  if(king_cup_times>1){
    fill(255,255,0)
  }
  text('I',width/2-10,430);
  if(king_cup_times>0){
    fill(255,255,0)
  }
  text('K',width/2-30,430);
  
  
  
  pop()
  push()
  fill(255)
  textSize(150);
  textAlign(CENTER);
  text(currentNumber,width/2,height/2+30);
  pop()
  push()
  fill(255);
  for(let i = 0;i<friends_drink.length-1;i+=2){
    push()
    fill(244, 127, 48)
    textStyle(BOLD)
    textSize(20);
    text(friends_drink[i+1],40,630+i*9);
    textStyle(ITALIC)
    textSize(15);
    fill(237, 164, 116)
    text(" needs to drink when ",40+friends_drink[i+1].length*11,630+i*9);
    textStyle(BOLD)
    textSize(20);
    fill(244, 127, 48)
    text(friends_drink[i],190+friends_drink[i+1].length*11,630+i*9);
    textStyle(ITALIC)
    textSize(15);
    fill(237, 164, 116)
    text("drink",190+friends_drink[i+1].length*11+friends_drink[i].length*11,630+i*9);
    pop()
    push()
    rotate(PI)
    
    fill(244, 127, 48)
    textStyle(BOLD)
    textSize(20);
    text(friends_drink[i+1],-440,-90+i*9);
    textStyle(ITALIC)
    textSize(15);
    fill(237, 164, 116)
    text(" needs to drink when ",-440+friends_drink[i+1].length*11,-90+i*9);
    textStyle(BOLD)
    textSize(20);
    fill(244, 127, 48)
    text(friends_drink[i],-290+friends_drink[i+1].length*11,-90+i*9);
    textStyle(ITALIC)
    textSize(15);
    fill(237, 164, 116)
    text("drink",-290+friends_drink[i+1].length*11+friends_drink[i].length*11,-90+i*9);
    pop()
    
  }
  pop()
  push()
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text(currentText,width/2,600)

  rotate(PI/2)
  text(currentText,height/2,-80)

  rotate(PI/2)
  text(currentText,-width/2,-120)

  rotate(PI/2)
  text(currentText,-height/2,400)
  pop()
  push()
  switch(currentNumber){
    case 1:
      currentText = 'Waterfall'
      if_new_change = false;
      push()
      fill(19, 196, 0)
      textSize(16);
      text(' All players start drinking their beverage at the same time.\n No player can stop drinking until the player to their left stops.',30,500)
      rotate(PI)
      text(' All players start drinking their beverage at the same time.\n No player can stop drinking until the player to their left stops.',-450,-220)
      pop()
    break;
    case 2:
      currentText = 'Two is you'
      if_new_change = false;
    break;
    case 3:
      currentText = 'Three is me'
      if_new_change = false;
    break;
    case 4:
      currentText = 'Four is Girls'
      if_new_change = false;
    break;
    case 5:
      currentText = 'Five is Guys'
      if_new_change = false;
    break;
    case 6:
      currentText = 'Select a Mate'
      if_case_6 = true;
    break;
    case 7:
      currentText = 'Pick sb to drink'
      if_new_change = false;
    break;
    case 8:
      currentText = 'Everyone Drinks'
      if_new_change = false;
    break;
    case 9:
      currentText = 'Rhyme Time'
      if_new_change = false;
    break;
    case 10:
      currentText = 'Categories'
      if_new_change = false;
      push()
      fill(255,100,100)
      textSize(30);
      textStyle(BOLD)
      textAlign(CENTER)
      rotate(PI/2);
      text(categories_current,height/2,-20)
      rotate(PI);
      text(categories_current,-height/2,460)
      rotate(PI/2);
      text(categories_current,width/2,540)
      rotate(PI);
      text(categories_current,-width/2,-180)
      pop()
    break;
    case 11:
      currentText = 'Never Have I Ever'
      if_new_change = false;
      push()
      fill(255,100,100)
      textSize(20);
      textAlign(CENTER)
      rotate(PI/2);
      text(never_current,height/2,-50)
      rotate(PI);
      text(never_current,-height/2,450)
      pop()
    break;
    case 12:
      currentText = 'Questions'
      if_new_change = false;
    break;
    case 13:
      currentText = `King's Cup`
      if_case_13 = true;
      push()
      fill(225, 16, 150)
      textSize(25);
      textStyle(BOLD)
      text(`Pour your drink into king's cup`,50,530)
      rotate(PI)
      text(`Pour your drink into king's cup`,-420,-190)
      pop()
    break;
  }
pop()

  if(frameCount-set_delays===60){
    friends_drink_record_2()
  }
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


function friends_drink_record_2(){
  name1 = prompt("Please enter your name:", "Jerry");
  friends_drink.push(name1)
  name2 = prompt("Who you select?", "Aiden"); 
  friends_drink.push(name2)
  
}


function mousePressed(){
  if(game_over){
    return;
  }
  bg_clr.r = 244;
  bg_clr.g = 238;
  bg_clr.b = 173;

  currentNumber = int(random(1,14));
  //currentNumber = 13
  never_current = random(never_list)
  categories_current = random(categories_list)
  if_new_change = true;


  switch(currentNumber){
    case 6:
      set_delays = frameCount
      if_new_change=false;
      if_case_6 = false;
    break;
    case 13:
      if_new_change=false;
      king_cup_times++
    break;
  }
  hitsound2.play();
  console.log(categories_current);
}
