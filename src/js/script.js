import loader from "../modules/loader";
import tabs from "../modules/tabs";
import timer from "../modules/timer";
import modal, { openModal } from "../modules/modal";
import { MenuCard } from "../modules/menuCard";
import form from "../modules/form";
import slider from "../modules/slider";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    3000
  );

  loader();
  tabs(
    ".tabheader__items",
    ".tabheader__item",
    ".tabcontent",
    "tabheader__item_active"
  );
  timer(".timer", "2023-10-05");
  modal("[data-modal]", ".modal", modalTimerId);
  MenuCard;
  form("form", modalTimerId);
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
});
