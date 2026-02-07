import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = Number(e.target.elements.delay.value);
    const state = e.target.elements.state.value;

    const promis = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state == "fulfilled"){
                resolve(`✅ Fulfilled promise in ${input}ms`);
            }else{
                reject(`❌ Rejected promise in ${input}ms`);
            }
        }, input)
    })

    promis
        .then((msg) => {
            iziToast.success({
                title: 'OK',
                message: msg,
            });
        })
        .catch((msg) => {
            iziToast.error({
                title: 'OK',
                message: msg,
            });
        });
})