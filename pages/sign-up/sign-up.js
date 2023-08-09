function validationName() {
  const inputName = document.querySelector("#input-name");
  const errorName = document.querySelector("#error-name");

  inputName.addEventListener("input", () => {
    if (inputName.value.length == 0) {
      errorName.innerText = "Vui Lòng Không Bỏ Trống Tên !";
    } else {
      errorName.innerText = "";
    }
  });
}

function validationPhone() {
  const inputPhone = document.querySelector("#input-phone");
  const errorPhone = document.querySelector("#error-phone");

  inputPhone.addEventListener("input", () => {
    if (inputPhone.value.length == 0) {
      errorPhone.innerText = "Vui Lòng Không Bỏ Trống Số Điện Thoại !";
    } else if (inputPhone.value.length < 10) {
      errorPhone.innerText = "Số Điện Thoại Không Phù Hợp";
    } else {
      errorPhone.innerText = "";
    }
  });
}

function validationEmail() {
  const inputEmail = document.querySelector("#input-email");
  const errorEmail = document.querySelector("#error-email");
  inputEmail.addEventListener("input", () => {
    if (inputEmail.value != "") {
      if (
        inputEmail.value.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        errorEmail.innerText = "";
      } else {
        errorEmail.innerText = "Email Không Đúng Định Đang !";
      }
    } else {
      errorEmail.innerText = "";
    }
  });
}

function validationPass() {
  const inputPass = document.querySelector("#input-pass");
  const errorPass = document.querySelector("#error-pass");

  inputPass.addEventListener("input", () => {
    if (inputPass.value.length == 0) {
      errorPass.innerText = "Vui Lòng Tạo Mật Khẩu !";
    } else if (inputPass.value.length < 6) {
      errorPass.innerText = "Chứa Ít Nhất 6 Ký Tự !";
    } else if (inputPass.value.search(/[A-Z]/) == -1) {
      errorPass.innerText = "Chứa Ít Nhất 1 Ký Tự Viết Hoa !";
    } else {
      errorPass.innerText = "";
    }
  });
}

function validationRePass() {
  const inputRePass = document.querySelector("#input-Repass");
  const errorRePass = document.querySelector("#error-Repass");
  const inputPass = document.querySelector("#input-pass");
  inputRePass.addEventListener("input", () => {
    if (inputRePass.value.length == 0) {
      errorRePass.innerText = "Vui Lòng Xác Nhận Mật Khẩu !";
    } else if (inputRePass.value != inputPass.value) {
      errorRePass.innerText = "Không Khớp!";
    } else {
      errorRePass.innerText = "";
    }
  });
}

function showPass() {
  const showPassCheck = document.querySelector("#show-pass");

  showPassCheck.addEventListener("change", () => {
    if (showPassCheck.checked == true) {
      document.querySelector("#input-pass").setAttribute("type", "text");
      document.querySelector("#input-Repass").setAttribute("type", "text");
    } else {
      document.querySelector("#input-pass").setAttribute("type", "password");
      document.querySelector("#input-Repass").setAttribute("type", "password");
    }
  });
}

function inputFile() {
  const inputImage = document.querySelector("#input-image");
  const image = document.querySelector("#image");
  inputImage.addEventListener("change", (e) => {
    image.setAttribute("src", URL.createObjectURL(e.target.files[0]));
  });
}

function handleSignUp() {
  const inputName = document.querySelector("#input-name");
  const inputPhone = document.querySelector("#input-phone");
  const inputEmail = document.querySelector("#input-email");
  const inputPass = document.querySelector("#input-pass");
  const inputImage = document.querySelector("#input-image");
  const btnSignUp = document.querySelector("#button-sign-up");

  btnSignUp.addEventListener("click", () => {
    var form = new FormData();
    form.append("image", inputImage.files[0]);

    let myPromise = new Promise((resolve, reject) => {
      fetch(
        "https://api.imgbb.com/1/upload?key=b904559808446fb20d72cac5eaeaddd9",
        {
          method: "POST",
          headers: {
            //   'Accept': "application/json",
            // //   "Access-Control-Allow-Origin": "*",
            //   'Connection': "keep-alive",
            //   "Content-Type": "application/json",
          },
          body: form,
        }
      )
        .then((res) => res.json())
        .then((data) => resolve(data.data.url));
    });
    myPromise.then(function (url) {
      var id = "id" + Math.random().toString(16).slice(2);
      console.log(id);
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: id,
          name: inputName.value,
          email: inputEmail.value,
          phone: inputPhone.value,
          address: [],
          carts: [],
          orders: [],
          image: url,
          password: inputPass.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const popup = document.querySelector(".popup");
          popup.innerHTML = "";
          const popupContainer = document.querySelector(".popup-container");
          popupContainer.classList.add("active-popup");
          const h3 = document.createElement("h3");
          h3.innerText = "Bạn Đã Đăng Ký Thành Công";
          const divControl = document.createElement("div");
          divControl.classList.add("control");
          const inputCancel = document.createElement("input");
          inputCancel.type = "button";
          inputCancel.value = "Đăng Nhập";
          inputCancel.addEventListener("click", () => {
            location.href = "../../pages/sign-in/sign-in.html";
          });
          // const inputOk = document.createElement("input");
          // inputOk.type = "button";
          // inputOk.value = "Hủy";
          // inputOk.addEventListener("click", () => {
          //   location.href = "../../pages/cart-view/cart-view.html";
          // });
          divControl.appendChild(inputCancel);
          // divControl.appendChild(inputOk);

          popup.appendChild(h3);
          popup.appendChild(divControl);
        });
    });
  });
}
validationPhone();
validationName();
validationEmail();
validationPass();
validationRePass();
showPass();
inputFile();
handleSignUp();
document.querySelector(".logo").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
document.querySelector("#home").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
