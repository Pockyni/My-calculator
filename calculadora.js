const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult() {
  // Exibe o cálculo junto com o resultado
  result.innerText = firstOperand !== null && operator !== null
    ? `${firstOperand} ${operator} ${currentNumber}`
    : currentNumber.replace(".", ",");
}

function addDigit(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  if (restart) {
    currentNumber = digit;
    restart = false;
  } else {
    currentNumber += digit;
  }

  updateResult();
}

function setOperator(newOperator) {
  if (currentNumber) {
    if (firstOperand !== null) {
      calculate(); // Faz o cálculo antes de continuar com uma nova operação
    }

    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }

  operator = newOperator;
  updateResult(); // Atualiza a tela para mostrar o cálculo em andamento
}

function calculate() {
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;

  switch (operator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultValue = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  if (resultValue.toString().split(".")[1]?.length > 5) {
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  } else {
    currentNumber = resultValue.toString();
  }

  operator = null;
  firstOperand = null;
  restart = true;
  updateResult(); // Atualiza o display com o resultado final
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateResult();
}

function setPercentage() {
  let result = parseFloat(currentNumber) / 100;

  if (["+", "-"].includes(operator)) {
    result = result * (firstOperand || 1);
  }

  if (result.toString().split(".")[1]?.length > 5) {
    result = result.toFixed(5).toString();
  }

  currentNumber = result.toString();
  updateResult();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (
        parseFloat(currentNumber || firstOperand) * -1
      ).toString();
      updateResult();
    } else if (buttonText === "%") {
      setPercentage();
    }
  });
});
