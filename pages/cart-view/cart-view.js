const listCart = document.querySelector("#list-cart");
const totalArea = document.querySelector(".total-area");
const btnToTop = document.querySelector(".btnToTop");

const iconCartView = document.querySelector("#icon-cart-view");

iconCartView.addEventListener("click", () => {
  location.href = "../../pages/cart-view/cart-view.html";
});

function listCarts() {
  if (document.cookie == "isLoggin=false") {
    const carts = JSON.parse(localStorage.getItem("carts"));
    carts.map((cart, index) => {
      const tr = document.createElement("tr");

      const tdImg = document.createElement("td");
      const img = document.createElement("img");
      img.src = cart.image;
      tdImg.appendChild(img);

      const tdDetail = document.createElement("td");
      const pName = document.createElement("p");
      fetch(`http://localhost:3000/products/${cart.detail.id}`)
        .then((res) => res.json())
        .then((data) => {
          pName.innerText = data.name;
        });
      const pSize = document.createElement("p");
      tdDetail.appendChild(pName);
      tdDetail.appendChild(pSize);
      pSize.innerText = cart.detail.size;
      if (cart.detail.others.length != 0) {
        cart.detail.others.map((item) => {
          const pOther = document.createElement("p");
          pOther.innerText = item;
          tdDetail.appendChild(pOther);
        });
      }

      const tdPrice = document.createElement("td");
      const pPrice = document.createElement("p");
      pPrice.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(cart.price);
      tdPrice.appendChild(pPrice);

      const tdQuantity = document.createElement("td");
      const divControlQuantity = document.createElement("div");
      divControlQuantity.classList.add("control-quantity");
      const divMinus = document.createElement("div");
      divMinus.classList.add("minus");
      divMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';

      const divPlus = document.createElement("div");
      divPlus.classList.add("plus");
      divPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
      const pQuantity = document.createElement("p");
      pQuantity.innerText = cart.quantity;
      divMinus.addEventListener("click", () => {
        if (
          Number(pQuantity.innerText) == 1 ||
          Number(pQuantity.innerText) < 1
        ) {
          pQuantity.innerText = 1;
          const newTotal = cart.price * Number(pQuantity.innerText);
          pTotal.innerText = Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(newTotal);
          tdTotal.appendChild(newTotal);
          // totalArea.innerHTML = ''
          // totalCarts();
        } else {
          pQuantity.innerText = Number(pQuantity.innerText) - 1;
          const newTotal = cart.price * Number(pQuantity.innerText);
          pTotal.innerText = Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(newTotal);
          tdTotal.appendChild(pTotal);
          totalArea.innerHTML = "";
          totalCarts();
        }
      });
      divPlus.addEventListener("click", () => {
        pQuantity.innerText = Number(pQuantity.innerText) + 1;
        const newTotal = cart.price * Number(pQuantity.innerText);
        pTotal.innerText = Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(newTotal);
        tdTotal.appendChild(pTotal);
        totalArea.innerHTML = "";
        totalCarts();
      });
      divControlQuantity.appendChild(divMinus);
      divControlQuantity.appendChild(pQuantity);
      divControlQuantity.appendChild(divPlus);
      tdQuantity.appendChild(divControlQuantity);

      const tdTotal = document.createElement("td");
      const pTotal = document.createElement("p");
      pTotal.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(cart.total);
      tdTotal.appendChild(pTotal);

      const tdDelete = document.createElement("td");
      const divDelete = document.createElement("div");
      divDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
      divDelete.addEventListener("click", () => {
        carts.splice(index, 1);
        localStorage.setItem("carts", JSON.stringify(carts));
        listCart.innerHTML = "";
        listCarts();
        totalArea.innerHTML = "";
        totalCarts();
      });
      tdDelete.appendChild(divDelete);

      tr.appendChild(tdImg);
      tr.appendChild(tdDetail);
      tr.appendChild(tdPrice);
      tr.appendChild(tdQuantity);
      tr.appendChild(tdTotal);
      tr.appendChild(tdDelete);

      listCart.appendChild(tr);
    });
  } else if (document.cookie == "isLoggin=true") {
    const carts = JSON.parse(localStorage.getItem("inforAccount"));
    carts[0].carts.map((cart, index) => {
      const tr = document.createElement("tr");

      const tdImg = document.createElement("td");
      const img = document.createElement("img");
      img.src = cart.image;
      tdImg.appendChild(img);

      const tdDetail = document.createElement("td");
      const pName = document.createElement("p");
      fetch(`http://localhost:3000/products/${cart.detail.id}`)
        .then((res) => res.json())
        .then((data) => {
          pName.innerText = data.name;
        });
      const pSize = document.createElement("p");
      tdDetail.appendChild(pName);
      tdDetail.appendChild(pSize);
      pSize.innerText = cart.detail.size;
      if (cart.detail.others.length != 0) {
        cart.detail.others.map((item) => {
          const pOther = document.createElement("p");
          pOther.innerText = item;
          tdDetail.appendChild(pOther);
        });
      }

      const tdPrice = document.createElement("td");
      const pPrice = document.createElement("p");
      pPrice.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(cart.price);
      tdPrice.appendChild(pPrice);

      const tdQuantity = document.createElement("td");
      const divControlQuantity = document.createElement("div");
      divControlQuantity.classList.add("control-quantity");
      const divMinus = document.createElement("div");
      divMinus.classList.add("minus");
      divMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';

      const divPlus = document.createElement("div");
      divPlus.classList.add("plus");
      divPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
      const pQuantity = document.createElement("p");
      pQuantity.innerText = cart.quantity;
      divMinus.addEventListener("click", () => {
        if (
          Number(pQuantity.innerText) == 1 ||
          Number(pQuantity.innerText) < 1
        ) {
          pQuantity.innerText = 1;
          const newTotal = cart.price * Number(pQuantity.innerText);
          pTotal.innerText = Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(newTotal);
          tdTotal.appendChild(newTotal);
          // totalArea.innerHTML = ''
          // totalCarts();
        } else {
          pQuantity.innerText = Number(pQuantity.innerText) - 1;
          const newTotal = cart.price * Number(pQuantity.innerText);
          pTotal.innerText = Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(newTotal);
          tdTotal.appendChild(pTotal);
          totalArea.innerHTML = "";
          totalCarts();
        }
      });
      divPlus.addEventListener("click", () => {
        pQuantity.innerText = Number(pQuantity.innerText) + 1;
        const newTotal = cart.price * Number(pQuantity.innerText);
        pTotal.innerText = Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(newTotal);
        tdTotal.appendChild(pTotal);
        totalArea.innerHTML = "";
        totalCarts();
      });
      divControlQuantity.appendChild(divMinus);
      divControlQuantity.appendChild(pQuantity);
      divControlQuantity.appendChild(divPlus);
      tdQuantity.appendChild(divControlQuantity);

      const tdTotal = document.createElement("td");
      const pTotal = document.createElement("p");
      pTotal.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(cart.total);
      tdTotal.appendChild(pTotal);

      const tdDelete = document.createElement("td");
      const divDelete = document.createElement("div");
      divDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
      divDelete.addEventListener("click", () => {
        carts[0].carts.splice(index, 1);
        localStorage.setItem("inforAccount", JSON.stringify(carts));
        listCart.innerHTML = "";
        listCarts();
        totalArea.innerHTML = "";
        totalCarts();
      });
      tdDelete.appendChild(divDelete);

      tr.appendChild(tdImg);
      tr.appendChild(tdDetail);
      tr.appendChild(tdPrice);
      tr.appendChild(tdQuantity);
      tr.appendChild(tdTotal);
      tr.appendChild(tdDelete);

      listCart.appendChild(tr);
    });
  }
}
listCarts();

