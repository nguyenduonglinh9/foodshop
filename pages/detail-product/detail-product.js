const inforImg = document.querySelector(".infor-img");
const inforOther = document.querySelector(".infor-other");
const descArea = document.querySelector(".desc-area");
const desc = document.querySelector(".desc");
const review = document.querySelector(".review");
const descControl = document.querySelector(".desc-control");
const btnToTop = document.querySelector(".btnToTop");
let onOff = true;

btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
const idGet = localStorage.getItem("idProduct");

fetch(`http://localhost:3000/products/${idGet}`)
  .then((res) => res.json())
  .then((data) => {
    const divImgTop = document.createElement("div");
    divImgTop.classList.add("img-top");
    const imgTop = document.createElement("img");
    imgTop.src = data.images[0];
    divImgTop.appendChild(imgTop);

    const divImgSlide = document.createElement("div");
    divImgSlide.classList.add("img-slide");

    data.images.map((image) => {
      const divImgItem = document.createElement("div");
      divImgItem.classList.add("img-item");

      const imgItem = document.createElement("img");
      imgItem.src = image;

      divImgItem.appendChild(imgItem);
      divImgItem.addEventListener("click", () => {
        imgTop.src = image;
        Array.from(divImgSlide.children).map((i) => {
          if (
            i.children[0].getAttribute("src") ==
            divImgTop.children[0].getAttribute("src")
          ) {
            i.classList.add("active-slide-item");
          } else {
            i.classList.remove("active-slide-item");
          }
        });
      });
      divImgSlide.appendChild(divImgItem);
      divImgSlide.children[0].classList.add("active-slide-item");
    });
    inforImg.appendChild(divImgTop);
    inforImg.appendChild(divImgSlide);
  });

