import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import SimaMenu from "./pages/sima/SimaMenu";
import Presentation from './pages/PresentationPage';
import BarraBrasil from "./components/commons/BarraBrasil";
import MenuBar from "./components/commons/MenuBar";
import BalcarMenu from "./pages/balcar/BalcarMenu";
import FurnasMenu from "./pages/furnas/FurnasMenu";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <BarraBrasil />
          <MenuBar />
          <div>
            <Routes>
              <Route path="/" element={<Presentation/>} />
              <Route path="/sima" element={<SimaMenu />} />
              <Route path="/balcar" element={<BalcarMenu />} />
              <Route path="/furnas" element={<FurnasMenu />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

