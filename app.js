//Nav Bar: hamburger icon and menu
const menuController = document.querySelector(".hamburger-icon");
const menu = document.querySelector(".navbar-right");
menuController.addEventListener("click", () => {
  menu.classList.toggle("active");
});
document.addEventListener("click", (event) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(event.target) &&
    !menuController.contains(event.target)
  ) {
    menu.classList.remove("active");
  }
});

//Prevent any button from submitting the form
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// window.addEventListener("keypress", (e) => {
//   if (e.key == "Enter") {
//     e.preventDefault();
//   }
// });

//Every time if the select part changes, the GPA redult will be changed as well
let selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("change", () => {
    setGPA();
  });
});

//Every time if there is new credit input, GPA result will be changed accordingly
let credits = document.querySelectorAll(".course-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

//Trash button: once click, the entire line information will be deleted

let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.remove();
    setGPA();
  });
});

//Calculate the GPA result
//step1: convert grade to a score
function convertor(select) {
  switch (select) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0.0;
  }
}

//console.log(convertor("A"));

function setGPA() {
  //step2: calculate the sum of all valid credits
  // let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".course-credit");
  let creditSum = 0;
  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  //step3: calculate the sum of all credits*grade
  let selects = document.querySelectorAll(".select");
  let sum = 0;
  for (let i = 0; i < selects.length; i++) {
    if (!isNaN(convertor(selects[i].value))) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  //step4: calculate GPA=sum/creditSum
  let gpaResult;
  if (creditSum == 0) {
    gpaResult = (0.0).toFixed(2);
  } else {
    gpaResult = (sum / creditSum).toFixed(2);
  }
  document.getElementsByClassName("gpa-result").innerText = gpaResult;
}

//Plus Button: add a new line to the form
let addButton = document.querySelector(".plus-icon");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  newForm.classList.add("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "options");
  newInput1.setAttribute("placeholder", "Course Name");
  newInput1.classList.add("course-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "number");
  newInput2.setAttribute("placeholder", "Credits");
  newInput2.setAttribute("min", "0");
  newInput2.setAttribute("max", "6");
  newInput2.classList.add("course-credit");
  newInput2.addEventListener("change", () => {
    setGPA();
  });

  let newSelect = document.createElement("select");
  newSelect.classList.add("select");

  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);

  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);

  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);

  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);

  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);

  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);

  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);

  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);

  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);

  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);

  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);

  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);

  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", () => {
    setGPA();
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newTag = document.createElement("i");
  newTag.classList.add("fas");
  newTag.classList.add("fa-trash-alt");
  newButton.appendChild(newTag);

  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parrentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newForm.appendChild(newDiv);
  document.querySelector(".input-parts").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

// let allTrash = document.querySelectorAll(".trash-button");
// allTrash.forEach((trash) => {
//   trash.addEventListener("click", (e) => {
//     e.target.parentElement.parentElement.classList.add("remove");
//   });
// });

// allTrash.forEach((trash) => {
//   let form = trash.parentElement.parentElement;
//   form.addEventListener("transitionend", (e) => {
//     e.target.remove();
//     setGPA();
//   });
// });

//Reset button: clear all the information
const gpaForm = document.querySelector(".form");
const resetButton = document.getElementById("btn-reset");
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  gpaForm.reset();
});

//GPA result circle color is gradually and keeps changing
const GPAResultBorder = document.getElementById("result");
const colors = [
  "Coral",
  "Light Salmon",
  "Pale Yellow",
  "Pale Green",
  "Pale Turquoise",
  "Aquamarine",
  "Light Cyan",
  "Sky Blue",
  "Aquamarine",
  "Slate Blue",
  "Medium Purple",
  "Orchid",
  "Light Pink",
];
let currentColorIndex = 0;
setInterval(() => {
  GPAResultBorder.style.borderColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}, 2000);
