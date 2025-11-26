import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Hero from './pages/Hero';
import Project from './pages/Project';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/projects/:projectName" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
