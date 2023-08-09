const slideContainer = document.querySelector(".slidecontainer");
const controlSlide = document.querySelector(".control");
const inputTime = document.querySelector(".input-time");
const optionTime = document.querySelector(".option-time");
const menuHeader = document.querySelector(".menu-header");
const menuContent = document.querySelector(".menu-content");
const chefSlide = document.querySelector(".chef-slide");
const chefSlideControl = document.querySelector(".controlChef");
const containerContact = document.querySelector(".container");
const btnToTop = document.querySelector(".btnToTop");
const slideDownLoad = document.querySelector(".slide-container");
const feedbackContent = document.querySelector(".feedback-content");
const feedbackControl = document.querySelector(".feedback-control");
const blogList = document.querySelector(".blog-list");
const iconCartView = document.querySelector("#icon-cart-view");

const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPhone = document.querySelector("#phone");
const validationName = document.querySelector(".validation-name");
const validationEmail = document.querySelector(".validation-email");
const validationPhone = document.querySelector(".validation-phone");

iconCartView.addEventListener("click", () => {
  location.href = "../../pages/cart-view/cart-view.html";
});

let test = document.cookie;
if (test.length == 0) {
  document.cookie = "isLoggin=false;path=/";
} else if (test == "isLoggin=true") {
  console.log("đã đăng nhập !");
}

let isTimePicker = false;
let defaultType = "Tất Cả";
console.log(inputName.value.length);

//validation form đặt bàn
function validationForm() {
  //name không bỏ trống
  inputName.addEventListener("input", () => {
    if (inputName.value.length == 0) {
      validationName.style.transform = "translateX(-50%) scale(1)";
      validationName.innerText = "Không Bỏ Trống Họ Tên";
    } else {
      validationName.style.transform = "translateX(-50%) scale(0)";
      validationName.innerText = "";
    }
  });
  inputName.addEventListener("blur", () => {
    validationName.style.transform = "translateX(-50%) scale(0)";
    validationName.innerText = "";
  });
  inputName.addEventListener("focus", () => {
    if (inputName.value.length == 0) {
      validationName.style.transform = "translateX(-50%) scale(1)";
      validationName.innerText = "Không Bỏ Trống Họ Tên";
    } else {
      validationName.style.transform = "translateX(-50%) scale(0)";
      validationName.innerText = "";
    }
  });
  //email đúng định dạng và không bỏ trống
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  inputEmail.addEventListener("input", () => {
    if (inputEmail.value.length == 0) {
      validationEmail.style.transform = "translateX(-50%) scale(1)";
      validationEmail.innerText = "Không Bỏ Trống Email";
    } else if (inputEmail.value.match(validRegex)) {
      validationEmail.style.transform = "translateX(-50%) scale(0)";
      validationEmail.innerText = "";
    } else {
      validationEmail.style.transform = "translateX(-50%) scale(1)";
      validationEmail.innerText = "Nhập Đúng Định Dạng Email";
    }
  });
  inputEmail.addEventListener("blur", () => {
    validationEmail.style.transform = "translateX(-50%) scale(0)";
    validationEmail.innerText = "";
  });
  inputEmail.addEventListener("focus", () => {
    if (inputEmail.value.length == 0) {
      validationEmail.style.transform = "translateX(-50%) scale(1)";
      validationEmail.innerText = "Không Bỏ Trống Email";
    } else if (inputEmail.value.match(validRegex)) {
      validationEmail.style.transform = "translateX(-50%) scale(0)";
      validationEmail.innerText = "";
    } else {
      validationEmail.style.transform = "translateX(-50%) scale(1)";
      validationEmail.innerText = "Nhập Đúng Định Dạng Email";
    }
  });
  //số phone đúng định dạng và không bỏ trống
}
validationForm();

//xử lý ẩn/hiện nút scroll on top
window.onscroll = (e) => {
  if (window.pageYOffset >= 900) {
    btnToTop.style.display = "flex";
  } else {
    btnToTop.style.display = "none";
  }
};
btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//xử lý slide deal
let isDragging = false,
  startX,
  startScrollLeft;
