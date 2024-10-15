let center_e_clr;
let game_over = false;
let devMode = false;
let uiClr = { bg: "#0E1428", t1: "#F18805", t2: "#D95D39", t3: "#7B9E89" };
//buttons array
let btns = {};
//resize
let ww, hh, vw, vh;
let windowSize_base;
let textSize_base;
let textSize_s;
let textSize_m;
let textSize_l;
let textSize_ml;
let textSize_xl;
let textSize_x;
let bk_color;
let screen_rotate;
const cardAmount = {};
/////
let card_ls = "0-A-2-3-4-5-6-7-8-9-10-J-Q-K".split("-");
let cvs;
let cards = [];

//for card pick display
let cshow_top, cshow_gap, cshow_width, cshow_height, cshow_x;
//for select mate keyboard
let mate = {
  key_standard: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(","),
  key_pax_edition: "PAX,MAX,JOL,JER,SEB,MEL,EME,STE,ALI,JIM".split(","),
  keyboard_1_input: "",
  keyboard_2_input: "",
  showMateKeyboard: false,
  cur_mate_keyboard: "",
  mateDisplay: [],
};

//never generate
let cur_never_ever = "";
let gamePage = "load"; //load, welcome, set, play, pick, mate, gameover
// set the sound effect
let currentIndex;
let pickAniTimer;
let choosePageTimer;
let rule_current;
let cur_rotate180;
let cur_hover_card;
//
let currentNumber = 0;
let currentText;
let currentDis = false;
let bg_clr = { r: 14, g: 93, b: 124 };

let desc_wd_x = 50;
let desc_wd_y = 300;

let never_current, categories_current;
let king_cup_times = 0;

let draw_case_6 = false;
let if_new_change = false;
let friends_drink = [];
let name1, name2;

let card_has_drawed = false;
let lastNumber = 0;

