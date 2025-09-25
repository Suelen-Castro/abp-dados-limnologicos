import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import SimaPage from "./pages/SimaPage";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import Presentation from './pages/PresentationPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="w-full min-h-screen flex flex-col">
          <BarraBrasil />
          <MenuBar />
          <div className="flex-1 w-full">
            <Routes>
              <Route path="/sima" element={<SimaPage />} />
              <Route path="/" element={<Presentation />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
