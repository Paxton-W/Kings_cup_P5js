let greeting = []
let currentNumber = 0;



function setup() {
  createCanvas(480, 720);
}

function draw() {
  background(0);
  fill(255);
  textSize(30);
  text('Drinking Game',100,30);
  textSize(150);
  text(currentNumber,100,200)

  textSize(50);
  switch(currentNumber){
    case 1:
      text('Pick sb to drink',50,300)
    break;
  }




}

function mousePressed(){
  currentNumber = int(random(1,13));
  console.log(currentNumber);
}