let set_delays = -70;
//
let p5Var = {
  font: {
    LilitaOne: "",
    ShareTechMono: "",
  },
  sound: {
    flip: "",
    pick: "",
    get: [],
    shuffle: "",
    change: "",
    select: "",
    hit: "",
    win: "",
    draw: "",
  },
  img: {
    back: "",
    backP: "",
  },
  button: {
    draw: "",
  },
};
function preload() {
  p5Var.font.LilitaOne = loadFont("assets/LilitaOne-Regular.ttf");
  p5Var.font.ShareTechMono = loadFont("assets/ShareTechMono-Regular.ttf");
  p5Var.sound.flip = loadSound("assets/flip.wav");
  p5Var.sound.pick = loadSound("assets/pick.wav");
  //Flipping Through a Deck of Cards by diammati -- https://freesound.org/s/534983/ -- License: Attribution 3.0
  p5Var.sound.get[0] = loadSound("assets/pick_get1.wav");
  p5Var.sound.get[1] = loadSound("assets/pick_get2.wav");
  //Tone12_Msg_Notification_2 by ScottyD0ES -- https://freesound.org/s/716448/ -- License: Attribution NonCommercial 4.0
  p5Var.sound.get[2] = loadSound("assets/pick_get3.wav");
  p5Var.sound.get[3] = loadSound("assets/pick_get4.wav");
  p5Var.sound.shuffle = loadSound("assets/shuffle.wav");
  // No Copyright
  p5Var.sound.change = loadSound("assets/change.wav");
  p5Var.sound.select = loadSound("assets/select.wav");
  //Tone12_Menu_Select by ScottyD0ES -- https://freesound.org/s/716446/ -- License: Attribution NonCommercial 4.0
  p5Var.sound.hit = loadSound("assets/chillhit.wav");
  p5Var.sound.win = loadSound("assets/Horn.wav");
  p5Var.sound.draw = loadSound("assets/draw.wav");
  p5Var.img.back = loadImage("assets/poker.png");
  p5Var.img.backP = loadImage("assets/poker_p.png");
}
function setup() {
  var pe = document.getElementById("p5-cvs-container");
  // console.log(pe.offsetWidth, pe.offsetHeight);
  cvs = createCanvas(pe.offsetWidth, pe.offsetHeight);
  cvs.parent("p5-cvs");

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
  //set all the size var
  sizeRefresh();
  createAButton("welcome_play_quick", "Quick", 0.5, 0.5, 1.5, undefined, () => {
    setupCards(2, cshow_top);
    gamePage = "play";
    btns.welcome_play_quick.hide();
    btns.welcome_play.hide();
    btns.welcome_play_pax_edition.hide();

    //create select mate keyboard
    createMateKeyBoard(mate.key_standard, false);
  });
  createAButton("welcome_play", "Standard", 0.5, 0.6, 1.5, undefined, () => {
    setupCards(4, cshow_top);
    gamePage = "play";
    btns.welcome_play_quick.hide();
    btns.welcome_play.hide();
    btns.welcome_play_pax_edition.hide();
    //create select mate keyboard
    createMateKeyBoard(mate.key_standard, false);
  });
  createAButton("welcome_play_pax_edition", "Pax Edition", 0.5, 0.7, 1.5, 1.3, () => {
    setupCards(4, cshow_top);
    gamePage = "play";
    btns.welcome_play_quick.hide();
    btns.welcome_play.hide();
    btns.welcome_play_pax_edition.hide();
    //create select mate keyboard
    createMateKeyBoard(mate.key_pax_edition);
  });

  //keyboard 1 clear button
  createAButton("key_1_clear", "Clear", 0.8, 3 * 0.06 + 0.3 + 0.01, undefined, 0.8, () => {
    mate.keyboard_1_input = "";
    p5Var.sound.select.play();
  });
  //keyboard 2 clear button
  createAButton("key_2_clear", "Clear", 0.8, 3 * 0.06 + 0.6 + 0.01, undefined, 0.8, () => {
    mate.keyboard_2_input = "";
    p5Var.sound.select.play();
  });
  //submit button
  createAButton("mate_submit", "Submit", 0.5, 0.95, undefined, 1.8, () => {
    //submit mate code goes here
    mate.mateDisplay.push({ host: mate.keyboard_1_input, mate: mate.keyboard_2_input });
    mate.keyboard_1_input = "";
    mate.keyboard_2_input = "";
    for (let letter of mate.cur_mate_keyboard) {
      let buttonKey1 = "key_1_" + letter;
      btns[buttonKey1].hide();
      let buttonKey2 = "key_2_" + letter;
      btns[buttonKey2].hide();
    }
    btns.key_1_clear.hide();
    btns.key_2_clear.hide();
    btns.mate_submit.hide();
    mate.showMateKeyboard = false;
    // btns.p5Var.button.draw.show();
    gamePage = "play";
    drew_timer = millis();
    p5Var.sound.change.play();
  });
  //never have i ever question button
  createAButton("never_ever_ques", "Change", 0.3, 0.95, 1.3, undefined, () => {
    //code goes here
    cur_never_ever = random(never_list);
    p5Var.sound.change.play();
  });
  createAButton("never_ever_finish", "Next player", 0.7, 0.95, 1.3, 1.3, () => {
    //code goes here
    btns.never_ever_ques.hide();
    btns.never_ever_finish.hide();
    gamePage = "pick";
    draw_a_card();
  });
  //categories question button
  createAButton("categories_ques", "Change", 0.3, 0.95, 1.3, undefined, () => {
    //code goes here
    categories_current = random(categories_list);
    p5Var.sound.change.play();
  });
  createAButton("categories_finish", "Next player", 0.7, 0.95, 1.3, 1.3, () => {
    //code goes here
    btns.categories_ques.hide();
    btns.categories_finish.hide();
    draw_a_card();
  });

  //rule question button
  createAButton("rule_ques", "Change", 0.3, 0.95, 1.3, undefined, () => {
    //code goes here
    rule_current = random(rule_list);
    p5Var.sound.change.play();
  });
  createAButton("rule_finish", "Next player", 0.7, 0.95, 1.3, 1.3, () => {
    //code goes here
    btns.rule_ques.hide();
    btns.rule_finish.hide();
    draw_a_card();
  });

  btns.welcome_play.show();
  btns.welcome_play_quick.show();
  btns.welcome_play_pax_edition.show();
  //set game status
  gamePage = "welcome";
  textFont(p5Var.font.LilitaOne);
  imageMode(CENTER);
  rectMode(CENTER);
  p5Var.sound.flip.rate(4);
}
function setupCards(num, cshow_top) {
  //cut to half
  for (let i = 1; i <= 13; i++) {
    cardAmount[i] = num;
  }
  //push all 52 cards
  for (let p = 0; p < num; p++) {
    for (i = 1; i <= 13; i++) {
      cards.push({ num: i, rotate: random(-3, 3), rotate180: random([true, false]), hover: false });
    }
  }
  //shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  //set card pick display value
  cards.forEach((card, index) => {
    let cy = cshow_top + ((height * 0.58) / cards.length) * index;
    card.display = { y: cy };
  });
  devMode ? console.log(cards) : "";
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

  //all functions are in game-functions.js except few
  let aniTimer = millis() - pickAniTimer;
  let choTimer = millis() - choosePageTimer;
  //change background when hit the screen
  background(uiClr.bg);
  switch (gamePage) {
    case "welcome":
      //draw the bottom info
      draw_credit();
      push();
      fill(uiClr.t1);
      textAlign(CENTER);
      textSize(textSize_l);
      text("King's  Cup", width / 2, height * 0.3);
      textSize(textSize_s);
      fill(uiClr.t3);
      text("Drinking Party Game", width / 2, height * 0.35);
      pop();
      break;

    case "pick":
    case "choose":
      //check the hover position
      let set = false;
      for (let c = cards.length - 1; c >= 0; c--) {
        let card = cards[c];
        if (mouseY > card.display.y - cshow_height / 2 && mouseY < card.display.y + cshow_height / 2 && !set) {
          card.hover = true;
          set = true;
          cur_hover_card = c;
        } else {
          card.hover = false;
        }
      }
      //draw card pick screen
      push();
      textAlign(CENTER);
      translate(width * 0.2, height * 0.5);
      rotate(radians(90));
      fill(uiClr.t1);
      textSize(60);
      if (width > 500) text("pick a card", 0, 0);
      translate(0, -width * 0.6);
      rotate(radians(180));
      if (width > 500) text("pick a card", 0, 0);
      pop();

      //show cards
      push();
      stroke(30);
      fill(uiClr.t3);
      let cshow_y_offset = map(choTimer, 0, 2000, 0, 1);
      cshow_y_offset = easeOutExpo(cshow_y_offset);
      cshow_y_offset = min(cshow_y_offset, 1);
      cards.forEach((card, index) => {
        let cshow_x_offset = card.hover ? 50 : 0;
        push();
        translate(cshow_x + cshow_x_offset, card.display.y * cshow_y_offset);
        displayCardNum(card.num, index, cshow_width);
        rotate(radians(card.rotate));
        if (card.rotate180) rotate(radians(180));
        rect(0, 0, cshow_width, cshow_height, cshow_height * 0.1);
        image(p5Var.img.back, 0, 0, cshow_width, cshow_height);
        pop();
      });
      pop();

      showCurrentCard();
      break;

    case "play":
      draw_center_items();
      draw_current_task();
      showCurrentCard();
      mate_diaplay();
      break;

    case "neverEver":
      draw_center_items();
      draw_current_task();
      showCurrentCard();
      mate_diaplay();
      if (aniTimer > 1800) {
        push();
        fill(uiClr.t2);
        textAlign(CENTER, CENTER);
        textSize(textSize_ml);
        translate(width * 0.5, height * 0.07);
        text(cur_never_ever, 0, 0);
        pop();
      }
      break;

    case "rule":
      draw_center_items();
      draw_current_task();
      showCurrentCard();
      mate_diaplay();
      if (aniTimer > 1800) {
        push();
        fill(uiClr.t2);
        textAlign(CENTER);
        textSize(textSize_ml);
        translate(width * 0.5, height * 0.07);
        text(rule_current.topic, 0, 0);
        translate(0, height * 0.03);
        textSize(textSize_s);
        text(rule_current.description, 0, 0, width * 0.8);
        pop();
      }
      break;

    case "categories":
      draw_center_items();
      draw_current_task();
      showCurrentCard();
      mate_diaplay();
      if (aniTimer > 1800) {
        push();
        fill(uiClr.t2);
        textAlign(CENTER, CENTER);
        textSize(textSize_ml);
        translate(width * 0.5, height * 0.07);
        text(categories_current, 0, 0);
        pop();
      }
      break;

    case "selectMate":
      push();
      fill(uiClr.t2);
      textAlign(CENTER, CENTER);
      textSize(40);
      translate(width * 0.5, height * 0.1);
      text("Select a mate", 0, 0);
      translate(0, height * 0.1);
      text("You are", 0, 0);
      translate(0, height * 0.3);
      text("You choose", 0, 0);
      translate(0, height * 0.3);
      textSize(25);
      fill(uiClr.t1);
      text(mate.keyboard_2_input + " drinks when " + mate.keyboard_1_input + " drinks!", 0, 0);
      pop();
      if (aniTimer > 1800 && !mate.showMateKeyboard) {
        for (let letter of mate.cur_mate_keyboard) {
          btns["key_1_" + letter].show();
          btns["key_2_" + letter].show();
        }
        btns.key_1_clear.show();
        btns.key_2_clear.show();
        btns.mate_submit.show();
        mate.showMateKeyboard = true;
      }
      break;

    case "hasChosen":
      // card selection logic
      push();
      textAlign(CENTER);
      translate(width * 0.2, height * 0.5);
      rotate(radians(90));
      fill(uiClr.t1);
      textSize(60);
      text("pick a card", 0, 0);
      translate(0, -width * 0.6);
      rotate(radians(180));
      text("pick a card", 0, 0);
      pop();
      push();
      stroke(30);
      fill(uiClr.t3);
      // let card Picked Display Height
      let cpdh = vw * 1.5;
      if (aniTimer < 200) {
        cards.forEach((card, index) => {
          let cshow_x_offset = 0;
          if (currentIndex == index) {
            cshow_x_offset = (aniTimer / 200) * (width * 0.7);
            if (card.rotate180) {
              cur_rotate180 = true;
            } else {
              cur_rotate180 = false;
            }
          }
          push();
          translate(cshow_x + cshow_x_offset, card.display.y);
          rotate(radians(card.rotate));
          if (card.rotate180) {
            rotate(radians(180));
          }
          rect(0, 0, cshow_width, cshow_height, cshow_height * 0.1);
          image(p5Var.img.back, 0, 0, cshow_width, cshow_height);
          pop();
        });
      } else if (aniTimer < 1000) {
        //
        cards.forEach((card, index) => {
          let cshow_y_offset =
            card.display.y * max(0, map(aniTimer, 200, 600, 1, 0)) +
            min(width * 0.6, map(aniTimer, 200, 600, 0, width * 0.6));
          push();
          translate(cshow_x, cshow_y_offset);
          rotate(radians(card.rotate));
          if (card.rotate180) {
            rotate(radians(180));
          }
          rect(0, 0, cshow_width, cshow_height, cshow_height * 0.1);
          image(p5Var.img.back, 0, 0, cshow_width, cshow_height);
          pop();
        });
        push();
        imageMode(CENTER);
        rectMode(CENTER);
        translate(width / 2, height / 2);
        var tti = map(aniTimer, 200, 1000, 0, 1);
        translate((1 - easeOutExpo(tti)) * width, 0);
        strokeWeight(3);
        if (cur_rotate180) {
          rotate(radians(180));
        }
        rect(0, 0, vw, cpdh, width * 0.1);
        image(p5Var.img.backP, 0, 0, vw, cpdh);
        pop();
      } else if (aniTimer < 1800) {
      }
      pop();
      if (aniTimer > 1000) {
        //important
        cards.splice(currentIndex, 1);
        if (currentNumber == 6) {
          gamePage = "selectMate";
          p5Var.sound.get[3].play();
        } else if (currentNumber == 13) {
          if (cardAmount[13] > 0) {
            gamePage = "play";
            p5Var.sound.get[2].play();
            // btns.p5Var.button.draw.show();
          } else {
            gamePage = "gameover";
            p5Var.sound.win.play();
          }
        } else if (currentNumber == 12) {
          gamePage = "rule";
          rule_current = random(rule_list);
          setTimeout(() => {
            btns.rule_ques.show();
            btns.rule_finish.show();
          }, 800);
          p5Var.sound.get[1].play();
        } else if (currentNumber == 11) {
          gamePage = "neverEver";
          cur_never_ever = random(never_list);
          setTimeout(() => {
            btns.never_ever_ques.show();
            btns.never_ever_finish.show();
          }, 800);
          p5Var.sound.get[1].play();
        } else if (currentNumber == 10) {
          gamePage = "categories";
          categories_current = random(categories_list);
          setTimeout(() => {
            btns.categories_ques.show();
            btns.categories_finish.show();
          }, 800);
          p5Var.sound.get[1].play();
        } else {
          gamePage = "play";
          p5Var.sound.get[0].play();
        }
      }
      break;

    case "gameover":
      background(175, 20, 20);
      push();
      fill(255);
      textAlign(CENTER);
      textSize(textSize_base);
      text("You are the drinking KING!", width / 2, height * 0.7);
      textSize(textSize_base);
      text("Game Over", width / 2, height * 0.2);
      textSize(textSize_x);
      text("K", width / 2, height * 0.5);
      game_over = true;
      pop();
      break;

    default:
      // Optional: handle unexpected gamePage values
      console.log("Unexpected gamePage value: " + gamePage);
      break;
  }

  if (aniTimer < 1800 && aniTimer >= 1000) {
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    translate(width / 2, height / 2);
    stroke(30);
    fill(uiClr.t3);
    var tti = map(aniTimer, 1000, 1800, 0, 1);
    // let card Picked Display Height
    let cpdh = vw * 1.5;
    translate(-easeInOutExpo(tti) * width, 0);
    if (cur_rotate180) {
      rotate(radians(180));
    }
    strokeWeight(3);
    rect(0, 0, vw, cpdh, width * 0.1);
    image(p5Var.img.backP, 0, 0, vw, cpdh);
    pop();
    drew_timer = millis();
  }
}
function mouseReleased() {
  p5Var.sound.flip.stop();
  //change pick start action to choose action
  if (gamePage == "pick") {
    gamePage = "choose";
    return;
  }
  let cardR = cards[cur_hover_card];
  if (gamePage == "choose" && millis() - choosePageTimer > 600) {
    p5Var.sound.pick.play();
    devMode ? console.log(cardR.num, cur_hover_card) : "";
    currentNumber = cardR.num;
    currentIndex = cur_hover_card;
    cardAmount[cardR.num]--;
    game_cases_switch();
    gamePage = "hasChosen";
    pickAniTimer = millis();
    drew_timer = millis();
  }
}
function mousePressed() {
  //draw_a_card()
  // console.log(millis() - drew_timer);
  if (gamePage == "play" && millis() - drew_timer > 1000) {
    draw_a_card();
  } else if (gamePage == "gameover") {
    location.reload();
  } else if (gamePage == "pick" || gamePage == "choose") {
    p5Var.sound.flip.loop();
  }
}

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
  // p5Var.button.draw.position(width / 2 - width * 0.125, height * 0.53);
  //reset card pick display value
  cshow_top = height * 0.22;
  // cshow_gap = (height * 0.58) / cards.length;
  cshow_width = min(width * 0.7, 300);
  cshow_height = cshow_width * 0.75;
  cshow_x = width / 2;
  if (width > height) {
    screen_rotate = "landscape";
  } else {
    screen_rotate = "portrait";
  }
  windowSize_base = width * 0.0015;

  textSize_s = windowSize_base * 22;
  textSize_base = windowSize_base * 53;
  textSize_m = windowSize_base * 30;
  textSize_ml = windowSize_base * 40;
  textSize_l = windowSize_base * 70;
  textSize_xl = windowSize_base * 85;
  textSize_x = windowSize_base * 300;
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
  buttonVar.pos = { x: xS * ww - vw * buttonVar.sizeSet.w * 0.5, y: yS * hh - vh * buttonVar.sizeSet.h * 0.5 };
  buttonVar.position(buttonVar.pos.x, buttonVar.pos.y, "fixed");
  buttonVar.size(vw * buttonVar.sizeSet.w, vw * buttonVar.sizeSet.h);
  buttonVar.style("font-size", String(vw * 0.025 * buttonVar.sizeSet.font) + "pt");
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
  if (cardAmount[13] == 1) {
    push();
    textAlign(CENTER);
    noStroke();
    fill(255);
    translate(40 + 20 * 25, 50);
    fill(250, 100, 100);
    textSize(textSize_s);
    const possibility = floor((1 / cards.length) * 100);
    text("King's Odds: " + possibility + "%", 0, 0);
    pop();
  }
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInOutExpo(x) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

