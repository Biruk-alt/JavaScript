const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium"
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "basic"
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "premium"
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic"
};

const accounts = [account1, account2, account3, account4];
const containerMovements = document.querySelector(".movements");
const currentMoney = document.querySelector(".current-money");
const balanceIn = document.querySelector(".inhead");
const balanceout = document.querySelector(".outhead");
const balanceInterest = document.querySelector(".inthead");
const enterBtn = document.querySelector(".btn");
const inputUser = document.querySelector(".login__input--user");
const inputPin = document.querySelector(".login__input--pin");
const main = document.querySelector("main");
const welcome = document.querySelector(".welcome");
const transferBtn = document.querySelector(".enter-btn");
const transferAmount = document.querySelector(".transfer-amt");
const receiveraccount = document.querySelector(".name");
const closeBtn = document.querySelector(".close-btn");
const confirmUser = document.querySelector(".close-name");
const confirmPin = document.querySelector(".close-pin");
const loanBtn = document.querySelector(".loan-btn");
const inputLoan = document.querySelector(".loan-amt");
const sortBtn = document.querySelector(".sort-btn");

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = ` 
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov} £</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const updateUi = function (acc) {
  displayMovement(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummery(acc);
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  });
  currentMoney.textContent = `${acc.balance} £`;
};

const calcDisplaySummery = function (acc) {
  const income = acc.movements
    .filter(function (movement) {
      return movement > 0;
    })
    .reduce(function (acc, movement) {
      return acc + movement;
    });
  balanceIn.textContent = `${income} £`;

  const out = acc.movements
    .filter(function (movement) {
      return movement < 0;
    })
    .reduce(function (acc, movement) {
      return acc + Math.abs(movement);
    }, 0);
  balanceout.textContent = `${out}`;

  const interest = acc.movements
    .filter(function (movement) {
      return movement > 0;
    })
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .filter(function (int) {
      return int >= 1;
    })
    .reduce(function (acc, deposit) {
      return acc + deposit;
    });
  balanceInterest.textContent = `${interest} £`;
};

const createUserName = function (accs) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserName(accounts);

let sort = false

sortBtn.addEventListener("click", function(e) {
  e.preventDefault;
  displayMovement(currentAccount.movements,!sort);
  sort = !sort;
})


// log in
let currentAccount;

enterBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputUser.value;
  });
  if (currentAccount?.pin === Number(inputPin.value)) {
    welcome.textContent = `welcome Back, ${currentAccount.owner.split(" ")[0]}`;
    main.style.opacity = 100;

    updateUi(currentAccount);

    inputUser.value = inputPin.value = "";
  }
});

// transfer
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(transferAmount.value);
  const receiverAcc = accounts.find(function (acc) {
    return acc.username === receiveraccount.value;
  });
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc !== currentAccount
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    transferAmount.value = receiveraccount.value = "";

    updateUi(currentAccount);
  }
});

// close
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAccount.username === confirmUser.value &&
    Number(confirmPin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });

    accounts.splice(index, 1);
    main.style.opacity = 0;
    confirmPin.value = confirmUser.value = "";
  }
});

//load
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoan.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
  }
});

 
const grouped = Object.groupBy(accounts, account => {
  const movLength = account.movements.length;
  if (movLength >= 8) return "very Active";
  if(movLength >=4) return "Active";
  if(moveLength >= 1) return "Low"
})

console.log(grouped);