const startDrag = (e) => {
  isDragging = true;
  slideContainer.classList.add("dragging");
  slideContainer.style.scrollBehavior = "auto";
  startX = e.pageX;
  startScrollLeft = slideContainer.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  slideContainer.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const stopDrag = () => {
  isDragging = false;
  slideContainer.classList.remove("dragging");
  slideContainer.style.scrollBehavior = "smooth";
};
slideContainer.addEventListener("mousedown", startDrag);
slideContainer.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", stopDrag);
//sử lý hai nút điều khiển slide
controlSlide.children[0].addEventListener("click", () => {
  slideContainer.scrollLeft -= 300;
});
controlSlide.children[1].addEventListener("click", () => {
  slideContainer.scrollLeft += 300;
});

//xử lý slide chef
let isDraggingChef = false,
  startXChef,
  startScrollLeftChef;
const startDragChef = (e) => {
  isDraggingChef = true;
  chefSlide.classList.add("dragging");
  chefSlide.style.scrollBehavior = "auto";
  startXChef = e.pageX;
  startScrollLeftChef = chefSlide.scrollLeft;
};
const draggingChef = (e) => {
  if (!isDraggingChef) return;
  chefSlide.scrollLeft = startScrollLeftChef - (e.pageX - startXChef);
};
const stopDragChef = () => {
  isDraggingChef = false;
  chefSlide.classList.remove("dragging");
  chefSlide.style.scrollBehavior = "smooth";
};
chefSlide.addEventListener("mousedown", startDragChef);
chefSlide.addEventListener("mousemove", draggingChef);
document.addEventListener("mouseup", stopDragChef);
chefSlideControl.children[0].addEventListener("click", () => {
  chefSlide.scrollLeft -= 300;
});
chefSlideControl.children[1].addEventListener("click", () => {
  chefSlide.scrollLeft += 300;
});

//xử lý slide feedback
let isDraggingFeed = false,
  startXFeed,
  startScrollLeftFeed;
const startDragFeed = (e) => {
  isDraggingFeed = true;
  feedbackContent.classList.add("dragging");
  feedbackContent.style.scrollBehavior = "auto";
  startXFeed = e.pageX;
  startScrollLeftFeed = feedbackContent.scrollLeft;
};
const draggingFeed = (e) => {
  if (!isDraggingFeed) return;
  feedbackContent.scrollLeft = startScrollLeftFeed - (e.pageX - startXFeed);
};
const stopDragFeed = () => {
  isDraggingFeed = false;
  feedbackContent.classList.remove("dragging");
  feedbackContent.style.scrollBehavior = "smooth";
};
feedbackContent.addEventListener("mousedown", startDragFeed);
feedbackContent.addEventListener("mousemove", draggingFeed);
document.addEventListener("mouseup", stopDragFeed);
feedbackControl.children[0].addEventListener("click", () => {
  feedbackContent.scrollLeft -= 300;
});
feedbackControl.children[1].addEventListener("click", () => {
  feedbackContent.scrollLeft += 300;
});
//xử lý slide download
setInterval(() => {
  const lists = document.querySelectorAll(".slide-item");
  slideDownLoad.appendChild(lists[0]);
}, 3000);

// gọi API products về
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) =>
    data
      .filter((item, index) => item.onsale == true)
      .map((item2, index2) => {
        //tạo div cho từng item
        const divItem = document.createElement("div");
        divItem.className = "item-container";
        divItem.draggable = false;
        // tạo thẻ img chứa hình
        const imgItem = document.createElement("img");
        imgItem.src = item2.images[0];
        //tạo thẻ div chứa thẻ img để ảnh được đồng bộ kích thước
        const divImg = document.createElement("div");
        divImg.className = "img-container";
        //tạo thẻ div chứa thông tin
        const divContent = document.createElement("div");
        divContent.className = "content-container";

        const pName = document.createElement("p");
        pName.innerText = item2.name;

        divContent.appendChild(pName);

        //tạo vùng chứa thông tin giảm giá
        const divDiscount = document.createElement("div");
        divDiscount.className = "discount";
        const pDiscount = document.createElement("p");

        pDiscount.innerText = item2.discount + "%";
        divDiscount.appendChild(pDiscount);

        //để thẻ img làm con thẻ div chứa nó
        divImg.appendChild(imgItem);

        divItem.appendChild(divImg);
        divItem.appendChild(divContent);
        divItem.appendChild(divDiscount);
        slideContainer.appendChild(divItem);
      })
  )
  .then(
    setInterval(() => {
      slideContainer.scrollLeft += 400;
    }, 3000)
  );