function createMateKeyBoard(edition, single_input = true) {
  //keyboard 1  button
  edition.forEach((a, index) => {
    if (single_input) {
      createAButton("key_1_" + a, a, (index % 9) * 0.1 + 0.1, floor(index / 9) * 0.06 + 0.3, undefined, 0.5, () => {
        mate.keyboard_1_input = a;
        p5Var.sound.select.play();
      });
      //keyboard 2 button
      edition.forEach((a, index) => {
        createAButton("key_2_" + a, a, (index % 9) * 0.1 + 0.1, floor(index / 9) * 0.06 + 0.6, undefined, 0.5, () => {
          mate.keyboard_2_input = a;
          p5Var.sound.select.play();
        });
      });
    } else {
      createAButton("key_1_" + a, a, (index % 9) * 0.1 + 0.1, floor(index / 9) * 0.06 + 0.3, undefined, 0.5, () => {
        mate.keyboard_1_input += a;
        p5Var.sound.select.play();
      });
      edition.forEach((a, index) => {
        createAButton("key_2_" + a, a, (index % 9) * 0.1 + 0.1, floor(index / 9) * 0.06 + 0.6, undefined, 0.5, () => {
          mate.keyboard_2_input += a;
          p5Var.sound.select.play();
        });
      });
    }
  });
  mate.cur_mate_keyboard = edition;
}
function displayCardNum(cn, index, cw) {
  if (devMode) {
    push();
    fill(255);
    textSize(16);
    text(cn, cw / 2 + 30, 0);
    text(index, cw / 2 + 50, 0);
    pop();
  }
}

