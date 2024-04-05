let center_e_clr;
let game_over = false;
let draw_button;
//buttons array
let btns = {};
//img
let img_poker_back;
let img_poker_back_p;
//resize
let ww, hh, vw, vh;
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
//new code
const cardAmount = {};
for (let i = 1; i <= 13; i++) {
  cardAmount[i] = initialValue;
}

/////
let card_ls = "0-A-2-3-4-5-6-7-8-9-10-J-Q-K".split("-");
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

//for card pick display
let cshow_top, cshow_gap, cshow_width, cshow_height, cshow_x;
//for select mate keyboard
let alphabet = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
let keyboard_1_input = "";
let keyboard_2_input = "";
//mate display
let mateDisplay = [];

let gamePage = "load";
//load, welcome, set, play, pick, mate, gameover
// set the sound effect

let hitsound2, winsound, drawsound;
let currentIndex;
let pickAniTimer;
function preload() {
  font_1 = loadFont("assets/LilitaOne-Regular.ttf");
  font_2 = loadFont("assets/ShareTechMono-Regular.ttf");
  soundFormats("wav");
  hitsound2 = loadSound("assets/chillhit");
  winsound = loadSound("assets/Horn");
  drawsound = loadSound("assets/draw");
  img_poker_back = loadImage("assets/poker.png");
  img_poker_back_p = loadImage("assets/poker_p.png");
}
function setup() {
  var pe = document.getElementById("p5-cvs-container");
  console.log(pe.offsetWidth, pe.offsetHeight);
  cvs = createCanvas(pe.offsetWidth, pe.offsetHeight);
  cvs.parent("p5-cvs");
  // refocus_myself();
  // bk_color = color(random(50, 150), random(50, 150), random(50, 150));
  bk_color = color(100);
  center_e_clr = color(255, 50);

  //input
  yourNameInput = createInput("Jerry", "text");
  yourNameInput.addClass("button-13");
  partnerNameInput = createInput("Max", "text");
  partnerNameInput.addClass("button-13");
  button = createButton("submit");
  button.addClass("button-74");
  yourNameInput.hide();
  partnerNameInput.hide();
  button.hide();

  // //draw card
  // draw_button = createButton("^");
  // //note width is not responsed
  // draw_button.position(width / 2 - width * 0.125, height * 0.53);
  // draw_button.mousePressed(draw_a_card);
  // draw_button.addClass("button-74");
  // draw_button.hide();

  windowSize_base = width * 0.0015;

  textSize_s = windowSize_base * 32;
  textSize_base = windowSize_base * 53;
  textSize_m = windowSize_base * 37;
  textSize_l = windowSize_base * 65;
  textSize_xl = windowSize_base * 85;
  textSize_x = windowSize_base * 500;
  // print(width + "," + height);
  // print(windowSize_base);

  //push all 52 cards
  for (i = 1; i <= 13; i++) {
    cards.push({ num: i });
    cards.push({ num: i });
    cards.push({ num: i });
    cards.push({ num: i });
  }
  //shuffle the cards
  cards.sort(() => Math.random() - 0.5);
  //set all the size var
  sizeRefresh();

  //set card pick display value
  cards.forEach((card, index) => {
    let cy = cshow_top + cshow_gap * index;
    card.display = { y: cy };
  });
  // console.log(cards);
  //add buttons
  createAButton("draw_button", "^", 0.5, 0.6, undefined, undefined, () => {
    draw_a_card();
  });
  createAButton("welcome_play", "Play", 0.5, 0.6, 1.5, undefined, () => {
    gamePage = "play";
    // btns.draw_button.show();
    btns.welcome_play.hide();
  });
  //create select mate keyboard
  //keyboard 1  button
  alphabet.forEach((a, index) => {
    createAButton("key_1_" + a, a, (index % 9) * 0.1 + 0.1, floor(index / 9) * 0.06 + 0.3, undefined, 0.6, () => {
      keyboard_1_input += a;
    });
  });
  //keyboard 1 clear button
  createAButton("key_1_clear", "Clear", 0.8, 3 * 0.06 + 0.3, undefined, 0.8, () => {
    keyboard_1_input = "";
  });
  //keyboard 2 button
  alphabet.forEach((a, index) => {
    createAButton("key_2_" + a, a, (index % 9) * 0.1 + 0.1, floor(index / 9) * 0.06 + 0.6, undefined, 0.6, () => {
      keyboard_2_input += a;
    });
  });
  //keyboard 2 clear button
  createAButton("key_2_clear", "Clear", 0.8, 3 * 0.06 + 0.6, undefined, 0.8, () => {
    keyboard_2_input = "";
  });
  //submit button
  createAButton("mate_submit", "Submit", 0.5, 0.95, undefined, 1.8, () => {
    //sunmit mate code goes here
    gamePage = "play";
    mateDisplay.push({ host: keyboard_1_input, mate: keyboard_2_input });
    keyboard_1_input = "";
    keyboard_2_input = "";
    for (let letter of alphabet) {
      let buttonKey1 = "key_1_" + letter;
      btns[buttonKey1].hide();
      let buttonKey2 = "key_2_" + letter;
      btns[buttonKey2].hide();
    }
    btns.key_1_clear.hide();
    btns.key_2_clear.hide();
    btns.mate_submit.hide();
    // btns.draw_button.show();
  });

  btns.welcome_play.show();
  //set game status
  gamePage = "welcome";
  textFont(font_1);
}

