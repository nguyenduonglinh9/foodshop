const menuContainer = document.querySelector(".menu-container");
const menuFilter = document.querySelector(".menu-filter");
const menuList = document.querySelector(".menu-list");
const menuPageCount = document.querySelector(".menu-page-count");
const btnToTop = document.querySelector(".btnToTop");
const listType = [
  "All",
  "banhmi",
  "Hamburger",
  "rice",
  "meat",
  "my",
  "pho",
  "pizza",
  "cocktail",
  "sashimi",
];
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

let defaultType = "All";
let page = 1;
let limit = 8;
//gọi API món ăn
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    const loadList = () => {
      let beginGet = limit * (page - 1);
      let endGet = limit * page - 1;
      data
        .filter((item, index) => {
          return item.id >= beginGet + 1 && item.id <= endGet + 1;
        })
        .map((item, index) => {
          const divItem = document.createElement("div");
          divItem.classList.add("menu-item");

          const divImg = document.createElement("div");
          divImg.classList.add("menu-item-img");
          const imgItem = document.createElement("img");
          imgItem.src = item.images[0];
          divImg.appendChild(imgItem);

          const divType = document.createElement("div");
          divType.classList.add("menu-item-type");
          const pType = document.createElement("p");
          if (item.type == "banhmi") {
            pType.innerText = "Bánh Mì";
          } else if (item.type == "Hamburger") {
            pType.innerText = "Hamburger";
          } else if (item.type == "rice") {
            pType.innerText = "Cơm";
          } else if (item.type == "meat") {
            pType.innerText = "Thịt";
          } else if (item.type == "my") {
            pType.innerText = "Mỳ";
          } else if (item.type == "pho") {
            pType.innerText = "Phở";
          } else if (item.type == "pizza") {
            pType.innerText = "Pizza";
          } else if (item.type == "cocktail") {
            pType.innerText = "Cocktail";
          } else if (item.type == "sashimi") {
            pType.innerText = "Sashimi";
          }
          divType.appendChild(pType);

          const divBody = document.createElement("div");
          divBody.classList.add("menu-item-body");
          const pName = document.createElement("p");
          pName.innerText = item.name;
          const divStar = document.createElement("div");
          divStar.classList.add("menu-item-body-star");
          for (let i = 0; i < item.star; i++) {
            divStar.innerHTML +=
              '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
          }
          const pPrice = document.createElement("p");
          pPrice.innerText = Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price.small);

          const divControl = document.createElement("div");
          divControl.classList.add("menu-item-body-control");
          const divAddCart = document.createElement("div");
          divAddCart.classList.add("add-cart");
          const pAddCart = document.createElement("p");
          pAddCart.innerText = "Thêm Vào Giỏ Hàng";
          divAddCart.appendChild(pAddCart);
          const divButton = document.createElement("div");
          divButton.classList.add("button");
          const divBtnItem = document.createElement("div");
          divBtnItem.classList.add("button-item");
          divBtnItem.innerHTML = '<i class="fa-regular fa-eye"></i>';
          const divBtnItem2 = document.createElement("div");
          divBtnItem2.classList.add("button-item");
          divBtnItem2.innerHTML = '<i class="fa-regular fa-heart"></i>';
          divButton.appendChild(divBtnItem);
          divButton.appendChild(divBtnItem2);
          divControl.appendChild(divAddCart);
          divControl.appendChild(divButton);

          divBody.appendChild(pName);
          divBody.appendChild(divStar);
          divBody.appendChild(pPrice);
          divBody.appendChild(divControl);

          divItem.appendChild(divImg);
          divItem.appendChild(divType);
          divItem.appendChild(divBody);

          divItem.addEventListener("click", () => {
            localStorage.setItem("idProduct", item.id);
            window.location = "../../pages/detail-product/detail-product.html";
          });

          menuList.append(divItem);
        });
      listPage();
    };
    loadList();
    //phân trang
    function listPage() {
      menuPageCount.innerHTML = "";
      const soTrang = Math.round(data.length / limit);
      for (let i = 1; i <= soTrang; i++) {
        const divCount = document.createElement("div");
        divCount.classList.add("count-item");
        const pCount = document.createElement("p");
        pCount.innerText = i;
        if (i == page) {
          divCount.style.backgroundColor = "rgb(255, 124, 8)";
          divCount.style.color = "white";
        } else {
          divCount.addEventListener("click", () => {
            page = i;
            menuList.innerHTML = "";
            loadList();
          });
        }
        divCount.appendChild(pCount);
        menuPageCount.appendChild(divCount);
      }
    }
  });
