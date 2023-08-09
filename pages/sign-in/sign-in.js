const errorEmail = document.querySelector("#error-email");
const inputEmail = document.querySelector("#input-email");
const showPassCheck = document.querySelector("#show-pass");
const inputPass = document.querySelector("#input-pass");
const btnSignIn = document.querySelector("#button-sign-in");

//vaidation email
function validationEmail() {
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
//hiện mật khẩu
function showPass() {
  showPassCheck.addEventListener("change", (e) => {
    if (showPassCheck.checked == true) {
      inputPass.setAttribute("type", "text");
    } else {
      inputPass.setAttribute("type", "password");
    }
  });
}
//check login đúng/sai
function handleSignIn() {
  btnSignIn.addEventListener("click", () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        const checkemail = data.filter((item, index) => {
          return item.email == inputEmail.value;
        });
        if (checkemail.length == 0) {
          // console.log('tài khoản ko tồn tại');
          const popup = document.querySelector(".popup");
          popup.innerHTML = "";
          const popupContainer = document.querySelector(".popup-container");
          popupContainer.classList.add("active-popup");
          const h3 = document.createElement("h3");
          h3.innerText = "Sai Tài Khoản Hoặc Mật Khẩu";
          const divControl = document.createElement("div");
          divControl.classList.add("control");
          const inputCancel = document.createElement("input");
          inputCancel.type = "button";
          inputCancel.value = "Thử Lại";
          inputCancel.addEventListener("click", () => {
            popupContainer.classList.remove("active-popup");
          });
          // const inputOk = document.createElement("input");
          // inputOk.type = "button";
          // inputOk.value = "Thanh Toán";
          // inputOk.addEventListener("click", () => {
          //   location.href = "../../pages/cart-view/cart-view.html";
          // });
          divControl.appendChild(inputCancel);
          // divControl.appendChild(inputOk);

          popup.appendChild(h3);
          popup.appendChild(divControl);
        } else {
          // console.log("tài khoản có tồn tại");
          const checkpass = checkemail.filter((item, index) => {
            return item.password == inputPass.value;
          });
          if (checkpass.length == 0) {
            const popup = document.querySelector(".popup");
            popup.innerHTML = "";
            const popupContainer = document.querySelector(".popup-container");
            popupContainer.classList.add("active-popup");
            const h3 = document.createElement("h3");
            h3.innerText = "Sai Tài Khoản Hoặc Mật Khẩu";
            const divControl = document.createElement("div");
            divControl.classList.add("control");
            const inputCancel = document.createElement("input");
            inputCancel.type = "button";
            inputCancel.value = "Thử Lại";
            inputCancel.addEventListener("click", () => {
              popupContainer.classList.remove("active-popup");
            });
            // const inputOk = document.createElement("input");
            // inputOk.type = "button";
            // inputOk.value = "Thanh Toán";
            // inputOk.addEventListener("click", () => {
            //   location.href = "../../pages/cart-view/cart-view.html";
            // });
            divControl.appendChild(inputCancel);
            // divControl.appendChild(inputOk);

            popup.appendChild(h3);
            popup.appendChild(divControl);
          } else {
            const popup = document.querySelector(".popup");
            popup.innerHTML = "";
            const popupContainer = document.querySelector(".popup-container");
            popupContainer.classList.add("active-popup");
            const h3 = document.createElement("h3");
            h3.innerText = "Đăng Nhập Thành Công";
            const divControl = document.createElement("div");
            divControl.classList.add("control");
            const inputCancel = document.createElement("input");
            inputCancel.type = "button";
            inputCancel.value = "Thử Lại";
            inputCancel.addEventListener("click", () => {
              popupContainer.classList.remove("active-popup");
            });
            // const inputOk = document.createElement("input");
            // inputOk.type = "button";
            // inputOk.value = "Thanh Toán";
            // inputOk.addEventListener("click", () => {
            //   location.href = "../../pages/cart-view/cart-view.html";
            // });
            //  divControl.appendChild(inputCancel);
            // divControl.appendChild(inputOk);

            popup.appendChild(h3);
            popup.appendChild(divControl);
            document.cookie = "isLoggin=true;path=/";
            localStorage.setItem(
              "inforAccount",
              JSON.stringify({ ...checkpass })
            );
            setTimeout(() => {
              location.href = "../../pages/home/home.html";
            }, 3000);
          }
        }
      });
    // const popup = document.querySelector(".popup");
    // popup.innerHTML = "";
    // const popupContainer = document.querySelector(".popup-container");
    // popupContainer.classList.add("active-popup");
    // const h3 = document.createElement("h3");
    // h3.innerText = "Bạn Đã Thêm Vào Giỏ Hàng";
    // const divControl = document.createElement("div");
    // divControl.classList.add("control");
    // const inputCancel = document.createElement("input");
    // inputCancel.type = "button";
    // inputCancel.value = "Tiếp Tục Mua Sắm";
    // inputCancel.addEventListener("click", () => {
    //   popupContainer.classList.remove("active-popup");
    // });
    // const inputOk = document.createElement("input");
    // inputOk.type = "button";
    // inputOk.value = "Thanh Toán";
    // inputOk.addEventListener("click", () => {
    //   location.href = "../../pages/cart-view/cart-view.html";
    // });
    // divControl.appendChild(inputCancel);
    // divControl.appendChild(inputOk);

    // popup.appendChild(h3);
    // popup.appendChild(divControl);
  });
}
handleSignIn();
validationEmail();
showPass();
document.querySelector(".logo").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
document.querySelector("#home").addEventListener("click", () => {
  location.href = "../../pages/home/home.html";
});
