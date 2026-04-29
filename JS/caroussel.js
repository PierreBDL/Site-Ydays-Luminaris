const imagesContainer = document.getElementById("carrousel");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function UpdateCarrousel() {
    imagesContainer.style.transform = `translateX(${-index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
    const images = document.querySelectorAll(".ImageVoirPlus");
    if (images.length > 0) {
        index = (index + 1) % images.length;
        UpdateCarrousel();
    }
});

prevBtn.addEventListener("click", () => {
    const images = document.querySelectorAll(".ImageVoirPlus");
    if (images.length > 0) {
        index = (index - 1 + images.length) % images.length;
        UpdateCarrousel();
    }
});
