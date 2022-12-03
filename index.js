let row = document.querySelector("#row");
let column = document.querySelector("#column");
const start = document.querySelector("#start");
start.addEventListener("click", tableau);
start.addEventListener("click", check);
let renit = document.querySelector("#reset");
renit.addEventListener("click", renitialiser);
let minutes = 0;
let secondes = 0;
let intervalId = 0;

let affichageJaune = 0;
let affichageRouge = 0;

document.querySelector("#scoreJaune").innerHTML = affichageJaune;
document.querySelector("#scoreRouge").innerHTML = affichageRouge;

function finish() {
  clearInterval(intervalId);
  secondes = 0;
  minutes = 0;
}

function temps() {
  secondes++;
  if (secondes == 60) {
    minutes += 1;
    secondes = 0;
  }
  document.querySelector("#secondes").innerHTML = secondes;
  document.querySelector("#minutes").innerHTML = minutes;
}

function timer() {
  intervalId = setInterval(temps, 1000);
}

function tableau() {
  finish();
  timer();
  const columnjeu = column.value;
  const rowjeu = row.value;
  document.querySelector("#table").innerHTML = "";
  for (let i = 0; i < columnjeu; i++) {
    document.getElementById("table").innerHTML +=
      "<tr id = 'ligne" + i + "'></tr>";
    for (let j = 0; j < rowjeu; j++) {
      document.getElementById(`ligne${i}`).innerHTML +=
        "<td id = 'colonne" + i + j + "'> </td>";
    }
  }
}

function renitialiser() {
  finish();
  timer();
  const columnjeu = column.value;
  const rowjeu = row.value;
  for (let i = 0; i < columnjeu; i++) {
    for (let j = 0; j < rowjeu; j++) {
      document.getElementById("colonne" + i + j).innerHTML = " ";
    }
  }
}

function check() {
  for (let i = 0; i < column.value; i++) {
    let look = document.querySelector("#ligne" + i);
    look.addEventListener("click", (event) => {
      placer(i);
      document.querySelector("#attention").innerHTML = "";
    });
  }
}

function afficher(type) {
  clearInterval(intervalId);

  if (type == "jaune") {
    document.querySelector("#annonce").innerHTML =
      "<div id='jetonJaune'></div>";
    affichageJaune += 1;
    document.querySelector("#scoreJaune").innerHTML = affichageJaune;
  }
  if (type == "rouge") {
    document.querySelector("#annonce").innerHTML =
      "<div id='jetonRouge'></div>";
    affichageRouge += 1;
    document.querySelector("#scoreRouge").innerHTML = affichageRouge;
  }
  if (type == "matchNul") {
    document.querySelector("#annonce").innerHTML = "Match nul";
  }
}

function draw() {
  let physiqueDraw = 0;
  let nDraw = 0;
  for (let i = 0; i < column.value * row.value; i++) {
    if (
      document.querySelector("#colonne" + nDraw + physiqueDraw).textContent !=
      " "
    ) {
      if (physiqueDraw == row.value - 1) {
        physiqueDraw = 0;
        if (nDraw == column.value - 1) {
          afficher("matchNul");
        } else {
          nDraw += 1;
        }
      } else {
        physiqueDraw += 1;
      }
    }
  }
}

physique = 0;
let nombreCoups = nouvelle();

function placer(n) {
  if (physique > row.value - 1) {
    document.querySelector("#attention").innerHTML =
      "Vous ne pouvez plus placer de pion sur cette colonne";
    physique = 0;
    draw();
  }

  while (document.querySelector("#colonne" + n + physique).textContent != " ") {
    physique += 1;
    if (physique > row.value - 1) {
      break;
    }
  }
  if (nombreCoups % 2 == 0) {
    document.querySelector("#colonne" + n + physique).innerHTML =
      "<div id='jetonJaune'>:</div>";
    document.querySelector("#joue").innerHTML = "<div id='jetonRouge'></div>";
    win(n, physique);
    physique = 0;
    nombreCoups += 1;
  } else {
    document.querySelector("#colonne" + n + physique).innerHTML =
      "<div id='jetonRouge'>.</div>";
    document.querySelector("#joue").innerHTML = "<div id='jetonJaune'></div>";
    win(n, physique);
    physique = 0;
    nombreCoups += 1;
  }
}

function nouvelle() {
  let min = 1;
  let max = 10;
  let random = Math.floor(Math.random() * (max - min)) + min;
  let nombreCoups = random;
  if (nombreCoups % 2 != 0) {
    document.querySelector("#joue").innerHTML = "<div id='jetonRouge'></div>";
  } else {
    document.querySelector("#joue").innerHTML = "<div id='jetonJaune'></div>";
  }
  return nombreCoups;
}

