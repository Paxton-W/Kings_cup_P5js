

function game_cases_switch(){
    push()
switch(currentNumber){
  case 1:
    currentText = 'Waterfall'
    if_new_change = false;
    push()
    fill(180, 207, 102)
    textSize(24);
    textAlign(CENTER)
    text(' Everbody start drinking.\n No one can stops until you do.',width/2,height-180)
    rotate(PI)
    text(' Everbody start drinking.\n No one can stops until you do.',-width/2,-180)
    pop()
    center_e_clr = color(242, 68, 5)
  break;
  case 2:
    currentText = 'Two is you'
    if_new_change = false;
    push()
    fill(19, 196, 0)
    textSize(25);
    textAlign(CENTER)
    text('Choose someone to drink',width/2,height-150)
    rotate(PI)
    text('Choose someone to drink',-width/2,-150)
    pop()
    center_e_clr = color(166, 135, 78)
  break;
  case 3:
    currentText = 'Three is me'
    if_new_change = false;
    push()
    fill(19, 196, 0)
    textSize(28);
    textAlign(CENTER)
    text('You drink',width/2,height-150)
    rotate(PI)
    text('You drink',-width/2,-150)
    pop()
    center_e_clr = color(2, 110, 129)
  break;
  case 4:
    currentText = 'Four is Girls'
    if_new_change = false;
    center_e_clr = color(242, 102, 139)
  break;
  case 5:
    currentText = 'Five is Guys'
    if_new_change = false;
    center_e_clr = color(0, 153, 221)
  break;
  case 6:
    currentText = 'Select a Mate'
    if_case_6 = true;
    center_e_clr = color(4, 191, 157)
  break;
  case 7:
    currentText = 'Heaven'
    if_new_change = false;
    push()
    fill(19, 196, 0)
    textSize(22);
    textAlign(CENTER)
    text('The last person put both hands \nin the air drinks',width/2,height-170)
    rotate(PI)
    text('The last person put both hands \nin the air drinks',-width/2,-170)
    pop()
    center_e_clr = color(95, 205, 217)
  break;
  case 8:
    currentText = 'Everyone Drinks'
    if_new_change = false;
    center_e_clr = color(166, 188, 9)
  break;
  case 9:
    currentText = 'Rhyme Time'
    if_new_change = false;
    center_e_clr = color(140, 31, 40)
    push()
    fill(242, 68, 5)
    textSize(26);
    textAlign(CENTER)
    text('Think more than\n3 seconds drinks',width/2,height-170)
    rotate(PI)
    text('Think more than\n3 seconds drinks',-width/2,-170)
    pop()
  break;
  case 10:
    currentText = 'Categories'
    if_new_change = false;
    push()
    fill(255,100,100)
    textSize(30);
    textStyle(BOLD)
    textAlign(CENTER)
    text(categories_current,width/2,height-150)
    rotate(PI/2);
    text(categories_current,height/2,-15)
    rotate(PI/2);
    text(categories_current,-width/2,-150)
    rotate(PI/2);
    text(categories_current,-height/2,width-15)
    pop()
    center_e_clr = color(89, 28, 33)
  break;
  case 11:
    currentText = 'Never Have I Ever'
    if_new_change = false;
    push()
    fill(255,100,100)
    textSize(22);
    textAlign(CENTER)
    text(never_current,width/2,height-130)
    rotate(PI/2);
    text(never_current,height/2,-25)
    rotate(PI/2);
    text(never_current,-width/2,-130)
    rotate(PI/2);
    text(never_current,-height/2,width-25)
    pop()
    center_e_clr = color(242, 147, 37)
  break;
  case 12:
    currentText = 'Rule'
    if_new_change = false;
    push()
    fill(242, 147, 37)
    textSize(25);
    textAlign(CENTER)
    text('Make a rule,\n valid until next 12\n Anyone break the rule drinks',width/2,height-200)
    rotate(PI)
    text('Make a rule,\n valid until next 12\n Anyone break the rule drinks',-width/2,-200)
    pop()
    center_e_clr = color(2,82,89)
  break;
  case 13:
    currentText = `King's Cup`
    if_case_13 = true;
    push()
    fill(225, 16, 150)
    textSize(20);
    textStyle(BOLD)
    textAlign(CENTER)
    text(`Pour your drink into king's cup`,width/2,height-130)
    rotate(PI)
    text(`Pour your drink into king's cup`,-width/2,-130)
    pop()
    center_e_clr = color(242, 147, 37)
  break;
}
pop()
}