function game_cases_switch() {
  push();
  switch (currentNumber) {
    case 1:
      currentText = "Waterfall";
      if_new_change = false;
      currentDis = " Everbody start drinking.\n No one can stops until you do.";
      center_e_clr = color(242, 68, 5);
      break;
    case 2:
      currentText = "Two is you";
      if_new_change = false;
      currentDis = "Choose someone to drink";
      center_e_clr = color(166, 135, 78);
      break;
    case 3:
      currentText = "Three is me";
      if_new_change = false;
      currentDis = "You drink";
      center_e_clr = color(2, 110, 129);
      break;
    case 4:
      currentText = "Four is Girls";
      currentDis = null;
      if_new_change = false;
      center_e_clr = color(242, 102, 139);
      break;
    case 5:
      currentText = "Five is Guys";
      currentDis = null;
      if_new_change = false;
      center_e_clr = color(0, 153, 221);
      break;
    case 6:
      currentText = "Select\n a Mate";
      currentDis = null;
      // if_case_6 = true;
      center_e_clr = color(4, 191, 157);
      break;
    case 7:
      currentText = "Heaven";
      if_new_change = false;
      currentDis = "The last person put both hands \nin the air drinks";
      center_e_clr = color(95, 205, 217);
      break;
    case 8:
      currentText = "Everyone";
      if_new_change = false;
      center_e_clr = color(166, 188, 9);
      currentDis = "Cheers!!!";
      break;
    case 9:
      currentText = "Reverse";
      if_new_change = false;
      center_e_clr = color(140, 31, 40);
      currentDis = "The direction of play is reversed";
      break;
    case 10:
      currentText = "Categories";
      if_new_change = false;
      currentDis = "If the third round concludes smoothly,\nthen the host drinks.";
      // currentDis = categories_current;
      center_e_clr = color(89, 28, 33);
      break;
    case 11:
      currentText = "Never Ever";
      if_new_change = false;
      currentDis = "If no one has done, you drink";
      center_e_clr = color(242, 147, 37);
      break;
    case 12:
      currentText = "Rule";
      if_new_change = false;
      currentDis = "Make a rule, valid until next 12\n Anyone break the rule drinks";
      center_e_clr = color(2, 82, 89);
      break;
    case 13:
      currentText = `King's Cup`;
      // if_case_13 = true;
      currentDis = `Pour your drink into king's cup`;
      center_e_clr = color(242, 147, 37);
      break;
  }
  pop();
}

