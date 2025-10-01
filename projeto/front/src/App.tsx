import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import SimaPage from "./pages/SimaPage";
import Presentation from './pages/PresentationPage';
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";
import BarraBrasil from "./components/commons/BarraBrasil";
import MenuBar from "./components/commons/MenuBar";
import BalcarPage from "./pages/BalcarPage";
import FurnasPage from "./pages/FurnasPage";
import InitialPage from "./pages/InitialPage"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <BarraBrasil />
          <MenuBar />
          <div>
            <Routes>
              <Route path="/" element={<InitialPage/>} />
              <Route path="/sima" element={<SimaPage />} />
              <Route path="/balcar" element={<BalcarPage />} />
              <Route path="/furnas" element={<FurnasPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
