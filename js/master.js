//  HTMLاستدعاء عناصر
const settingIcon = document.querySelector(".setting-icon"),
  settingBox = document.querySelector(".setting-box"),
  landingPage = document.querySelector(".landing-page"),
  colorLis = document.querySelectorAll(".color-list li"),
  spansBackground = document.querySelectorAll(".random-background span"),
  imagesSettingContainer = document.querySelector(".images-container"),
  imagesSetting = document.querySelectorAll(".images-container img"),
  skillPage = document.querySelector(".skills"),
  progressSpan = document.querySelectorAll(".skill-progress span"),
  imageBox = document.querySelectorAll(".images-box img"),
  navBullets = document.querySelector(".nav-bullets"),
  ShowOrHideBulletsSpan = document.querySelectorAll(".show-bullets span"),
  linksA = document.querySelectorAll(".links a "),
  linksContainer = document.querySelector(".links"),
  allDerictDiv = document.querySelectorAll("body > div"),
  settingTitles = document.querySelectorAll(".setting-container .title span"),
  settingPages = document.querySelectorAll(".page > div"),
  restButton = document.querySelector(".setting-container .rest");

let allDerictDivWithSlice = Array.from(allDerictDiv).slice(3);
// حذف الفوتر
allDerictDivWithSlice.length = allDerictDivWithSlice.length - 1;
madeBullet(allDerictDivWithSlice);

// متغيرات عامه
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  root = document.documentElement,
  mainColor = localStorage.getItem("hashColor"),
  randomBackgourndLocal = localStorage.getItem("randomBackgournd"),
  IntervalBackground,
  controlIntev = true;

// تشغيل فانكشن الانترفيل لتغير خليفه لاندنكنج بصوره عشوائيه كل 10 ثواني
startIntevarl();

// هنا عندي متغير المينكلر الي هو اذا جان المستخدم مختار لون واني مخزنه بالولكل ستوريج
// اذا جان اكو المتغير مينكلر بي قيمه يعني اكو قيمه مخزننه بالوكل ستوريج
// راح استخدم هاي القيمه علمود اسويه لون للمتصفح واخلي عليه كلاس الاكتف
if (mainColor != null) {
  // CSSهنا راح استخدم متغير الروت الي اني معرفه فوك علمود اغير قيمه المتغير الي بال
  root.style.setProperty("--main-color", mainColor);
  //  علمود اشيل كلاس الاكتف من كلهن liهنا راح اسوي لوب على
  colorLis.forEach((li) => {
    li.classList.remove("active");
  });
  // هنا هم اسوي لوب عليهن وراح اسوي شرط علمود اعرف ياهيه من هن الي اريد اخلي عليه كلاس الاكتف
  colorLis.forEach((li) => {
    if (mainColor == li.dataset.color) {
      li.classList.add("active");
    }
  });
}

// هنا نفس الفوك عندي متغير هذا المتغير مخزنه بالوكل اذا كان المستخدم يريد
if (randomBackgourndLocal != null) {
  // نفس الحجي مال اشيل كلاس الاكتف
  spansBackground.forEach((span) => {
    span.classList.remove("active");
  });

  // هنا راح اضيف كلاس الاكتف على العنصر الي مختاري من زمان ومخزونه قيمته بالوكل ستوريج
  spansBackground.forEach((span) => {
    if (randomBackgourndLocal == span.dataset.background) {
      span.classList.add("active");

      // هنا راح اشوف اذا جانت القيمه الي مخزونه عندي هي نو راح اوكف الانترفل واخلي الصوره الي مختاريها من قبل
      // وبنفس الوكت راح اضيف كلاس الاكتف على الصوره الي مختاريها من قبل
      if (randomBackgourndLocal == "no") {
        controlIntev = false;
        clearInterval(IntervalBackground);

        landingPage.style.backgroundImage = `url(${localStorage.getItem(
          "choosenImage"
        )})`;

        imagesSetting.forEach((image) => {
          image.classList.remove("active");
        });

        imagesSetting.forEach((image) => {
          if (image.dataset.number == localStorage.getItem("choosenImage")) {
            image.classList.add("active");
          }
        });
        imagesSettingContainer.classList.add("active");
      }
      // اذا الس يعني جان القيمه مو نو الي هيه يس راح اشغل الانترفل وبنفس الوكت اشيل كلاس الاكتف من بوكس الصوره بالستنيغ
      else {
        controlIntev = true;
        startIntevarl();
        imagesSettingContainer.classList.remove("active");
      }
    }
  });
}

