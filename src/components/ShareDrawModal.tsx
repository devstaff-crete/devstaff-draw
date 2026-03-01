import styled from 'styled-components';
import { ActionIcon, CopyButton, Group, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { breakpoints, borderRadius, Colors } from '@/src/constants';

type Props = {
  open: boolean;
  onClose: () => void;
};

const DRAW_URL_FULL = 'https://devstaff.gr/draw';
const DRAW_URL_DISPLAY = 'devstaff.gr/draw';

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 320px;
  border-radius: ${borderRadius.md}px;
  overflow: hidden;
  background: white;
  padding: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (min-width: ${breakpoints.sm}) {
    max-width: 360px;
  }
  @media (min-width: ${breakpoints.md}) {
    max-width: 420px;
  }
`;

const UrlRow = styled(Group)`
  width: 100%;
  max-width: 400px;
  border-radius: ${borderRadius.md}px;
  border: 1px solid ${Colors.border};
  background: ${Colors.headerFooterBgSolid};
  padding: 12px 14px;
  gap: 12px;
`;

const UrlText = styled.span`
  flex: 1;
  font-weight: 600;
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  color: ${Colors.colorSecondary};
  letter-spacing: 0.02em;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const OrDivider = styled(Text)`
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${Colors.textMuted};
`;

const ShareDrawModal = ({ open, onClose }: Props) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      centered
      title={
        <Text fw={700} size="xl" c={Colors.colorSecondary}>
          Join the draw
        </Text>
      }
      radius="lg"
      size="auto"
      padding="xl"
      transitionProps={{
        transition: 'fade',
        duration: 220
      }}
      styles={{
        header: { marginBottom: 4 },
        body: { paddingTop: 8 }
      }}
    >
      <Stack align="center" gap="xl">
        <ImageWrapper
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/qrcode.webp"
            alt="QR code for sharing the DevStaff Draw website"
            width={370}
            height={370}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </ImageWrapper>

        <OrDivider>Or type this link</OrDivider>

        <UrlRow>
          <UrlText title={DRAW_URL_FULL}>{DRAW_URL_DISPLAY}</UrlText>
          <CopyButton value={DRAW_URL_FULL} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied!' : 'Copy link (for sharing)'} withArrow>
                <ActionIcon
                  variant="light"
                  size="lg"
                  radius="md"
                  onClick={copy}
                  aria-label={copied ? 'Copied' : 'Copy link'}
                  style={{
                    color: Colors.colorPrimary,
                    backgroundColor: copied ? `${Colors.colorPrimary}18` : undefined
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <IconCheck size={20} stroke={2.5} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <IconCopy size={20} stroke={2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </UrlRow>

        <Text size="sm" c="dimmed" ta="center" maw={340}>
          Scan the QR code with your phone or enter the link above in your browser.
        </Text>
      </Stack>
    </Modal>
  );
};

export default ShareDrawModal;