function draw() {
  if (screen_rotate == "landscape") {
    push();
    background(0);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("please turn to portrait!", width / 2, height / 2);
    pop();
    return;
  }
  if (game_over) {
    if (mouseIsPressed) {
      draw_button.mousePressed(location.reload());
    }
    return;
  }
  //all functions are in game-functions.js except few
  let aniTimer = millis() - pickAniTimer;
  //change background when hit the screen
  // background_control(); //not using
  background(bk_color);
  //welcome page
  if (gamePage == "welcome") {
    //draw the bottom info
    draw_credit();
    //
    push();
    textAlign(CENTER);
    textSize(50);
    text("welcome page", width / 2, height * 0.3);
    pop();
  } else if (gamePage == "pick" || gamePage == "choose") {
    push();
    textAlign(CENTER);
    textSize(50);
    translate(width * 0.2, height * 0.5);
    rotate(radians(90));
    text("pick a card", 0, 0);
    translate(0, -width * 0.6);
    rotate(radians(180));
    text("pick a card", 0, 0);
    pop();
    push();
    stroke(30);
    fill(160);
    cards.forEach((card) => {
      let cshow_x_offset = 0;
      if (
        mouseX > cshow_x &&
        mouseX < cshow_x + cshow_width &&
        mouseY > card.display.y &&
        mouseY < card.display.y + cshow_gap
      ) {
        cshow_x_offset = 50;
      }
      // text(millis() - drew_timer, 50, 550);
      push();
      translate(cshow_x + cshow_x_offset, card.display.y);
      rect(0, 0, cshow_width, cshow_height, cshow_height * 0.1);
      image(img_poker_back, 0, 0, cshow_width, cshow_height);
      text(card.num, 0, 0);
      pop();
    });
    pop();
  } else if (gamePage == "play") {
    //draw the items in the center
    draw_center_items();
    //draw the case 6 text line
    //who needs to drink lines
    draw_drink_mate_lines();
    //draw the current task in 4 sides
    draw_current_task();
    //display card left
    showCurrentCard();
  } else if (gamePage == "selectMate") {
    push();
    textAlign(CENTER, CENTER);
    textSize(50);
    translate(width * 0.5, height * 0.1);
    text("Select a mate", 0, 0);
    translate(0, height * 0.1);
    text("You are", 0, 0);
    translate(0, height * 0.3);
    text("You choose", 0, 0);
    translate(0, height * 0.3);
    text(keyboard_2_input + " drinks when " + keyboard_1_input + " drinks!", 0, 0);
    pop();
  } else if (gamePage == "hasChosen") {
    push();
    stroke(30);
    fill(160);
    if (aniTimer < 200) {
      cards.forEach((card, index) => {
        let cshow_x_offset = 0;
        if (currentIndex == index) {
          cshow_x_offset = (aniTimer / 200) * (width * 0.7);
        }
        push();
        translate(cshow_x + cshow_x_offset, card.display.y);
        rect(0, 0, cshow_width, cshow_height, cshow_height * 0.1);
        image(img_poker_back, 0, 0, cshow_width, cshow_height);
        pop();
      });
    } else if (aniTimer < 1000) {
      push();
      var tti = map(aniTimer, 200, 1000, 0, 1);
      translate((1 - easeOutExpo(tti)) * width, 0);
      rect(0, 0, width, height, height * 0.1);
      image(img_poker_back_p, 0, 0, width, height);
      pop();
    } else if (aniTimer < 1800) {
      push();
      var tti = map(aniTimer, 1000, 1800, 0, 1);
      translate(-easeInOutExpo(tti) * width, 0);
      rect(0, 0, width, height, height * 0.1);
      image(img_poker_back_p, 0, 0, width, height);
      pop();
    } else if (aniTimer < 1300) {
      // push();
      // rectMode(CENTER);
      // imageMode(CENTER);
      // textAlign(CENTER, CENTER);
      // textSize(400);
      // let tsc = map(aniTimer, 1000, 1300, 0, 1);
      // translate(width / 2, height / 2);
      // rect(0, 0, width * tsc, height, height * 0.1);
      // fill(255);
      // // scale(tsc, 0);
      // text(currentNumber, 0, 0);
      // pop();
    }
    pop();
    if (aniTimer > 1000) {
      if (currentNumber == 6) {
        for (let letter of alphabet) {
          let buttonKey1 = "key_1_" + letter;
          btns[buttonKey1].show();
          let buttonKey2 = "key_2_" + letter;
          btns[buttonKey2].show();
        }
        btns.key_1_clear.show();
        btns.key_2_clear.show();
        btns.mate_submit.show();
        gamePage = "selectMate";
      } else if (currentNumber == 13) {
        king_cup_times++;
        if (king_cup_times < 4) {
          gamePage = "play";
          // btns.draw_button.show();
        } else {
          gamePage = "gameover";
          winsound.play();
        }
      } else {
        gamePage = "play";
        // btns.draw_button.show();
      }
    }
  } else if (gamePage == "gameover") {
    fill(255, 0, 0, 140);
    rect(0, 0, width, height);
    fill(255);
    rect(0, 200, width, 200);
    fill(0);
    textAlign(CENTER);
    textSize(textSize_base);
    text("You are the drinking KING!", width / 2, 260);
    textSize(textSize_base);
    text("Game Over", width / 2, 350);
    game_over = true;
  }
  if (aniTimer < 1800 && aniTimer >= 1000) {
    push();
    stroke(30);
    fill(160);
    var tti = map(aniTimer, 1000, 1800, 0, 1);
    translate(-easeInOutExpo(tti) * width, 0);
    rect(0, 0, width, height, height * 0.1);
    image(img_poker_back_p, 0, 0, width, height);
    pop();
  }
  //all the game cases switch in game-cases.js
  game_cases_switch();

  //if Gameover
  // if_game_over();

  //if draw 6
  // draw_case_6_in_draw();

  // draw_a_card_run();

  // let cgap = 15;
  // let cwidth = 100;
  // let cheight = 50;
  // let pickCards = [];
  // for (let c = 0; c < cards.length; c++) {
  //   let cx = width / 2;
  //   let cy = c * cgap + 50;
  //   if (mouseX > cx && mouseX < cx + cwidth && mouseY > cy && mouseY < cy + cgap) {
  //     cx += 50;
  //   }
  //   rect(cx, cy, cwidth, cheight);
  // }

  // card pick display
  if (gamePage == "pick" || gamePage == "choose") {
  }

  push();
  fill(0, 255, 0);
  text(gamePage, 50, 50);
  pop();
}
function mouseReleased() {
  cards.forEach((card, index) => {
    if (
      mouseX > cshow_x &&
      mouseX < cshow_x + cshow_width &&
      mouseY > card.display.y &&
      mouseY < card.display.y + cshow_gap &&
      gamePage == "choose"
    ) {
      if (millis() - drew_timer < 1000) {
        return;
      }
      console.log(card.num, index);
      currentNumber = card.num;
      currentIndex = index;
      cardAmount[card.num]--;
      //important
      cards.splice(index, 1);
      //run draw card function

      //random pick for case never ever and categories
      //the lists are in all-list.js
      never_current = random(never_list);
      categories_current = random(categories_list);
      // drew_timer -= 510;

      gamePage = "hasChosen";
      pickAniTimer = millis();
      // if (currentNumber == 6) {
      //   for (let letter of alphabet) {
      //     let buttonKey1 = "key_1_" + letter;
      //     btns[buttonKey1].show();
      //     let buttonKey2 = "key_2_" + letter;
      //     btns[buttonKey2].show();
      //   }
      //   btns.key_1_clear.show();
      //   btns.key_2_clear.show();
      //   btns.mate_submit.show();
      //   gamePage = "selectMate";
      // } else if (currentNumber == 13) {
      //   king_cup_times++;
      //   if (king_cup_times < 4) {
      //     gamePage = "play";
      //     btns.draw_button.show();
      //   } else {
      //     gamePage = "gameover";
      //     winsound.play();
      //   }
      // } else {
      //   gamePage = "play";
      //   btns.draw_button.show();
      // }
    }
  });
  //change pick start action to choose action
  if (gamePage == "pick") {
    gamePage = "choose";
  }
}
function mousePressed() {
  //draw_a_card()
  if (gamePage == "play") {
    draw_a_card();
  }
}
function touchStarted() {}
function keyPressed() {}

