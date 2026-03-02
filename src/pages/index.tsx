import Link from 'next/link';
import Layout from '@/src/components/Layout';
import styled from 'styled-components';
import { Colors, breakpoints, spacing } from '@/src/constants';
import Head from 'next/head';
import { useDisclosure } from '@mantine/hooks';
import ShareDrawModal from '@/src/components/ShareDrawModal';
import { motion } from 'framer-motion';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700'] });

const Wrapper = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: clamp(20px, 5vw, 40px) ${spacing.pagePadding};
  min-height: min(60vh, 420px);
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: linear-gradient(180deg, #f8f9fc 0%, #f0f2f7 50%, #eef0f5 100%);
  border-radius: 0 0 24px 24px;

  @media (max-width: ${breakpoints.sm}) {
    min-height: 0;
    padding-bottom: 24px;
    border-radius: 0 0 16px 16px;
  }
`;

const LogoWrap = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.35em;
  margin: 0 0 8px;
  text-align: center;
  white-space: nowrap;
`;

const LogoBrand = styled.span`
  font-family: ${outfit.style.fontFamily}, system-ui, sans-serif;
  font-weight: 600;
  font-size: clamp(1.5rem, 5vw, 2rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: ${Colors.colorSecondary};

  @media (max-width: ${breakpoints.sm}) {
    font-size: clamp(1.375rem, 7vw, 1.75rem);
  }
`;

const LogoAccent = styled.span`
  font-family: ${outfit.style.fontFamily}, system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 5vw, 2rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: ${Colors.colorPrimary};

  @media (max-width: ${breakpoints.sm}) {
    font-size: clamp(1.375rem, 7vw, 1.75rem);
  }
`;

const Tagline = styled(motion.p)`
  margin: 0 0 clamp(28px, 6vw, 40px);
  font-size: clamp(0.75rem, 1.8vw, 0.8125rem);
  font-weight: 500;
  color: ${Colors.textMuted};
  line-height: 1.35;
  text-align: center;
  max-width: 240px;
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 14px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
`;

const Button = styled(motion.button)<{ $buttonType: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 0 24px;
  height: clamp(52px, 14vw, 64px);
  min-height: 52px;
  border-radius: 12px;
  border: 0;
  font-weight: 600;
  font-size: clamp(1.0625rem, 2.2vw, 1.25rem);
  color: ${Colors.white};
  cursor: pointer;
  background: ${({ $buttonType }) =>
    $buttonType === 'primary' ? Colors.colorPrimary : Colors.colorSecondary};
  box-shadow: ${({ $buttonType }) =>
    $buttonType === 'primary'
      ? '0 4px 14px rgba(120, 190, 33, 0.35)'
      : '0 4px 14px rgba(0, 0, 0, 0.12)'};
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${({ $buttonType }) =>
      $buttonType === 'primary' ? Colors.colorPrimaryHover : Colors.colorSecondaryHover};
    box-shadow: ${({ $buttonType }) =>
      $buttonType === 'primary'
        ? '0 6px 20px rgba(120, 190, 33, 0.4)'
        : '0 6px 20px rgba(0, 0, 0, 0.18)'};
  }
  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${breakpoints.sm}) {
    height: 56px;
    min-height: 56px;
    -webkit-tap-highlight-color: transparent;
  }
`;

const ShareWrap = styled.div`
  margin-top: clamp(20px, 4vw, 28px);
  text-align: center;
`;

const ShareButton = styled.button`
  padding: 12px 24px;
  min-height: 44px;
  border-radius: 999px;
  border: 2px solid ${Colors.border};
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${Colors.textMuted};
  cursor: pointer;
  background: transparent;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${Colors.colorSecondary};
    color: ${Colors.colorSecondary};
    background: rgba(62, 62, 64, 0.04);
  }
  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${breakpoints.sm}) {
    -webkit-tap-highlight-color: transparent;
    min-height: 48px;
    padding: 14px 28px;
  }
`;

const Home = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Head>
        <title>DevStaff Draw</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <Layout>
        <Wrapper>
          <LogoWrap
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoBrand>DevStaff</LogoBrand>
            <LogoAccent>Draw</LogoAccent>
          </LogoWrap>
          <Tagline
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Sign up. We run drawWinners() live.
          </Tagline>
          <Actions
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <StyledLink href="/participate">
              <Button $buttonType="primary" whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
                Participate
              </Button>
            </StyledLink>
            <StyledLink href="/listing">
              <Button $buttonType="secondary" whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
                View list
              </Button>
            </StyledLink>
          </Actions>

          <ShareWrap>
            <ShareButton onClick={open}>Share draw</ShareButton>
          </ShareWrap>
        </Wrapper>
      </Layout>

      <ShareDrawModal open={opened} onClose={close} />
    </>
  );
};

export default Home;
