//Navigation Bar: hamburger icon and the dropdown menu
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

// Main Form: Calculate the GPA result
//Step1: convert grade to a score number
document.addEventListener("DOMContentLoaded", function () {
  const gradeToScore = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.4,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.4,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.4,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  };

  //step2: calculate GPA = weightedSum / creditSum
  function setGPA() {
    let creditSum = 0;
    let weightedSum = 0;

    document.querySelectorAll(".form-row").forEach((row) => {
      const creditInput = row.querySelector(".course-credit");
      const gradeSelect = row.querySelector(".course-grade");

      const credits = parseFloat(creditInput.value) || 0;
      const grade = gradeSelect.value;

      if (grade in gradeToScore && credits > 0) {
        creditSum += credits;
        weightedSum += credits * gradeToScore[grade];
      }
    });

    const gpa = creditSum > 0 ? (weightedSum / creditSum).toFixed(2) : "0.00";
    document.getElementById("gpa-result").textContent = `${gpa}`;
  }

  document.querySelector(".form").addEventListener("input", setGPA);

  //Check if the credits input is correct
  document.querySelector(".form").addEventListener("input", function (event) {
    const target = event.target;
    if (target.classList.contains("course-credit")) {
      const value = parseFloat(target.value);

      if (isNaN(value) || value < 0 || value > 6) {
        alert("Credits must be a number between 0 and 6");
        target.value = "";
      }
    }
    setGPA();
  });

  // Trash Button: delete the whole row if trash button is clicked
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((button) => {
    button.addEventListener("click", function () {
      const row = button.closest(".form-row");
      row.classList.add("scale-down");
      setTimeout(() => {
        row.remove();
        setGPA();
      }, 500);
    });
  });

  //Plus Button: add a new row to the form
  document.querySelector(".plus-icon").addEventListener("click", function () {
    const form = document.querySelector(".form");
    const firstRow = document.querySelector(".form-row");
    if (firstRow) {
      const newRow = firstRow.cloneNode(true);
      newRow
        .querySelectorAll("input, select")
        .forEach((input) => (input.value = ""));
      form.appendChild(newRow);

      // Reattach delete event listener to the new row
      newRow
        .querySelector(".trash-button")
        .addEventListener("click", function () {
          // newRow.remove();
          // setGPA();
          newRow.classList.add("scale-down");
          setTimeout(() => {
            newRow.remove();
            setGPA();
          }, 500);
        });
    }
  });

  // Reset Button: reset the whole form and set it with 4 empty rows
  const resetButton = document.getElementById("btn-reset");
  resetButton.addEventListener("click", function () {
    const form = document.querySelector(".form");
    form.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const newRow = document.createElement("div");
      newRow.classList.add("form-row");
      newRow.innerHTML = `
        <input type="text" placeholder="Course Name" class="course-name" list="options" />
        <input type="number" placeholder="Credits" min="0" max="6" class="course-credit" />
        <select name="select" class="course-grade">
          <option value=""></option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="C-">C-</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="D-">D-</option>
          <option value="F">F</option>
        </select>
        <button type="button" class="trash-button">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;
      form.appendChild(newRow);
    }

    document.getElementById("gpa-result").textContent = "0.00";
  });
});

//Colorful circle line to highlight the GPA Result: keep changing gradually
const GPAResultBorder = document.getElementById("result");
const colors = [
  "Red",
  "Coral",
  "Light Salmon",
  "Pale Yellow",
  "Green",
  "Pale Turquoise",
  "Aquamarine",
  "Light Cyan",
  "Blue",
  "Aquamarine",
  "Slate Blue",
  "Purple",
  "Orchid",
  "Pink",
];
let currentColorIndex = 0;
setInterval(() => {
  GPAResultBorder.style.borderColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}, 3000);
