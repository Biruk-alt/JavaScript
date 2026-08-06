
const massMark = 78;
const heightMark = 1.68;
const massBura = 92;
const heightBura = 1.76;

const markBMI = massMark/heightMark ** 2;
const buraBMI = massBura/heightBura ** 2;

const higherBMI = buraBMI > markBMI;

console.log(buraBMI, massBura, higherBMI);
