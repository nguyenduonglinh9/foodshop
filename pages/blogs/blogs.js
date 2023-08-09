const blogContainer = document.querySelector(".blog-container");
const blogFilter = document.querySelector(".blog-filter");
const blogList = document.querySelector(".blog-list");
const blogPageCount = document.querySelector(".blog-page-count");
const btnToTop = document.querySelector(".btnToTop");

const iconCartView = document.querySelector("#icon-cart-view");

iconCartView.addEventListener("click", () => {
  location.href = "../../pages/cart-view/cart-view.html";
});

const listType = [
  "All",
  "news",
  "amthuc",
  "phongcachsong",
  "suckhoe",
  "khampha",
];
//scroll to top handle
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

let defaultType = "All";
let page = 1;
let limit = 6;

//gọi Api blogs

fetch("http://localhost:3000/blogs")
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
          divItem.classList.add("blog-item");

          const divImg = document.createElement("div");
          divImg.classList.add("blog-item-img");
          const imgItem = document.createElement("img");
          imgItem.src = item.image;
          divImg.appendChild(imgItem);

          const divType = document.createElement("div");
          divType.classList.add("blog-item-type");
          const pType = document.createElement("p");
          if (item.type == "news") {
            pType.innerText = "Tin Tức";
          } else if (item.type == "amthuc") {
            pType.innerText = "Ẩm Thực";
          } else if (item.type == "phongcachsong") {
            pType.innerText = "Phong Cách Sống";
          } else if (item.type == "suckhoe") {
            pType.innerText = "Sức Khỏe";
          } else if (item.type == "khampha") {
            pType.innerText = "Khám Phá";
          }
          divType.appendChild(pType);

          const divBody = document.createElement("div");
          divBody.classList.add("blog-item-body");

          const divHeaderBody = document.createElement("div");
          divHeaderBody.classList.add("blog-item-body-header");
          const divHeaderBodyImg = document.createElement("div");
          divHeaderBodyImg.classList.add("blog-item-body-header-img");
          const headerImg = document.createElement("img");
          headerImg.src = "../../assets/image/admin.jpg";
          divHeaderBodyImg.appendChild(headerImg);
          const divHeaderBodyInfo = document.createElement("div");
          divHeaderBodyInfo.classList.add("blog-item-body-header-info");
          const pNameAdmin = document.createElement("p");
          pNameAdmin.innerText = item.author;
          const pDate = document.createElement("p");
          pDate.innerText = item.date;
          divHeaderBodyInfo.appendChild(pNameAdmin);
          divHeaderBodyInfo.appendChild(pDate);
          divHeaderBody.appendChild(divHeaderBodyImg);
          divHeaderBody.appendChild(divHeaderBodyInfo);

          const divContentBody = document.createElement("div");
          divContentBody.classList.add("blog-item-body-content");
          const pContent = document.createElement("p");
          pContent.innerText = item.content[0];
          divContentBody.appendChild(pContent);

          const pName = document.createElement("p");
          pName.innerText = item.title;

          const divControl = document.createElement("div");
          divControl.classList.add("blog-item-body-control");
          const divAddCart = document.createElement("div");
          divAddCart.classList.add("add-cart");
          const pAddCart = document.createElement("p");
          pAddCart.innerText = "Xem Chi Tiết";
          divAddCart.appendChild(pAddCart);

          divControl.appendChild(divAddCart);

          divBody.appendChild(divHeaderBody);
          divBody.appendChild(pName);
          divBody.appendChild(divContentBody);
          divBody.appendChild(divControl);

          divItem.appendChild(divImg);
          divItem.appendChild(divType);
          divItem.appendChild(divBody);

          divItem.addEventListener("click", () => {
            localStorage.setItem("idPost", item.id);
            window.location = "../../pages/detail-post/detail-post.html";
          });

          blogList.append(divItem);
        });
      listPage();
    };
    loadList();
    //phân trang
    function listPage() {
      blogPageCount.innerHTML = "";
      const soTrang = Math.ceil(data.length / limit);

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
            blogList.innerHTML = "";
            loadList();
          });
        }
        divCount.appendChild(pCount);
        blogPageCount.appendChild(divCount);
      }
    }
  });
