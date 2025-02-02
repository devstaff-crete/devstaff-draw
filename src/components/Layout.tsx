import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Colors } from '@/src/constants';
import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';
import FloatingThemeToggleButton from './FloatingThemeToggleButton';

type Props = {
  children?: React.ReactNode;
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
`;

const Main = styled.main`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 24px;
  background: ${Colors.headerBg};
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  grid-gap: 1rem;
`;

const StyledThemeToggleButton = styled(ThemeToggleButton)`
  grid-column: 3;
  display: none; /* Hide by default */

  @media (min-width: 769px) {
    display: block; /* Show on larger screens */
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 26px;
  background: linear-gradient(to right, ${Colors.colorPrimary}, ${Colors.colorSecondary});
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  grid-column: 4;
`;

const Footer = styled.div`
  background: ${Colors.headerBg};
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Website = styled.a`
  text-decoration: none;
  padding-top: 12px;
  color: ${Colors.grey};
`;

const Social = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header>
        <Link href="/">
          <Image src="/devstaff-logo.webp" alt="Devstaff logo" width={153} height={61} priority />
        </Link>

        <StyledThemeToggleButton />

        <Title>DevStaff Draw</Title>
      </Header>
      
      <Main>{children}</Main>

      <FloatingThemeToggleButton />

      <Footer>
        <Social>
          <a href="https://github.com/devstaff-crete/DevStaff-Heraklion" target="_blank" rel="noreferrer">
            <Image alt="github" height="32" width="32" src="/social/github.svg" unoptimized />
          </a>
          <a href="https://meetup.com/devstaff" target="_blank" rel="noreferrer">
            <Image alt="meetup" height="42" width="42" src="/social/meetup.svg" unoptimized />
          </a>
          <a href="https://www.facebook.com/Devstaff" target="_blank" rel="noreferrer">
            <Image alt="facebook" height="32" width="32" src="/social/facebook.svg" unoptimized />
          </a>
          <a href="https://twitter.com/devstaff_gr" target="_blank" rel="noreferrer">
            <Image alt="twitter" height="32" width="32" src="/social/twitter.svg" unoptimized />
          </a>
          <a href="https://www.linkedin.com/company/devstaff" target="_blank" rel="noreferrer">
            <Image alt="meetup" height="32" width="32" src="/social/linkedin.svg" unoptimized />
          </a>
        </Social>
        <Website href="https://devstaff.gr" target="_blank" rel="noreferrer">
          www.devstaff.gr
        </Website>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
