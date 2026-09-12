"use strict";

const countriesCont = document.querySelector(`.countries`);
const btn = document.querySelector(`.btn-country`);

const render = function (data) {
  const html = `
        <article class="country">
          <img class="country__img" src="${data[0].flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data[0].name}</h3>
            <h4 class="country__region">${data[0].region}</h4>
            <p class="country__row"><span>👫</span>${(+data[0].population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data[0].languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data[0].currencies[0].code}</p>
          </div>
        </article>
    `;

  countriesCont.insertAdjacentHTML(`beforeend`, html);
  countriesCont.style.opacity = 1;
};

// const renderCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(`GET`, `https://countries.dev/name/${country}`);
//   request.send();

//   request.addEventListener(`load`, function (e) {
//     const data = JSON.parse(this.responseText);
//     console.log(data);
//     render(data);

//     // get neighbor country
//     const request2 = new XMLHttpRequest();
//     const neighbor = data[0].borders[0];
//     request2.open(`GET`, `https://countries.dev/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener(`load`, function (e) {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//   const html = `
//     <article class="country neighbour">
//       <img class="country__img" src="${data2.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data2.name}</h3>
//         <h4 class="country__region">${data2.region}</h4>
//         <p class="country__row"><span>👫</span>${(+data2.population / 1000000).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data2.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data2.currencies[0].code}</p>
//       </div>
//     </article>
// `;

//   countriesCont.insertAdjacentHTML(`beforeend`, html);
//   countriesCont.style.opacity = 1;
//     });
//   });
// };

// renderCountry(`spain`);

//////////////////////////////////////////
//using modern way
const renderNeighbor = function (data2) {
  const html = `
        <article class="country neighbour">
          <img class="country__img" src="${data2.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data2.name}</h3>
            <h4 class="country__region">${data2.region}</h4>
            <p class="country__row"><span>👫</span>${(+data2.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data2.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data2.currencies[0].code}</p>
          </div>
        </article>
    `;

  countriesCont.insertAdjacentHTML(`beforeend`, html);
  countriesCont.style.opacity = 1;
};

const renderError = function (msg) {
  countriesCont.insertAdjacentText(`beforeEnd`, msg);
  // countriesCont.style.opacity = 1;
};

const getJSON = function (url, errorMsg = `Something Went Wrong`) {
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://countries.dev/name/${country}`, `Country not found`)
    .then(function (data) {
      render(data);

      //country 2
      const neighbor = data[0].borders?.[0];

      if (!neighbor) {
          throw new Error(`No neighbours found`)
        };
        
        return getJSON(`https://countries.dev/alpha/${neighbor}`, `country not found`)
    })
    .then(function (data2) {
        renderNeighbor(data2);
    })
    .catch((err) => {
        renderError(`something went wrong - ${err.message}. Try again!`);
    })
    .finally(() => (countriesCont.style.opacity = 1));
};

btn.addEventListener(`click`, function (e) {
  getCountryData(`ethiopia`);
});

getCountryData(`australia`);




// CHALLANGE #1
const whereAmI = function(lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
}

navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    whereAmI(latitude, longitude);
})