settingIcon.onclick = () => {
  settingIcon.classList.toggle("rotate-icon");
  settingBox.classList.toggle("open");
};

window.onscroll = function () {
  if (window.scrollY >= skillPage.offsetTop - 100) {
    progressSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// الي موجودات باستنغ وراح اسوي اددايفنت لسينر الكلك على العنصر الي راح يصير عليه كلك li هنا راح اسوي لوب على ال
// CSSهذا العنصر الي صار عليه كلك راحح اخذ قيمه الداتا سيت الي بي واغير بيها قيمه المتغير الي
colorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // هنا طريقتين علمود اغير قيمه المتغير الي بالسيأسأس ياما متغير ياما مباشر بدون متغير
    root.style.setProperty("--main-color", e.target.dataset.color);
    // or document.documentElement.style.setProperty(("--main-color", e.target.dataset.color)) في حال اني ممسوي متغير

    // فاكشن لكلاس الاكتف
    handleActive(e);

    // راح اضيف قيمه للوكل ستوريج
    localStorage.setItem("hashColor", e.target.dataset.color);
  });
});

spansBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      controlIntev = true;
      startIntevarl();
      imagesSettingContainer.classList.remove("active");
    } else {
      controlIntev = false;
      clearInterval(IntervalBackground);
      imagesSettingContainer.classList.add("active");
      landingPage.style.backgroundImage = `url(${
        document.querySelector(".images-container img.active").dataset.number
      })`;
    }

    localStorage.setItem("randomBackgournd", e.target.dataset.background);
  });
});

imagesSetting.forEach((image) => {
  image.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });

    e.target.classList.add("active");

    if (
      document.querySelector(".random-background span.active").dataset
        .background == "no"
    ) {
      landingPage.style.backgroundImage = `url(${e.target.dataset.number})`;
    }
    localStorage.setItem("choosenImage", e.target.dataset.number);
  });
});

imageBox.forEach((img, index) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imageHeading = document.createElement("h2");
      imageHeading.appendChild(document.createTextNode(img.alt));
      imageHeading.className = "image-heading";
      popupBox.appendChild(imageHeading);
    }

    let imagePopup = document.createElement("img");
    imagePopup.className = "image-popup";
    imagePopup.src = img.src;

    popupBox.appendChild(imagePopup);
    document.body.appendChild(popupBox);

    let spanX = document.createElement("span");
    spanX.className = "x";
    spanX.appendChild(document.createTextNode("X"));
    popupBox.appendChild(spanX);

    let imagesArr = Array.from(imageBox);
    let control = 0,
      controlPrev;

    document.onkeydown = function (e) {
      if (e.key == "Escape") {
        overlay.remove();
        popupBox.remove();
      }
      if (e.key == "ArrowRight") {
        imagesArr.forEach((im, ind) => {
          if (ind == index) {
            let currentImageIndex = ind + control;
            let nextImageIndex = currentImageIndex + 1;
            if (nextImageIndex < imageBox.length) {
              let nextImage = imagesArr[nextImageIndex];
              imagePopup.src = nextImage.src;
              if (nextImage.alt !== null) {
                document.querySelector(
                  ".image-heading"
                ).innerHTML = `<h2 class="image-heading">${nextImage.alt}</h2>`;
              }
              control++;
              controlPrev = control;
            }
          }
        });
      }

      if (e.key == "ArrowLeft") {
        imagesArr.forEach((im, ind) => {
          if (ind == index) {
            let currentImageIndex = ind + controlPrev;
            let prevImageIndex = currentImageIndex - 1;
            if (prevImageIndex >= 0) {
              let prevImage = imagesArr[prevImageIndex];
              imagePopup.src = prevImage.src;
              if (prevImage.alt !== null) {
                document.querySelector(
                  ".image-heading"
                ).innerHTML = `<h2 class="image-heading">${prevImage.alt}</h2>`;
              }
              controlPrev--;
              control = controlPrev;
            }
          }
        });
      }
    };

    // // داخل البوبا X هذا الي اني سويته علمود اشغل سبان
    // // وجوه الي بيها دوكمنت دوت ايفنت لسينر الي اسامه الزيرو الي سواها وتسوي نفس الشغل مال هاي
    // // راح أشر عليها بعلامه علمود @@@@@@ اعرفها
    // spanX.addEventListener("click", () => {
    //   overlay.remove();
    //   popupBox.remove();
    // });
  });
});

