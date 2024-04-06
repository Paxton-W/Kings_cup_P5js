let currentNumber = 0;
let currentText;
let currentDis = false;
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

let card_has_drawed = false;
let lastNumber = 0;

let set_delays = -70;

function background_control() {
  background(bk_color);
  // if (bg_clr.r > 0) {
  //   bg_clr.r -= 9;
  // }
  // if (bg_clr.g > 53) {
  //   bg_clr.g -= 9;
  // }
  // if (bg_clr.b > 89) {
  //   bg_clr.b -= 3;
  // }
}

function draw_credit() {
  push();
  fill(255, 100);
  textSize(textSize_s);
  text("Developed By Paxton", width * 0.1, height - 4);
  text("ver.3.0.1", width * 0.8, height - 4);
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
  let h = height * 0.55;
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
  let midx = width / 2;
  let midy = height * 0.52;
  if (currentNumber > 10) {
    switch (currentNumber) {
      case 11:
        text("J", midx, midy);
        break;
      case 12:
        text("Q", midx, midy);
        break;
      case 13:
        text("K", midx, midy);
        break;
    }
  } else {
    text(currentNumber, midx, midy);
  }

  pop();
}

let linegap = 14;

function draw_drink_mate_lines() {
  //not using
  let mate_x_1 = windowSize_base * 40;
  let mate_x_2 = textSize_s * 0.5;
  push();
  textFont(font_2);
  fill(255);
  for (let i = 0; i < friends_drink.length - 1; i += 2) {
    push();
    fill(244, 127, 48);
    textStyle(BOLD);
    textSize(textSize_s);
    text(friends_drink[i + 1], mate_x_1, height * 0.82 + i * linegap * windowSize_base);
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text(
      "needs to drink when",
      mate_x_1 * 1.5 + friends_drink[i + 1].length * mate_x_2,
      height * 0.82 + i * linegap * windowSize_base
    );
    textStyle(BOLD);
    textSize(textSize_s);
    fill(244, 127, 48);
    text(
      friends_drink[i],
      mate_x_1 * 1.5 + friends_drink[i + 1].length * mate_x_2 + mate_x_2 * 21,
      height * 0.82 + i * linegap * windowSize_base
    );
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text(
      "drink",
      mate_x_1 * 2 + friends_drink[i + 1].length * mate_x_2 + mate_x_2 * 21 + friends_drink[i].length * mate_x_2,
      height * 0.82 + i * linegap * windowSize_base
    );
    pop();
    push();
    rotate(PI);
    fill(244, 127, 48);
    textStyle(BOLD);
    textSize(textSize_s);
    text(friends_drink[i + 1], -width + mate_x_1, -height * 0.18 + i * linegap * windowSize_base);
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text(
      "needs to drink when",
      -width + 60 * windowSize_base + friends_drink[i + 1].length * 13 * windowSize_base,
      -height * 0.18 + i * linegap * windowSize_base
    );
    textStyle(BOLD);
    textSize(textSize_s);
    fill(244, 127, 48);
    text(
      friends_drink[i],
      -width + mate_x_1 * 1.5 + friends_drink[i + 1].length * mate_x_2 + mate_x_2 * 21,
      -height * 0.18 + i * linegap * windowSize_base
    );
    textStyle(ITALIC);
    textSize(textSize_s);
    fill(237, 164, 116);
    text(
      "drink",
      -width +
        mate_x_1 * 2 +
        friends_drink[i + 1].length * mate_x_2 +
        mate_x_2 * 21 +
        friends_drink[i].length * mate_x_2,
      -height * 0.18 + i * linegap * windowSize_base
    );
    pop();
  }
  pop();
}

function draw_current_task() {
  push();
  fill(255);
  textSize(textSize_xl);
  width > 500 && textSize(textSize_base);
  textAlign(CENTER);

  text(currentText, width / 2, height * 0.67);

  rotate(PI / 2);
  width > 500 && text(currentText, height / 2, -width * 0.2);

  rotate(PI / 2);
  text(currentText, -width / 2, -height * 0.33);

  rotate(PI / 2);
  width > 500 && text(currentText, -height / 2, width * 0.8);
  pop();

  if (currentDis) {
    push();
    fill(200);
    textSize(textSize_m);
    width > 500 && textSize(textSize_s);
    textAlign(CENTER);

    text(currentDis, width / 2, height * 0.73);

    rotate(PI / 2);
    width > 500 && text(currentDis, height / 2, -width * 0.15);

    rotate(PI / 2);
    text(currentDis, -width / 2, -height * 0.27);

    rotate(PI / 2);
    width > 500 && text(currentDis, -height / 2, width * 0.85);
    pop();
  }
}

function if_game_over() {
  //not using
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
  // drew_timer = millis() + 700;
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

let drew_timer = -1001;
let new_num = 0;
let draw_card_run = false;

function draw_a_card() {
  gamePage = "pick";
  choosePageTimer = millis();
  s_shuffle.play();
  btns.draw_button.hide();
}

function draw_a_card_run() {
  //not using
  // if (!draw_card_run) {
  //   return;
  // }
  //tap too close return
  // if (millis() - drew_timer > 1500) {
  //   //draw_a_card()
  //   return;
  // } else if (millis() - drew_timer < 1000) {
  //in 1 sec, play the animation of shuffling the cards
  // currentNumber = int(random(1, 13.9));
  // return;
  // }
  //stop the sound
  hitsound2.stop();
  //pick a random number
  // let n = int(random(cards.length));
  //find if is same as previous, if so, pick again
  // while (cards[n] == lastNumber && lastNumber !== 13) {
  //   n = int(random(cards.length));
  //   print("same");
  // }
  //remove the card from pale
  // currentNumber = cards[n];
  // cards.splice(n, 1);
  // lastNumber = currentNumber;

  //this line is only for testing
  //currentNumber = 6;
  //currentNumber = int(random(6, 8));

  //random pick for case never ever and categories
  //the lists are in all-list.js
  never_current = random(never_list);
  categories_current = random(categories_list);

  //help debuging
  if_new_change = true;

  //display current cards left
  // card_has_drawed = true;
  //set the delay in case6
  //count the kings cup times
  switch (currentNumber) {
    case 6:
      for (let letter of alphabet) {
        let buttonKey1 = "key_1_" + letter;
        btns[buttonKey1].show();
        let buttonKey2 = "key_2_" + letter;
        btns[buttonKey2].show();
      }
      gamePage = "selectMate";
      break;
    case 13:
      if_new_change = false;
      king_cup_times++;
      break;
  }

  // drew_timer -= 510;
  gamePage = "play";
}

function mate_diaplay() {
  push();
  textAlign(LEFT);
  fill(uiClr.t3);
  textSize(textSize_m);
  mateDisplay.forEach((mate, index) => {
    push();
    translate(width * 0.2, height * 0.8 + index * 40);
    text(mate.host + "  -->  " + mate.mate, 0, 0);
    translate(width * 0.6, height * -0.6 - index * 40 * 2);
    rotate(radians(180));
    text(mate.host + "  -->  " + mate.mate, 0, 0);
    pop();
  });
  pop();
}