function totalCarts() {
  if (document.cookie == "isLoggin=true") {
    const carts = JSON.parse(localStorage.getItem("inforAccount"));
    const h6 = document.createElement("h6");
    h6.innerText = `Tổng Đơn Hàng (${carts[0].carts.length})`;
    totalArea.appendChild(h6);
    const hr1 = document.createElement("hr");
    totalArea.appendChild(hr1);

    const divTotal = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = "Tổng Giá Đơn Hàng : ";
    const spanTotal = document.createElement("span");
    let total = 0;
    Array.from(listCart.children).map((item) => {
      total =
        total +
        Number(
          item.children[4].innerText.substring(
            0,
            item.children[4].innerText.length - 1
          )
        ) *
          1000;
      spanTotal.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(total);
    });
    divTotal.appendChild(p);
    divTotal.appendChild(spanTotal);
    totalArea.appendChild(divTotal);

    const divDelivery = document.createElement("div");
    const pDelivery = document.createElement("p");
    pDelivery.innerText = "Phí Vận Chuyển : ";
    const spanDelivery = document.createElement("span");
    spanDelivery.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(30000);
    divDelivery.appendChild(pDelivery);
    divDelivery.appendChild(spanDelivery);
    totalArea.appendChild(divDelivery);

    const divDiscount = document.createElement("div");
    const pDiscount = document.createElement("p");
    pDiscount.innerText = "Giảm Giá : ";
    const spanDiscount = document.createElement("span");
    spanDiscount.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(0);
    const hr = document.createElement("hr");
    divDiscount.appendChild(pDiscount);
    divDiscount.appendChild(spanDiscount);
    totalArea.appendChild(divDiscount);
    totalArea.appendChild(hr);

    const divMainTotal = document.createElement("div");
    const pMainTotal = document.createElement("p");
    pMainTotal.innerText = "Tổng Cộng : ";
    const spanMainTotal = document.createElement("span");
    spanMainTotal.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(total + 30000);
    divMainTotal.appendChild(pMainTotal);
    divMainTotal.appendChild(spanMainTotal);
    totalArea.appendChild(divMainTotal);

    const formCoupon = document.createElement("form");
    const inputCoupon = document.createElement("input");
    inputCoupon.type = "text";
    inputCoupon.placeholder = "Nhập mã giảm giá";
    const buttonCoupon = document.createElement("button");
    buttonCoupon.type = "submit";
    buttonCoupon.innerText = "Áp Dụng";
    formCoupon.appendChild(inputCoupon);
    formCoupon.appendChild(buttonCoupon);
    totalArea.appendChild(formCoupon);

    const buttonNext = document.createElement("button");
    buttonNext.innerText = "Tiếp Tục";
    buttonNext.addEventListener("click", () => {
      if (document.cookie == "isLoggin=false") {
        const popup = document.querySelector(".popup");
        popup.innerHTML = "";
        const popupContainer = document.querySelector(".popup-container");
        popupContainer.classList.add("active-popup");
        const h3 = document.createElement("h3");
        h3.innerText = "Bạn Chưa Đăng Nhập";
        const divControl = document.createElement("div");
        divControl.classList.add("control");
        const inputCancel = document.createElement("input");
        inputCancel.type = "button";
        inputCancel.value = "Đăng Nhập";
        inputCancel.addEventListener("click", () => {
          popupContainer.classList.remove("active-popup");
        });
        const inputOk = document.createElement("input");
        inputOk.type = "button";
        inputOk.value = "Thanh Toán Không Cần Đăng Nhập";
        inputOk.addEventListener("click", () => {
          location.href = "../../pages/pay-view/pay-view.html";
        });
        divControl.appendChild(inputCancel);
        divControl.appendChild(inputOk);

        popup.appendChild(h3);
        popup.appendChild(divControl);
      } else if (document.cookie == "isLoggin=true") {
        location.href = "../../pages/pay-view-loged/pay-view-loged.html";
      }
    });
    totalArea.appendChild(buttonNext);
  } else if (document.cookie == "isLoggin=false") {
    const carts = JSON.parse(localStorage.getItem("carts"));
    const h6 = document.createElement("h6");
    h6.innerText = `Tổng Đơn Hàng (${carts.length})`;
    totalArea.appendChild(h6);
    const hr1 = document.createElement("hr");
    totalArea.appendChild(hr1);

    const divTotal = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = "Tổng Giá Đơn Hàng : ";
    const spanTotal = document.createElement("span");
    let total = 0;
    Array.from(listCart.children).map((item) => {
      total =
        total +
        Number(
          item.children[4].innerText.substring(
            0,
            item.children[4].innerText.length - 1
          )
        ) *
          1000;
      spanTotal.innerText = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(total);
    });
    divTotal.appendChild(p);
    divTotal.appendChild(spanTotal);
    totalArea.appendChild(divTotal);

    const divDelivery = document.createElement("div");
    const pDelivery = document.createElement("p");
    pDelivery.innerText = "Phí Vận Chuyển : ";
    const spanDelivery = document.createElement("span");
    spanDelivery.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(30000);
    divDelivery.appendChild(pDelivery);
    divDelivery.appendChild(spanDelivery);
    totalArea.appendChild(divDelivery);

    const divDiscount = document.createElement("div");
    const pDiscount = document.createElement("p");
    pDiscount.innerText = "Giảm Giá : ";
    const spanDiscount = document.createElement("span");
    spanDiscount.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(0);
    const hr = document.createElement("hr");
    divDiscount.appendChild(pDiscount);
    divDiscount.appendChild(spanDiscount);
    totalArea.appendChild(divDiscount);
    totalArea.appendChild(hr);

    const divMainTotal = document.createElement("div");
    const pMainTotal = document.createElement("p");
    pMainTotal.innerText = "Tổng Cộng : ";
    const spanMainTotal = document.createElement("span");
    spanMainTotal.innerText = Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(total + 30000);
    divMainTotal.appendChild(pMainTotal);
    divMainTotal.appendChild(spanMainTotal);
    totalArea.appendChild(divMainTotal);

    const formCoupon = document.createElement("form");
    const inputCoupon = document.createElement("input");
    inputCoupon.type = "text";
    inputCoupon.placeholder = "Nhập mã giảm giá";
    const buttonCoupon = document.createElement("button");
    buttonCoupon.type = "submit";
    buttonCoupon.innerText = "Áp Dụng";
    formCoupon.appendChild(inputCoupon);
    formCoupon.appendChild(buttonCoupon);
    totalArea.appendChild(formCoupon);

    const buttonNext = document.createElement("button");
    buttonNext.innerText = "Tiếp Tục";

    if (document.cookie == "isLoggin=false") {
      buttonNext.addEventListener("click", () => {
        const popup = document.querySelector(".popup");
        popup.innerHTML = "";
        const popupContainer = document.querySelector(".popup-container");
        popupContainer.classList.add("active-popup");
        const h3 = document.createElement("h3");
        h3.innerText = "Bạn Chưa Đăng Nhập";
        const divControl = document.createElement("div");
        divControl.classList.add("control");
        const inputCancel = document.createElement("input");
        inputCancel.type = "button";
        inputCancel.value = "Đăng Nhập";
        inputCancel.addEventListener("click", () => {
          popupContainer.classList.remove("active-popup");
        });
        const inputOk = document.createElement("input");
        inputOk.type = "button";
        inputOk.value = "Thanh Toán Không Cần Đăng Nhập";
        inputOk.addEventListener("click", () => {
          location.href = "../../pages/pay-view/pay-view.html";
        });
        divControl.appendChild(inputCancel);
        divControl.appendChild(inputOk);
        popup.appendChild(h3);
        popup.appendChild(divControl);
      });
    } else if (document.cookie == "isLoggin=true") {
      location.href = "../../pages/pay-view-loged/pay-view-loged.html";
    }

    totalArea.appendChild(buttonNext);
  }
}
totalCarts();
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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