// // @@@@@@
document.addEventListener("click", (e) => {
  if (e.target.className == "x") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

let bulletsSections = document.querySelectorAll(".nav-bullets .bullet");
moveToPage(bulletsSections);
moveToPage(linksA);

// اظهار البوليت او اخفائها

if (localStorage.getItem("bulets-option") !== null) {
  if (localStorage.getItem("bulets-option") == "yes") {
    navBullets.style.display = "block";
  } else if (localStorage.getItem("bulets-option") == "no") {
    navBullets.style.display = "none";
  }

  ShowOrHideBulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(`.show-bullets .${localStorage.getItem("bulets-option")}`)
    .classList.add("active");
}

ShowOrHideBulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.bullets == "yes") {
      navBullets.style.display = "block";
    } else {
      navBullets.style.display = "none";
    }
    localStorage.setItem("bulets-option", e.target.dataset.bullets);
  });
});

// اقسام setting
settingTitles.forEach((title) => {
  title.addEventListener("click", (e) => {
    handleActive(e);
    settingPages.forEach((page) => {
      page.style.display = "none";
    });
    document.querySelector(`.page .${e.target.dataset.setting}`).style.display =
      "block";
  });
});

// زر الريست
restButton.onclick = () => {
  localStorage.clear();
  location.reload();
};

// الريسبونفف الخاص بالتكل مينو و لينكس
let toogle = document.querySelector(".header-area .toogle-meun");
toogle.addEventListener("click", (e) => {
  e.stopPropagation();
  linksContainer.classList.toggle("open");
  toogle.classList.toggle("rot");
});

linksContainer.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target != toogle && e.target != linksContainer) {
    if (linksContainer.classList.contains("open")) {
      linksContainer.classList.toggle("open");
      toogle.classList.toggle("rot");
    }
  }
});

// هاي الانترفل الي تغير صوره الخليفه مال لاندكينك
function startIntevarl() {
  if (controlIntev === true) {
    IntervalBackground = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      // landingPage.style.backgroundImage = `url("../imgs/${imagesArray[randomNumber]}")`;// هذا طريقه
      landingPage.style.backgroundImage =
        'url("imgs/' + imagesArray[randomNumber] + '")'; // هذا طريقه ثانيه
    }, 1000);
  }
}

function moveToPage(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(`${e.target.dataset.section}`)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

function madeBullet(arrayOfDiv) {
  arrayOfDiv.forEach((e) => {
    let mainDiv = document.createElement("div");
    mainDiv.className = "bullet";
    if (e.classList.contains("container")) {
      mainDiv.setAttribute("data-section", `.${e.children[0].className}`);
    } else {
      mainDiv.setAttribute("data-section", `.${e.className}`);
    }
    let branchDiv = document.createElement("div");
    branchDiv.className = "tooltip";
    if (e.classList.contains("container")) {
      let h2 = document.querySelector(`.${e.children[0].className} h2`);
      branchDiv.innerHTML = h2.innerHTML;
    } else {
      let h2 = document.querySelector(`.${e.className} h2`);
      branchDiv.innerHTML = h2.innerHTML;
    }
    mainDiv.appendChild(branchDiv);
    navBullets.appendChild(mainDiv);
  });
}

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  ev.target.classList.add("active");
}
