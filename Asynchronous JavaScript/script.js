// // // // "use strict";

const countriesCont = document.querySelector(`.countries`);
const btn = document.querySelector(`.btn-country`);
const imagesDiv = document.querySelector(`.images`);

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

const renderCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://countries.dev/name/${country}`);
  request.send();

  request.addEventListener(`load`, function (e) {
    const data = JSON.parse(this.responseText);
    render(data);

    // get neighbor country
    const request2 = new XMLHttpRequest();
    const neighbor = data[0].borders[0];
    request2.open(`GET`, `https://countries.dev/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener(`load`, function (e) {
      const data2 = JSON.parse(this.responseText);

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
    });
  });
};

// // // // // renderCountry(`spain`);

// // // // //////////////////////////////////////////
// // // // //using modern way
// // // // const renderNeighbor = function (data2) {
// // // //   const html = `
// // // //         <article class="country neighbour">
// // // //           <img class="country__img" src="${data2.flags.png}" />
// // // //           <div class="country__data">
// // // //             <h3 class="country__name">${data2.name}</h3>
// // // //             <h4 class="country__region">${data2.region}</h4>
// // // //             <p class="country__row"><span>👫</span>${(+data2.population / 1000000).toFixed(1)} people</p>
// // // //             <p class="country__row"><span>🗣️</span>${data2.languages[0].name}</p>
// // // //             <p class="country__row"><span>💰</span>${data2.currencies[0].code}</p>
// // // //           </div>
// // // //         </article>
// // // //     `;

// // // //   countriesCont.insertAdjacentHTML(`beforeend`, html);
// // // //   countriesCont.style.opacity = 1;
// // // // };

// // // // const renderError = function (msg) {
// // // //   countriesCont.insertAdjacentText(`beforeEnd`, msg);
// // // //   // countriesCont.style.opacity = 1;
// // // // };

// // // // const getCountryData = function (country) {
// // // //   getJSON(`https://countries.dev/name/${country}`, `Country not found`)
// // // //     .then(function (data) {
// // // //       render(data);

// // // //       //country 2
// // // //       const neighbor = data[0].borders?.[0];

// // // //       if (!neighbor) {
// // // //         throw new Error(`No neighbours found`);
// // // //       }

// // // //       return getJSON(
// // // //         `https://countries.dev/alpha/${neighbor}`,
// // // //         `country not found`,
// // // //       );
// // // //     })
// // // //     .then(function (data2) {
// // // //       renderNeighbor(data2);
// // // //     })
// // // //     .catch((err) => {
// // // //       renderError(`something went wrong - ${err.message}. Try again!`);
// // // //     })
// // // //     .finally(() => (countriesCont.style.opacity = 1));
// // // // };

// // // //  btn.addEventListener(`click`, function (e) {
// // // //         // if(!data.address.country) console.log(`nahanahaaj`)

// // // //         getCountryData(`ethiopia`);
// // // //       });

// // // // // CHALLANGE #1

// // // // const whereAmI = function (lat, lng) {
// // // //   fetch(
// // // //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
// // // //   )
// // // //     .then((response) => {
// // // //       if (!response.ok) throw new Error(`not ok ✅✅✅`);

// // // //       return response.json();
// // // //     })
// // // //     .then((data) => {
// // // //       return fetch(`https://countries.dev/name/${data.address.country}`)
// // // //     })
// // // //     .then(response => response.json())
// // // //     .then(data => render(data))
// // // //     .catch((err) => console.error(err));
// // // // };

// // // // navigator.geolocation.getCurrentPosition(function (position) {
// // // //   const latitude = position.coords.latitude;
// // // //   const longitude = position.coords.longitude;

// // // //   // whereAmI(latitude, longitude);
// // // //     // whereAmI(40.7128, -74.006);
// // // //   // whereAmI(28.6139, 77.2090)
// // // // });

// // // // /////////////////////////////////////
// // // // building promises
// // // // const lotteryPromise = new Promise(function(resolve, reject) {
// // // //   console.log(`lottery started`)
// // // //   setTimeout(function() {
// // // //     if(Math.random() >= 0.5) {
// // // //       resolve(`you wonnnnn`)
// // // //     } else {
// // // //       reject(`you lost you moneyyyyy`)
// // // //     }
// // // //   }, 2000)
// // // // })

// // // // lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// // // // setTimeout(() => {
// // // //   console.log(`1 second passed`)
// // // //   setTimeout(() => {
// // // //     console.log(`2 seconds passed`)
// // // //     setTimeout(() => {
// // // //       console.log(`3 seconds passed`)
// // // //     }, 1000)
// // // //   }, 1000)
// // // // }, 1000)

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // // // wait(2)
// // // //   .then(() => {
// // // //     console.log(`i waited for 2 seconds`);
// // // //     return wait(1);
// // // //   })
// // // //   .then(() => {
// // // //     console.log(`1 second passed`);
// // // //     return wait(1);
// // // //   })
// // // //   .then(() => {
// // // //     console.log(`2 second passed`);
// // // //     return wait(1);
// // // //   })
// // // //   .then(() => {
// // // //     console.log(`3 second passed`);
// // // //     return wait(1);
// // // //   });

// // // // Promise.resolve(`abc`).then((x) => console.log(x))
// // // // Promise.reject(new Error(`problem`)).catch((err) => console.error(err))

// // // setTimeout(() => console.log("done"), 1000);

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

// // // wait(2).then(() => console.log(`i waited 2 seconds`))

// // ////////////////////////////
// // //promisifying geolocation

// // const whereAmI = function () {
// //   getPosition()
// //     .then((pos) => {
// //       const {latitude: lat, longitude: lng} = pos.coords
// //       return fetch(
// //         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
// //       );
// //     })

// //     .then((response) => {
// //       if (!response.ok) throw new Error(`not ok ✅✅✅`);

// //       return response.json();
// //     })
// //     .then((data) => {
// //       return fetch(`https://countries.dev/name/${data.address.country}`);
// //     })
// //     .then((response) => response.json())
// //     .then((data) => render(data))
// //     .catch((err) => console.error(err));
// // };

// // btn.addEventListener(`click`, function () {
// //   whereAmI();
// // });

// //CHALANGE #2
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement(`img`);
//     img.src = imgPath;

//     img.addEventListener(`load`, function () {
//       resolve(img);
//       imagesDiv.append(img);
//     });

//     img.addEventListener(`error`, function () {
//       reject(`image not found`);
//     });
//   });
// };

// let currentImg;

// createImage(`./imgs/img-1.jpg`)
//   .then((img) => {
//     currentImg = img;
//     console.log(`image 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = `none`;
//     return createImage(`./imgs/img-2.jpg`)
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log(`image 2 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = `none`;
//   })
//   .catch(err => console.error(err))

///////////////////////////////////////////
//AsyncAwait
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function (country) {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     const resGeo = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//     );

//     const dataGeo = await resGeo.json();
//     renderCountry(dataGeo.address.country);

//     return `you are in ${dataGeo.address.city},  ${dataGeo.address.country}`;
//   } catch {
//     // (err) => console.log(err.message);
//   }
// };

// (async function () {
//   try {
//     const msg = await whereAmI();
//     // console.log(msg)
//   } catch (err) {
//     // console.log(err.message)
//   }
// })();

// whereAmI(`ethiopia`);
// whereAmI().then(async function (location) {
//   const msg = await location;
//   console.log(msg);
// });

///////////////////////////
// running promises in parallel
const getJSON = function (url, errorMsg = `Something Went Wrong`) {
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const data1 = await getJSON(`https://countries.dev/name/${c1}`);
//     // const c1Cap = data1[0].capital

//     // const data2 = await getJSON(`https://countries.dev/name/${c2}`);
//     // const c2Cap = data2[0].capital

//     // const data3 = await getJSON(`https://countries.dev/name/${c3}`);
//     // const c3Cap = data3[0].capital

//     const dataAll = await Promise.all([
//       getJSON(`https://countries.dev/name/${c1}`),
//       getJSON(`https://countries.dev/name/${c2}`),
//       getJSON(`https://countries.dev/name/${c3}`),
//     ]);

//     console.log(dataAll.map(d => d[0].capital));
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries(`ethiopia`, `portugal`, `kenya`);

////////////////////////////
//other promise combinators

// Promise.race()
(async function () {
  const data = await Promise.race([
    getJSON(`https://countries.dev/name/italy`),
    getJSON(`https://countries.dev/name/ethiopia`),
    getJSON(`https://countries.dev/name/egypt`),
  ]);

  // console.log(data[0]);
})();

const timeOut = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(`Request took too long! 💥`);
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://countries.dev/name/egypt`), timeOut(0.1)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve(`success`),
  Promise.reject(`error`),
  Promise.resolve(`anothersuccess`),
]).then((res) => console.log(res));

// Promise.any
Promise.any([
  Promise.resolve(`success`),
  Promise.reject(`error`),
  Promise.resolve(`anothersuccess`),
]).then((res) => console.log(res));

// CHALLANGE #3
let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement(`img`);
    img.src = imgPath;

    img.addEventListener(`load`, function () {
      resolve(img);
      imagesDiv.append(img);
    });

    img.addEventListener(`error`, function () {
      reject(`image not found`);
    });
  });
};

const loadNPause = async function (imgP) {
  // image 1
  try {
    let img = await createImage(imgP);
    console.log(`image 1 loaded`);
    await wait(2);
    img.style.display = `none`;

    img = await createImage(imgP);
    console.log(`image 2 loaded`);
    await wait(2);
    img.style.display = `none`;
  } catch (err) {
    console.log(err);
  }
};

loadNPause(`./imgs/img-1.jpg`);

const loadAll = async function (imgArr) {
  try {
    const promiseImgs = imgArr.map( (img) => {
       return createImage(img);
    });

    const imgs = await Promise.all(promiseImgs)
    console.log(imgs);

    imgs.forEach(img => img.classList.add(`parallel`))

  } catch (err) {
    console.log(err);
  }
};

loadAll([`./imgs/img-1.jpg`, `./imgs/img-2.jpg`, `./imgs/img-1.jpg`]);

// createImage(`./imgs/img-1.jpg`)
//   .then((img) => {
//     currentImg = img;
//     console.log(`image 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = `none`;
//     return createImage(`./imgs/img-2.jpg`)
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log(`image 2 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = `none`;
//   })
//   .catch(err => console.error(err))
