import { postData } from "../server/server";
import { showThanksModal } from "./modal";
// import modal, { openModal, closeModal } from "./modal";

export default function form(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    bindPostData(form);
  });

  const msg = {
    loading: "img/spinner.svg",
    success: "Thanks for submitting our form",
    failure: "Sorry, Something went wrong",
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = msg.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 5px auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest();   deleted
      // request.open("POST", "server.php");     deleted
      // request.setRequestHeader("Content-Type", "application/json");   deleted

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // const obj = {};                        depending on json
      // formData.forEach((key, val) => {
      //   obj[val] = key;
      // });

      // const json = JSON.stringify(obj);       deleted
      // request.send(json);                     deleted

      postData("http://localhost:3000/request", json)
        .then(() => {
          showThanksModal(msg.success, ".modal", modalTimerId);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure, ".modal", modalTimerId);
        })
        .finally(() => {
          form.reset();
        });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(msg.success);
      //     form.reset();
      //     setTimeout(() => {
      //       statusMessage.remove();
      //     }, 2000);
      //   } else {
      //     showThanksModal(msg.failure);
      //   }
      // });
    });
  }
}
