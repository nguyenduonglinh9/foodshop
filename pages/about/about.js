//xử lý ẩn/hiện nút scroll on top
const btnToTop = document.querySelector(".btnToTop");
const slideDownLoad = document.querySelector(".slide-container");
const feedbackContent = document.querySelector(".feedback-content");
const feedbackControl = document.querySelector(".feedback-control");
const iconCartView = document.querySelector("#icon-cart-view");

iconCartView.addEventListener("click", () => {
  location.href = "../../pages/cart-view/cart-view.html";
});

if (window.pageYOffset < 500) {
  btnToTop.style.display = "none";
} else {
  btnToTop.style.display = "flex";
}
window.onscroll = (e) => {
  if (window.pageYOffset >= 500) {
    btnToTop.style.display = "flex";
  } else {
    btnToTop.style.display = "none";
  }
};
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//xử lý slide feedback
let isDraggingFeed = false,
  startXFeed,
  startScrollLeftFeed;
const startDragFeed = (e) => {
  isDraggingFeed = true;
  feedbackContent.classList.add("dragging");
  feedbackContent.style.scrollBehavior = "auto";
  startXFeed = e.pageX;
  startScrollLeftFeed = feedbackContent.scrollLeft;
};
const draggingFeed = (e) => {
  if (!isDraggingFeed) return;
  feedbackContent.scrollLeft = startScrollLeftFeed - (e.pageX - startXFeed);
};
const stopDragFeed = () => {
  isDraggingFeed = false;
  feedbackContent.classList.remove("dragging");
  feedbackContent.style.scrollBehavior = "smooth";
};
feedbackContent.addEventListener("mousedown", startDragFeed);
feedbackContent.addEventListener("mousemove", draggingFeed);
document.addEventListener("mouseup", stopDragFeed);
feedbackControl.children[0].addEventListener("click", () => {
  feedbackContent.scrollLeft -= 300;
});
feedbackControl.children[1].addEventListener("click", () => {
  feedbackContent.scrollLeft += 300;
});

// gọi API feedback về
fetch("http://localhost:3000/feedbacks")
  .then((res) => res.json())
  .then((data) =>
    data.map((item, index) => {
      //tạo div cho từng item
      const divItem = document.createElement("div");
      divItem.className = "feedback-item";
      divItem.draggable = false;
      // tạo thẻ img chứa hình
      const imgItem = document.createElement("img");
      imgItem.src = "../../assets/image/feedback-user.jpg";
      //tạo thẻ div chứa thẻ img để ảnh được đồng bộ kích thước
      const divImg = document.createElement("div");
      divImg.className = "img-container";
      //tạo thẻ div chứa thông tin
      const divContent = document.createElement("div");
      divContent.className = "content-container";
      const pName = document.createElement("p");
      pName.innerText = item.name;
      const pContent = document.createElement("p");
      pContent.innerText = item.content;
      divContent.appendChild(pName);
      divContent.appendChild(pContent);

      //để thẻ img làm con thẻ div chứa nó
      divImg.appendChild(imgItem);

      divItem.appendChild(divImg);
      divItem.appendChild(divContent);

      // divItem.appendChild(divDiscount);
      feedbackContent.appendChild(divItem);
    })
  )
  .then(
    setInterval(() => {
      feedbackContent.scrollLeft += 500;
    }, 3000)
  );

function checkLogin() {
  const iconLogin = document.querySelector("#icon-login");
  const navMenu = document.querySelector(".nav-menu");
  const navMenus = document.querySelectorAll(".nav-menu");
  let isLogin = document.cookie;
  console.log(navMenus);

  if (isLogin == "isLoggin=true") {
    const inforAccount = JSON.parse(localStorage.getItem("inforAccount"));
    // iconLogin.innerHTML = "";
    iconLogin.removeChild(iconLogin.children[0]);
    const img = document.createElement("img");
    img.src = inforAccount[0].image;
    iconLogin.appendChild(img);
    iconLogin.addEventListener("mouseover", () => {
      Array.from(navMenus)[1].classList.add("active-navmenu");
      Array.from(navMenus)[1].children[0].children[1].addEventListener(
        "click",
        () => {
          document.cookie = "isLoggin=false;path=/";
          location.reload();
          localStorage.removeItem("inforAccount");
        }
      );
    });
  } else {
    iconLogin.addEventListener("mouseover", () => {
      navMenu.classList.add("active-navmenu");
      navMenu.children[0].children[0].addEventListener("click", () => {
        location.href = "../../pages/sign-in/sign-in.html";
      });
      navMenu.children[0].children[1].addEventListener("click", () => {
        location.href = "../../pages/sign-up/sign-up.html";
      });
    });
    iconLogin.addEventListener("mouseout", () => {
      navMenu.classList.remove("active-navmenu");
    });
  }
}
checkLogin();

function countCart() {
  const countCarts = document.querySelector(".count-carts");
  if (document.cookie == "isLoggin=false") {
    const p = document.createElement("p");
    p.innerText = JSON.parse(localStorage.getItem("carts")).length;
    countCarts.innerHTML = "";
    countCarts.appendChild(p);
  }
  if (document.cookie == "isLoggin=true") {
    const p = document.createElement("p");
    p.innerText = JSON.parse(
      localStorage.getItem("inforAccount")
    )[0].carts.length;
    countCarts.innerHTML = "";
    countCarts.appendChild(p);
  }
}
countCart();
document.getElementById("account").addEventListener("click", () => {
  location.href = "../../pages/account/account.html";
});
document.querySelector(".logo").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
document.querySelector("#home").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
