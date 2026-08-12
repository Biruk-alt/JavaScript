/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const { createElement } = require("react");

Challange *2

const game = {
  team1: "Bayern Munich",
  team2: "Borussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...scorers) {
    console.log(...scorers);
    console.log(scorers.length);
  },
};

for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

let average = 0;
const odds = Object.values(game.odds);

for (const value of odds) {
  average += value;
}

average /= odds.length;
console.log(average);

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "Draw" : game[team];
  console.log(`odd of victory ${teamStr}: ${odd}`);
}

Challange * 2
const gameEvents = new Map([
  [17, "Goal"],
  [36, "substitution"],
  [47, "Goal"],
  [61, "substitution"],
  [64, "yellow card"],
  [69, "red card"],
  [70, "substitution"],
  [72, "substitution"],
  [76, "Goal"],
  [80, "Goal"],
  [92, "yellow card"],
]);

const events = [...gameEvents.values()];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

const time = [...gameEvents.keys()].pop()
console.log(`an event happened, on average, every ${time / gameEvents.size} minutes`)

for (const [min, event] of gameEvents) {
  const half = min <= 45 ? "FIRST" : "SECOND";
  const half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${min}: ${event}`)
}


// notes


const airline = "TAP Air Portugal";

console.log(airline.lastIndexOf("A"))
console.log(airline.indexOf("r"))
console.log(airline.slice(4, 7));

console.log(airline.slice(airline.lastIndexOf(" ")));
const check = function (seat) {
    
    const s = seat.slice(-1);

    if (s === "B" || s === "E") console.log(`you go middle seat`);
    else console.log(`you are lucky`)
}

check("11C");
check("34B");
check("6E");

// fix capitalization in name

const correct = function(name) {
    const nameLower = name.toLowerCase();
    const nameCorrect = nameLower[0].toUpperCase() + nameLower.slice(1);
    console.log(nameCorrect);
}

correct( "bIrUK")

// comparing email

const email = "hello@gmail.com";
const loginEmail = "  HeLlo@Gmail.com";

const correctEmail = loginEmail.toLowerCase().trim();
console.log(correctEmail);

// Replacing 

const priceGB = "288,19£";
const priceUS = priceGB.replace(",", ".").replace("£", "$");
console.log(priceUS);

const message = "replace door with door"
const correctMsg = message.replaceAll("door", "gate");
console.log(correctMsg);

// Booleans

const plane = "Airbus A32neo";
console.log(plane.includes("A32"));
    if (plane.startsWith("Airbus") && plane.endsWith("neo")) console.log(`part of the new family`);

const checkBaggage = function(items) {
    const baggage = items.toLowerCase();
    if (baggage.includes("knife") || baggage.includes("gun")) console.log("You are not allowed!")
    else console.log("you are allowed")
}

checkBaggage("knife,laptop,Snack");
checkBaggage(",laptop,Snack");
checkBaggage("knife,laptop,Gun");

// split and join


const name = "biruk assefa";
const [firstName, secondName] = name.split(" ");
const fullName = ["Mr.", firstName, secondName.toUpperCase()].join(" ");
console.log(fullName);

const capitalizeName = function(name) {
    const names = name.toLowerCase().split(" ")
    const newNames = [];
    for (const n of names) {
        newNames.push(n.replace(n[0],n[0].toUpperCase()))
    
    }
    console.log(newNames.join(" "));
}

capitalizeName("biruk assefa Sintayehu")
capitalizeName("Alex mahiselam goodu fela")


// padding

const intro = "my name is biruk assefa";
console.log(intro.padStart(25, "-").padEnd(40, "-"))

const maskCredit = function(digits) {
    const str = digits + "";
    const sliceStr = str.slice(-4);
    console.log(sliceStr.padStart(str.length, "*"));
}

maskCredit(12345678);
maskCredit(1884545775739357);

// repeat

const message2 = "bad weather... ";
console.log(message2.repeat(5));

const planesInLine = function(n) {
    console.log(`their are ${n} planes waiting,  ${"✈️".repeat(n)}`)
}

planesInLine(5)
planesInLine(3)







// challange * 4

document.querySelector("button").addEventListener("click", function() {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");
  
  for (let [i, row] of rows.entries()) {
    row = row.toLowerCase().trim();
    row = row.split("_");
    let [first, second] = row;
    const output = `${first}${second.replace(second[0],second[0].toUpperCase())}`
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
})

// underscore_case
// first_name
// some_variable
// calculate_age
// delayed_departure




// challange * 5

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25' +
  '+_Arrival;bru0943384722;fao93766109;11:45' +
  '+_Delayed_Arrival;hel7439299980;fao93766109;12:05' +
  '+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//              Departure from FAO to LIS (12h30)



const getTime = str => str.slice(0,3).toUpperCase()


for (let flight of flights.split('+')) {
  flight = flight.split(';');
  const [type, from, to, time] = flight;
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll("_", " ")} from ${getTime(from)} to ${getTime(to)} (${time.replace(":", "h")})`
  console.log(output.padStart(45));
}