function windowResized() {
  var pe = document.getElementById("p5-cvs-container");
  console.log(pe.offsetWidth, pe.offsetHeight);
  resizeCanvas(pe.offsetWidth, pe.offsetHeight);
  sizeRefresh();
}
function sizeRefresh() {
  //var
  w = width;
  h = height;
  ww = windowWidth;
  hh = windowHeight;
  vw = min(w, 600);
  vh = min(h, 1200);
  //button pos
  // draw_button.position(width / 2 - width * 0.125, height * 0.53);
  //reset card pick display value
  cshow_top = height * 0.1;
  cshow_gap = (height * 0.6) / cards.length;
  cshow_width = min(width * 0.7, 300);
  cshow_height = cshow_width * 0.75;
  cshow_x = width / 2 - cshow_width / 2;
  if (width > height) {
    screen_rotate = "landscape";
  } else {
    screen_rotate = "portrait";
  }
}

//createAButton(btn name, btn lable, x pos, y pos)
function createAButton(
  vari,
  lable,
  xS,
  yS,
  size = 1,
  sizew = 1,
  func = () => {
    "";
  }
) {
  let buttonVar = createButton(lable);
  buttonVar.sizeSet = { w: 0.2 * size * sizew, h: 0.07 * size, font: size };
  buttonVar.pos = { x: xS * ww - vw * buttonVar.sizeSet.w * 0.5, y: yS * hh - vw * buttonVar.sizeSet.w * 0.5 };
  buttonVar.position(buttonVar.pos.x, buttonVar.pos.y, "fixed");
  buttonVar.size(vw * buttonVar.sizeSet.w, vw * buttonVar.sizeSet.h);
  buttonVar.style("font-size", String(vw * 0.02 * buttonVar.sizeSet.font) + "pt");
  buttonVar.addClass("button");
  buttonVar.id(vari);
  buttonVar.hide();
  //p5 mousePressed
  buttonVar.trigger = false;
  buttonVar.mousePressed(() => {
    buttonVar.trigger = true;
    // console.log(buttonVar);
    func();
  });
  //js eventlistener
  buttonVar.click = false;
  buttonVar.elt.addEventListener("click", () => {
    // console.log(vari);
    buttonVar.click = true;
  });
  Object.assign(btns, { [vari]: buttonVar });
  // console.log(buttonVar);
}

function showCurrentCard() {
  for (w = 1; w < card_ls.length; w++) {
    push();
    textAlign(CENTER);
    noStroke();
    fill(255);
    translate(40 + w * 25, 30);
    text(card_ls[w], 0, 0);
    noFill();
    stroke(255);
    strokeWeight(3);
    translate(0.2, -3.6);
    if (cardAmount[w] == 4) {
      arc(0, 0, 20, 20, -HALF_PI, PI + HALF_PI);
    } else if (cardAmount[w] == 3) {
      arc(0, 0, 20, 20, -HALF_PI, PI);
    } else if (cardAmount[w] == 2) {
      arc(0, 0, 20, 20, -HALF_PI, HALF_PI);
    } else if (cardAmount[w] == 1) {
      arc(0, 0, 20, 20, -HALF_PI, 0);
    }
    pop();
  }
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInOutExpo(x) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
}
