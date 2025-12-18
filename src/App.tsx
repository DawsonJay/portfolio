import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './theme';
import Hero from './pages/Hero';
import Projects from './pages/Projects';
import Project from './pages/Project';
import About from './pages/about/About';
import Immigration from './pages/immigration/Immigration';
import Contact from './pages/contact/Contact';
import Resume from './pages/Resume';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/preview/:projectName" element={<Projects />} />
            <Route path="/projects/:projectName" element={<Project />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<About />} />
            <Route path="/immigration" element={<Immigration />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
