import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const delay = Number(e.target.elements.delay.value);
    const state = e.target.elements.state.value;

    const promis = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state == "fulfilled"){
                resolve(delay);
            }else{
                reject(delay);
            }
        }, delay)
    })

    promis
        .then((delay) => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'OK',
                message: `❌ Rejected promise in ${delay}ms`,
            });
        });
})