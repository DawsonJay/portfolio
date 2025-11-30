import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentsMenu from './ContentsMenu';

const MobileDrawerContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: none;
  flex-direction: column;
  z-index: 1000;
  transition: transform 0.35s cubic-bezier(0.25, 0, 0.15, 1.1);
  transform: ${(props) => props.$isOpen ? 'translateY(0)' : 'translateY(calc(100% - 36px))'};
  overflow: hidden;

  @media (max-width: 1000px) {
    display: flex;
  }
`;

const MobileBarContainer = styled.div`
  height: 36px;
  background-color: ${(props) => props.theme.colors.layers.layer2};
  border-top: 1px solid ${(props) => props.theme.colors.layers.layer2};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
`;

const MenuPanel = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.colors.surface};
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl};
  box-sizing: border-box;
  min-height: 0;
`;

const CaretIcon = styled.svg<{ $isOpen: boolean }>`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease-out;
  transform: ${(props) => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  fill: ${(props) => props.theme.colors.layers.layer11};
`;

const MobileContentsBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when drawer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBarClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking the menu panel backdrop, not the menu content
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <MobileDrawerContainer $isOpen={isOpen}>
      <MobileBarContainer onClick={handleBarClick}>
        <CaretIcon 
          $isOpen={isOpen}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5z" />
        </CaretIcon>
      </MobileBarContainer>
      <MenuPanel onClick={handleBackdropClick}>
        <ContentsMenu onItemClick={handleItemClick} />
      </MenuPanel>
    </MobileDrawerContainer>
  );
};

export default MobileContentsBar;

