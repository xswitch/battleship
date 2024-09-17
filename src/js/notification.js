import Toastify from "toastify-js";

const toast = (() => {
  function success(toastText, position) {
    Toastify({
      text: toastText,
      className: "toastSuccess",
      style: {
        background: "rgb(50, 250, 50)",
        color: "black",
        borderRadius: "5px",
      },
      duration: 2000,
      position,
      gravity: "bottom", // `top` or `bottom`
      stopOnFocus: true, // Prevents dismissing of toast on hover,
    }).showToast();
  }

  function error(toastText, position) {
    Toastify({
      text: toastText,
      className: "toastError",
      style: {
        background: "rgb(250, 100, 100)",
        color: "black",
        borderRadius: "5px",
      },
      duration: 2000,
      position,
      gravity: "bottom", // `top` or `bottom`
      stopOnFocus: true, // Prevents dismissing of toast on hover,
    }).showToast();
  }

  function info(toastText, position) {
    Toastify({
      text: toastText,
      className: "toastInfo",
      duration: 2000,
      position,
      gravity: "bottom", // `top` or `bottom`
      stopOnFocus: true, // Prevents dismissing of toast on hover,
    }).showToast();
  }

  return { success, error, info };
})();

export default toast;

/* 
Standard amount of elements for notification popup
Ability to set custom classes {container: 'popupContainer', title: 'popupTitle', description: 'popupDescription'}
Store notifications in an array

*/