const never_list = [
  "danced in rain",
  "lost my keys",
  "slept in class",
  "sung in public",
  "fallen off a bike",
  "tripped in public",
  "eaten dessert first",
  "laughed uncontrollably",
  "worn mismatched socks",
  "snorted while laughing",
  "talked to my pet",
  "had food poisoning",
  "missed a flight",
  "been late to work",
  "dropped my phone",
  "lost a shoe",
  "walked into glass",
  "taken a selfie",
  "worn pajamas outside",
  "danced like no one’s watching",
  "forgotten a friend’s name",
  "used the wrong name",
  "tried learning guitar",
  "dyed my hair",
  "bought useless stuff",
  "laughed at a meme",
  "sung karaoke",
  "mistaken a stranger",
  "overslept an alarm",
  "binged a whole series",
  "worn a costume",
  "baked a cake",
  "forgotten my wallet",
  "broken a remote",
  "sent the wrong text",
  "spilled a drink",
  "missed a high five",
  "walked into a pole",
  "gotten lost",
  "spilled coffee",
  "faked a laugh",
  "eaten a bug",
  "jumped in fear",
  "missed a bus",
  "slept through class",
  "eaten too much",
  "snuck snacks in",
  "fed pigeons",
  "cried at a movie",
  "worn socks to bed",
  "forgotten my password",
  "done a silly dance",
  "overwatered a plant",
  "sung in the shower",
  "worn sunglasses indoors",
  "put salt in coffee",
  "taken a bad photo",
  "confused twins",
  "burped in public",
  "dropped my ice cream",
  "left a Zoom mic on",
  "googled my name",
  "gotten sunburned",
  "been photobombed",
  "bought too much candy",
  "hugged a tree",
  "mistaken a mannequin",
  "worn a backwards shirt",
  "failed a high five",
  "worn two different shoes",
  "tried to juggle",
  "gotten hiccups",
  "spilled soup",
  "waved at a stranger",
  "lost my hat",
  "worn shoes wrong feet",
  "pretended to know lyrics",
  "made a silly face",
  "eaten a full pizza",
  "fallen asleep talking",
  "tried parkour",
  "forgotten my towel",
  "dropped a fork",
  "sneezed while eating",
  "mixed up days",
  "eaten cold pizza",
  "won a raffle",
  "worn flip flops wrong",
  "been stuck in mud",
  "caught a snowflake",
  "made a snow angel",
  "worn mismatched gloves",
  "baked cookies",
  "taken a nap outside",
  "used a silly nickname",
  "forgotten my sunglasses",
  "tried to moonwalk",
  "lost my sunglasses",
  "sneezed in a mask",
  "eaten cereal for dinner",
];

