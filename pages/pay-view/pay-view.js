const inputLocation = document.querySelector("#location");
const addressList = document.querySelector("#address-list");
const btnToTop = document.querySelector(".btnToTop");

inputLocation.addEventListener("keyup", () => {
  var requestOptions = {
    method: "GET",
  };

  fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputLocation.value}&apiKey=579a95f35839460eb959b7696c1a1185`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (inputLocation.value == "") {
        addressList.style.display = "none";
      } else {
        addressList.innerHTML = "";
        const ul = document.createElement("ul");
        Array.from(result.features).map((item) => {
          addressList.style.display = "block";
          // console.log(
          //   `${item.properties.address_line1},${item.properties.address_line2},${item.properties.country}`
          // );
          const li = document.createElement("li");
          li.innerText = `${item.properties.address_line1},${item.properties.address_line2},${item.properties.country}`;
          li.addEventListener("click", () => {
            inputLocation.value = li.innerText;
            addressList.style.display = "none";
          });
          ul.appendChild(li);
          addressList.appendChild(ul);
        });
      }
    })
    .catch((error) => console.log("error", error));
});

//xử lý ẩn/hiện nút scroll on top
// window.onscroll = (e) => {
//   if (window.pageYOffset >= 900) {
//     btnToTop.style.display = "flex";
//   } else {
//     btnToTop.style.display = "none";
//   }
// };
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const iconCartView = document.querySelector("#icon-cart-view");

iconCartView.addEventListener("click", () => {
  location.href = "../../pages/cart-view/cart-view.html";
});
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
document.getElementById("account").addEventListener("click", () => {
  location.href = "../../pages/account/account.html";
});
document.querySelector(".logo").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
document.querySelector("#home").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