//tạo bộ filter
listType.map((item, index) => {
  const divItemFilter = document.createElement("div");
  divItemFilter.classList.add("menu-filter-item");

  const pFilter = document.createElement("p");

  if (item == "banhmi") {
    pFilter.innerText = "Bánh Mì";
  } else if (item == "Hamburger") {
    pFilter.innerText = "Hamburger";
  } else if (item == "rice") {
    pFilter.innerText = "Cơm";
  } else if (item == "meat") {
    pFilter.innerText = "Thịt";
  } else if (item == "my") {
    pFilter.innerText = "Mỳ";
  } else if (item == "pho") {
    pFilter.innerText = "Phở";
  } else if (item == "pizza") {
    pFilter.innerText = "Pizza";
  } else if (item == "cocktail") {
    pFilter.innerText = "Cocktail";
  } else if (item == "sashimi") {
    pFilter.innerText = "Sashimi";
  } else if (item == "All") {
    pFilter.innerText = "Tất Cả";
  }
  divItemFilter.appendChild(pFilter);
  divItemFilter.addEventListener("click", () => {
    defaultType = item;
    if (defaultType == "All") {
      let pageAll = 1;
      let limitAll = 8;
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
          function loadListAll() {
            menuList.innerHTML = "";
            let beginGetAll = limitAll * (pageAll - 1);
            let endGetAll = limitAll * pageAll - 1;
            data
              .filter((item, index) => {
                return item.id >= beginGetAll + 1 && item.id <= endGetAll + 1;
              })
              .map((item, index) => {
                const divItem = document.createElement("div");
                divItem.classList.add("menu-item");

                const divImg = document.createElement("div");
                divImg.classList.add("menu-item-img");
                const imgItem = document.createElement("img");
                imgItem.src = item.images[0];
                divImg.appendChild(imgItem);

                const divType = document.createElement("div");
                divType.classList.add("menu-item-type");
                const pType = document.createElement("p");
                if (item.type == "banhmi") {
                  pType.innerText = "Bánh Mì";
                } else if (item.type == "Hamburger") {
                  pType.innerText = "Hamburger";
                } else if (item.type == "rice") {
                  pType.innerText = "Cơm";
                } else if (item.type == "meat") {
                  pType.innerText = "Thịt";
                } else if (item.type == "my") {
                  pType.innerText = "Mỳ";
                } else if (item.type == "pho") {
                  pType.innerText = "Phở";
                } else if (item.type == "pizza") {
                  pType.innerText = "Pizza";
                } else if (item.type == "cocktail") {
                  pType.innerText = "Cocktail";
                } else if (item.type == "sashimi") {
                  pType.innerText = "Sashimi";
                }
                divType.appendChild(pType);

                const divBody = document.createElement("div");
                divBody.classList.add("menu-item-body");
                const pName = document.createElement("p");
                pName.innerText = item.name;
                const divStar = document.createElement("div");
                divStar.classList.add("menu-item-body-star");
                for (let i = 0; i < item.star; i++) {
                  divStar.innerHTML +=
                    '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                }
                const pPrice = document.createElement("p");
                pPrice.innerText = Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price.small);

                const divControl = document.createElement("div");
                divControl.classList.add("menu-item-body-control");
                const divAddCart = document.createElement("div");
                divAddCart.classList.add("add-cart");
                const pAddCart = document.createElement("p");
                pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                divAddCart.appendChild(pAddCart);
                const divButton = document.createElement("div");
                divButton.classList.add("button");
                const divBtnItem = document.createElement("div");
                divBtnItem.classList.add("button-item");
                divBtnItem.innerHTML = '<i class="fa-regular fa-eye"></i>';
                const divBtnItem2 = document.createElement("div");
                divBtnItem2.classList.add("button-item");
                divBtnItem2.innerHTML = '<i class="fa-regular fa-heart"></i>';
                divButton.appendChild(divBtnItem);
                divButton.appendChild(divBtnItem2);
                divControl.appendChild(divAddCart);
                divControl.appendChild(divButton);

                divBody.appendChild(pName);
                divBody.appendChild(divStar);
                divBody.appendChild(pPrice);
                divBody.appendChild(divControl);

                divItem.appendChild(divImg);
                divItem.appendChild(divType);
                divItem.appendChild(divBody);
                divItem.addEventListener("click", () => {
                  localStorage.setItem("idProduct", item.id);
                  window.location =
                    "../../pages/detail-product/detail-product.html";
                });

                menuList.append(divItem);
              });
            listPageAll();
          }
          loadListAll();
          //phân trang
          function listPageAll() {
            menuPageCount.innerHTML = "";
            const soTrang = Math.round(data.length / limitAll);
            for (let i = 1; i <= soTrang; i++) {
              const divCount = document.createElement("div");
              divCount.classList.add("count-item");
              const pCount = document.createElement("p");
              pCount.innerText = i;
              if (i == pageAll) {
                divCount.style.backgroundColor = "rgb(255, 124, 8)";
                divCount.style.color = "white";
              } else {
                divCount.addEventListener("click", () => {
                  pageAll = i;
                  menuList.innerHTML = "";
                  loadListAll();
                });
              }
              divCount.appendChild(pCount);
              menuPageCount.appendChild(divCount);
            }
          }
        });
    } else {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
          let pageSub = 1;
          let limitSub = 8;
          let beginGet = limitSub * (pageSub - 1);
          let endGet = limitSub * pageSub - 1;
          function loadListSub() {
            menuList.innerHTML = "";
            data
              .filter((item2, index2) => {
                return item2.type == item;
              })
              .map((item3, index3) => {
                const divItem = document.createElement("div");
                divItem.classList.add("menu-item");

                const divImg = document.createElement("div");
                divImg.classList.add("menu-item-img");
                const imgItem = document.createElement("img");
                imgItem.src = item3.images[0];
                divImg.appendChild(imgItem);

                const divType = document.createElement("div");
                divType.classList.add("menu-item-type");
                const pType = document.createElement("p");
                if (item3.type == "banhmi") {
                  pType.innerText = "Bánh Mì";
                } else if (item3.type == "Hamburger") {
                  pType.innerText = "Hamburger";
                } else if (item3.type == "rice") {
                  pType.innerText = "Cơm";
                } else if (item3.type == "meat") {
                  pType.innerText = "Thịt";
                } else if (item3.type == "my") {
                  pType.innerText = "Mỳ";
                } else if (item3.type == "pho") {
                  pType.innerText = "Phở";
                } else if (item3.type == "pizza") {
                  pType.innerText = "Pizza";
                } else if (item3.type == "cocktail") {
                  pType.innerText = "Cocktail";
                } else if (item3.type == "sashimi") {
                  pType.innerText = "Sashimi";
                }
                divType.appendChild(pType);

                const divBody = document.createElement("div");
                divBody.classList.add("menu-item-body");
                const pName = document.createElement("p");
                pName.innerText = item3.name;
                const divStar = document.createElement("div");
                divStar.classList.add("menu-item-body-star");
                for (let i = 0; i < item3.star; i++) {
                  divStar.innerHTML +=
                    '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                }
                const pPrice = document.createElement("p");
                pPrice.innerText = Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item3.price.small);

                const divControl = document.createElement("div");
                divControl.classList.add("menu-item-body-control");
                const divAddCart = document.createElement("div");
                divAddCart.classList.add("add-cart");
                const pAddCart = document.createElement("p");
                pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                divAddCart.appendChild(pAddCart);
                const divButton = document.createElement("div");
                divButton.classList.add("button");
                const divBtnItem = document.createElement("div");
                divBtnItem.classList.add("button-item");
                divBtnItem.innerHTML = '<i class="fa-regular fa-eye"></i>';
                const divBtnItem2 = document.createElement("div");
                divBtnItem2.classList.add("button-item");
                divBtnItem2.innerHTML = '<i class="fa-regular fa-heart"></i>';
                divButton.appendChild(divBtnItem);
                divButton.appendChild(divBtnItem2);
                divControl.appendChild(divAddCart);
                divControl.appendChild(divButton);

                divBody.appendChild(pName);
                divBody.appendChild(divStar);
                divBody.appendChild(pPrice);
                divBody.appendChild(divControl);

                divItem.appendChild(divImg);
                divItem.appendChild(divType);
                divItem.appendChild(divBody);
                divItem.addEventListener("click", () => {
                  localStorage.setItem("idProduct", item3.id);
                  window.location =
                    "../../pages/detail-product/detail-product.html";
                });
                menuList.append(divItem);
              });
            listPageSub();
          }
          loadListSub();
          //phân trang
          function listPageSub() {
            menuPageCount.innerHTML = "";
            const soTrang = Math.ceil(
              data.filter((item2, index2) => {
                return item2.type == item;
              }).length / limitSub
            );
            for (let i = 1; i <= soTrang; i++) {
              const divCount = document.createElement("div");
              divCount.classList.add("count-item");
              const pCount = document.createElement("p");
              pCount.innerText = i;
              if (i == pageSub) {
                divCount.style.backgroundColor = "rgb(255, 124, 8)";
                divCount.style.color = "white";
              } else {
                divCount.addEventListener("click", () => {
                  pageSub = i;
                  menuList.innerHTML = "";
                  loadListSub();
                });
              }
              divCount.appendChild(pCount);
              menuPageCount.appendChild(divCount);
            }
          }
        });
    }
  });

  menuFilter.appendChild(divItemFilter);
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
