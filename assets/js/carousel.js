const nextButton = document.getElementById("carousel_next");
const previousButton = document.getElementById("carousel_previous");

const carouselParent = document.getElementById("carousel_images");
const carouselItems = () => document.querySelectorAll(".carousel_img");
const carouselAdjacentItems = () => document.querySelectorAll("[data-id=adjacent]");
const carouselInitialItems = document.querySelectorAll(".carousel_img");

const dotsParent = document.getElementById("dots");
const carouselDots = () => document.querySelectorAll(".carousel_dots_item");

const widthPerCard = 380;
let cardsToShow = 0;
let currentPosition = 0;
const lastPosition = carouselInitialItems.length - 1
const firstPosition = 0;

const getCardsToShow = () => {
  toggleButtonsVisibility("block")
  toggleDotsVisibility("block")
  
  let newCards = Math.floor(window.innerWidth / widthPerCard);

  if (newCards < 1) newCards = 1;

  if (newCards >= lastPosition) {
    newCards = carouselInitialItems.length
    toggleButtonsVisibility()
    toggleDotsVisibility()
  };

  if (newCards !== cardsToShow) {
    cardsToShow = newCards;
    removeAdjacentCards();
    createAdjacentCards();
    updateItems()
  }
}

const toggleButtonsVisibility = (display = "none") => {
  nextButton.style.display = display;
  previousButton.style.display = display;
}

const removeAdjacentCards = () => {
  carouselAdjacentItems().forEach((element) => {
    carouselParent.removeChild(element);
  })
}

const createAdjacentCards = () => {
  if (cardsToShow === carouselInitialItems.length) return

  for (let index = 0; index < cardsToShow - 1; index++) {
    const itemToCopy = carouselInitialItems[index]
    const newItem = document.createElement("img")
    newItem.id = itemToCopy.id
    newItem.classList = itemToCopy.classList
    newItem.src = itemToCopy.src
    newItem.setAttribute("data-id", "adjacent")
    carouselParent.appendChild(newItem)
  }
}

const updateItems = () => {
  carouselItems().forEach((element, index) => {
    element.classList.remove("visible")
    element.offsetWidth // to fix animation when removing and adding class again
    if ((index >= currentPosition && index < currentPosition + cardsToShow) || cardsToShow === carouselInitialItems.length) {
      return element.classList.add("visible")
    }
  })
}

const createDots = () => {
  carouselInitialItems.forEach((_, index) => {
    const id = index + 1;
    const dot = document.createElement('li');
    dot.className = 'carousel_dots_item';
    dot.id = `dot_${id}`;
    dot.textContent = `Ir para página ${id}`;
    dot.onclick = () => handleNext(id);
    dotsParent.appendChild(dot)
  })
  updateDots()
}

const toggleDotsVisibility = (display = "none") => {
  carouselDots().forEach((element) => {
    element.style.display = display;
  })
}

const updateDots = () => {
  carouselDots().forEach((element, index) => {
    if (index === currentPosition) return element.classList.add("active")
    element.classList.remove("active")
  })
}

const handleNext = (newPosition) => {
  currentPosition = newPosition ? newPosition - 1 : currentPosition + 1;
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

window.onload = () => {
  createDots()
  getCardsToShow()
};
window.onresize = () => getCardsToShow();
nextButton.onclick = () => handleNext();
previousButton.onclick = () => handlePrevious();