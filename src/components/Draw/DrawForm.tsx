import { ActionIcon, Button, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { Colors } from '@/src/constants';

type Props = {
  onSubmit: (count: number) => void;
};

const DrawForm = ({ onSubmit }: Props) => {
  const [counter, setCounter] = useState(2);
  const theme = useMantineTheme();

  return (
    <Stack
      style={{
        backgroundColor: theme.colors.gray[2],
        padding: theme.spacing.md,
        borderRadius: theme.radius.md
      }}
    >
      <Group>
        <ActionIcon onClick={() => setCounter(prev => prev - 1)}>
          <Text size="xl" fw="bold">
            -
          </Text>
        </ActionIcon>
        <Text size="lg" fw="bold">
          {counter}
        </Text>
        <ActionIcon onClick={() => setCounter(prev => prev + 1)}>
          <Text size="xl" fw="bold">
            +
          </Text>
        </ActionIcon>
      </Group>

      <Button
        onClick={() => onSubmit(counter)}
        style={{
          borderColor: Colors.colorPrimary,
          background: 'white',
          color: Colors.colorPrimary
        }}
        variant="default"
      >
        Draw
      </Button>
    </Stack>
  );
};

export default DrawForm;
