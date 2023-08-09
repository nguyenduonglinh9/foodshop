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

let defaultAddress = 0;
function loadAdrress() {
  const addressBody = document.querySelector(".address-body");
  const inforAccount = JSON.parse(localStorage.getItem("inforAccount"));

  inforAccount[0].address.map((item, index) => {
    const divAddress = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerText = `Địa Chỉ ${index + 1}`;
    const pAddress = document.createElement("p");
    pAddress.innerText = item;
    divAddress.appendChild(h3);
    divAddress.appendChild(pAddress);
    divAddress.addEventListener("click", () => {
      defaultAddress = index;
      handleAddress();
    });
    addressBody.appendChild(divAddress);
    handleAddress();
  });
}
loadAdrress();

function handleAddress() {
  const addressBody = document.querySelector(".address-body");
  Array.from(addressBody.children).map((item, index) => {
    if (index == defaultAddress) {
      item.classList.add("active-address");
    } else {
      item.classList.remove("active-address");
    }
  });
}

function loadInfor() {
  const inforBody = document.querySelector(".infor-body");
  const inforAccount = JSON.parse(localStorage.getItem("inforAccount"));

  const divName = document.createElement("div");
  const spanName = document.createElement("span");
  spanName.innerText = "Họ Và Tên : ";
  const pName = document.createElement("p");
  pName.innerText = inforAccount[0].name;
  divName.appendChild(spanName);
  divName.appendChild(pName);

  const divEmail = document.createElement("div");
  const spanEmail = document.createElement("span");
  spanEmail.innerText = "Email : ";
  const pEmail = document.createElement("p");
  pEmail.innerText = inforAccount[0].email;
  divEmail.appendChild(spanEmail);
  divEmail.appendChild(pEmail);

  const divPhone = document.createElement("div");
  const spanPhone = document.createElement("span");
  spanPhone.innerText = "Số Điện Thoại : ";
  const pPhone = document.createElement("p");
  pPhone.innerText = inforAccount[0].phone;
  divPhone.appendChild(spanPhone);
  divPhone.appendChild(pPhone);

  inforBody.append(divName);
  inforBody.append(divEmail);
  inforBody.append(divPhone);
}
loadInfor();

function editInfor() {
  const editbtn = document.querySelector("#edit-infor");
  const inforBody = document.querySelector(".infor-body");
  editbtn.addEventListener("click", () => {
    if (editbtn.value == "Chỉnh Sửa") {
      Array.from(inforBody.children).map((item, index) => {
        item.lastChild.setAttribute("contenteditable", "true");
        item.lastChild.style.border = "1px solid red";
        item.lastChild.style.padding = "5px";
        item.lastChild.style.borderRadius = "5px";
        editbtn.setAttribute("value", "Hoàn Thành");
      });
    } else if (editbtn.value == "Hoàn Thành") {
      Array.from(inforBody.children).map((item, index) => {
        item.lastChild.setAttribute("contenteditable", "false");
        item.lastChild.style.border = "none";
        item.lastChild.style.padding = "0px";
        item.lastChild.style.borderRadius = "none";
        editbtn.setAttribute("value", "Chỉnh Sửa");
      });
    }
  });
}
editInfor();

