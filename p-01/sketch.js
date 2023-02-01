let greeting = []
let currentNumber = 0;
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


  fill(255);
  textSize(30);
  text('Drinking Game',100,30);
  text('king:'+king_cup_times,300,200)
  textSize(150);
  text(currentNumber,100,200);

  
  for(let i = 0;i<friends_drink.length-1;i+=2){
    textSize(10);
  text(friends_drink[1]+" needs to drink when "+friends_drink[0]+" drink",100,500+i*10);
    
    
  }
  
  textSize(50);
  switch(currentNumber){
    case 1:
      text('Pick sb to drink',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 2:
      text('Two is you',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 3:
      text('Three is me',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 4:
      text('Four is Whores ',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 5:
      text('Five is Guys',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 6:
      text('friend drinks',desc_wd_x,desc_wd_y)
      if_case_6 = true;
    break;
    case 7:
      text('Heaven',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 8:
      text('2',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 9:
      text('Rhyme Time',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 10:
      text('Categories',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 11:
      text('Never Have I Ever',desc_wd_x,desc_wd_y)
      if_new_change = false;
      push()
      textSize(25);
      text(never_current,desc_wd_x,desc_wd_y+50)
      pop()
    break;
    case 12:
      text('Questions',desc_wd_x,desc_wd_y)
      if_new_change = false;
    break;
    case 13:
      text(`King's Cup`,desc_wd_x,desc_wd_y)
      if_case_13 = true;
    break;
  }


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

  currentNumber = int(random(1,14));
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