const categories_list = [
  "Types of Fruit",
  "Colours (one word only)",
  "Dog Breeds",
  "Pizza Toppings",
  "Countries",
  "Car Brands",
  "Musical Instruments",
  "Zodiac (Star) Signs",
  "Flowers",
  "Capital Cities",
  "Ocean Animals",
  "Vegetables",
  "Musical Genres",
  "Currencies",
  "Disney Movies",
  "National Holidays",
  "Modes of Transportation",
  "Types of Tea",
  "Kitchen Appliances",
  "Types of Coffee",
  "Video Game Consoles",
  "Parts of a Computer",
  "Jungle Animals",
  "Languages",
  "Things that Fly",
  "Things that Swim",
  "Coding Languages",
  "Bank Names",
  "Fast Food Chains",
  "Planets",
  "Famous Landmarks",
  "Board Games",
  "Famous Artists",
  "Weather Phenomena",
  "Types of Cheese",
  "Famous Inventors",
  "Types of Pasta",
  "Desserts",
  "Famous Actors",
  "Cocktails",
  "Famous Authors",
  "Types of Wine",
  "Types of Fish",
  "Famous Singers",
  "Elements on the Periodic Table",
  "Types of Cameras",
  "Types of Smartwatches",
  "Types of Operating Systems",
  "Types of Web Browsers",
  "Social Media Platforms",
  "Video Streaming Services",
  "Music Streaming Services",
];

