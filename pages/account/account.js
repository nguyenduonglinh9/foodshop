const accountLeft = document.querySelector(".account-left");
const inforAccount = JSON.parse(localStorage.getItem("inforAccount"));
const address = document.querySelector(".address");
let defaultPick = "Thông Tin Cơ Bản";

accountLeft.children[0].children[0].setAttribute("src", inforAccount[0].image);
accountLeft.children[0].children[1].innerText = inforAccount[0].name;
const name = (document.querySelector("#name").innerText = inforAccount[0].name);
const email = (document.querySelector("#email").innerText =
  inforAccount[0].email);
const phone = (document.querySelector("#phone").innerText =
  inforAccount[0].phone);

const btnEdit = document.getElementById("edit");
btnEdit.addEventListener("click", () => {
  if (btnEdit.innerText == "Chỉnh Sửa") {
    const name = document
      .querySelector("#name")
      .setAttribute("contenteditable", "true");
    const email = document
      .querySelector("#email")
      .setAttribute("contenteditable", "true");
    const phone = document
      .querySelector("#phone")
      .setAttribute("contenteditable", "true");
    btnEdit.innerText = "Xong";
  } else if (btnEdit.innerText == "Xong") {
    const name = document
      .querySelector("#name")
      .setAttribute("contenteditable", "false");
    const email = document
      .querySelector("#email")
      .setAttribute("contenteditable", "false");
    const phone = document
      .querySelector("#phone")
      .setAttribute("contenteditable", "false");
    btnEdit.innerText = "Chỉnh Sửa";
  }
});

Array.from(accountLeft.children[1].children[0].children).map((item, index) => {
  item.addEventListener("click", () => {
    defaultPick = item.innerText;
    handlePick();
    handleShow();
  });
});
function handlePick() {
  Array.from(accountLeft.children[1].children[0].children).map(
    (item, index) => {
      if (item.innerText == defaultPick) {
        item.classList.add("active-pick");
      } else {
        item.classList.remove("active-pick");
      }
    }
  );
}
handlePick();
inforAccount[0].address.map((item, index) => {
  const p = document.createElement("p");
  p.innerText = item;
  address.children[1].appendChild(p);
});
const btnAdd = document.querySelector("#add");
const listCity = document.querySelector(".list-city");
const listDis = document.querySelector(".list-dis");
const listWards = document.querySelector(".list-wards");
const inputGroup = document.querySelector(".input-group");
btnAdd.addEventListener("click", () => {
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
const btnToTop = document.querySelector(".btnToTop");
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
function handleShow() {
  const accountRight = document.querySelector(".account-right");
  if (defaultPick == "Thông Tin Cơ Bản") {
    Array.from(accountRight.children).map((item, index) => {
      if (index == 0) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });
  }
  if (defaultPick == "Danh Sách Địa Chỉ") {
    Array.from(accountRight.children).map((item, index) => {
      if (index == 1) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });
  }
  if (defaultPick == "Đổi Mật Khẩu") {
    Array.from(accountRight.children).map((item, index) => {
      if (index == 2) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });
  }
}
handleShow();
document.querySelector(".logo").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
document.querySelector("#home").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
