export const operators = [
  {
    symbol: "+",
    precedence: 0,
  },
  {
    symbol: "-",
    precedence: 0,
  },
  {
    symbol: "×",
    precedence: 1,
  },
  {
    symbol: "/",
    precedence: 1,
  },
]

export function operatorsInclude(char: string) {
  return operators.some((operator) => operator.symbol === char)
}

export function calculate(expression: string) {
  const parsedExpression = parseExpression(expression)
  const postFix = convertToPostfix(parsedExpression)
  const result = solvePostfix(postFix)

  return result
}

function convertToPostfix(expression: string[]) {
  const postfixStack: string[] = []
  const operatorsStack: string[] = []

  expression.forEach((char) => {
    if (operatorsInclude(char)) {
      const operator = getOperator(char)

      while (
        operatorsStack.some(
          (char) => operator?.precedence <= getOperator(char)?.precedence
        )
      )
        postfixStack.push(operatorsStack.pop() || "")

      operatorsStack.push(char)
    } else postfixStack.push(char)
  })

  const postfixSize = operatorsStack.length

  for (let i = 0; i < postfixSize; i++)
    postfixStack.push(operatorsStack.pop() || "")

  return postfixStack
}

function solvePostfix(postfix: string[]) {
  const operandStack: string[] = []

  postfix.forEach((char) => {
    if (!operatorsInclude(char)) operandStack.push(char)
    else {
      const op2 = parseFloat(operandStack.pop() || "")
      const op1 = parseFloat(operandStack.pop() || "")

      operandStack.push(evaluate(op1, op2, char).toString())
    }
  })

  return operandStack.pop()
}

function evaluate(operand1: number, operand2: number, operator: string) {
  switch (operator) {
    case "+":
      return operand1 + operand2
    case "-":
      return operand1 - operand2
    case "×":
      return operand1 * operand2
    case "/":
      return operand1 / operand2
    default:
      return 0
  }
}

function getOperator(symbol: string) {
  return operators.find((operator) => operator.symbol === symbol)!
}

export function parseExpression(expression: string) {
  let currentPart = ""
  const parsedExpression: string[] = []

  expression.split("").forEach((char) => {
    if (char === ",") return

    if (operatorsInclude(char)) {
      parsedExpression.push(currentPart, char)
      currentPart = ""
    } else currentPart += char
  })

  if (currentPart !== "") parsedExpression.push(currentPart)

  return parsedExpression
}

export function formatExpression(expression: string[]) {
  return expression
    .map((char) => {
      if (operatorsInclude(char)) return char
      else {
        const number = parseFloat(char)

        if (char.includes(".") && char.split(".")[1]) {
          return number.toLocaleString("en-US", {
            minimumFractionDigits: char.split(".")[1].length,
          })
        } else if (char.includes(".") && !char.split(".")[1]) return char
        else return number.toLocaleString("en-US")
      }
    })
    .join("")
}
