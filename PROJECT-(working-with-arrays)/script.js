const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
  movementsDate: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2026-10-13T09:15:04.904Z",
    "2026-08-15T10:17:24.185Z",
  ],
  local: `am-ET`,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "basic",
  movementsDate: [
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T14:23:22.123Z",
    "2020-01-05T16:54:11.908Z",
    "2020-02-12T18:30:00.000Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T14:23:22.123Z",
    "2020-01-05T16:54:11.908Z",
    "2020-02-12T18:30:00.000Z",
  ],
  local: `en-US`,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "premium",
  movementsDate: [
    "2025-05-01T10:00:00.000Z",
    "2025-07-15T14:30:00.000Z",
    "2025-09-20T09:15:00.000Z",
    "2025-11-10T16:45:00.000Z",
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2026-10-13T09:15:04.904Z",
    "2026-08-15T10:17:24.185Z",
  ],
  local: `de-DE`,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic",
  movementsDate: [
    "2025-02-14T11:00:00.000Z",
    "2025-06-18T13:20:00.000Z",
    "2025-08-22T15:40:00.000Z",
    "2025-12-05T09:30:00.000Z",
    "2025-06-18T13:20:00.000Z",
  ],
  local: `am-ET`,
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
const labelDate = document.querySelector(".date");
const outTimer = document.querySelector(".timer");

const handleDate = function (date, local) {
  const daysPassed = function (data1, data2) {
    return Math.floor(Math.abs(data2 - data1) / (1000 * 60 * 60 * 24));
  };

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const days = daysPassed(new Date(), date);
  if (days === 0) return "Today";
  else if (days === 1) return "Yesterday";
  else if (days <= 7) return `${days} ago`;
  const options = {
    hour: `numeric`,
    minute: `numeric`,
    day: `numeric`,
    month: `numeric`,
    year: `numeric`,
  };
  return Intl.DateTimeFormat(local, options).format(date);
};

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements
        .map((mov, i) => ({ mov, date: acc.movementsDate[i] }))
        .sort((a, b) => a.mov - b.mov)
    : acc.movements.map((mov, i) => ({ mov, date: acc.movementsDate[i] }));

  movs.forEach(function ({ mov, date }, i) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const movementDate = new Date(date);
    const displayDate = handleDate(movementDate, acc.local);
    const formatedMov = formatCur(mov, acc);

    const html = ` 
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formatedMov}</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const updateUi = function (acc) {
  displayMovement(acc);
  calcDisplayBalance(acc);
  calcDisplaySummery(acc);
};

const formatCur = function (value, acc) {
  return new Intl.NumberFormat(acc.local, {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  });
  const formatedMon = formatCur(acc.balance, acc)
  currentMoney.textContent = `${formatedMon} `;
};

const calcDisplaySummery = function (acc) {
  const income = acc.movements
    .filter(function (movement) {
      return movement > 0;
    })
    .reduce(function (acc, movement) {
      return acc + movement;
    });
    const formatedIncome = formatCur(income, acc)
  balanceIn.textContent = `${formatedIncome}`;

  const out = acc.movements
    .filter(function (movement) {
      return movement < 0;
    })
    .reduce(function (acc, movement) {
      return acc + Math.abs(movement);
    }, 0);
    const formatedOut = formatCur(out, acc)
  balanceout.textContent = `${formatedOut}`;

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
    const formatedInterest = formatCur(interest, acc)
  balanceInterest.textContent = `${formatedInterest}`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserName(accounts);

let sort = false;

sortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!currentAccount) return;
  displayMovement(currentAccount, !sort);
  sort = !sort;
});

let myTimer

const logOutTimer = function() {
  let time = 600;

  const tick =function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec =  String(time % 60).padStart(2, 0); 
    outTimer.textContent =`${min}:${sec}`;
    time--;
    if (time === 0) {
      welcome.textContent = `Log in to get started`;
      main.style.opacity = 0;
    }
  }

  return myTimer = setInterval(tick, 1000);
}

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

    const now = new Date();
    const options = {
      hour: `numeric`,
      minute: `numeric`,
      day: `numeric`,
      month: `numeric`,
      year: `numeric`,
    };
    // const local = navigator.language
    // console.log(local)
    const local = currentAccount.local;
    labelDate.textContent = Intl.DateTimeFormat(local, options).format(now);

    if (myTimer) clearInterval(myTimer)
    logOutTimer()
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

    currentAccount.movementsDate.push(new Date());
    receiverAcc.movementsDate.push(new Date());

    transferAmount.value = receiveraccount.value = "";

    updateUi(currentAccount);

    clearInterval(myTimer);
    myTimer = logOutTimer();
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
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDate.push(new Date());
      updateUi(currentAccount);

    },2500)
  }

  clearInterval(myTimer);
  myTimer = logOutTimer();
});
