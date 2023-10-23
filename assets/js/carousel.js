const nextButton = document.getElementById("carousel_next");
const previousButton = document.getElementById("carousel_previous");
const carouselParent = document.getElementById("carousel_images");
const carouselItems = () => document.querySelectorAll(".carousel_img");
const carouselInitialItems = document.querySelectorAll(".carousel_img");
const carouselDots = document.querySelectorAll(".carousel_dots_item");

const widthPerCard = 340;
let cardsToShow = 0;
let currentPosition = 0;
const lastPosition = carouselItems().length - 1
const firstPosition = 0;

const getCardsToShow = () => {
  const newCards = Math.floor(window.innerWidth / widthPerCard);
  if (newCards !== cardsToShow) {
    cardsToShow = newCards;
    removeAdjacentCards();
    createAdjacentCards();
    updateItems()
  }
}

const removeAdjacentCards = () => {
  carouselItems().forEach((element) => {
    carouselParent.removeChild(element);
  })
  carouselInitialItems.forEach((element) => {
    carouselParent.appendChild(element);
  })
}

const createAdjacentCards = () => {
  for (let index = 0; index < cardsToShow - 1; index++) {
    const itemToCopy = carouselItems()[index]
    const newItem = document.createElement("img")
    newItem.id = itemToCopy.id
    newItem.classList = itemToCopy.classList
    newItem.src = itemToCopy.src
    carouselParent.appendChild(newItem)
  }
}

const updateItems = () => {
  carouselItems().forEach((element, index) => {
    if (index >= currentPosition && index < currentPosition + cardsToShow) {
      return element.classList.add("visible")
    }
    element.classList.remove("visible")
  })
}

const updateDots = () => {
  carouselDots.forEach((element, index) => {
    if (index === currentPosition) return element.classList.add("active")
    element.classList.remove("active")
  })
}

const handleNext = () => {
  currentPosition++;
  if (currentPosition > lastPosition) {
    currentPosition = 0;
  }
  updateDots()
  updateItems()
}

const handlePrevious = () => {
  currentPosition--;
  if (currentPosition < firstPosition) {
    currentPosition = lastPosition;
  }
  updateDots()
  updateItems()
}

window.onload = getCardsToShow;
window.onresize = getCardsToShow;
nextButton.onclick = handleNext;
previousButton.onclick = handlePrevious;