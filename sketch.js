let center_e_clr;
let game_over = false;
let draw_button;

let windowSize_base;
let textSize_base;
let textSize_s;
let textSize_m;
let textSize_l;
let textSize_xl;
let textSize_x;
let bk_color;
let screen_rotate;
let card_1, card_2, card_3, card_4, card_5, card_6, card_7, card_8, card_9, card_10, card_11, card_12, card_13;
const initialValue = 4;
card_1 =
  card_2 =
  card_3 =
  card_4 =
  card_5 =
  card_6 =
  card_7 =
  card_8 =
  card_9 =
  card_10 =
  card_11 =
  card_12 =
  card_13 =
    initialValue;
let card_ls = "A-2-3-4-5-6-7-8-9-10-J-Q-K".split("-");
let cur_card_count = [
  card_1,
  card_2,
  card_3,
  card_4,
  card_5,
  card_6,
  card_7,
  card_8,
  card_9,
  card_10,
  card_11,
  card_12,
  card_13,
];
let cvs;
let cards = [];
let font_1, font_2;

let gamePage = "load";

function setup() {
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.id("mainCanvas");
  refocus_myself();
  font_1 = loadFont("assets/LilitaOne-Regular.ttf");
  font_2 = loadFont("assets/ShareTechMono-Regular.ttf");
  bk_color = color(random(50, 150), random(50, 150), random(50, 150));
  center_e_clr = color(255, 50);
  yourNameInput = createInput("Jerry", "text");
  yourNameInput.addClass("button-13");
  partnerNameInput = createInput("Max", "text");
  partnerNameInput.addClass("button-13");
  button = createButton("submit");
  button.addClass("button-74");
  yourNameInput.hide();
  partnerNameInput.hide();
  button.hide();
  draw_button = createButton("^");
  //note width is not responsed
  draw_button.position(width / 2 - width * 0.125, height * 0.53);
  draw_button.mousePressed(draw_a_card);
  draw_button.addClass("button-74");

  if (width <= height) {
    //portrait
    screen_rotate = "portrait";
    windowSize_base = width * 0.0015;
  } else {
    //landscape
    screen_rotate = "landscape";
  }

  textSize_s = windowSize_base * 32;
  textSize_base = windowSize_base * 53;
  textSize_m = windowSize_base * 37;
  textSize_l = windowSize_base * 65;
  textSize_xl = windowSize_base * 85;
  textSize_x = windowSize_base * 500;
  // print(width + "," + height);
  // print(windowSize_base);
  textFont(font_1);

  for (i = 1; i <= 13; i++) {
    cards.push(i);
    cards.push(i);
    cards.push(i);
    cards.push(i);
  }
  //print(windowSize_base);
  gamePage = "welcome";
}

function draw() {
  if (screen_rotate == "landscape") {
    background(0);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("please turn to portrait!", width / 2, height / 2);
    return;
  }
  if (game_over) {
    if (mouseIsPressed) {
      draw_button.mousePressed(location.reload());
    }

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
  if_game_over();
  //draw the bottom info
  draw_credit();
  //if draw 6
  draw_case_6_in_draw();

  draw_a_card_run();

  showCurrentCard();
}

function mousePressed() {
  //draw_a_card()
}

function touchStarted() {
  // draw_a_card()
}

function keyPressed() {}

//for itch, fix the bug on inputs(button, text, input)
function refocus_myself() {
  var c = document.getElementById("mainCanvas");
  c.setAttribute("tabindex", "0");
  c.focus();
}