fetch(`http://localhost:3000/products/${idGet}`)
  .then((res) => res.json())
  .then((data) => {
    let defaultSie = data.price.small;
    const pName = document.createElement("h2");
    pName.innerText = data.name;

    const pPrice = document.createElement("p");
    pPrice.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(data.price.small);

    const divStar = document.createElement("div");
    divStar.classList.add("star");
    for (let i = 0; i < data.star; i++) {
      divStar.innerHTML +=
        '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
    }

    const pDesc = document.createElement("p");
    pDesc.innerText = data.desc;

    const divSelectsize = document.createElement("div");
    divSelectsize.classList.add("select-size");
    const pLabel = document.createElement("p");
    pLabel.innerText = "Chọn Kích Cỡ";
    const divRadioGroup = document.createElement("div");
    divRadioGroup.classList.add("group-input");

    Object.entries(data.price).map((item) => {
      const divRadioItem = document.createElement("div");
      divRadioItem.classList.add("item-input");
      const label = document.createElement("label");
      label.innerText = item[0];
      const inputRadio = document.createElement("input");
      inputRadio.type = "radio";
      inputRadio.value = item[1];
      const pGia = document.createElement("p");
      pGia.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item[1]);
      divRadioItem.appendChild(label);
      divRadioItem.appendChild(inputRadio);
      divRadioItem.appendChild(pGia);
      divRadioGroup.appendChild(divRadioItem);

      inputRadio.addEventListener("change", () => {
        defaultSie = inputRadio.value;
        inforOther.children[6].children[1].children[3].innerText =
          Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(defaultSie);
        pPrice.innerText = Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(defaultSie);
        Array.from(inforOther.children[4].children[1].children).map((item) => {
          if (item.children[1].value == defaultSie) {
            item.children[1].checked = true;
          } else {
            item.children[1].checked = false;
          }
        });
      });
    });

    divSelectsize.appendChild(pLabel);
    divSelectsize.appendChild(divRadioGroup);

    const selectOption = document.createElement("div");
    selectOption.classList.add("select-option");
    const pLabelOption = document.createElement("p");
    pLabelOption.innerText = "Chọn Thêm";
    const divCheckGroup = document.createElement("div");
    divCheckGroup.classList.add("group-input-option");
    const listOption = [
      ["Coca-Cola", 30000],
      ["7up", 30000],
    ];
    const pTotal = document.createElement("p");
    for (let i = 0; i < listOption.length; i++) {
      const divCheckItem = document.createElement("div");
      divCheckItem.classList.add("item-input-option");
      const label = document.createElement("label");
      label.innerText = listOption[i][0];
      const inputCheck = document.createElement("input");
      inputCheck.type = "checkbox";
      inputCheck.value = listOption[i][1];
      // inputCheck.addEventListener("change", (e) => {
      //   Number(pTotal.innerText.substring(0, pTotal.innerText.length - 1)) *
      //     1000;

      //   if (e.currentTarget.checked) {
      //     pTotal.innerText = Intl.NumberFormat("vi-VN", {
      //       style: "currency",
      //       currency: "VND",
      //     }).format(
      //       Number(pTotal.innerText.substring(0, pTotal.innerText.length - 1)) *
      //         1000 +
      //         listOption[i][1]
      //     );
      //   } else {
      //     pTotal.innerText = Intl.NumberFormat("vi-VN", {
      //       style: "currency",
      //       currency: "VND",
      //     }).format(
      //       Number(pTotal.innerText.substring(0, pTotal.innerText.length - 1)) *
      //         1000 -
      //         listOption[i][1]
      //     );
      //   }
      // });
      const pGia = document.createElement("p");
      pGia.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(0);
      divCheckItem.appendChild(label);
      divCheckItem.appendChild(inputCheck);
      divCheckItem.appendChild(pGia);
      divCheckGroup.appendChild(divCheckItem);
    }
    selectOption.appendChild(pLabelOption);
    selectOption.appendChild(divCheckGroup);

    const selectQuantity = document.createElement("div");
    selectQuantity.classList.add("select-quantity");
    const pLabelQuantity = document.createElement("p");
    pLabelQuantity.innerText = "Chọn Số Lượng";
    const divControlQuantity = document.createElement("div");
    divControlQuantity.classList.add("control-quantity");
    const divButtonMinus = document.createElement("div");
    divButtonMinus.classList.add("button-quantity");
    divButtonMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';

    let count = 1;
    let total = defaultSie * count;

    divButtonMinus.addEventListener("click", () => {
      count = count - 1;
      if (count < 1) {
        count = 1;
        pCountQuantity.innerText = count;
      } else {
        pCountQuantity.innerText = count;
        console.log(defaultSie * count);
        pTotal.innerText = Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(defaultSie * count);
      }
    });

    const divButtonPlus = document.createElement("div");
    divButtonPlus.classList.add("button-quantity");
    divButtonPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
    divButtonPlus.addEventListener("click", () => {
      count = count + 1;
      pCountQuantity.innerText = count;
      pTotal.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(defaultSie * count);
    });
    const divCountQuantity = document.createElement("div");
    divCountQuantity.classList.add("count-quantity");
    const pCountQuantity = document.createElement("p");

    pCountQuantity.innerText = count;

    pTotal.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(total);
    divCountQuantity.appendChild(pCountQuantity);
    divControlQuantity.appendChild(divButtonMinus);
    divControlQuantity.appendChild(divCountQuantity);
    divControlQuantity.appendChild(divButtonPlus);
    divControlQuantity.appendChild(pTotal);
    selectQuantity.appendChild(pLabelQuantity);
    selectQuantity.appendChild(divControlQuantity);

    const divButtonFooter = document.createElement("div");
    divButtonFooter.classList.add("button-footer");

    const buttonList = ["Thêm Vào Giỏ Hàng", "Thêm Vào Yêu Thích"];
    buttonList.map((button) => {
      const divButtonItem = document.createElement("div");
      divButtonItem.classList.add("button-footer-item");

      const p = document.createElement("p");
      p.innerText = button;

      divButtonItem.appendChild(p);
      divButtonFooter.appendChild(divButtonItem);
      if (divButtonItem.children[0].innerText == "Thêm Vào Giỏ Hàng") {
        divButtonItem.addEventListener("click", () => {
          const size = Array.from(divSelectsize.children[1].children).find(
            (item) => item.children[1].checked == true
          ).children[0].innerText;
          const others = Array.from(selectOption.children[1].children)
            .filter((item) => item.children[1].checked == true)
            .map((item) => item.children[0].innerText);
          // console.log(others);
          const cart = {
            image: data.images[0],
            price:
              Number(
                pPrice.innerText
                  .substring(0, pPrice.innerText.length - 1)
                  .trim()
              ) * 1000,
            detail: { id: data.id, size: size, others: others },
            quantity: pCountQuantity.innerText,
            total:
              Number(
                pTotal.innerText
                  .substring(0, pTotal.innerText.length - 1)
                  .trim()
              ) * 1000,
          };

          if (document.cookie == "isLoggin=false") {
            let checkCart = localStorage.getItem("carts");
            const carts = [];
            carts.push(cart);
            if (checkCart == null) {
              localStorage.setItem("carts", JSON.stringify(carts));
            } else {
              let carts = JSON.parse(localStorage.getItem("carts"));
              if (
                carts.find(
                  (item) =>
                    item.detail.id == cart.detail.id &&
                    item.detail.size == cart.detail.size
                ) == undefined
              ) {
                carts.push(cart);
                localStorage.setItem("carts", JSON.stringify(carts));
              } else {
                carts.find(
                  (item) =>
                    item.detail.id == cart.detail.id &&
                    item.detail.size == cart.detail.size
                ).quantity =
                  Number(
                    carts.find(
                      (item) =>
                        item.detail.id == cart.detail.id &&
                        item.detail.size == cart.detail.size
                    ).quantity
                  ) + Number(cart.quantity);
                carts.find(
                  (item) =>
                    item.detail.id == cart.detail.id &&
                    item.detail.size == cart.detail.size
                ).total =
                  Number(
                    carts.find(
                      (item) =>
                        item.detail.id == cart.detail.id &&
                        item.detail.size == cart.detail.size
                    ).total
                  ) + Number(cart.total);
                localStorage.setItem("carts", JSON.stringify(carts));
              }
            }
          } else if (document.cookie == "isLoggin=true") {
            const carts = [];
            carts.push(cart);
            const infoAccount = JSON.parse(
              localStorage.getItem("inforAccount")
            );
            if (infoAccount[0].carts.length == 0) {
              infoAccount[0].carts = [...carts];
              localStorage.setItem("inforAccount", JSON.stringify(infoAccount));
            } else {
              if (
                infoAccount[0].carts.find(
                  (item) =>
                    item.detail.id == cart.detail.id &&
                    item.detail.size == cart.detail.size
                ) == undefined
              ) {
                infoAccount[0].carts.push(cart);
                localStorage.setItem(
                  "inforAccount",
                  JSON.stringify(infoAccount)
                );
              } else {
                infoAccount[0].carts.find(
                  (item) =>
                    item.detail.id == cart.detail.id &&
                    item.detail.size == cart.detail.size
                ).quantity =
                  Number(
                    infoAccount[0].carts.find(
                      (item) =>
                        item.detail.id == cart.detail.id &&
                        item.detail.size == cart.detail.size
                    ).quantity
                  ) + Number(cart.quantity);
                infoAccount[0].carts.find(
                  (item) =>
                    item.detail.id == cart.detail.id &&
                    item.detail.size == cart.detail.size
                ).total =
                  Number(
                    infoAccount[0].carts.find(
                      (item) =>
                        item.detail.id == cart.detail.id &&
                        item.detail.size == cart.detail.size
                    ).total
                  ) + Number(cart.total);
                localStorage.setItem(
                  "inforAccount",
                  JSON.stringify(infoAccount)
                );
              }
            }
          }

          const popup = document.querySelector(".popup");
          popup.innerHTML = "";
          const popupContainer = document.querySelector(".popup-container");
          popupContainer.classList.add("active-popup");
          const h3 = document.createElement("h3");
          h3.innerText = "Bạn Đã Thêm Vào Giỏ Hàng";
          const divControl = document.createElement("div");
          divControl.classList.add("control");
          const inputCancel = document.createElement("input");
          inputCancel.type = "button";
          inputCancel.value = "Tiếp Tục Mua Sắm";
          inputCancel.addEventListener("click", () => {
            popupContainer.classList.remove("active-popup");
          });
          const inputOk = document.createElement("input");
          inputOk.type = "button";
          inputOk.value = "Thanh Toán";
          inputOk.addEventListener("click", () => {
            location.href = "../../pages/cart-view/cart-view.html";
          });
          divControl.appendChild(inputCancel);
          divControl.appendChild(inputOk);

          popup.appendChild(h3);
          popup.appendChild(divControl);
        });
      }
    });

    inforOther.appendChild(pName);
    inforOther.appendChild(pPrice);
    inforOther.appendChild(divStar);
    inforOther.appendChild(pDesc);
    inforOther.appendChild(divSelectsize);
    inforOther.appendChild(selectOption);
    inforOther.appendChild(selectQuantity);
    inforOther.appendChild(divButtonFooter);

    Array.from(inforOther.children[4].children[1].children).map((item) => {
      if (item.children[1].value == defaultSie) {
        item.children[1].checked = true;
      }
    });
  });

