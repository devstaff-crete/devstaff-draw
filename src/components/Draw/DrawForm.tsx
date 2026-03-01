import { ActionIcon, Button, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { Colors, borderRadius } from '@/src/constants';
import styled from 'styled-components';

type Props = {
  onSubmit: (count: number) => void;
};

const Card = styled.div`
  background: ${Colors.cardBg};
  padding: 16px 20px;
  border-radius: ${borderRadius.md}px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.12);
  min-width: 160px;
`;

const CounterValue = styled.span`
  min-width: 2rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${Colors.colorSecondary};
`;

const DrawButtonWrap = styled.div`
  & button {
    width: 100%;
    font-weight: 600;
    font-size: 0.9375rem;
    height: 36px;
    border-radius: ${borderRadius.sm}px;
    transition: transform 0.12s ease, box-shadow 0.12s ease;
  }
  & button:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 12px rgba(120, 190, 33, 0.3);
  }
  & button:active {
    transform: translateY(0);
  }
`;

const DrawForm = ({ onSubmit }: Props) => {
  const [counter, setCounter] = useState(2);
  const minCount = 1;

  return (
    <Card>
      <Stack gap="sm">
        <Group justify="center" gap="sm" wrap="nowrap">
          <ActionIcon
            size="md"
            radius="md"
            variant="filled"
            color="dark"
            onClick={() => setCounter(prev => Math.max(minCount, prev - 1))}
            disabled={counter <= minCount}
            aria-label="Decrease number of winners"
          >
            <Text size="lg" fw="bold">
              −
            </Text>
          </ActionIcon>
          <CounterValue>{counter}</CounterValue>
          <ActionIcon
            size="md"
            radius="md"
            variant="filled"
            color="dark"
            onClick={() => setCounter(prev => prev + 1)}
            aria-label="Increase number of winners"
          >
            <Text size="lg" fw="bold">
              +
            </Text>
          </ActionIcon>
        </Group>

        <DrawButtonWrap>
          <Button
            onClick={() => onSubmit(counter)}
            style={{
              backgroundColor: Colors.colorPrimary,
              color: Colors.white,
              border: 'none'
            }}
          >
            Draw
          </Button>
        </DrawButtonWrap>
      </Stack>
    </Card>
  );
};

export default DrawForm;
