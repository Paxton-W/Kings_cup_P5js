let center_e_clr;
let game_over = false;

function setup() {
  createCanvas(390, 660);
  center_e_clr = color(255,50)
}

function draw() {
  if(game_over){
    return;
  }
  //all functions are in game-functions.js except few

  //change background when hit the screen
  background_control();
  //draw the items in the center
  draw_center_items();
  //draw the case 6 text line
  //who needs to drink lines
  draw_drink_mate_lines();
  //draw the current task in 4 sides
  draw_current_task();
  //all the game cases switch in game-cases.js
  game_cases_switch();
  //if Gameover
  if_game_over()
  //draw the bottom info
  draw_credit();

  //set the delay of pop up in case 6
  if(frameCount-set_delays===60){
    friends_drink_record()
  }
}

function mousePressed(){
  if(game_over){
    return;
  }

  //set background brighter when touch the screen
  bg_clr.r = 244;
  bg_clr.g = 238;
  bg_clr.b = 173;

  //pick a random number
  currentNumber = int(random(1,14));

  //this line is only for testing
  //currentNumber = 1

  //random pick for case never ever and categories
  //the lists are in all-list.js
  never_current = random(never_list)
  categories_current = random(categories_list)

  //help debuging
  if_new_change = true;

  //set the delay in case6
  //count the kings cup times
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

  //play the hitting sound
  //sound pre load is in sound-effects.js
  hitsound2.play();
  
}
