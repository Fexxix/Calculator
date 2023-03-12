interface ThemeProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export default function ThemeSwitcher({ setTheme }: ThemeProps) {
  return (
    <div className="theme-switcher">
      <button onClick={() => setTheme("calc-body theme-1")}></button>
      <button onClick={() => setTheme("calc-body theme-2")}></button>
      <button onClick={() => setTheme("calc-body theme-3")}></button>
    </div>
  )
}
