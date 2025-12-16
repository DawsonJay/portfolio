import styled from 'styled-components';

/**
 * NavBarWrapper - Removes fixed positioning from NavBar when used in panel layouts
 * 
 * This wrapper component overrides the NavBar's fixed positioning to make it
 * relative within a panel layout (like TwoPanelLayout).
 */
const NavBarWrapper = styled.div`
  & nav {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
  }
`;

export default NavBarWrapper;

