import { registerNewParticipant, RegistrationError } from '@/src/api';
import Layout from '@/src/components/Layout';
import { borderRadius, Colors, EMAIL_MAX_LENGTH, emailRegex, spacing } from '@/src/constants';
import { NewParticipant } from '@/src/types';
import { Button, Stack, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

type Inputs = {
  email: string;
  fullName: string;
};

const PageWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: clamp(24px, 5vw, 48px) 0;
`;

const Card = styled.div`
  background: ${Colors.cardBg};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.cardPadding};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid ${Colors.border};
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  font-weight: 700;
  color: ${Colors.colorSecondary};
  margin: 0 0 8px 0;
  text-align: center;
`;

const StyledParagraph = styled.p`
  color: ${Colors.textMuted};
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: center;
  margin: 0 0 24px 0;
  line-height: 1.4;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Participate = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const registerMutation = useMutation({
    mutationFn: registerNewParticipant,
    onSuccess: () => {
      router.push('/listing');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof RegistrationError && error.status === 400
          ? 'Email already registered'
          : error instanceof RegistrationError && error.status === 503
            ? 'Service unavailable. Please configure FIREBASE_URL in .env'
            : 'Something went wrong. Please try again.';
      alert(message);
    }
  });
  const { mutate: registerParticipant } = registerMutation;
  const isRegisterParticipantLoading = (registerMutation as { isPending?: boolean }).isPending ?? false;

  return (
    <>
      <Head>
        <title>Participate</title>
        <meta name="description" content="Fill in your contact details and get a chance to win!" />
      </Head>

      <Layout>
        <PageWrapper>
          <Stack style={{ alignItems: 'stretch', gap: 0 }}>
            <Title>Participate</Title>
            <StyledParagraph>Fill in your contact details and get a chance to win!</StyledParagraph>
            <Card>
              <StyledForm
                id="participate-form"
                noValidate
                onSubmit={handleSubmit(formData =>
                  registerParticipant({
                    name: formData.fullName,
                    email: formData.email
                  } satisfies NewParticipant)
                )}
              >
                <div>
                  <TextInput
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    label="Email"
                    aria-label="email input field"
                    placeholder="you@example.com"
                    size="md"
                    radius="md"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      setValueAs: (v) => (typeof v === 'string' ? v.trim() : v),
                      maxLength: {
                        value: EMAIL_MAX_LENGTH,
                        message: 'Email is too long'
                      },
                      validate: (value) => {
                        if (!value) return true;
                        if (!emailRegex().test(value)) {
                          return 'Enter a valid email (e.g. name@example.com)';
                        }
                        return true;
                      }
                    })}
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    label="Full name"
                    aria-label="full name input field"
                    placeholder="Your name"
                    size="md"
                    radius="md"
                    error={errors.fullName?.message}
                    {...register('fullName', { required: 'Full name is required' })}
                  />
                </div>

                <Button
                  type="submit"
                  loading={isRegisterParticipantLoading}
                  size="md"
                  radius="md"
                  style={{
                    width: '100%',
                    marginTop: 8,
                    backgroundColor: Colors.colorPrimary,
                    color: Colors.white
                  }}
                >
                  Participate
                </Button>
              </StyledForm>
            </Card>
          </Stack>
        </PageWrapper>
      </Layout>
    </>
  );
};

export default Participate;
