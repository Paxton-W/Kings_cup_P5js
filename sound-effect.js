// set the sound effect

let hitsound2, winsound, drawsound;

function preload() {
  soundFormats("wav");
  hitsound2 = loadSound("assets/chillhit");
  winsound = loadSound("assets/Horn");
  drawsound = loadSound("assets/draw");
}
