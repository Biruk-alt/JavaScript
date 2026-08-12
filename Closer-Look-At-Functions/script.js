// // Bind Method
// const luftansha = {
//   airline: "Luftansha",
//   iataCode: "LH",
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
//     );
//   },
// };

// luftansha.planes = 300;
// luftansha.buyPlane = function () {
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector(".buy")
//   .addEventListener("click", luftansha.buyPlane.bind(luftansha));

// // const addTax = (rate, value) => value + rate * value
// // console.log(addTax(0.1, 200));

// // const addVAT = addTax.bind(null, 0.23);
// // console.log(addVAT(100));

// const addTax = function (value) {
//   return function (rate) {
//     return value + value * rate
//   };
// };

// console.log(addTax(100)(0.23));


// // Challange * 1

// const poll = {
//     question: "What is your favourite programming language?",
//     options: ["0: Javascript", "1: Python", "2: Rust", "3: Java"],
//     answers: new Array(4).fill(0),

//     registerNewAnswer() {
//         const answer = Number(prompt(`${this.question}\n${this.options.join("\n")}\n(Write option number)`))
//         typeof answer === "number" && answer < this.answers.length && answer >= 0 && this.answers[answer]++
//         this.displayResults();
//         this.displayResults("string")
//     },

//     displayResults(type = "array") {
//         if (type === "array") {
//             console.log(this.answers)
//         } else if (type === "string") {
//             console.log(`poll results are ${this.answers.join(", ")}`)
//         }
//     }
// }

// document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll))
// poll.displayResults.call({answers: [5,2,3]})


// // IIFE
// (function() {
//     console.log(`this will never run again`);
// })();


//CHALLANGE #2
(function() {
    const header = document.querySelector("h1")
    header.style.color = "red";

    document.body.addEventListener("click", function() {
    const header = document.querySelector("h1")
    header.style.color = "blue"
})
})()