// gọi API chef về
fetch("http://localhost:3000/chefs")
  .then((res) => res.json())
  .then((data) =>
    data.map((item2, index2) => {
      //tạo div cho từng item
      const divItem = document.createElement("div");
      divItem.className = "item-container";
      divItem.draggable = false;
      // tạo thẻ img chứa hình
      const imgItem = document.createElement("img");
      imgItem.src = item2.image;
      //tạo thẻ div chứa thẻ img để ảnh được đồng bộ kích thước
      const divImg = document.createElement("div");
      divImg.className = "img-container";
      //tạo thẻ div chứa thông tin
      const divContent = document.createElement("div");
      divContent.className = "content-container";
      const pName = document.createElement("p");
      pName.innerText = item2.name;
      const pRole = document.createElement("p");
      pRole.innerText = item2.role;
      divContent.appendChild(pName);
      divContent.appendChild(pRole);

      const divSocial = document.createElement("div");
      divSocial.classList.add("social");
      const divFb = document.createElement("div");
      divFb.classList.add("btnFb");
      divFb.innerHTML = '<i class="fa-brands fa-facebook-f"></i>';
      const divTwitter = document.createElement("div");
      divTwitter.classList.add("btnTwitter");
      divTwitter.innerHTML = '<i class="fa-brands fa-twitter"></i>';
      const divInst = document.createElement("div");
      divInst.classList.add("btnInst");
      divInst.innerHTML = '<i class="fa-brands fa-instagram"></i>';
      divSocial.appendChild(divFb);
      divSocial.appendChild(divTwitter);
      divSocial.appendChild(divInst);
      divContent.appendChild(divSocial);

      const divHeader = document.createElement("div");
      divHeader.classList.add("content-header");

      //để thẻ img làm con thẻ div chứa nó
      divImg.appendChild(imgItem);

      divItem.appendChild(divImg);
      divItem.appendChild(divHeader);
      divItem.appendChild(divContent);

      // divItem.appendChild(divDiscount);
      chefSlide.appendChild(divItem);
    })
  )
  .then(
    setInterval(() => {
      chefSlide.scrollLeft += 400;
    }, 3000)
  );

// gọi API feedback về
fetch("http://localhost:3000/feedbacks")
  .then((res) => res.json())
  .then((data) =>
    data.map((item, index) => {
      //tạo div cho từng item
      const divItem = document.createElement("div");
      divItem.className = "feedback-item";
      divItem.draggable = false;
      // tạo thẻ img chứa hình
      const imgItem = document.createElement("img");
      imgItem.src = "../../assets/image/feedback-user.jpg";
      //tạo thẻ div chứa thẻ img để ảnh được đồng bộ kích thước
      const divImg = document.createElement("div");
      divImg.className = "img-container";
      //tạo thẻ div chứa thông tin
      const divContent = document.createElement("div");
      divContent.className = "content-container";
      const pName = document.createElement("p");
      pName.innerText = item.name;
      const pContent = document.createElement("p");
      pContent.innerText = item.content;
      divContent.appendChild(pName);
      divContent.appendChild(pContent);

      //để thẻ img làm con thẻ div chứa nó
      divImg.appendChild(imgItem);

      divItem.appendChild(divImg);
      divItem.appendChild(divContent);

      // divItem.appendChild(divDiscount);
      feedbackContent.appendChild(divItem);
    })
  )
  .then(
    setInterval(() => {
      feedbackContent.scrollLeft += 500;
    }, 3000)
  );

//xử lý bật/tắt bảng chọn thời gian trong đặt bàn
inputTime.addEventListener("click", () => {
  if (isTimePicker == true) {
    optionTime.style.display = "none";
    isTimePicker = false;
  } else {
    optionTime.style.display = "flex";
    //xử lý chọn thời gian
    Array.from(optionTime.children[0].children).map((item, index) => {
      item.addEventListener("click", (e) => {
        inputTime.innerText = item.innerText;
        optionTime.style.display = "none";
        isTimePicker = false;
      });
    });
    isTimePicker = true;
  }
  console.log(isTimePicker);
});

