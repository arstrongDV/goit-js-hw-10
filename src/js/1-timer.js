import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("button");

button.disabled = true;

let userSelectedDate = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();
      button.disabled = false;
    } else {
     button.disabled = true;
    iziToast.error({
        title: 'OK',
        message: 'Please choose a date in the future',
    });
    }
  },
});

class Timer {
    constructor({ onTick, convertMs, isActive }){
        this.onTick = onTick;
        this.isActive = isActive;
        this.convertMs = convertMs;
        this.intervalId = null;
    }

    start(){
        if (this.isActive) return;
        if (!userSelectedDate) return;
        
        this.isActive = true;
        button.disabled = true;
        input.disabled = true;

        this.intervalId = setInterval(() => {
            const deltaTime = userSelectedDate - Date.now();

            if (deltaTime <= 0) {
                this.stop();
                return;
            }

            this.onTick(this.convertMs(deltaTime));
        }, 1000)
    }

    stop() {
        this.isActive = false;
        input.disabled = false;

        if (this.intervalId) {
            clearInterval(this.intervalId); 
            this.intervalId = null;
        }
      }
    
}

function convertMs(time) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    return {
        days: String(Math.floor(time / day)).padStart(2, "0"),
        hours: String(Math.floor((time % day) / hour)).padStart(2, "0"),
        minutes: String(Math.floor((time % hour) / minute)).padStart(2, "0"),
        seconds: String(Math.floor((time % minute) / second)).padStart(2, "0"),
      };
  }

const updateTime = ({ days, hours, minutes, seconds }) => {
    document.querySelector("[data-days]").textContent = days;
    document.querySelector("[data-hours]").textContent = hours;
    document.querySelector("[data-minutes]").textContent = minutes;
    document.querySelector("[data-seconds]").textContent = seconds;
  };

const timer = new Timer({
    onTick: updateTime,
    convertMs,
    isActive: false
});

button.addEventListener('click', timer.start.bind(timer));