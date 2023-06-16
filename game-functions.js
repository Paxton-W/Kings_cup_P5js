let currentNumber = 0;
let currentText;
let currentDis = "n";
let bg_clr = { r: 14, g: 93, b: 124 };

let desc_wd_x = 50;
let desc_wd_y = 300;

let never_current, categories_current;
let king_cup_times = 0;

let if_case_6 = false;
let if_case_13 = false;
let draw_case_6 = false;
let if_new_change = false;
let friends_drink = [];
let name1, name2;

let set_delays = -70;

function background_control() {
  background(bk_color);
  if (bg_clr.r > 0) {
    bg_clr.r -= 9;
  }
  if (bg_clr.g > 53) {
    bg_clr.g -= 9;
  }
  if (bg_clr.b > 89) {
    bg_clr.b -= 3;
  }
}

function draw_credit() {
  push();
  fill(255, 100);
  textSize(textSize_s);
  text("Drinking Game", width * 0.05, height - 4);
  textSize(textSize_s);
  text("By Paxton", width * 0.35, height - 4);
  text("ver.2.0", width * 0.8, height - 4);
  text("King : " + king_cup_times, width * 0.6, height - 4);
  textAlign(CENTER);
  textSize(textSize_s);
  pop();
}

function draw_center_items() {
  //draw center ellipse
  push();
  fill(center_e_clr);
  noStroke();
  ellipse(width / 2, height / 2, windowSize_base * 200);
  pop();

  //draw the center king sign
  push();
  fill(255, 70);
  textSize(textSize_m);
  textAlign(CENTER);
  let h = height * 0.52;
  if (king_cup_times > 3) {
    fill(255, 255, 0);
  }
  text("G", width * 0.56, h);
  if (king_cup_times > 2) {
    fill(255, 255, 0);
  }
  text("N", width * 0.52, h);
  if (king_cup_times > 1) {
    fill(255, 255, 0);
  }
  text("I", width * 0.48, h);
  if (king_cup_times > 0) {
    fill(255, 255, 0);
  }
  text("K", width * 0.44, h);
  pop();

  //draw the center big current number
  push();
  fill(255);
  textSize(textSize_l);
  textAlign(CENTER);
  text(currentNumber, width / 2, height * 0.47);
  pop();
}

function draw_drink_mate_lines() {
  push();
  fill(255);
  for (let i = 0; i < friends_drink.length - 1; i += 2) {
    push();
    fill(244, 127, 48);
    textStyle(BOLD);
    textSize(textSize_s);
    text(friends_drink[i + 1], 40, height * 0.82 + i * 9);
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text(" needs to drink when ", 60 + friends_drink[i + 1].length * 13, height * 0.82 + i * 9);
    textStyle(BOLD);
    textSize(textSize_s);
    fill(244, 127, 48);
    text(friends_drink[i], 60 + 190 + friends_drink[i + 1].length * 13, height * 0.82 + i * 9);
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text("drink", 60 + 190 + friends_drink[i + 1].length * 13 + friends_drink[i].length * 13, height * 0.82 + i * 9);
    pop();
    push();
    rotate(PI);
    fill(244, 127, 48);
    textStyle(BOLD);
    textSize(textSize_s);
    text(friends_drink[i + 1], -width + 40, -height * 0.18 + i * 9);
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text(" needs to drink when ", -width + 60 + friends_drink[i + 1].length * 13, -height * 0.18 + i * 9);
    textStyle(BOLD);
    textSize(textSize_s);
    fill(244, 127, 48);
    text(friends_drink[i], -width + 60 + 190 + friends_drink[i + 1].length * 13, -height * 0.18 + i * 9);
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text("drink", -width + 60 + 190 + friends_drink[i + 1].length * 13 + friends_drink[i].length * 20, -height * 0.18 + i * 9);
    pop();
  }
  pop();
}

