import { Header } from "./components/Header";
import { Widget } from "./components/Widget";
import { ThemesColorsProvider } from "./hooks/useThemesColors";

export function App() {
  return (
    <ThemesColorsProvider>
        <Header />
        <Widget />
    </ThemesColorsProvider>
  )
}
