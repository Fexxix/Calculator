import { useEffect, useState } from "react"
import Buttons from "./Buttons"
import "./styles.scss"
import ThemeSwitcher from "./ThemeSwitcher"
import { formatExpression, parseExpression } from "./calculate"

export default function App() {
  const [expression, setExpression] = useState("399981")
  const [theme, setTheme] = useState("calc-body theme-3")

  useEffect(() => setExpression(formatExpression(parseExpression(expression))))

  return (
    <>
      <div className={theme}>
        <header className="calc-header">
          <h1>calc</h1>
          <ThemeSwitcher setTheme={setTheme} />
        </header>

        <div className="expression">{expression}</div>

        <Buttons expression={expression} setExpression={setExpression} />
      </div>
    </>
  )
}
