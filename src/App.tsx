import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Hero from './pages/Hero';
import Project from './pages/Project';
import About from './pages/about/About';
import Immigration from './pages/immigration/Immigration';
import Contact from './pages/contact/Contact';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/projects/:projectName" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/immigration" element={<Immigration />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