//xử lý nút bấm chọn loại thức ăn
Array.from(menuHeader.children[1].children).map((item, index) => {
  //mặc định nút chọn là "tất cả"
  if (item.children[0].innerText == defaultType) {
    item.classList.add("active");
    //mặc định là "tất cả" sẽ render tất cả products
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) =>
        data
          .filter((item, index) => item.isPopula == true)
          .map((item2, index2) => {
            const divItem = document.createElement("div");
            divItem.classList.add("menu-item");

            const divImg = document.createElement("div");
            divImg.classList.add("image-food");
            const imgItem = document.createElement("img");
            imgItem.src = item2.images[0];

            const divContent = document.createElement("div");
            divContent.classList.add("food-content");
            const pName = document.createElement("p");
            pName.classList.add("food-name");
            pName.innerText = item2.name;
            const divStar = document.createElement("div");
            divStar.classList.add("food-star");
            for (let i = 0; i < item2.star; i++) {
              divStar.innerHTML +=
                '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
            }
            const pPrice = document.createElement("p");
            pPrice.classList.add("food-price");
            pPrice.innerText = Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item2.price.small);
            const divType = document.createElement("div");
            divType.classList.add("food-type");
            const pType = document.createElement("p");
            pType.innerText = item2.type;
            divType.appendChild(pType);
            const divAddCart = document.createElement("div");
            divAddCart.classList.add("food-add-cart");
            const pAddCart = document.createElement("p");
            pAddCart.innerText = "Thêm Vào Giỏ Hàng";
            divAddCart.appendChild(pAddCart);
            const divDetailButton = document.createElement("div");
            divDetailButton.classList.add("button-detail");
            divDetailButton.innerHTML = '<i class="fa-regular fa-eye"></i>';
            const divLikeButton = document.createElement("div");
            divLikeButton.classList.add("button-like");
            divLikeButton.innerHTML = '<i class="fa-regular fa-heart"></i>';

            divContent.appendChild(pName);
            divContent.appendChild(divStar);
            divContent.appendChild(pPrice);
            divContent.appendChild(divType);
            divContent.appendChild(divAddCart);
            divContent.appendChild(divDetailButton);
            divContent.appendChild(divLikeButton);

            divImg.appendChild(imgItem);

            divItem.appendChild(divImg);
            divItem.appendChild(divContent);

            divItem.addEventListener("click", () => {
              localStorage.setItem("idProduct", item2.id);
              window.location =
                "../../pages/detail-product/detail-product.html";
            });

            menuContent.appendChild(divItem);
          })
      );
  }
  //xử lý khi bấm sẽ đổi mặc định thành nút đang bấm
  item.addEventListener("click", () => {
    defaultType = item.children[0].innerText;
    //sau khi bấm sẽ map lại toàn bộ xem nút nào khớp
    Array.from(menuHeader.children[1].children).map((item2, index2) => {
      if (item2.children[0].innerText == defaultType) {
        //nút khớp sẽ active
        item2.classList.add("active");
        //xử lý theo từng loại
        // menuContent.innerHTML = "";
        Array.from(menuContent.children).map((item, index) => {
          item.style.transform = "scale(0)";
          item.style.opacity = "0";
          setTimeout(() => {
            item.style.display = "none";
          }, 550);
        });
        if (defaultType == "Tất Cả") {
          let myPromise = new Promise((resolve, reject) => {
            Array.from(menuContent.children).map((item, index) => {
              item.style.transform = "scale(0)";
              item.style.opacity = "0";
              setTimeout(() => {
                item.style.display = "none";
                resolve("ok");
              }, 550);
            });
          });
          myPromise.then((value) => {
            fetch("http://localhost:3000/products")
              .then((res) => res.json())
              .then((data) =>
                data
                  .filter((item, index) => item.isPopula == true)
                  .map((item2, index2) => {
                    const divItem = document.createElement("div");
                    divItem.classList.add("menu-item");

                    const divImg = document.createElement("div");
                    divImg.classList.add("image-food");
                    const imgItem = document.createElement("img");
                    imgItem.src = item2.images[0];

                    const divContent = document.createElement("div");
                    divContent.classList.add("food-content");
                    const pName = document.createElement("p");
                    pName.classList.add("food-name");
                    pName.innerText = item2.name;
                    const divStar = document.createElement("div");
                    divStar.classList.add("food-star");
                    for (let i = 0; i < item2.star; i++) {
                      divStar.innerHTML +=
                        '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                    }
                    const pPrice = document.createElement("p");
                    pPrice.classList.add("food-price");
                    pPrice.innerText = Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item2.price.small);
                    const divType = document.createElement("div");
                    divType.classList.add("food-type");
                    const pType = document.createElement("p");
                    pType.innerText = item2.type;
                    divType.appendChild(pType);
                    const divAddCart = document.createElement("div");
                    divAddCart.classList.add("food-add-cart");
                    const pAddCart = document.createElement("p");
                    pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                    divAddCart.appendChild(pAddCart);
                    const divDetailButton = document.createElement("div");
                    divDetailButton.classList.add("button-detail");
                    divDetailButton.innerHTML =
                      '<i class="fa-regular fa-eye"></i>';
                    const divLikeButton = document.createElement("div");
                    divLikeButton.classList.add("button-like");
                    divLikeButton.innerHTML =
                      '<i class="fa-regular fa-heart"></i>';

                    divContent.appendChild(pName);
                    divContent.appendChild(divStar);
                    divContent.appendChild(pPrice);
                    divContent.appendChild(divType);
                    divContent.appendChild(divAddCart);
                    divContent.appendChild(divDetailButton);
                    divContent.appendChild(divLikeButton);

                    divImg.appendChild(imgItem);

                    divItem.appendChild(divImg);
                    divItem.appendChild(divContent);

                    divItem.addEventListener("click", () => {
                      localStorage.setItem("idProduct", item2.id);
                      window.location =
                        "../../pages/detail-product/detail-product.html";
                    });

                    menuContent.appendChild(divItem);
                  })
              );
          });
        } else if (defaultType == "Bánh Mì") {
          let myPromise = new Promise((resolve, reject) => {
            Array.from(menuContent.children).map((item, index) => {
              item.style.transform = "scale(0)";
              item.style.opacity = "0";
              setTimeout(() => {
                item.style.display = "none";
                menuContent.innerHTML = "";
                resolve("ok");
              }, 550);
            });
          });
          myPromise.then((value) => {
            fetch("http://localhost:3000/products")
              .then((res) => res.json())
              .then((data) =>
                data
                  .filter((item, index) => item.isPopula == true)
                  .filter((item2, index2) => item2.type == "banhmi")
                  .map((item3, index3) => {
                    const divItem = document.createElement("div");
                    divItem.classList.add("menu-item");

                    const divImg = document.createElement("div");
                    divImg.classList.add("image-food");
                    const imgItem = document.createElement("img");
                    imgItem.src = item3.images[0];

                    const divContent = document.createElement("div");
                    divContent.classList.add("food-content");
                    const pName = document.createElement("p");
                    pName.classList.add("food-name");
                    pName.innerText = item3.name;
                    const divStar = document.createElement("div");
                    divStar.classList.add("food-star");
                    for (let i = 0; i < item3.star; i++) {
                      divStar.innerHTML +=
                        '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                    }
                    const pPrice = document.createElement("p");
                    pPrice.classList.add("food-price");
                    pPrice.innerText = Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item3.price.small);
                    const divType = document.createElement("div");
                    divType.classList.add("food-type");
                    const pType = document.createElement("p");
                    pType.innerText = item3.type;
                    divType.appendChild(pType);
                    const divAddCart = document.createElement("div");
                    divAddCart.classList.add("food-add-cart");
                    const pAddCart = document.createElement("p");
                    pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                    divAddCart.appendChild(pAddCart);
                    const divDetailButton = document.createElement("div");
                    divDetailButton.classList.add("button-detail");
                    divDetailButton.innerHTML =
                      '<i class="fa-regular fa-eye"></i>';
                    const divLikeButton = document.createElement("div");
                    divLikeButton.classList.add("button-like");
                    divLikeButton.innerHTML =
                      '<i class="fa-regular fa-heart"></i>';

                    divContent.appendChild(pName);
                    divContent.appendChild(divStar);
                    divContent.appendChild(pPrice);
                    divContent.appendChild(divType);
                    divContent.appendChild(divAddCart);
                    divContent.appendChild(divDetailButton);
                    divContent.appendChild(divLikeButton);

                    divImg.appendChild(imgItem);

                    divItem.appendChild(divImg);
                    divItem.appendChild(divContent);

                    divItem.addEventListener("click", () => {
                      localStorage.setItem("idProduct", item3.id);
                      window.location =
                        "../../pages/detail-product/detail-product.html";
                    });

                    menuContent.appendChild(divItem);
                  })
              );
          });
        } else if (defaultType == "Phở") {
          let myPromise = new Promise((resolve, reject) => {
            Array.from(menuContent.children).map((item, index) => {
              item.style.transform = "scale(0)";
              item.style.opacity = "0";
              setTimeout(() => {
                item.style.display = "none";
                menuContent.innerHTML = "";
                resolve("ok");
              }, 550);
            });
          });
          myPromise.then((value) => {
            fetch("http://localhost:3000/products")
              .then((res) => res.json())
              .then((data) =>
                data
                  .filter((item, index) => item.isPopula == true)
                  .filter((item2, index2) => item2.type == "pho")
                  .map((item3, index3) => {
                    const divItem = document.createElement("div");
                    divItem.classList.add("menu-item");

                    const divImg = document.createElement("div");
                    divImg.classList.add("image-food");
                    const imgItem = document.createElement("img");
                    imgItem.src = item3.images[0];

                    const divContent = document.createElement("div");
                    divContent.classList.add("food-content");
                    const pName = document.createElement("p");
                    pName.classList.add("food-name");
                    pName.innerText = item3.name;
                    const divStar = document.createElement("div");
                    divStar.classList.add("food-star");
                    for (let i = 0; i < item3.star; i++) {
                      divStar.innerHTML +=
                        '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                    }
                    const pPrice = document.createElement("p");
                    pPrice.classList.add("food-price");
                    pPrice.innerText = Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item3.price.small);
                    const divType = document.createElement("div");
                    divType.classList.add("food-type");
                    const pType = document.createElement("p");
                    pType.innerText = item3.type;
                    divType.appendChild(pType);
                    const divAddCart = document.createElement("div");
                    divAddCart.classList.add("food-add-cart");
                    const pAddCart = document.createElement("p");
                    pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                    divAddCart.appendChild(pAddCart);
                    const divDetailButton = document.createElement("div");
                    divDetailButton.classList.add("button-detail");
                    divDetailButton.innerHTML =
                      '<i class="fa-regular fa-eye"></i>';
                    const divLikeButton = document.createElement("div");
                    divLikeButton.classList.add("button-like");
                    divLikeButton.innerHTML =
                      '<i class="fa-regular fa-heart"></i>';

                    divContent.appendChild(pName);
                    divContent.appendChild(divStar);
                    divContent.appendChild(pPrice);
                    divContent.appendChild(divType);
                    divContent.appendChild(divAddCart);
                    divContent.appendChild(divDetailButton);
                    divContent.appendChild(divLikeButton);

                    divImg.appendChild(imgItem);

                    divItem.appendChild(divImg);
                    divItem.appendChild(divContent);

                    divItem.addEventListener("click", () => {
                      localStorage.setItem("idProduct", item3.id);
                      window.location =
                        "../../pages/detail-product/detail-product.html";
                    });

                    menuContent.appendChild(divItem);
                  })
              );
          });
        } else if (defaultType == "Thịt") {
          let myPromise = new Promise((resolve, reject) => {
            Array.from(menuContent.children).map((item, index) => {
              item.style.transform = "scale(0)";
              item.style.opacity = "0";
              setTimeout(() => {
                item.style.display = "none";
                menuContent.innerHTML = "";
                resolve("ok");
              }, 550);
            });
          });
          myPromise.then((value) => {
            fetch("http://localhost:3000/products")
              .then((res) => res.json())
              .then((data) =>
                data
                  .filter((item, index) => item.isPopula == true)
                  .filter((item2, index2) => item2.type == "meat")
                  .map((item3, index3) => {
                    const divItem = document.createElement("div");
                    divItem.classList.add("menu-item");

                    const divImg = document.createElement("div");
                    divImg.classList.add("image-food");
                    const imgItem = document.createElement("img");
                    imgItem.src = item3.images[0];

                    const divContent = document.createElement("div");
                    divContent.classList.add("food-content");
                    const pName = document.createElement("p");
                    pName.classList.add("food-name");
                    pName.innerText = item3.name;
                    const divStar = document.createElement("div");
                    divStar.classList.add("food-star");
                    for (let i = 0; i < item3.star; i++) {
                      divStar.innerHTML +=
                        '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                    }
                    const pPrice = document.createElement("p");
                    pPrice.classList.add("food-price");
                    pPrice.innerText = Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item3.price.small);
                    const divType = document.createElement("div");
                    divType.classList.add("food-type");
                    const pType = document.createElement("p");
                    pType.innerText = item3.type;
                    divType.appendChild(pType);
                    const divAddCart = document.createElement("div");
                    divAddCart.classList.add("food-add-cart");
                    const pAddCart = document.createElement("p");
                    pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                    divAddCart.appendChild(pAddCart);
                    const divDetailButton = document.createElement("div");
                    divDetailButton.classList.add("button-detail");
                    divDetailButton.innerHTML =
                      '<i class="fa-regular fa-eye"></i>';
                    const divLikeButton = document.createElement("div");
                    divLikeButton.classList.add("button-like");
                    divLikeButton.innerHTML =
                      '<i class="fa-regular fa-heart"></i>';

                    divContent.appendChild(pName);
                    divContent.appendChild(divStar);
                    divContent.appendChild(pPrice);
                    divContent.appendChild(divType);
                    divContent.appendChild(divAddCart);
                    divContent.appendChild(divDetailButton);
                    divContent.appendChild(divLikeButton);

                    divImg.appendChild(imgItem);

                    divItem.appendChild(divImg);
                    divItem.appendChild(divContent);

                    divItem.addEventListener("click", () => {
                      localStorage.setItem("idProduct", item3.id);
                      window.location =
                        "../../pages/detail-product/detail-product.html";
                    });

                    menuContent.appendChild(divItem);
                  })
              );
          });
        } else if (defaultType == "Pizza") {
          let myPromise = new Promise((resolve, reject) => {
            Array.from(menuContent.children).map((item, index) => {
              item.style.transform = "scale(0)";
              item.style.opacity = "0";
              setTimeout(() => {
                item.style.display = "none";
                menuContent.innerHTML = "";
                resolve("ok");
              }, 550);
            });
          });
          myPromise.then((value) => {
            fetch("http://localhost:3000/products")
              .then((res) => res.json())
              .then((data) =>
                data
                  .filter((item, index) => item.isPopula == true)
                  .filter((item2, index2) => item2.type == "pizza")
                  .map((item3, index3) => {
                    const divItem = document.createElement("div");
                    divItem.classList.add("menu-item");

                    const divImg = document.createElement("div");
                    divImg.classList.add("image-food");
                    const imgItem = document.createElement("img");
                    imgItem.src = item3.images[0];

                    const divContent = document.createElement("div");
                    divContent.classList.add("food-content");
                    const pName = document.createElement("p");
                    pName.classList.add("food-name");
                    pName.innerText = item3.name;
                    const divStar = document.createElement("div");
                    divStar.classList.add("food-star");
                    for (let i = 0; i < item3.star; i++) {
                      divStar.innerHTML +=
                        '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                    }
                    const pPrice = document.createElement("p");
                    pPrice.classList.add("food-price");
                    pPrice.innerText = Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item3.price.small);
                    const divType = document.createElement("div");
                    divType.classList.add("food-type");
                    const pType = document.createElement("p");
                    pType.innerText = item3.type;
                    divType.appendChild(pType);
                    const divAddCart = document.createElement("div");
                    divAddCart.classList.add("food-add-cart");
                    const pAddCart = document.createElement("p");
                    pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                    divAddCart.appendChild(pAddCart);
                    const divDetailButton = document.createElement("div");
                    divDetailButton.classList.add("button-detail");
                    divDetailButton.innerHTML =
                      '<i class="fa-regular fa-eye"></i>';
                    const divLikeButton = document.createElement("div");
                    divLikeButton.classList.add("button-like");
                    divLikeButton.innerHTML =
                      '<i class="fa-regular fa-heart"></i>';

                    divContent.appendChild(pName);
                    divContent.appendChild(divStar);
                    divContent.appendChild(pPrice);
                    divContent.appendChild(divType);
                    divContent.appendChild(divAddCart);
                    divContent.appendChild(divDetailButton);
                    divContent.appendChild(divLikeButton);

                    divImg.appendChild(imgItem);

                    divItem.appendChild(divImg);
                    divItem.appendChild(divContent);
                    divItem.addEventListener("click", () => {
                      localStorage.setItem("idProduct", item3.id);
                      window.location =
                        "../../pages/detail-product/detail-product.html";
                    });

                    menuContent.appendChild(divItem);
                  })
              );
          });
        } else if (defaultType == "Hamburger") {
          let myPromise = new Promise((resolve, reject) => {
            Array.from(menuContent.children).map((item, index) => {
              item.style.transform = "scale(0)";
              item.style.opacity = "0";
              setTimeout(() => {
                item.style.display = "none";
                menuContent.innerHTML = "";
                resolve("ok");
              }, 550);
            });
          });
          myPromise.then((value) => {
            fetch("http://localhost:3000/products")
              .then((res) => res.json())
              .then((data) =>
                data
                  .filter((item, index) => item.isPopula == true)
                  .filter((item2, index2) => item2.type == "Hamburger")
                  .map((item3, index3) => {
                    const divItem = document.createElement("div");
                    divItem.classList.add("menu-item");

                    const divImg = document.createElement("div");
                    divImg.classList.add("image-food");
                    const imgItem = document.createElement("img");
                    imgItem.src = item3.images[0];

                    const divContent = document.createElement("div");
                    divContent.classList.add("food-content");
                    const pName = document.createElement("p");
                    pName.classList.add("food-name");
                    pName.innerText = item3.name;
                    const divStar = document.createElement("div");
                    divStar.classList.add("food-star");
                    for (let i = 0; i < item3.star; i++) {
                      divStar.innerHTML +=
                        '<i class="fa-solid fa-star" style="color: #ff7c08;"></i>';
                    }
                    const pPrice = document.createElement("p");
                    pPrice.classList.add("food-price");
                    pPrice.innerText = Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item3.price.small);
                    const divType = document.createElement("div");
                    divType.classList.add("food-type");
                    const pType = document.createElement("p");
                    pType.innerText = item3.type;
                    divType.appendChild(pType);
                    const divAddCart = document.createElement("div");
                    divAddCart.classList.add("food-add-cart");
                    const pAddCart = document.createElement("p");
                    pAddCart.innerText = "Thêm Vào Giỏ Hàng";
                    divAddCart.appendChild(pAddCart);
                    const divDetailButton = document.createElement("div");
                    divDetailButton.classList.add("button-detail");
                    divDetailButton.innerHTML =
                      '<i class="fa-regular fa-eye"></i>';
                    const divLikeButton = document.createElement("div");
                    divLikeButton.classList.add("button-like");
                    divLikeButton.innerHTML =
                      '<i class="fa-regular fa-heart"></i>';

                    divContent.appendChild(pName);
                    divContent.appendChild(divStar);
                    divContent.appendChild(pPrice);
                    divContent.appendChild(divType);
                    divContent.appendChild(divAddCart);
                    divContent.appendChild(divDetailButton);
                    divContent.appendChild(divLikeButton);

                    divImg.appendChild(imgItem);

                    divItem.appendChild(divImg);
                    divItem.appendChild(divContent);
                    divItem.addEventListener("click", () => {
                      localStorage.setItem("idProduct", item3.id);
                      window.location =
                        "../../pages/detail-product/detail-product.html";
                    });

                    menuContent.appendChild(divItem);
                  })
              );
          });
        }
      } else {
        //nút không khớp sẽ không active
        item2.classList.remove("active");
      }
    });
  });
});

