let images = [{
    url: "images/image_2_1.jpg",
    title: "Rostov-on-Don, Admiral",
    area: "81 m2",
    time: "3.5 months"
  }, {
    url: "images/image_2_2.jpg",
    title: "Sochi Thieves",
    area: "105 m2",
    time: "4 months"
  }, {
    url: "images/image_2_3.jpg",
    title: "Rostov-on-Don Patriotic",
    area: "193 m2",
    time: "3 months"
}];

function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  // let sliderMenuItem0 = document.getElementById("slider__menu-item0");
  
  
  initImages();
  initArrows();
  initMenu();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initMenu() {
      let menuItem0 = document.getElementById("slider__menu-item0");
      menuItem0.addEventListener("click", function() {
        moveSlider(0);
      })
      let menuItem1 = document.getElementById("slider__menu-item1");
      menuItem1.addEventListener("click", function() {
        moveSlider(1);
      })
      let menuItem2 = document.getElementById("slider__menu-item2");
      menuItem2.addEventListener("click", function() {
        moveSlider(2);
      })
    
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function moveSlider(num) {
    document.querySelector(".menu_active").classList.remove("menu_active");
    document.getElementById("slider__menu-item" + num).classList.add("menu_active");
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }
  
  function initTitles() {
    let cityNode = document.getElementById("city");
    cityNode.innerHTML = `${images[0].title}`
    let areaNode = document.getElementById("area");
    areaNode.innerHTML = `${images[0].area}`
    let timeNode = document.getElementById("time");
    timeNode.innerHTML = `${images[0].time}`

  }
  
  function changeTitle(num) {
    if (!images[num].title) return;
    let cityNode = document.getElementById("city");
    cityNode.innerText = images[num].title;
    let areaNode = document.getElementById("area");
    areaNode.innerText = images[num].area;
    let timeNode = document.getElementById("time");
    timeNode.innerText = images[num].time;
  }
   
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: false,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});