//tạo bộ filter
listType.map((item, index) => {
  const divItemFilter = document.createElement("div");
  divItemFilter.classList.add("blog-filter-item");

  const pFilter = document.createElement("p");

  if (item == "news") {
    pFilter.innerText = "Tin Tức";
  } else if (item == "amthuc") {
    pFilter.innerText = "Ẩm Thực";
  } else if (item == "phongcachsong") {
    pFilter.innerText = "Phong Cách Sống";
  } else if (item == "suckhoe") {
    pFilter.innerText = "Sức Khỏe";
  } else if (item == "khampha") {
    pFilter.innerText = "Khám Phá";
  } else if (item == "All") {
    pFilter.innerText = "Tất Cả";
  }

  divItemFilter.appendChild(pFilter);

  divItemFilter.addEventListener("click", () => {
    defaultType = item;
    if (defaultType == "All") {
      let pageAll = 1;
      let limitAll = 6;
      fetch("http://localhost:3000/blogs")
        .then((res) => res.json())
        .then((data) => {
          function loadListAll() {
            blogList.innerHTML = "";
            let beginGetAll = limitAll * (pageAll - 1);
            let endGetAll = limitAll * pageAll - 1;
            data
              .filter((item, index) => {
                return item.id >= beginGetAll + 1 && item.id <= endGetAll + 1;
              })
              .map((item, index) => {
                const divItem = document.createElement("div");
                divItem.classList.add("blog-item");

                const divImg = document.createElement("div");
                divImg.classList.add("blog-item-img");
                const imgItem = document.createElement("img");
                imgItem.src = item.image;
                divImg.appendChild(imgItem);

                const divType = document.createElement("div");
                divType.classList.add("blog-item-type");
                const pType = document.createElement("p");
                if (item.type == "news") {
                  pType.innerText = "Tin Tức";
                } else if (item.type == "amthuc") {
                  pType.innerText = "Ẩm Thực";
                } else if (item.type == "phongcachsong") {
                  pType.innerText = "Phong Cách Sống";
                } else if (item.type == "suckhoe") {
                  pType.innerText = "Sức Khỏe";
                } else if (item.type == "khampha") {
                  pType.innerText = "Khám Phá";
                }
                divType.appendChild(pType);

                const divBody = document.createElement("div");
                divBody.classList.add("blog-item-body");

                const divHeaderBody = document.createElement("div");
                divHeaderBody.classList.add("blog-item-body-header");
                const divHeaderBodyImg = document.createElement("div");
                divHeaderBodyImg.classList.add("blog-item-body-header-img");
                const headerImg = document.createElement("img");
                headerImg.src = "../../assets/image/admin.jpg";
                divHeaderBodyImg.appendChild(headerImg);
                const divHeaderBodyInfo = document.createElement("div");
                divHeaderBodyInfo.classList.add("blog-item-body-header-info");
                const pNameAdmin = document.createElement("p");
                pNameAdmin.innerText = item.author;
                const pDate = document.createElement("p");
                pDate.innerText = item.date;
                divHeaderBodyInfo.appendChild(pNameAdmin);
                divHeaderBodyInfo.appendChild(pDate);
                divHeaderBody.appendChild(divHeaderBodyImg);
                divHeaderBody.appendChild(divHeaderBodyInfo);

                const divContentBody = document.createElement("div");
                divContentBody.classList.add("blog-item-body-content");
                const pContent = document.createElement("p");
                pContent.innerText = item.content[0];
                divContentBody.appendChild(pContent);

                const pName = document.createElement("p");
                pName.innerText = item.title;

                const divControl = document.createElement("div");
                divControl.classList.add("blog-item-body-control");
                const divAddCart = document.createElement("div");
                divAddCart.classList.add("add-cart");
                const pAddCart = document.createElement("p");
                pAddCart.innerText = "Xem Chi Tiết";
                divAddCart.appendChild(pAddCart);

                divControl.appendChild(divAddCart);

                divBody.appendChild(divHeaderBody);
                divBody.appendChild(pName);
                divBody.appendChild(divContentBody);

                divBody.appendChild(divControl);

                divItem.appendChild(divImg);
                divItem.appendChild(divType);
                divItem.appendChild(divBody);
                divItem.addEventListener("click", () => {
                  localStorage.setItem("idPost", item.id);
                  window.location = "../../pages/detail-post/detail-post.html";
                });

                blogList.append(divItem);
              });
            listPageAll();
          }
          loadListAll();
          //phân trang
          function listPageAll() {
            blogPageCount.innerHTML = "";
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
                  blogList.innerHTML = "";
                  loadListAll();
                });
              }
              divCount.appendChild(pCount);
              blogPageCount.appendChild(divCount);
            }
          }
        });
    } else {
      fetch("http://localhost:3000/blogs")
        .then((res) => res.json())
        .then((data) => {
          let pageSub = 1;
          let limitSub = 6;
          let beginGet = limitSub * (pageSub - 1);
          let endGet = limitSub * pageSub - 1;
          function loadListSub() {
            blogList.innerHTML = "";
            data
              .filter((item2, index2) => {
                return item2.type == item;
              })
              .map((item3, index3) => {
                const divItem = document.createElement("div");
                divItem.classList.add("blog-item");

                const divImg = document.createElement("div");
                divImg.classList.add("blog-item-img");
                const imgItem = document.createElement("img");
                imgItem.src = item3.image;
                divImg.appendChild(imgItem);

                const divType = document.createElement("div");
                divType.classList.add("blog-item-type");
                const pType = document.createElement("p");
                if (item == "news") {
                  pType.innerText = "Tin Tức";
                } else if (item == "amthuc") {
                  pType.innerText = "Ẩm Thực";
                } else if (item == "phongcachsong") {
                  pType.innerText = "Phong Cách Sống";
                } else if (item == "suckhoe") {
                  pType.innerText = "Sức Khỏe";
                } else if (item == "khampha") {
                  pType.innerText = "Khám Phá";
                }
                divType.appendChild(pType);

                const divBody = document.createElement("div");
                divBody.classList.add("blog-item-body");
                const pName = document.createElement("p");
                pName.innerText = item3.title;

                const divHeaderBody = document.createElement("div");
                divHeaderBody.classList.add("blog-item-body-header");
                const divHeaderBodyImg = document.createElement("div");
                divHeaderBodyImg.classList.add("blog-item-body-header-img");
                const headerImg = document.createElement("img");
                headerImg.src = "../../assets/image/admin.jpg";
                divHeaderBodyImg.appendChild(headerImg);
                const divHeaderBodyInfo = document.createElement("div");
                divHeaderBodyInfo.classList.add("blog-item-body-header-info");
                const pNameAdmin = document.createElement("p");
                pNameAdmin.innerText = item3.author;
                const pDate = document.createElement("p");
                pDate.innerText = item3.date;
                divHeaderBodyInfo.appendChild(pNameAdmin);
                divHeaderBodyInfo.appendChild(pDate);
                divHeaderBody.appendChild(divHeaderBodyImg);
                divHeaderBody.appendChild(divHeaderBodyInfo);

                const divContentBody = document.createElement("div");
                divContentBody.classList.add("blog-item-body-content");
                const pContent = document.createElement("p");
                pContent.innerText = item3.content[0];
                divContentBody.appendChild(pContent);

                const divControl = document.createElement("div");
                divControl.classList.add("blog-item-body-control");
                const divAddCart = document.createElement("div");
                divAddCart.classList.add("add-cart");
                const pAddCart = document.createElement("p");
                pAddCart.innerText = "Xem Chi Tiết";
                divAddCart.appendChild(pAddCart);

                divControl.appendChild(divAddCart);

                divBody.appendChild(divHeaderBody);
                divBody.appendChild(pName);
                divBody.appendChild(divContentBody);

                divBody.appendChild(divControl);

                divItem.appendChild(divImg);
                divItem.appendChild(divType);
                divItem.appendChild(divBody);
                divItem.addEventListener("click", () => {
                  localStorage.setItem("idPost", item3.id);
                  window.location = "../../pages/detail-post/detail-post.html";
                });

                blogList.append(divItem);
              });
            listPageSub();
          }
          loadListSub();
          //phân trang
          function listPageSub() {
            blogPageCount.innerHTML = "";
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
                  blogList.innerHTML = "";
                  loadListSub();
                });
              }
              divCount.appendChild(pCount);
              blogPageCount.appendChild(divCount);
            }
          }
        });
    }
  });

  blogFilter.appendChild(divItemFilter);
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