function addAddress() {
  const addbtn = document.querySelector("#add-address");
  const listCity = document.querySelector(".list-city");
  const listDis = document.querySelector(".list-dis");
  const listWards = document.querySelector(".list-wards");
  const inputGroup = document.querySelector(".input-group");
  let defaultCity = null;
  let defaultDis = null;
  addbtn.addEventListener("click", () => {
    const popup = document.querySelector(".popup-container");
    popup.style.display = "flex";
  });
  //xử lý list thành phố
  const inputCity = document.querySelector("#input-city");
  inputCity.addEventListener("focus", (e) => {
    listCity.style.display = "block";
    listDis.style.display = "none";
    listWards.style.display = "none";

    fetch(`https://provinces.open-api.vn/api/?depth=3`).then((res) =>
      res.json().then((data) => {
        console.log(data);
        listCity.children[0].innerHTML = "";
        data.map((item, index) => {
          const li = document.createElement("li");
          li.innerText = item.name;
          li.addEventListener("click", () => {
            inputCity.value = item.name;
            listCity.style.display = "none";
            defaultCity = item.name;
            handleBtn();
          });
          listCity.children[0].appendChild(li);
        });
      })
    );
  });
  //xử lý list huyện
  const inputDis = document.querySelector("#input-dis");
  inputDis.addEventListener("focus", () => {
    listDis.style.display = "block";
    listWards.style.display = "none";
    listDis.children[0].innerHTML = "";
    handleBtn();
    handleDis();
  });
  function handleDis() {
    if (defaultCity != null) {
      fetch(`https://provinces.open-api.vn/api/?depth=3`)
        .then((res) => res.json())
        .then((data) => {
          data
            .find((item, index) => {
              return item.name == defaultCity;
            })
            .districts.map((item2, index2) => {
              const li = document.createElement("li");
              li.innerText = item2.name;
              li.addEventListener("click", () => {
                inputDis.value = item2.name;
                listDis.style.display = "none";
                defaultDis = item2.name;
              });
              listDis.children[0].appendChild(li);
            });
        });
    } else {
      const li = document.createElement("li");
      li.innerText = "--- Vui Lòng Chọn Thành Phố ---";
      listDis.children[0].appendChild(li);
    }
  }
  //xử lý xã,phường
  const inputWards = document.querySelector("#input-wards");
  inputWards.addEventListener("focus", () => {
    listWards.style.display = "block";
    listWards.children[0].innerHTML = "";
    handleWards();
    handleBtn();
  });

  function handleWards() {
    if (defaultDis != null) {
      fetch(`https://provinces.open-api.vn/api/?depth=3`)
        .then((res) => res.json())
        .then((data) => {
          data
            .find((item, index) => {
              return item.name == defaultCity;
            })
            .districts.find((item2, index2) => {
              return item2.name == defaultDis;
            })
            .wards.map((item3, index3) => {
              const li = document.createElement("li");
              li.innerText = item3.name;
              li.addEventListener("click", () => {
                inputWards.value = item3.name;
                listWards.style.display = "none";
                // defaultDis = item2.name;
              });
              listWards.children[0].appendChild(li);
            });
        });
    } else {
      const li = document.createElement("li");
      li.innerText = "--- Vui Lòng Chọn Quận, Huyện ---";
      listWards.children[0].appendChild(li);
    }
  }

  //xử lý thêm địa chỉ;
  const buttonAdd = document.querySelector("#button-add");
  const buttonCancel = document.querySelector("#button-cancel");
  const inputAddress = document.querySelector("#input-address");
  inputAddress.addEventListener("keyup", () => {
    handleBtn();
  });
  function handleBtn() {
    if (
      inputCity.value.length == 0 ||
      inputDis.value.length == 0 ||
      inputWards.value.length == 0 ||
      inputAddress.value.length == 0
    ) {
      buttonAdd.style.pointerEvents = "none";
      buttonAdd.style.opacity = ".5";
    } else {
      buttonAdd.style.pointerEvents = "visible";
      buttonAdd.style.opacity = "1";
    }
  }
  handleBtn();
  buttonAdd.addEventListener("click", () => {
    const addressTotal = `${inputAddress.value}, ${inputWards.value}, ${inputDis.value}, ${inputCity.value}`;

    const inforAccount = JSON.parse(localStorage.getItem("inforAccount"));
    inforAccount[0].address.push(addressTotal);

    localStorage.setItem("inforAccount", JSON.stringify(inforAccount));

    location.reload();
  });
  buttonCancel.addEventListener("click", () => {
    const popup = document.querySelector(".popup-container");
    popup.style.display = "none";
  });
}

addAddress();
const btnToTop = document.querySelector(".btnToTop");
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
document.getElementById("account").addEventListener("click", () => {
  location.href = "../../pages/account/account.html";
});
document.querySelector(".logo").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
document.querySelector("#home").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
