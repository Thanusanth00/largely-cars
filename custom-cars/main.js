const listItems = document.querySelectorAll("header ul li");
const images = document.querySelectorAll(".images img");
const randomImages = document.querySelectorAll(".random-img img");
const buttons = document.querySelectorAll(".buttons button");
const paragraphs = document.querySelectorAll(".para-wrapper p");
/* Controlling the automatic slider */
let a = 0;
images[a].classList.add("active");
setInterval(() => {
  for (let i = 0; i < 3; i++) {
    if (i == a) {
      images[i].classList.add("active");
    } else {
      images[i].classList.remove("active");
    }
  }
  a++;
  if (a == 3) {
    a = 0;
  }
}, 3000);

/* Intersection observer for keep tracking the elements on the viewport */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
});

/* Elements that are being animated by intersection observer */
const elements = document.querySelectorAll(".images .text");
elements.forEach((elem) => {
  observer.observe(elem);
});

/* Changing images on click */
paragraphs[0].classList.add("active");
randomImages[0].classList.add("active");
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    for (let i = 0; i < 3; i++) {
      if (i == index) {
        randomImages[index].classList.add("active");
        paragraphs[index].classList.add("active");
      } else {
        randomImages[i].classList.remove("active");
        paragraphs[i].classList.remove("active");
      }
    }
  });
});
