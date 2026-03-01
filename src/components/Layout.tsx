import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Colors, breakpoints, borderRadius, spacing } from '@/src/constants';
import Link from 'next/link';

type Props = {
  children?: React.ReactNode;
};

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: hidden;
`;

const Main = styled.main`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${spacing.pagePadding};
`;

const Header = styled.header`
  padding: clamp(16px, 3vw, 24px) ${spacing.pagePadding};
  background: ${Colors.headerFooterBg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 ${Colors.border};
`;

const LogoLink = styled(Link)`
  display: flex;
  flex-shrink: 0;
`;

const Footer = styled.footer`
  flex-shrink: 0;
  background: ${Colors.headerFooterBg};
  padding: clamp(16px, 3vw, 24px) ${spacing.pagePadding};
  padding-bottom: max(clamp(20px, 4vw, 28px), env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
  border-top: 1px solid ${Colors.border};

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
    padding-bottom: max(20px, env(safe-area-inset-bottom, 0px));
  }
`;

const Website = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${Colors.textMuted};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 6px 14px;
  border-radius: ${borderRadius.sm}px;
  transition: color 0.2s ease;

  &:hover {
    color: ${Colors.colorPrimary};
  }
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  row-gap: 12px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  a:hover {
    transform: scale(1.1);
    opacity: 0.85;
  }
  a img {
    display: block;
    object-fit: contain;
  }
  a.social-meetup img {
    width: 28px;
    height: 28px;
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 10px;
  }
`;

const Layout = ({ children }: Props) => {
  return (
    <Wrapper>
      <Header>
        <LogoLink href="/">
          <Image src="/devstaff-logo.webp" alt="Devstaff logo" width={153} height={61} priority />
        </LogoLink>
      </Header>

      <Main>{children}</Main>

      <Footer>
        <Social>
          <a href="https://github.com/devstaff-crete/DevStaff-Heraklion" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Image alt="GitHub" height={24} width={24} src="/social/github.svg" unoptimized />
          </a>
          <a href="https://meetup.com/devstaff" target="_blank" rel="noopener noreferrer" aria-label="Meetup" className="social-meetup">
            <Image alt="Meetup" height={28} width={28} src="/social/meetup.svg" unoptimized />
          </a>
          <a href="https://www.facebook.com/Devstaff" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image alt="Facebook" height={24} width={24} src="/social/facebook.svg" unoptimized />
          </a>
          <a href="https://x.com/devstaff_gr" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <Image alt="X" height={24} width={24} src="/social/x.svg" unoptimized />
          </a>
          <a href="https://www.linkedin.com/company/devstaff" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Image alt="LinkedIn" height={24} width={24} src="/social/linkedin.svg" unoptimized />
          </a>
        </Social>
        <Website href="https://devstaff.gr" target="_blank" rel="noopener noreferrer">
          www.devstaff.gr
        </Website>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
