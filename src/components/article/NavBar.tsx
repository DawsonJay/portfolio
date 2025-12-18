import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.layers.layer2};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 640px) {
    justify-content: flex-end;
  }
`;

const LeftLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing['2xl']};
  align-items: center;

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  color: ${(props) => props.theme.colors.layers.layer11};
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ActiveNavLink = styled(Link)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  color: ${(props) => props.theme.colors.layers.layer11};
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: 4px;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.layers.layer11};
  }
`;

const RightLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.accent};

  &:hover {
    color: ${(props) => props.theme.colors.layers.layer11};
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const BurgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  @media (max-width: 640px) {
    display: flex;
  }

  &:focus {
    outline: none;
  }
`;

const BurgerLine = styled.span<{ $isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background-color: ${(props) => props.theme.colors.layers.layer11};
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;

  &:nth-child(1) {
    transform: ${(props) => props.$isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
  }

  &:nth-child(2) {
    opacity: ${(props) => props.$isOpen ? '0' : '1'};
  }

  &:nth-child(3) {
    transform: ${(props) => props.$isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.layers.layer2};
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.md};
  gap: ${(props) => props.theme.spacing.md};
  transform: ${(props) => props.$isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${(props) => props.$isOpen ? '1' : '0'};
  visibility: ${(props) => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (max-width: 640px) {
    display: flex;
  }
`;

const MobileNavLink = styled(Link)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  color: ${(props) => props.theme.colors.layers.layer11};
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.sm} 0;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ActiveMobileNavLink = styled(Link)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  color: ${(props) => props.theme.colors.layers.layer11};
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: 4px;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.layers.layer11};
  }
`;

const MobileRightLink = styled(MobileNavLink)`
  color: ${(props) => props.theme.colors.accent};
  border-top: 1px solid ${(props) => props.theme.colors.layers.layer2};
  padding-top: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.xs};

  &:hover {
    color: ${(props) => props.theme.colors.layers.layer11};
  }
`;

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    // Home route should only match exactly
    if (path === '/') {
      return location.pathname === '/';
    }
    // For other routes, check if pathname starts with the path
    // This allows /projects to highlight for /projects/preview/what-now, /projects/what-now, etc.
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <NavBarContainer>
      <LeftLinks>
        {isActive('/') ? (
          <ActiveNavLink to="/">Home</ActiveNavLink>
        ) : (
          <NavLink to="/">Home</NavLink>
        )}
        {isActive('/projects') ? (
          <ActiveNavLink to="/projects">Projects</ActiveNavLink>
        ) : (
          <NavLink to="/projects">Projects</NavLink>
        )}
        {isActive('/immigration') ? (
          <ActiveNavLink to="/immigration">Immigration</ActiveNavLink>
        ) : (
          <NavLink to="/immigration">Immigration</NavLink>
        )}
        {isActive('/resume') ? (
          <ActiveNavLink to="/resume">Resume</ActiveNavLink>
        ) : (
          <NavLink to="/resume">Resume</NavLink>
        )}
      </LeftLinks>
      {isActive('/contact') ? (
        <ActiveNavLink to="/contact">Let's connect</ActiveNavLink>
      ) : (
        <RightLink to="/contact">Let's connect</RightLink>
      )}
      <BurgerButton onClick={toggleMenu} aria-label="Toggle menu">
        <BurgerLine $isOpen={isMenuOpen} />
        <BurgerLine $isOpen={isMenuOpen} />
        <BurgerLine $isOpen={isMenuOpen} />
      </BurgerButton>
      <MobileMenu $isOpen={isMenuOpen}>
        {isActive('/') ? (
          <ActiveMobileNavLink to="/" onClick={closeMenu}>Home</ActiveMobileNavLink>
        ) : (
          <MobileNavLink to="/" onClick={closeMenu}>Home</MobileNavLink>
        )}
        {isActive('/projects') ? (
          <ActiveMobileNavLink to="/projects" onClick={closeMenu}>Projects</ActiveMobileNavLink>
        ) : (
          <MobileNavLink to="/projects" onClick={closeMenu}>Projects</MobileNavLink>
        )}
        {isActive('/immigration') ? (
          <ActiveMobileNavLink to="/immigration" onClick={closeMenu}>Immigration</ActiveMobileNavLink>
        ) : (
          <MobileNavLink to="/immigration" onClick={closeMenu}>Immigration</MobileNavLink>
        )}
        {isActive('/resume') ? (
          <ActiveMobileNavLink to="/resume" onClick={closeMenu}>Resume</ActiveMobileNavLink>
        ) : (
          <MobileNavLink to="/resume" onClick={closeMenu}>Resume</MobileNavLink>
        )}
        {isActive('/contact') ? (
          <ActiveMobileNavLink to="/contact" onClick={closeMenu}>Let's connect</ActiveMobileNavLink>
        ) : (
          <MobileRightLink to="/contact" onClick={closeMenu}>Let's connect</MobileRightLink>
        )}
      </MobileMenu>
    </NavBarContainer>
  );
};

export default NavBar;