function test() {
  if (onOff == true) {
    descArea.children[0].children[0].classList.add("active-desc");
    descArea.children[0].children[1].classList.remove("active-desc");
    desc.classList.add("active-review");
    review.classList.remove("active-review");
  } else {
    descArea.children[0].children[0].classList.remove("active-desc");
    descArea.children[0].children[1].classList.add("active-desc");
    desc.classList.remove("active-review");
    review.classList.add("active-review");
  }
}
test();
descControl.children[0].addEventListener("click", () => {
  onOff = true;
  test();
});
descControl.children[1].addEventListener("click", () => {
  onOff = false;
  test();
});
// mô tả
fetch(`http://localhost:3000/products/${idGet}`)
  .then((res) => res.json())
  .then((data) => {
    const pDesc = document.createElement("p");
    pDesc.innerText = data.desc;
    desc.appendChild(pDesc);
  });
//bình luận
fetch(`http://localhost:3000/products/${idGet}`)
  .then((res) => res.json())
  .then((data) => {
    const pCountReview = document.createElement("p");
    pCountReview.innerText = data.review.length + "Bình luận";
    review.appendChild(pCountReview);

    data.review.map((item, index) => {
      const divItemReview = document.createElement("div");
      divItemReview.classList.add("review-item");

      const divImg = document.createElement("div");
      divImg.classList.add("review-item-img");
      const imgItem = document.createElement("img");
      imgItem.src = "../../assets/image/admin.jpg";
      divImg.appendChild(imgItem);

      const divReviewContent = document.createElement("div");
      divReviewContent.classList.add("review-item-content");
      const pName = document.createElement("p");
      pName.innerText = item.name;
      const pDate = document.createElement("p");
      pDate.innerText = item.date;
      const divStar = document.createElement("div");
      divStar.classList.add("star");
      for (let i = 0; i < item.star; i++) {
        divStar.innerHTML +=
          '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
      }
      const pReview = document.createElement("p");
      pReview.innerText = item.content;

      divReviewContent.appendChild(pName);
      divReviewContent.appendChild(pDate);
      divReviewContent.appendChild(divStar);
      divReviewContent.appendChild(pReview);

      divItemReview.appendChild(divImg);
      divItemReview.appendChild(divReviewContent);

      review.appendChild(divItemReview);
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
