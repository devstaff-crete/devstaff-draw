import { Button, PasswordInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { authenticate } from '../api';
import { Colors, borderRadius, spacing } from '@/src/constants';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 360px;
  background: ${Colors.cardBg};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.cardPadding};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid ${Colors.border};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > * {
    width: 100%;
  }
`;

type Props = {
  children: ReactNode;
};

const RequireAuth = ({ children }: Props) => {
  const { register, handleSubmit, reset } = useForm<{ password: string }>({
    defaultValues: { password: '' }
  });
  const { mutate, isPending: isLoading, isSuccess } = useMutation({
    mutationFn: authenticate,
    onError: () => reset()
  });

  if (isSuccess) {
    return <>{children}</>;
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Wrapper>
        <Card>
          <Form onSubmit={handleSubmit(({ password }) => mutate(password))}>
            <PasswordInput
              placeholder="Password"
              label="Password"
              withAsterisk
              disabled={isLoading}
              size="md"
              radius="md"
              {...register('password', { required: true })}
            />
            <Button
              type="submit"
              disabled={isLoading}
              size="md"
              radius="md"
              style={{ backgroundColor: Colors.colorPrimary, color: Colors.white }}
            >
              Login
            </Button>
          </Form>
        </Card>
      </Wrapper>
    </>
  );
};

export default RequireAuth;
