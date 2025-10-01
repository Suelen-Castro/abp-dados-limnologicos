import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import SimaPage from "./pages/SimaPage";
import Presentation from './pages/PresentationPage';
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <BarraBrasil />
          <MenuBar />
          <div>
            <Routes>
              <Route path="/" element={<Presentation />} />
             {/* <Route path="/introduction" element={<Introduction />} /> */}
              <Route path="/sima" element={<SimaPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
