const idPost = localStorage.getItem("idPost");
const detailBlog = document.querySelector(".detail-blog");
const btnToTop = document.querySelector(".btnToTop");
const otherBlogs = document.querySelector(".other-blogs");

//get Api 1 blog
fetch(`http://localhost:3000/blogs/${idPost}`)
  .then((res) => res.json())
  .then((data) => {
    //phần header detail
    const divHeaderBlog = document.createElement("div");
    divHeaderBlog.classList.add("detail-blog-header");
    const divImgHeader = document.createElement("div");
    divImgHeader.classList.add("header-image");
    const imgHeader = document.createElement("img");
    imgHeader.src = data.image;
    divImgHeader.append(imgHeader);
    const divInfoHeader = document.createElement("div");
    divInfoHeader.classList.add("header-infor");
    const divAuthor = document.createElement("div");
    divAuthor.classList.add("header-infor-author");
    const divAuthorIcon = document.createElement("div");
    divAuthorIcon.classList.add("header-infor-author-icon");
    divAuthorIcon.innerHTML = `<i class="fa-solid fa-user"></i>`;
    const pAuthor = document.createElement("p");
    pAuthor.innerText = `By ${data.author}`;
    divAuthor.appendChild(divAuthorIcon);
    divAuthor.appendChild(pAuthor);
    const divDate = document.createElement("div");
    divDate.classList.add("header-infor-date");
    const divDateIcon = document.createElement("div");
    divDateIcon.classList.add("header-infor-date-icon");
    divDateIcon.innerHTML = `<i class="fa-solid fa-calendar-days"></i>`;
    const pDate = document.createElement("p");
    pDate.innerText = data.date;
    divDate.appendChild(divDateIcon);
    divDate.appendChild(pDate);
    divInfoHeader.appendChild(divAuthor);
    divInfoHeader.appendChild(divDate);
    divHeaderBlog.appendChild(divImgHeader);
    divHeaderBlog.appendChild(divInfoHeader);

    detailBlog.appendChild(divHeaderBlog);

    //phần body detail
    const divBodyBlog = document.createElement("div");
    divBodyBlog.classList.add("detail-blog-body");

    const mainTitle = document.createElement("h2");
    mainTitle.innerText = data.title;
    detailBlog.appendChild(mainTitle);

    const mainContent = document.createElement("p");
    mainContent.innerText = data.content[0];
    detailBlog.appendChild(mainContent);

    data.content
      .filter((item, index) => {
        return index > 0;
      })
      .map((item2, index2) => {
        const subTitle = document.createElement("h3");
        subTitle.innerText = item2.titleSub;

        const subContent = document.createElement("p");
        subContent.innerText = item2.contentSub;

        const divImgSub = document.createElement("div");
        divImgSub.classList.add("image-sub");
        const imgSub = document.createElement("img");
        imgSub.src = item2.imageSub;
        divImgSub.appendChild(imgSub);

        detailBlog.appendChild(subTitle);
        detailBlog.appendChild(subContent);
        detailBlog.appendChild(divImgSub);
      });
  });

//get API blogs
fetch("http://localhost:3000/blogs")
  .then((res) => res.json())
  .then((data) => {
    data.map((blog, indexBlog) => {
      const divItemBlog = document.createElement("div");
      divItemBlog.classList.add("item-other-blog");

      const divImg = document.createElement("div");
      divImg.classList.add("item-img");
      const img = document.createElement("img");
      img.src = blog.image;
      divImg.appendChild(img);

      const divInfo = document.createElement("div");
      divInfo.classList.add("item-infor");
      const pTitle = document.createElement("p");
      pTitle.innerText = blog.title;
      pTitle.addEventListener("click", () => {
        localStorage.setItem("idPost", blog.id);
        location.reload();
      });
      const pDate = document.createElement("p");
      pDate.innerText = blog.date;
      divInfo.appendChild(pTitle);
      divInfo.appendChild(pDate);

      divItemBlog.appendChild(divImg);
      divItemBlog.appendChild(divInfo);

      otherBlogs.appendChild(divItemBlog);
    });
  });

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

const iconCartView = document.querySelector("#icon-cart-view");

iconCartView.addEventListener("click", () => {
  location.href = "../../pages/cart-view/cart-view.html";
});

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
