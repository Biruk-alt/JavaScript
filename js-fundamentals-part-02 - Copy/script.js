

// challange *1

const calcavgDolphin = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const calcavgKoalas = (score1, score2, score3) => (score1 + score2 + score3) / 3;

function checkWinner(calcavgDolphin, calcavgKoalas) {
    if (calcavgDolphin > calcavgKoalas && calcavgDolphin >= 2 * calcavgKoalas) {
            console.log(`Dolphin win`);
    } else if (calcavgDolphin < calcavgKoalas && calcavgKoalas >= 2 * calcavgDolphin) {
            console.log(`Koalas win`);
    } else {
            console.log(`No team wins`);
    }

}

const scoreDolphin = calcavgDolphin(85, 54, 41);
const scoreKoalas = calcavgKoalas(23, 34, 27);

checkWinner(scoreDolphin, scoreKoalas);




// challange *2 

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
   


const bill = [125,555,44];
const tips = [calcTip(bill[0]),calcTip(bill[1]), calcTip(bill[bill.length-1])];
const total = [bill[0] + tips[0], bill[1] + tips[1], bill[bill.length-1] + tips[tips.length-1]];

console.log(bill, tips, total);
    



// challange *3

const mark = {
    name: "Mark",
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.markBMI = this.mass / this.height**2;
        return this.markBMI;
    }
}

const john = {
    name: "John",
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.johnbmi = this.mass / this.height**2;
        return this.johnbmi;
    }
}

if (mark.calcBMI() > john.calcBMI()) {
    console.log(`${mark.name}'s BMI (${mark.calcBMI()}) is greater than ${john.name}'s BMI ${john.calcBMI()}`)
} else {
      console.log(`${john.name} (${john.calcBMI}) is greater than ${mark.name} BMI (${mark.calcBMI})`)
} 




// challange 4


const bill = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const total = [];


function calcTip(bill) {
 return  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}


for (i=0; i < bill.length; i++) {
  tips.push(calcTip(bill[i]));
  total.push(bill[i] + tips[i]);
}

console.log(tips);
console.log(total);

// calculating average

function calcAverage(arry) {
  let sum =0;
  for (let i=0; i < arry.length; i++) {
    sum = sum + arry[i];
  }
   return sum / arry.length;
}


const arry = [5,3,2];

console.log(calcAverage(arry));