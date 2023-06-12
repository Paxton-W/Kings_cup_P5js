let center_e_clr;
let game_over = false;

function setup() {
  createCanvas(390, 660);
  center_e_clr = color(255, 50)
  yourNameInput = createInput("Jerry", "text");
  partnerNameInput = createInput("Max", "text");
  button = createButton("submit");
  yourNameInput.hide();
  partnerNameInput.hide();
  button.hide();
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
  //if draw 6
  draw_case_6_in_draw()
}

function mousePressed(){
 draw_a_card()
}


function touchStarted() {
  draw_a_card()
}