function win(n, physique) {
  if (physique - 3 >= 0) {
    let test = document.querySelector("#colonne" + n + physique).textContent;
    let test1 = document.querySelector(
      "#colonne" + n + (physique - 1)
    ).textContent;
    let test2 = document.querySelector(
      "#colonne" + n + (physique - 2)
    ).textContent;
    let test3 = document.querySelector(
      "#colonne" + n + (physique - 3)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + n + (physique - 1)).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + n + (physique - 2)).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + n + (physique - 3)).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + n + (physique - 1)).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + n + (physique - 2)).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + n + (physique - 3)).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }
  if (n - 3 >= 0) {
    let test = document.querySelector("#colonne" + n + physique).textContent;
    let test1 = document.querySelector(
      "#colonne" + (n - 1) + physique
    ).textContent;
    let test2 = document.querySelector(
      "#colonne" + (n - 2) + physique
    ).textContent;
    let test3 = document.querySelector(
      "#colonne" + (n - 3) + physique
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n - 1) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n - 2) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n - 3) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n - 1) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n - 2) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n - 3) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (n + 3 <= column.value - 1) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    let test4 = document.querySelector(
      "#colonne" + (n + 1) + physique
    ).textContent;
    let test5 = document.querySelector(
      "#colonne" + (n + 2) + physique
    ).textContent;
    let test6 = document.querySelector(
      "#colonne" + (n + 3) + physique
    ).textContent;
    if (test == test4 && test == test5 && test == test6) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n + 1) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n + 2) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n + 3) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n + 1) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n + 2) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n + 3) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (n + 2 <= column.value - 1 && n - 1 >= 0) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    let test7 = document.querySelector(
      "#colonne" + (n + 1) + physique
    ).textContent;
    let test8 = document.querySelector(
      "#colonne" + (n + 2) + physique
    ).textContent;
    let test9 = document.querySelector(
      "#colonne" + (n - 1) + physique
    ).textContent;
    if (test == test7 && test == test8 && test == test9) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n + 1) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n + 2) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n - 1) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n + 1) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n + 2) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n - 1) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }
  if (n + 1 <= column.value - 1 && n - 2 >= 0) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    let test10 = document.querySelector(
      "#colonne" + (n + 1) + physique
    ).textContent;
    let test11 = document.querySelector(
      "#colonne" + (n - 1) + physique
    ).textContent;
    let test12 = document.querySelector(
      "#colonne" + (n - 2) + physique
    ).textContent;
    if (test == test10 && test == test11 && test == test12) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n + 1) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n - 1) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector("#colonne" + (n - 2) + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n + 1) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n - 1) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector("#colonne" + (n - 2) + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (n - 3 >= 0 && physique - 3 >= 0) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n - 1) + (physique - 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n - 2) + (physique - 2)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n - 3) + (physique - 3)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique - 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique - 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 3) + (physique - 3)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique - 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique - 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 3) + (physique - 3)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }
  if (n + 3 <= column.value - 1 && physique + 3 <= row.value - 1) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n + 1) + (physique + 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n + 2) + (physique + 2)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n + 3) + (physique + 3)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique + 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique + 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 3) + (physique + 3)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique + 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique + 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 3) + (physique + 3)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (
    n + 2 <= column.value - 1 &&
    n - 1 >= 0 &&
    physique + 2 <= row.value - 1 &&
    physique - 1 >= 0
  ) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n - 1) + (physique - 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n + 1) + (physique + 1)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n + 2) + (physique + 2)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique - 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique + 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique + 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique - 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique + 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique + 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (
    n + 1 <= column.value - 1 &&
    n - 2 >= 0 &&
    physique + 1 <= row.value - 1 &&
    physique - 2 >= 0
  ) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n - 1) + (physique - 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n - 2) + (physique - 2)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n + 1) + (physique + 1)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique - 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique - 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique + 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique - 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique - 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique + 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (n + 3 <= column.value - 1 && physique - 3 >= 0) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n + 1) + (physique - 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n + 2) + (physique - 2)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n + 3) + (physique - 3)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique - 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique - 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 3) + (physique - 3)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique - 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique - 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 3) + (physique - 3)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }
  if (n - 3 >= 0 && physique + 3 <= row.value - 1) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n - 1) + (physique + 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n - 2) + (physique + 2)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n - 3) + (physique + 3)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique + 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique + 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 3) + (physique + 3)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique + 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique + 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 3) + (physique + 3)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (
    n - 2 >= 0 &&
    n + 1 <= column.value - 1 &&
    physique + 2 <= row.value - 1 &&
    physique - 1 >= 0
  ) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n + 1) + (physique - 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n - 1) + (physique + 1)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n - 2) + (physique + 2)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique - 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique + 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique + 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique - 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique + 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 2) + (physique + 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }

  if (
    n - 1 >= 0 &&
    n + 2 <= column.value - 1 &&
    physique + 1 <= row.value - 1 &&
    physique - 2 >= 0
  ) {
    test = document.querySelector("#colonne" + n + physique).textContent;
    test1 = document.querySelector(
      "#colonne" + (n + 1) + (physique - 1)
    ).textContent;
    test2 = document.querySelector(
      "#colonne" + (n + 2) + (physique - 2)
    ).textContent;
    test3 = document.querySelector(
      "#colonne" + (n - 1) + (physique + 1)
    ).textContent;
    if (test == test1 && test == test2 && test == test3) {
      if (test == ".") {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique - 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique - 2)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique + 1)
        ).innerHTML = "<div id='jetonRougeGagnant'></div>";
        afficher("rouge");
      } else {
        document.querySelector("#colonne" + n + physique).innerHTML =
          "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 1) + (physique - 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n + 2) + (physique - 2)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        document.querySelector(
          "#colonne" + (n - 1) + (physique + 1)
        ).innerHTML = "<div id='jetonJauneGagnant'></div>";
        afficher("jaune");
      }
    }
  }
}
