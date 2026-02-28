import { useMutation, useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { draw as drawFn, getParticipants } from '@/src/api';
import { motion, useAnimationControls } from 'framer-motion';
import { getViewportSize, stringToHSL } from '@/src/utils';
import { Text, Box, Image, useMantineTheme } from '@mantine/core';
import Head from 'next/head';
import DrawForm from './DrawForm';
import { useState } from 'react';

const CARD_WIDTH = 200;
const CARD_HEIGHT = 280;

const getRandomAngle = (maxAngle: number) => Math.random() * maxAngle * (Math.random() > 0.5 ? 1 : -1);

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
      i === index ? { scale: 1, transition: { duration: 0.2, delay: i * 0.1 } } : {}
    );
    controls.start(i => (i === index ? { scale: 1, transition: { duration: 0.2, delay: i * 0.1 } } : {}));
  };

  const handleDraw = async (selectedParticipantIds: string[]) => {
    if (!participants) return;

    // Move card with DevStaff logo outside of the viewpoint
    await devStaffCardControls.start({
      ...selectRandomPointOutsideViewport(),
      // Calculate delay so it takes 3 seconds to move all cards
      transition: { delay: 0, duration: 0.3 }
    });

    // Move all non-selected cards outside of the viewport
    await controls.start(i =>
      !selectedParticipantIds.includes(participants[i].id)
        ? {
            ...selectRandomPointOutsideViewport(),
            // Calculate delay so it takes 3 seconds to move all cards
            transition: { delay: (i / participants.length) * 3, duration: 0.3 }
          }
        : {}
    );

    // Move all selected cards to the center
    await controls.start(i =>
      selectedParticipantIds.includes(participants[i].id)
        ? {
            x: 0,
            y: 0
          }
        : {}
    );

    // Spread selected cards
    await controls.start(i =>
      selectedParticipantIds.includes(participants[i].id)
        ? {
            x:
              (selectedParticipantIds.indexOf(participants[i].id) - (selectedParticipantIds.length - 1) / 2) *
              (CARD_WIDTH + 32),
            rotate: getRandomAngle(5)
          }
        : {}
    );
  };

  return (
    <>
      <Head>
        <title>Draw</title>
      </Head>

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
          <motion.div
            key={participant.id}
            custom={index}
            initial={{
              ...selectRandomPointInViewport(),
              rotate: getRandomAngle(15),
              scale: 0
            }}
            animate={controls}
            onViewportEnter={() => handleCardEnter(index)}
            viewport={{ once: true }}
            style={{
              backgroundColor: stringToHSL(participant.name),
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              fontWeight: 'bold',
              borderRadius: '8px',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              overflow: 'hidden'
            }}
          >
            <Text>{participant.name}</Text>
          </motion.div>
        ))}
        <motion.div
          custom={0}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0
          }}
          animate={devStaffCardControls}
          onViewportEnter={() => handleCardEnter(0)}
          viewport={{ once: true }}
          style={{
            backgroundColor: '#e9ecef',
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            fontWeight: 'bold',
            borderRadius: '8px',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            overflow: 'hidden'
          }}
        >
          <Image
            src="/devstaff-logo.svg"
            alt="Card with DevStaff logo"
            style={{
              paddingInline: '16px'
            }}
          />
        </motion.div>
      </Box>

      {participants && participants.length > 0 && !isDrawLoading && !isDrawSuccess ? (
        <Box
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <DrawForm onSubmit={draw} />
        </Box>
      ) : null}
    </>
  );
};

export default Draw;
