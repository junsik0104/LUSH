document.addEventListener(`DOMContentLoaded`, function () {
   var swiper = new Swiper(".mySwiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
     },
     slidesPerView: 3,
     loop: true,
   });
  
  // aos
  AOS.init();
  
  const headerArea = document.querySelector(`.header_area`);
  const topBtn = document.querySelector(`.top_btn`);
  const submenuTab = document.querySelectorAll(`.main_menu li`);
  const submenuBox = document.querySelector(`.sub_menu_box`);
  const hambugerBtnMenu = document.querySelector(`.hambuger`);
  const hambugerBtn = document.querySelector(`.container .hambuger_btn`);
  let scrollY = window.scrollY; // 스크롤 위치 저장 변수 추가

  // 스크롤 이벤트 핸들러 정의
  function handleScroll() {
    scrollY = window.scrollY;
    console.log(scrollY);

    if (scrollY >= 600) {
      headerArea.classList.add(`active`);
    } else{
      headerArea.classList.remove(`active`);
    }

    // topbtn
    if (scrollY >= 300) {
      topBtn.classList.add(`on`);
    } else {
      topBtn.classList.remove(`on`);
    }
  }

  // top btn
  topBtn.addEventListener(`click`, function () {
    window.scrollTo({
      top: 0,
      behavior: `smooth`
    });
  });

  // 초기 스크롤 이벤트 추가
  window.addEventListener(`scroll`, handleScroll);

  // tab menu 이벤트 핸들러
  for (const li of submenuTab) {
    li.addEventListener(`mouseenter`, function () {
      // 스크롤 이벤트 제거
      window.removeEventListener(`scroll`, handleScroll);

      submenuBox.classList.add(`active`);
      headerArea.classList.add(`active`);

      const tab = this.getAttribute(`data-tab`);
      const subMenu = document.querySelectorAll(`.sub_menu`);
      
      for (const tabContent of subMenu) {
        tabContent.classList.remove(`active`);
        tabContent.addEventListener(`mouseenter`, function () {
          headerArea.classList.add(`active`);
        })
      }

      const changeTab = document.querySelector(`#${tab}`);
      changeTab.classList.add(`active`);
    });

    li.addEventListener(`mouseleave`, function () {
      // 스크롤 이벤트 다시 추가
      window.addEventListener(`scroll`, handleScroll);
    });
  }


  submenuBox.addEventListener(`mouseenter`, function () {
    window.removeEventListener(`scroll`, handleScroll);
    
    submenuBox.addEventListener(`mouseleave`, function () {
      submenuBox.classList.remove(`active`);
      window.addEventListener(`scroll`, handleScroll);
      handleScroll();
    });
  });


  //hambugerBtn 이벤트 함수
  function hambugerBtnEvent() {
    hambugerBtn.classList.toggle(`active`);
    window.removeEventListener(`scroll`, handleScroll);

    const hambugerBtnTrue = this.classList.contains(`active`);

    if (hambugerBtnTrue == true) {
      hambugerBtnMenu.classList.add(`active`);
      headerArea.classList.add(`active`);
    } else {
      hambugerBtnMenu.classList.remove(`active`);
      hambugerBtn.classList.remove(`active`);
      // 햄버거 버튼 엑티브제거되면 스크롤이벤트 추가
      window.addEventListener(`scroll`, handleScroll);
      handleScroll();
    }
    
  }

  //if문 사용해서 Width가 작을 때만 햄버거 이벤트 들어가게 작성 - resize
  const innerWidth = window.innerWidth;
  console.log(innerWidth);

    function checkHamburgerEvent() {
        if (window.innerWidth <= 960) {
          hambugerBtn.addEventListener('click', hambugerBtnEvent);
          submenuBox.removeEventListener(`mouseleave`, submenuBoxMouseLeave);
        } else {
          hambugerBtn.removeEventListener('click', hambugerBtnEvent);
          submenuBox.addEventListener(`mouseleave`, submenuBoxMouseLeave);
        }
    }

    checkHamburgerEvent();
  window.addEventListener('resize', checkHamburgerEvent);
});