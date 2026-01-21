import styled from 'styled-components';
import { Colors } from '@/src/constants';
import ThemeToggleButton from './ThemeToggleButton';
import { useMantineColorScheme } from '@mantine/core';

interface FloatingButtonProps {
  dark: boolean;
  children: React.ReactNode;
}

const FloatingButton = styled.div<FloatingButtonProps>`
  position: fixed;
  bottom: 120px;
  right: 20px;
  z-index: 10;
  border-radius: 50%;
  padding: 10px;
  background-color: ${props => Colors.colorSecondary};

  @media (min-width: 768px) {
    display: none; /* Hide on larger screens */
  }
`;

const FloatingThemeToggleButton = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <FloatingButton dark={isDarkTheme}>
      <ThemeToggleButton />
    </FloatingButton>
  );
};

export default FloatingThemeToggleButton;
