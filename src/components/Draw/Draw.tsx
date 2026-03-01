import { useMutation, useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { draw as drawFn, getParticipants } from '@/src/api';
import { motion, useAnimationControls } from 'framer-motion';
import { getInitials, getViewportSize, stringToHSL } from '@/src/utils';
import { Box, Image, Text, useMantineTheme } from '@mantine/core';
import Head from 'next/head';
import { Plus_Jakarta_Sans, Righteous } from 'next/font/google';
import DrawForm from './DrawForm';
import styled from 'styled-components';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const plusJakarta = Plus_Jakarta_Sans({ weight: ['500', '600', '700'], subsets: ['latin'] });

const CARD_WIDTH = 200;
const CARD_HEIGHT = 280;

const ParticipantCard = styled(motion.div)<{ $bg: string }>`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  background: ${({ $bg }) => $bg};
  border-radius: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  overflow: hidden;
  padding: 24px;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0);
  contain: layout style paint;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.06) inset;
  transition: box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 70% 50% at 50% 50%,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0.08) 70%,
      transparent 100%
    );
    pointer-events: none;
  }
`;

const CardAvatar = styled.span`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${plusJakarta.style.fontFamily}, system-ui, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
`;

const CardName = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${plusJakarta.style.fontFamily}, system-ui, sans-serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  line-height: 1.35;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  box-sizing: border-box;
`;

const DevStaffLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  backface-visibility: hidden;

  img {
    width: clamp(140px, 28vw, 200px);
    height: auto;
    filter: brightness(0) invert(1);
    opacity: 0.95;
  }
`;

const WinnersTitle = styled(motion.h1)`
  position: fixed;
  top: clamp(48px, 12vh, 96px);
  left: 50%;
  margin: 0;
  font-family: ${righteous.style.fontFamily}, sans-serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  color: white;
  text-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  pointer-events: none;
  text-align: center;
`;

const getRandomAngle = (maxAngle: number) => Math.random() * maxAngle * (Math.random() > 0.5 ? 1 : -1);

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const; // ease-out-quart — gentler deceleration
const SMOOTH_SPRING = { type: 'spring' as const, stiffness: 200, damping: 28, mass: 0.8 };
const SOFT_SPRING = { type: 'spring' as const, stiffness: 140, damping: 24, mass: 1 };

const selectRandomPointInViewport = () => {
  const { width, height } = getViewportSize();

  let x = (Math.random() - 0.5) * (width - CARD_WIDTH);
  let y = (Math.random() - 0.5) * (height - CARD_HEIGHT);
  if (x < 0 && x > -CARD_WIDTH && !(y > CARD_HEIGHT || y < -CARD_HEIGHT)) {
    x -= CARD_WIDTH;
  } else if (x > 0 && x < CARD_WIDTH && !(y > CARD_HEIGHT || y < -CARD_HEIGHT)) {
    x += CARD_WIDTH;
  }
  return {
    x,
    y
  };
};

const selectRandomPointOutsideViewport = () => {
  const { width, height } = getViewportSize();

  return {
    x: (Math.random() > 0.5 ? 1 : -1) * (width + CARD_WIDTH),
    y: (Math.random() > 0.5 ? 1 : -1) * (height + CARD_HEIGHT)
  };
};

const Draw = () => {
  const theme = useMantineTheme();
  const controls = useAnimationControls();
  const devStaffCardControls = useAnimationControls();

  const {
    mutate: draw,
    isPending: isDrawLoading,
    isSuccess: isDrawSuccess
  } = useMutation({
    mutationFn: (count: number) => drawFn(count),
    onSuccess: ids => handleDraw(ids)
  });

  const { data: participants } = useQuery<Participant[]>({
    queryKey: ['participants'],
    queryFn: getParticipants,
    refetchInterval: isDrawLoading || isDrawSuccess ? 0 : 1000
  });

  if (!participants) return null;

  const handleCardEnter = (index: number) => {
    devStaffCardControls.start(i =>
      i === index ? { scale: 1, transition: { ...SOFT_SPRING, delay: i * 0.06 } } : {}
    );
    controls.start(i => (i === index ? { scale: 1, transition: { ...SOFT_SPRING, delay: i * 0.06 } } : {}));
  };

  const handleDraw = async (selectedParticipantIds: string[]) => {
    if (!participants) return;

    // Fade out the DevStaff logo as winner cards move to center
    devStaffCardControls.start({
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    });

    // Move all non-selected cards outside of the viewport (staggered)
    await controls.start(i =>
      !selectedParticipantIds.includes(participants[i].id)
        ? {
            ...selectRandomPointOutsideViewport(),
            transition: { ...SMOOTH_SPRING, delay: (i / participants.length) * 2.8 }
          }
        : {}
    );

    // Move all selected cards to the center (staggered for fluid cascade)
    const winnerIndices = selectedParticipantIds.map(id => participants.findIndex(p => p.id === id));
    await controls.start(i =>
      selectedParticipantIds.includes(participants[i].id)
        ? {
            x: 0,
            y: 0,
            transition: { ...SMOOTH_SPRING, delay: winnerIndices.indexOf(i) * 0.08 }
          }
        : {}
    );

    // Spread selected cards (staggered, overlapping with move-to-center feel)
    await controls.start(i =>
      selectedParticipantIds.includes(participants[i].id)
        ? {
            x:
              (selectedParticipantIds.indexOf(participants[i].id) - (selectedParticipantIds.length - 1) / 2) *
              (CARD_WIDTH + 32),
            rotate: getRandomAngle(5),
            transition: { ...SMOOTH_SPRING, delay: winnerIndices.indexOf(i) * 0.06 }
          }
        : {}
    );

    // Confetti when winners are revealed
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then(({ default: confetti }) => {
        const count = 120;
        const defaults = { origin: { y: 0.6 }, zIndex: 9999 };
        confetti({ ...defaults, particleCount: count, spread: 100 });
        confetti({ ...defaults, particleCount: count * 0.6, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ ...defaults, particleCount: count * 0.6, angle: 120, spread: 55, origin: { x: 1 } });
      });
    }
  };

  return (
    <>
      <Head>
        <title>Draw | DevStaff</title>
        <meta name="description" content="Run the draw and pick winners live." />
      </Head>

      {isDrawSuccess ? (
        <WinnersTitle
          initial={{ opacity: 0, y: -40, scale: 0.92, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          transition={{
            duration: 1.1,
            delay: 0.35,
            ease: SMOOTH_EASE
          }}
        >
          Congratulations!
        </WinnersTitle>
      ) : null}

      <Box
        style={{
          padding: 0,
          backgroundColor: theme.colors.dark[7],
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {participants.length === 0 ? (
          <Text size="xl" c="white" fw="bold">
            Waiting for participants
          </Text>
        ) : null}

        {participants.map((participant, index) => (
          <ParticipantCard
            key={participant.id}
            custom={index}
            $bg={stringToHSL(participant.name, 70, 65)}
            initial={{
              ...selectRandomPointInViewport(),
              rotate: getRandomAngle(15),
              scale: 0
            }}
            animate={controls}
            onViewportEnter={() => handleCardEnter(index)}
            viewport={{ once: true }}
          >
            <CardAvatar>{getInitials(participant.name)}</CardAvatar>
            <CardName>{participant.name}</CardName>
          </ParticipantCard>
        ))}
        <DevStaffLogo
          custom={0}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0,
            opacity: 1
          }}
          animate={devStaffCardControls}
          onViewportEnter={() => handleCardEnter(0)}
          viewport={{ once: true }}
        >
          <Image
            src="/devstaff-logo.webp"
            alt="DevStaff"
            width={200}
            height={80}
            style={{ objectFit: 'contain' }}
          />
        </DevStaffLogo>
      </Box>

      {participants && participants.length > 0 && !isDrawLoading && !isDrawSuccess ? (
        <Box
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 10000
          }}
        >
          <DrawForm onSubmit={draw} />
        </Box>
      ) : null}
    </>
  );
};

export default Draw;
