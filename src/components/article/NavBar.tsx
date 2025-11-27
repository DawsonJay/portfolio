import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.layers.layer2};
  flex-shrink: 0;
`;

const LeftLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing['2xl']};
  align-items: center;
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

const RightLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.accent};

  &:hover {
    color: ${(props) => props.theme.colors.layers.layer11};
  }
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <LeftLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/immigration">Immigration</NavLink>
      </LeftLinks>
      <RightLink to="/contact">Let's connect</RightLink>
    </NavBarContainer>
  );
};

export default NavBar;

