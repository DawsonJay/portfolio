import { type ReactNode } from 'react';
import styled from 'styled-components';
import { useScrollTracking } from './hooks/useScrollTracking';

const ReaderContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: ${(props) => props.theme.spacing['3xl']};
  padding-left: ${(props) => props.theme.spacing.xl};
  padding-right: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.xl};
  box-sizing: border-box;
  
  @media (max-width: 1350px) {
    padding-right: ${(props) => props.theme.spacing.xl};
  }
  
  @media (max-width: 1000px) {
    padding-bottom: calc(${(props) => props.theme.spacing.xl} + 36px); /* Account for mobile bar */
  }
  
  @media (max-width: 600px) {
    padding-left: ${(props) => props.theme.spacing.md};
    padding-right: ${(props) => props.theme.spacing.md};
  }
  
  &::after {
    content: '';
    display: block;
    height: calc(100vh - ${(props) => props.theme.spacing['3xl']});
  }
`;

interface ReaderProps {
  children?: ReactNode;
}

const Reader = ({ children }: ReaderProps) => {
  const containerRef = useScrollTracking();

  return <ReaderContainer ref={containerRef}>{children}</ReaderContainer>;
};

export default Reader;