const rule_list = [
  {
    topic: "Thumb Master",
    description:
      "The player who draws a card becomes the Thumb Master., whenever the Thumb Master places their thumb on the table, all other players must quickly follow suit. The last player to do so must drink.",
  },
  {
    topic: "Left-Hand Rule",
    description:
      "Throughout the game, players can only pick up and drink with their left hand. If someone uses their right hand, they must drink.",
  },
  {
    topic: "Name Game",
    description:
      "Players must refer to each other by their first names only. If someone forgets and uses a nickname or last name, they must drink.",
  },
  {
    topic: "No Pointing",
    description: "Players cannot point at each other or anything in the room. If someone does, they must drink.",
  },
  {
    topic: "Rhyme Rule",
    description:
      "Throughout the game, players must speak in rhymes. If someone fails to rhyme or speaks normally, they must drink.",
  },
  {
    topic: "Eyes Closed",
    description:
      "Players must keep their eyes closed during their turn or when receiving instructions. If someone opens their eyes, they must drink.",
  },
  {
    topic: "Hands Off",
    description: "Players cannot touch their face or hair. If someone does, they must drink.",
  },
  {
    topic: "Silent Laugh",
    description:
      "Players must silently laugh instead of laughing out loud. If someone audibly laughs, they must drink.",
  },
  {
    topic: "Foreign Language Only",
    description:
      "Players must communicate in a language that is not their native language. If someone speaks in their native language, they must drink.",
  },
  {
    topic: "No this word",
    description: "Players cannot use certain designated words. If someone does, they must drink.",
  },
  {
    topic: "No pronoun",
    description: "Players cannot use pronouns. If someone does, they must drink.",
  },
];