function draw_current_task() {
  push();
  fill(255);
  textSize(textSize_base);
  textAlign(CENTER);

  text(currentText, width / 2, height * 0.67);

  rotate(PI / 2);
  text(currentText, height / 2, -width * 0.2);

  rotate(PI / 2);
  text(currentText, -width / 2, -height * 0.33);

  rotate(PI / 2);
  text(currentText, -height / 2, width * 0.8);
  pop();

  if (currentDis.length > 2) {
    push();
    fill(200);
    textSize(textSize_s);
    textAlign(CENTER);

    text(currentDis, width / 2, height * 0.7);

    rotate(PI / 2);
    text(currentDis, height / 2, -width * 0.15);

    rotate(PI / 2);
    text(currentDis, -width / 2, -height * 0.3);

    rotate(PI / 2);
    text(currentDis, -height / 2, width * 0.85);
    pop();
  }
}

function if_game_over() {
  if (king_cup_times >= 4) {
    winsound.play();
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
}

function friends_drink_record() {
  draw_case_6 = false;
  //name1 = prompt("Please enter your name:", "Jerry");
  //name2 = prompt("Who you select?", "Aiden");
  yourNameInput.hide();
  partnerNameInput.hide();
  button.hide();
  draw_button.show();
  drew_timer = millis() + 2500;
  if (yourNameInput.value().length > 0) {
    friends_drink.push(yourNameInput.value());
  } else {
    friends_drink.push("Bad Guy");
  }
  if (partnerNameInput.value().length > 0) {
    friends_drink.push(partnerNameInput.value());
  } else {
    friends_drink.push("Poor Guy");
  }
}
let yourNameInput, partnerNameInput, button;
function draw_case_6_in_draw() {
  if (draw_case_6) {
    push();
    rectMode(CENTER);
    fill(30);
    noStroke();
    rect(width / 2, height / 2, width * 0.8, height * 0.8, 20);

    fill(65);
    textSize(textSize_x);
    textAlign(CENTER);
    text("6", width / 2, height * 0.6);

    textSize(textSize_base);
    fill(255);
    text("Select a Mate", width / 2, height * 0.2);
    textAlign(LEFT);
    draw_button.hide();
    yourNameInput.show();
    partnerNameInput.show();
    button.show();
    text("Your name: ", width * 0.15, height * 0.3);
    //yourNameInput = createInput("Jerry", "text");
    yourNameInput.position(width * 0.15, height * 0.35);

    text("Partner's name: ", width * 0.15, height * 0.5);
    //partnerNameInput = createInput("Max", "text");
    partnerNameInput.position(width * 0.15, height * 0.55);

    //button = createButton("submit");
    button.position(width * 0.15, height * 0.65);
    button.mousePressed(friends_drink_record);
    pop();
  } else {
    // yourNameInput.hide();
    // partnerNameInput.hide();
    // button.hide();
  }
}
let drew_timer = 0;
let new_num = 0

function draw_a_card() {
  if (draw_case_6) {
    return;
  }
  if (game_over) {
    return;
  }
  if (millis() - drew_timer < 700) {
    return;
  }
  drew_timer = millis();
  hitsound2.stop();
  //set background brighter when touch the screen
  bg_clr.r = 244;
  bg_clr.g = 238;
  bg_clr.b = 173;

  //pick a random number

  
    let n = int(random(cards.length))
    currentNumber = cards[n]
    cards.splice(n, 1)
    print(cards)
  
  // currentNumber = random(cards)
  // new_num = int(random(1, 14));



  //this line is only for testing
  //currentNumber = 6;
  //currentNumber = int(random(6, 8));

  //random pick for case never ever and categories
  //the lists are in all-list.js
  never_current = random(never_list);
  categories_current = random(categories_list);

  //help debuging
  if_new_change = true;

  //set the delay in case6
  //count the kings cup times
  switch (currentNumber) {
    case 6:
      set_delays = frameCount;
      if_new_change = false;
      if_case_6 = false;
      draw_case_6 = true;
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
