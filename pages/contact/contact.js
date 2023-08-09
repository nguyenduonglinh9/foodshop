const nameInput = document.querySelector("#name");
const errorName = document.querySelector("#error-name");
const emailInput = document.querySelector("#email");
const errorEmail = document.querySelector("#error-email");

const iconCartView = document.querySelector("#icon-cart-view");

iconCartView.addEventListener("click", () => {
  location.href = "../../pages/cart-view/cart-view.html";
});

function validationName() {
  nameInput.addEventListener("input", () => {
    if (nameInput.value.length == 0) {
      errorName.innerText = "Ô Nhập Bắt Buộc Không Bỏ Trống";
      errorName.style.transform = "scaleY(1)";
    } else {
      errorName.innerText = "";
      errorName.style.transform = "scaleY(0)";
    }
  });
  nameInput.addEventListener("blur", () => {
    errorName.innerText = "";
    errorName.style.transform = "scaleY(0)";
  });
}

function validationEmail() {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  emailInput.addEventListener("input", () => {
    if (emailInput.value.length == 0) {
      errorEmail.innerText = "Ô Nhập Bắt Buộc Không Bỏ Trống";
      errorEmail.style.transform = "scaleY(1)";
    } else if (!emailInput.value.match(validRegex)) {
      errorEmail.innerText = "Sai Định Dạng Email";
      errorEmail.style.transform = "scaleY(1)";
    } else {
      errorEmail.innerText = "";
      errorEmail.style.transform = "scaleY(0)";
    }
  });
  emailInput.addEventListener("blur", () => {
    errorEmail.innerText = "";
    errorEmail.style.transform = "scaleY(0)";
  });
}

validationName();
validationEmail();
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
const btnToTop = document.querySelector(".btnToTop");
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
