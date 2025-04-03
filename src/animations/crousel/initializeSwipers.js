import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

function initializeSwipers() {
  document.querySelectorAll(".swiper-pagination").forEach((pagination) => {
    pagination.style.position = "absolute";
    pagination.style.top = "50%";
    pagination.style.left = "50%";
    pagination.style.transform = "translate(-50%,-50%)";
    pagination.style.zIndex = "10";
  });

  document.querySelectorAll(".swiper-container").forEach((container) => {
    const swiperInstance = new Swiper(
      container.querySelector(".purchase-swiper"),
      {
        loop: true,
        speed: 400,
        cssMode: true,
        modules: [Navigation, Pagination],
        navigation: {
          nextEl: container.querySelector(".custom-swiper-button-next"),
          prevEl: container.querySelector(".custom-swiper-button-prev"),
        },
        pagination: {
          el: container.querySelector(".swiper-pagination"),
          clickable: true,
          type: "bullets",
          bulletClass: "swiper-bullet",
          bulletActiveClass: "is-bullet-active",
          bulletElement:"button"
        },
      }
    );

    const nextMobileBtn = container.querySelector(".swiper-next-button-mobile");
    const prevMobileBtn = container.querySelector(".swiper-prev-button-mobile");

    if (nextMobileBtn) {
      nextMobileBtn.addEventListener("click", () => {
        swiperInstance.slideNext();
      });
    }

    if (prevMobileBtn) {
      prevMobileBtn.addEventListener("click", () => {
        swiperInstance.slidePrev();
      });
    }
  });
}

export default initializeSwipers;

// /* Default (Inactive) pagination dot color */
// .swiper-pagination-bullet {
//   background-color: #222 !important;  /* Inactive color */
//   opacity: 0.5; /* Slight transparency for inactive dots */
//   transition: background-color 0.3s ease-in-out;
// }

// /* Active pagination dot color */
// .swiper-pagination-bullet-active {
//   background-color: #222 !important;  /* Active color */
//   opacity: 1; /* Fully visible active dot */
// }
//   .swiper-button-next::after,
// .swiper-button-prev::after {
//   content: "" !important;
//   display: none;
// }
//   .swiper-pagination-bullet {
//   margin: 0 8px !important; /* Adjust space between bullets */
// }
