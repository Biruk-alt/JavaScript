
"use strict";

// constructor function
const Person = function(firstNmae, birthYear) {
    this.firstNmae = firstNmae;
    this.birthYear = birthYear
}

const biruk = new Person("Biruk", 2007);
console.log(biruk);

const alex = new Person("alex", 2000);
const mahi = "mahi";

console.log(alex instanceof Person)
console.log(mahi instanceof Person)


// prototypes
Person.prototype.calcAge = function() {
    console.log(2026 - this.birthYear);
}

biruk.calcAge();
alex.calcAge();

console.log(biruk.__proto__)
console.log(Person.prototype.isPrototypeOf(biruk));

Person.prototype.species = `human`;
console.log(biruk.species)


// Object.prototype (top of the prototype chain)
console.log(biruk.__proto__.__proto__)
console.log(biruk.__proto__.__proto__.__proto__)

const arr =[1,1,2,3,3];
console.log(arr.__proto__)

Array.prototype.unique = function() {
    return [...new Set(this)]
}

console.log(arr.unique());


//CHALLANGE #1
const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

//1
Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} is going at   ${this.speed}km/h`)
}

const bmw = new Car("bmw", 120);
bmw.accelerate();

//2
Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} is going at  ${this.speed}km/h`)
}

const toyota = new Car("toyota", 120);
toyota.brake();

//3
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();




// ES6 classes

class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge() {
        console.log(2026 - this.birthYear);
    }

    set fullName(name) {
        if(name.includes(" ")) return this._fullName = name
        else alert(`${name} is not a full name`)
    }

    get fullName() {
        return this._fullName
    }
}

const biruk = new PersonCl('Biruk Assefa', 2007);
biruk.calcAge();


// setters and getters
const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        return this.movements.push(mov);
    },

  
}

console.log(account.latest);
account.latest = 400;
console.log(account.movements)

console.log(biruk.fullName);


// Object.create
const PersonProto = {
    calcAge(){
        console.log(2026 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const mahiselam = Object.create(PersonProto);
console.log(mahiselam);

mahiselam.name = 'Mahiselam';
mahiselam.birthYear = 2007;
mahiselam.calcAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();


// CHALLANGE #2
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

const bmw = new CarCl(`BMW`, 120);
console.log(bmw)

bmw.speedUS = 50;
console.log(bmw)



// inheritance between classes
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);

const biruk = new Student('biruk', 2000, 'computer science');
console.log(`biruk`, biruk);
biruk.calcAge();

console.log(biruk instanceof Person);



// CHALLANGE #3
const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}
   

const EV = function(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);

Car.prototype.chargeBattery = function(chargeTo) {
    return this.charge = chargeTo;
}

Car.prototype.accelerate = function() {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`);
}

const tesla = new EV('Tesla', 120, 23);
console.log(tesla.chargeBattery(90));

tesla.accelerate();





// inheritance between classes with ES6 classes
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
    }

    brake() {
        this.speed -= 10;
    }

    calcAvg() {
        console.log(this.speed/2)
    }
}



const volvo = new CarCl('Volvo', 200);

class EVCl extends CarCl{
    constructor(make, speed, charge) {
        super(make, speed);
        this.charge = charge;
    }

    calcAvg() {
        console.log(this.speed / 4);
    }
}


const tesla = new EVCl('Tesla', 100, 100);

console.log(tesla);
tesla.calcAvg();



// inheritance between classes with Object.create
const PersonProto = {
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
    
    calcAge() {
        console.log(2037 - this.birthYear);
    }
}

const StudentProto = Object.create(PersonProto);

const biruk = Object.create(StudentProto);

biruk.init('Biruk', 1998);
console.log(biruk);
