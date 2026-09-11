"use strict";

const form = document.querySelector(`.form`);
const inputDistance = document.querySelector(`.form__input--distance`);
const inputDuration = document.querySelector(`.form__input--duration`);
const inputCadence = document.querySelector(`.form__input--cadence`);
const inputElevation = document.querySelector(`.form__input--elevation`);
const inputType = document.querySelector(`.form__input--type`);
const container = document.querySelector(`.workouts`);

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  type = `running`;
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = `cycling`;
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 40, 60, 178);
// const cyc1 = new Cycling([39,-12], 50, 30, 180);

// console.log(run1);
// console.log(cyc1);

//////////////////////////////////////////////
// APPLICATION ARCHETECTURE

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];

  constructor() {
    //find user position
    this._getPosition();
    
    // load data from local storage
    this._getWorkouts();

    //handle evemt listners
    form.addEventListener(`submit`, this._newWorkout.bind(this));
    inputType.addEventListener(`change`, this._toggleElevationField);
    container.addEventListener(`click`, this._moveToPopup.bind(this));

  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert(`can not access location!`);
      },
    );
  }

  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},12z?entry=ttu&g_ep=EgoyMDI2MDkwNi4wIKXMDSoASAFQAw%3D%3D`,
    );

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on(`click`, this._showForm.bind(this));

    this.#workouts.forEach(workout => {
      workout.date = new Date(workout.date)
      this._renderMarker(workout)
  })

  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    inputDistance.focus();
    form.classList.remove(`hidden`);
  }

  _hideForm() {
      inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        "";

      form.classList.add(`hidden`);
      form.computedStyleMap.display = `none`;
      setTimeout(() =>  form.computedStyleMap.display = `grid`, 1000)
  }

  _toggleElevationField() {
    inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }

  _newWorkout(e) {
    e.preventDefault();

    const validInputs = function (...inputs) {
      return inputs.every((inp) => Number.isFinite(inp));
    };

    const positiveInputs = function (...inputs) {
      return inputs.every((inp) => inp > 0);
    };
    // get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const cadence = +inputCadence.value;
    const elevation = +inputElevation.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    
    // if workout running, creating running object
    if (type === `running`) {
      // chek if the datas are valid
      if (
        !validInputs(distance, duration, cadence) ||
        !positiveInputs(distance, duration, cadence)
      ) {
        return alert(`Inputs must be positive numbers`);
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // if workout cycling, creating cycling object
    if (type === `cycling`) {
      // chek if the datas are valid
      if (
        !validInputs(distance, duration, elevation) ||
        !positiveInputs(distance, duration)
      ) {
        return alert(`Inputs must be positive numbers`);
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // push the new workouts to the workouts array
    this.#workouts.push(workout);

    //render marker on map
    this._renderMarker(workout);

    
    
    console.log(this._listDescription(workout))

    //render workout list
    this._renderWorkout(workout);

    //set local storage to all workouts
    this._setLocalStorage();
    
  }

  _listDescription(workout) {
    const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 
     if(workout.type === `running`) {
      return `Running on ${months[workout.date.getMonth()]} ${workout.date.getDate()}`
     }

    if(workout.type === `cycling`) {
      return `Cycling on ${months[workout.date.getMonth()]} ${workout.date.getDate()}`
     }
  }

  _renderWorkout(workout) {
    let html = `
     <li class="workout workout--${workout.type}" data-id=${workout.id}>
        <h2 class="workout__title">${this._listDescription(workout)}</h2>
        <div class="workout__details">
            <span class="workout__icon">${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === `running`) {
        console.log(`pace: ${workout.pace}`);
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">178</span>
            <span class="workout__unit">spm</span>
        </div>
        `;
    }

    if(workout.type === `cycling`) {
        html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">223</span>
            <span class="workout__unit">m</span>
        </div>
        `
    }

    form.insertAdjacentHTML(`afterend`, html);
    this._hideForm();
  }

  _renderMarker(workout) {
      const [lat, lng] = workout.coords;
      console.log(lat, lng)
     L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }),
      )
      .setPopupContent(`${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`} ${this._listDescription(workout)}`)
      .openPopup();
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(`.workout`);

    if(!workoutEl) return;

    const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1
      },
    })
  

  }

_setLocalStorage() {
  localStorage.setItem(`workouts`, JSON.stringify(this.#workouts))
}

_getWorkouts() {
  const data = JSON.parse(localStorage.getItem(`workouts`));
  console.log(data);

  if(!data) return;

  this.#workouts = data;
  this.#workouts.forEach(workout => {
    workout.date = new Date(workout.date)
    this._renderWorkout(workout)
  })
}

reset() {
  localStorage.removeItem(`workouts`);
  location.reload();
}

}

const app = new App();