//xử lý list blog random ngẫu nhiên 3 blog
fetch("http://localhost:3000/blogs")
  .then((res) => res.json())
  .then((data) => {
    let i = 1;
    let number = [];
    let number2 = null;
    let check = null;
    do {
      number2 = Math.floor(Math.random() * (data.length - 1 + 1)) + 1;
      if (number.includes(number2) == true) {
        check = true;
      } else {
        check = false;
        number.push(number2);
        if (number.length == 3) {
          number.map((item, index) => {
            console.log(typeof item);
            fetch("http://localhost:3000/blogs")
              .then((res) => res.json())
              .then((data) => {
                data
                  .filter((item2, index) => {
                    return item2.id == item;
                  })
                  .map((item3, index3) => {
                    const divItem = document.createElement("div");
                    divItem.classList.add("blog-item");

                    const divImg = document.createElement("div");
                    divImg.classList.add("blog-item-img");
                    const img = document.createElement("img");
                    img.src = item3.image;
                    divImg.appendChild(img);

                    const divType = document.createElement("div");
                    divType.classList.add("blog-item-type");
                    const pType = document.createElement("p");
                    pType.innerText = item3.type;
                    divType.appendChild(pType);

                    const divContent = document.createElement("div");
                    divContent.classList.add("blog-item-content");
                    const divContentHeader = document.createElement("div");
                    divContentHeader.classList.add("blog-item-content-header");
                    const divImgHeader = document.createElement("div");
                    divImgHeader.classList.add("blog-item-content-header-img");
                    const imgHeader = document.createElement("img");
                    imgHeader.src = "../../assets/image/admin.jpg";
                    divImgHeader.appendChild(imgHeader);
                    const divText = document.createElement("div");
                    divText.classList.add("blog-item-content-header-text");
                    const pNameHeader = document.createElement("p");
                    pNameHeader.innerText = item3.author;
                    const pDateHeader = document.createElement("p");
                    pDateHeader.innerText = item3.date;
                    divContentHeader.appendChild(divImgHeader);
                    divText.appendChild(pNameHeader);
                    divText.appendChild(pDateHeader);
                    divContentHeader.appendChild(divText);

                    const divContentBody = document.createElement("div");
                    divContentBody.classList.add("blog-item-content-body");
                    const title = document.createElement("h4");
                    title.innerText = item3.title;
                    const content = document.createElement("p");
                    content.innerText = item3.content[0];
                    divContentBody.appendChild(title);
                    divContentBody.appendChild(content);

                    divContent.appendChild(divContentHeader);
                    divContent.appendChild(divContentBody);

                    divItem.appendChild(divImg);
                    divItem.appendChild(divType);
                    divItem.appendChild(divContent);

                    blogList.appendChild(divItem);
                  });
              });
          });
        }
        i++;
      }
    } while (i <= 3);
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
    iconLogin.addEventListener("mouseout", () => {
      Array.from(navMenus)[1].classList.remove("active-navmenu");
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
