let images = [
  { src: "imgs/img-01.jpg", title: "the first image" },
  { src: "imgs/img-02.jpg", title: "the second image" },
  { src: "imgs/img-03.jpg", title: "the woffle image" },
  { src: "imgs/img-04.jpg", title: "the puzzel image" },
  { src: "imgs/img-05.jpg", title: "the lone image" },
  { src: "imgs/img-06.jpg", title: "the noone image" },
  { src: "imgs/img-07.png", title: "the ,mdp image" },
  { src: "imgs/img-08.jpg", title: "the dfkg image" },
  { src: "imgs/img-09.jpg", title: "the title image" },
];
let dragindex = 0;
let steps = 0;
let draged = null;
let sortUl = document.querySelector(".sort");
let actImg = document.querySelector(".act-img img");
let levels = Array.from(document.querySelectorAll(".show span"));
let start = document.querySelector(".show button");
// on start game

// handle active function
let handleActive = function (span) {
  span.currentTarget.parentElement
    .querySelectorAll(".active")
    .forEach((ele) => {
      ele.classList.remove("active");
    });
  span.currentTarget.classList.add("active");
};
levels.forEach((level) => {
  level.addEventListener("click", (e) => {
    handleActive(e);
    window.sessionStorage.setItem("level", e.currentTarget.dataset.mode);
    window.sessionStorage.setItem("level1", e.currentTarget.textContent);
  });
});
let unshuffled = [];
let shuffled = [];
let arr = [];
let sizeUi = 400;
let actLevel = document.querySelector(".act-level span");
start.addEventListener("click", () => {
  document.querySelector(".show").style.left = "-100%";
  actLevel.textContent = window.sessionStorage.getItem("level1");
  const randomImg = images[Math.floor(Math.random() * images.length)].src;
  actImg.src = randomImg;
  let level = window.sessionStorage.getItem("level");
  let size = level * 100;
  let percent = 100 / (level - 1);
  unshuffled = [];
  arr = [];
  for (i = 0; i < level * level; i++) {
    let x = percent * (i % level);
    let y = percent * Math.floor(i / level);
    const li = document.createElement("li");
    li.style.cssText = "background-image: url(" + randomImg + ");";

    li.setAttribute("data-num", i);
    li.setAttribute("draggable", "true");
    li.setAttribute("id", `id-${i}`);

    li.style.backgroundSize = size + "%";
    li.style.backgroundPosition = x + "%" + y + "%";
    li.style.width = 400 / level + "px";
    li.style.height = 400 / level + "px";
    unshuffled.push(li);
    arr.push(li);
  }
  for (let i = unshuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = unshuffled[i];
    unshuffled[i] = unshuffled[j];
    unshuffled[j] = temp;
  }
  unshuffled.forEach((e) => {
    sortUl.appendChild(e);
  });
});
// let act_arr = Array.from(document.querySelectorAll(".sort li"));

/////////////////////////////////////
sortUl.addEventListener("dragstart", dragstart);
sortUl.addEventListener("dragover", dragover);
sortUl.addEventListener("drop", drop);
function dragstart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}
function dragover(e) {
  e.preventDefault();
}
function drop(e) {
  e.preventDefault();
  const clone = e.target.cloneNode(true);
  let data = e.dataTransfer.getData("text/plain");
  if (document.getElementById(data)) {
    if (clone.id !== data) {
      let nodelist = document.querySelector(".sort").childNodes;
      for (let i = 0; i < nodelist.length; i++) {
        if (nodelist[i].id === data) {
          dragindex = i;
        }
      }
      const targetElement = document.getElementById(data);
      if (targetElement) {
        document
          .querySelector(".sort")
          .replaceChild(document.getElementById(data), e.target);
        document
          .querySelector(".sort")
          .insertBefore(
            clone,
            document.querySelector(".sort").childNodes[dragindex]
          );
      }
    }
  }
}
/////////////////////////////////
let count = document.querySelector(".count");

let win = document.querySelector(".win");
const playMore = document.querySelector(".win span");
sortUl.addEventListener("dragend", (e) => {
  const actElements = Array.from(document.querySelectorAll(".sort li"));
  const correctOrder = Array.from(arr).map((piece) => piece.id);
  if (actElements.every((piece, index) => piece.id === correctOrder[index])) {
    win.style.left = "15%";
    document.querySelector(".win .count").textContent = steps;
  } else {
    steps++;
    count.textContent = steps;
  }
});
playMore.addEventListener("click", () => {
  document.querySelector(".show").style.left = "0";
  win.style.left = "-100%";
  document.querySelectorAll(".sort li").forEach((e) => {
    e.remove();
  });
});
document.getElementById("exit").onclick = () => {
  document.querySelectorAll(".sort li").forEach((e) => {
    e.remove();
  });
  document.querySelector(".show").style.left = "0";
  steps = 0;
  count.textContent = "0";
};