function draw_credit() {
  push();
  fill(255, 100);
  textSize(textSize_s);
  text("Developed By Paxton", width * 0.1, height - 4);
  text("ver.3.1.0", width * 0.8, height - 4);
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
  text("G", width * 0.56, h);
  if (cardAmount[13] < 2) {
    fill(255, 255, 0);
  }
  text("N", width * 0.52, h);
  if (cardAmount[13] < 3) {
    fill(255, 255, 0);
  }
  text("I", width * 0.48, h);
  if (cardAmount[13] < 4) {
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

let yourNameInput, partnerNameInput, button;
let drew_timer = -1001;
let new_num = 0;
let draw_card_run = false;

function draw_a_card() {
  gamePage = "pick";
  choosePageTimer = millis();
  p5Var.sound.draw.play();
}

function mate_diaplay() {
  let mate_display_text = "";
  mate.mateDisplay.forEach((mate, index) => {
    mate_display_text += mate.host + "  -->  " + mate.mate + "  |  ";
  });
  push();
  textAlign(LEFT);
  fill(uiClr.t3);
  textSize(textSize_s);
  translate(width * 0.05, height * 0.8);
  text(mate_display_text, 0, 0);
  translate(width * 0.9, height * -0.6);
  rotate(radians(180));
  text(mate_display_text, 0, 0);
  pop();
}
