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
      if_case_6 = true;
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
      if_case_13 = true;
      currentDis = `Pour your drink into king's cup`;
      center_e_clr = color(242, 147, 37);
      break;
  }
  pop();
}
