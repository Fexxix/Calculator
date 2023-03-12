import { operatorsInclude, calculate, parseExpression } from "./calculate"

interface ButtonProps {
  expression: string
  setExpression: React.Dispatch<React.SetStateAction<string>>
}

export default function Buttons({ expression, setExpression }: ButtonProps) {
  const displayCharacter = (char: string) => {
    if (expression === "" && operatorsInclude(char)) return
    if (operatorsInclude(expression.at(-1) || "") && operatorsInclude(char))
      return
    if (char === "." && parseExpression(expression).at(-1)?.includes("."))
      return
    if (expression.at(-1) === "." && operatorsInclude(char)) return

    setExpression((prevExpression) => {
      return `${prevExpression}${char}`
    })
  }

  const buttons = [
    {
      text: "7",
      onClick: () => displayCharacter("7"),
    },
    {
      text: "8",
      onClick: () => displayCharacter("8"),
    },
    {
      text: "9",
      onClick: () => displayCharacter("9"),
    },
    {
      text: "DEL",
      onClick: () =>
        setExpression((prevExpression) => prevExpression.slice(0, -1)),
    },
    {
      text: "4",
      onClick: () => displayCharacter("4"),
    },
    {
      text: "5",
      onClick: () => displayCharacter("5"),
    },
    {
      text: "6",
      onClick: () => displayCharacter("6"),
    },
    {
      text: "+",
      onClick: () => displayCharacter("+"),
    },
    {
      text: "1",
      onClick: () => displayCharacter("1"),
    },
    {
      text: "2",
      onClick: () => displayCharacter("2"),
    },
    {
      text: "3",
      onClick: () => displayCharacter("3"),
    },
    {
      text: "-",
      onClick: () => displayCharacter("-"),
    },
    {
      text: ".",
      onClick: () => displayCharacter("."),
    },
    {
      text: "0",
      onClick: () => displayCharacter("0"),
    },
    {
      text: "/",
      onClick: () => displayCharacter("/"),
    },
    {
      text: "×",
      onClick: () => displayCharacter("×"),
    },
    {
      text: "RESET",
      onClick: () => setExpression(""),
    },
    {
      text: "=",
      onClick: () => setExpression(calculate(expression)!),
    },
  ]

  return (
    <div className="buttons-grid">
      {buttons.map((button) => (
        <button key={button.text} onClick={button.onClick}>
          {button.text}
        </button>
      ))}
    </div>
  )
}
