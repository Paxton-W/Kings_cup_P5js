let greeting = []
let currentNumber = 0;
let currentText;
let bg_clr = {r:14,g:93,b:124}

let hitSound, hitsound2;


let desc_wd_x = 50;
let desc_wd_y = 300;

let never_current;
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
  hitsound2 = loadSound('assets/chillhit')
}

function setup() {
  createCanvas(480, 720);
}


function draw() {
  if(game_over){
    return;
  }
  background(bg_clr.r,bg_clr.g,bg_clr.b);
  if(bg_clr.r>0){bg_clr.r-=9};
  if(bg_clr.g>53){bg_clr.g-=9};
  if(bg_clr.b>89){bg_clr.b-=3}

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
  fill(255);
  textSize(25);
  textAlign(CENTER);
  if(king_cup_times>3){
    fill(255,255,0)
  }
  text('G',width/2+35,400);
  if(king_cup_times>2){
    fill(255,255,0)
  }
  text('N',width/2+10,400);
  if(king_cup_times>1){
    fill(255,255,0)
  }
  text('I',width/2-10,400);
  if(king_cup_times>0){
    fill(255,255,0)
  }
  text('K',width/2-30,400);
  
  
  
  pop()
  push()
  fill(255)
  textSize(150);
  textAlign(CENTER);
  text(currentNumber,width/2,height/2);
  pop()
  push()
  fill(255);
  for(let i = 0;i<friends_drink.length-1;i+=2){
    textSize(15);
    fill(244, 127, 48)
  text(friends_drink[1]+" needs to drink when "+friends_drink[0]+" drink",40,630+i*7);
    push()
    rotate(PI)
    text(friends_drink[1]+" needs to drink when "+friends_drink[0]+" drink",-460,-70+i*7);
    pop()
    
  }
  pop()
  push()
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text(currentText,width/2,600)

  rotate(PI/2)
  text(currentText,height/2,-100)

  rotate(PI/2)
  text(currentText,-width/2,-100)

  rotate(PI/2)
  text(currentText,-height/2,400)
  pop()
  push()
  switch(currentNumber){
    case 1:
      currentText = 'Pick sb to drink'
      if_new_change = false;
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
      currentText = 'Four is Whores '
      if_new_change = false;
    break;
    case 5:
      currentText = 'Five is Guys'
      if_new_change = false;
    break;
    case 6:
      currentText = 'friend drinks'
      if_case_6 = true;
    break;
    case 7:
      currentText = 'Heaven'
      if_new_change = false;
    break;
    case 8:
      currentText = '2'
      if_new_change = false;
    break;
    case 9:
      currentText = 'Rhyme Time'
      if_new_change = false;
    break;
    case 10:
      currentText = 'Categories'
      if_new_change = false;
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
    break;
  }
pop()

  if(frameCount-set_delays===60){
    friends_drink_record_2()
  }
  if(king_cup_times>=4){
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
  console.log(friends_drink);
}


function mousePressed(){
  if(game_over){
    return;
  }
  bg_clr.r = 244;
  bg_clr.g = 238;
  bg_clr.b = 173;

  //currentNumber = int(random(1,14));
  currentNumber = 6
  never_current = random(never_list)
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
}
