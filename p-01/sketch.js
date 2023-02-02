let greeting = []
let currentNumber = 0;
let currentText;
let bg_clr = {r:14,g:93,b:124}
let center_e_clr;

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
  createCanvas(390, 660);
  center_e_clr = color(255,50)
}


function draw() {
  if(game_over){
    return;
  }
  background(bg_clr.r,bg_clr.g,bg_clr.b);
  if(bg_clr.r>0){bg_clr.r-=9};
  if(bg_clr.g>53){bg_clr.g-=9};
  if(bg_clr.b>89){bg_clr.b-=3}
  //draw center ellipse
  fill(center_e_clr)
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
  push()
  fill(255)
  textSize(150);
  textAlign(CENTER);
  text(currentNumber,width/2,height/2+40);
  pop()
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
  pop()
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
  push()
  switch(currentNumber){
    case 1:
      currentText = 'Waterfall'
      if_new_change = false;
      push()
      fill(180, 207, 102)
      textSize(24);
      textAlign(CENTER)
      text(' Everbody start drinking.\n No one can stops until you do.',width/2,height-180)
      rotate(PI)
      text(' Everbody start drinking.\n No one can stops until you do.',-width/2,-180)
      pop()
      center_e_clr = color(242, 68, 5)
    break;
    case 2:
      currentText = 'Two is you'
      if_new_change = false;
      push()
      fill(19, 196, 0)
      textSize(25);
      textAlign(CENTER)
      text('Choose someone to drink',width/2,height-150)
      rotate(PI)
      text('Choose someone to drink',-width/2,-150)
      pop()
      center_e_clr = color(166, 135, 78)
    break;
    case 3:
      currentText = 'Three is me'
      if_new_change = false;
      push()
      fill(19, 196, 0)
      textSize(28);
      textAlign(CENTER)
      text('You drink',width/2,height-150)
      rotate(PI)
      text('You drink',-width/2,-150)
      pop()
      center_e_clr = color(2, 110, 129)
    break;
    case 4:
      currentText = 'Four is Girls'
      if_new_change = false;
      center_e_clr = color(242, 102, 139)
    break;
    case 5:
      currentText = 'Five is Guys'
      if_new_change = false;
      center_e_clr = color(0, 153, 221)
    break;
    case 6:
      currentText = 'Select a Mate'
      if_case_6 = true;
      center_e_clr = color(4, 191, 157)
    break;
    case 7:
      currentText = 'Heaven'
      if_new_change = false;
      push()
      fill(19, 196, 0)
      textSize(22);
      textAlign(CENTER)
      text('The last person put both hands \nin the air drinks',width/2,height-170)
      rotate(PI)
      text('The last person put both hands \nin the air drinks',-width/2,-170)
      pop()
      center_e_clr = color(95, 205, 217)
    break;
    case 8:
      currentText = 'Everyone Drinks'
      if_new_change = false;
      center_e_clr = color(166, 188, 9)
    break;
    case 9:
      currentText = 'Rhyme Time'
      if_new_change = false;
      center_e_clr = color(140, 31, 40)
      push()
      fill(242, 68, 5)
      textSize(26);
      textAlign(CENTER)
      text('Think more than\n3 seconds drinks',width/2,height-170)
      rotate(PI)
      text('Think more than\n3 seconds drinks',-width/2,-170)
      pop()
    break;
    case 10:
      currentText = 'Categories'
      if_new_change = false;
      push()
      fill(255,100,100)
      textSize(30);
      textStyle(BOLD)
      textAlign(CENTER)
      text(categories_current,width/2,height-150)
      rotate(PI/2);
      text(categories_current,height/2,-15)
      rotate(PI/2);
      text(categories_current,-width/2,-150)
      rotate(PI/2);
      text(categories_current,-height/2,width-15)
      pop()
      center_e_clr = color(89, 28, 33)
    break;
    case 11:
      currentText = 'Never Have I Ever'
      if_new_change = false;
      push()
      fill(255,100,100)
      textSize(22);
      textAlign(CENTER)
      text(never_current,width/2,height-130)
      rotate(PI/2);
      text(never_current,height/2,-25)
      rotate(PI/2);
      text(never_current,-width/2,-130)
      rotate(PI/2);
      text(never_current,-height/2,width-25)
      pop()
      center_e_clr = color(242, 147, 37)
    break;
    case 12:
      currentText = 'Rule'
      if_new_change = false;
      push()
      fill(242, 147, 37)
      textSize(25);
      textAlign(CENTER)
      text('Make a rule,\n valid until next 12\n Anyone break the rule drinks',width/2,height-200)
      rotate(PI)
      text('Make a rule,\n valid until next 12\n Anyone break the rule drinks',-width/2,-200)
      pop()
      center_e_clr = color(2,82,89)
    break;
    case 13:
      currentText = `King's Cup`
      if_case_13 = true;
      push()
      fill(225, 16, 150)
      textSize(20);
      textStyle(BOLD)
      textAlign(CENTER)
      text(`Pour your drink into king's cup`,width/2,height-130)
      rotate(PI)
      text(`Pour your drink into king's cup`,-width/2,-130)
      pop()
      center_e_clr = color(242, 147, 37)
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
  //currentNumber = 1
  never_current = random(never_list)
  categories_current = random(categories_list)
  if_new_change = true;


  switch(currentNumber){
    case 6:
      set_delays = frameCount
      if_new_change = false;
      if_case_6 = false;
    break;
    case 13:
      if_new_change = false;
      king_cup_times++;
    break;
  }
  hitsound2.play();
  console.log(categories_current);
}
