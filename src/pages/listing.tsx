import { useQuery } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { getParticipants } from '@/src/api';
import Layout from '@/src/components/Layout';
import {
  Avatar,
  ListItemCard,
  NameCell,
  SectionCard,
  StyledList,
  WinnerBadge
} from '@/src/styled/listing.styled';
import { Colors, borderRadius, spacing } from '@/src/constants';
import { getInitials } from '@/src/utils';
import Head from 'next/head';
import styled from 'styled-components';

const participationTimeComparator = (a: Participant, b: Participant) =>
  new Date(b.participationTime).getTime() - new Date(a.participationTime).getTime();

const groupParticipantsBasedOnDrawResult = (
  participants: Participant[] = []
): [winners: Participant[], rest: Participant[]] => {
  const winners: Participant[] = [];
  const rest: Participant[] = [];

  for (const p of participants) {
    if (p.isWinner === true) winners.push(p);
    else rest.push(p);
  }

  return [winners, rest];
};

const PageWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: ${spacing.pagePadding} 0;
`;

const Section = styled.section`
  margin-bottom: ${spacing.sectionGap};
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  color: ${Colors.colorSecondary};
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid ${Colors.colorPrimary};
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 16px;
  color: ${Colors.textMuted};
  font-size: 1rem;
  font-weight: 500;
`;

const LoadingDots = styled.span`
  &::after {
    content: '';
    animation: dots 1.2s steps(4, end) infinite;
  }
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;

const EmptyStateCard = styled.div`
  text-align: center;
  background: ${Colors.headerFooterBgSolid};
  border: 1px solid ${Colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.sectionGap} ${spacing.cardPadding};
  color: ${Colors.textMuted};
  font-size: 1.0625rem;
  font-weight: 500;
  line-height: 1.5;
`;

const Listing = () => {
  const { data, isSuccess, isLoading } = useQuery<
    Participant[],
    Error,
    Participant[]
  >({
    queryKey: ['participants'],
    queryFn: getParticipants,
    refetchInterval: 1500,
    select: raw => {
      const [winners, rest] = groupParticipantsBasedOnDrawResult(raw);
      const sortedWinners = winners.sort(participationTimeComparator);
      const sortedRest = rest.sort(participationTimeComparator);
      return [...sortedWinners, ...sortedRest];
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <PageWrapper>
          <LoadingWrapper>
            <LoadingDots>Loading</LoadingDots>
          </LoadingWrapper>
        </PageWrapper>
      </Layout>
    );
  }

  if (!isSuccess) {
    return null;
  }

  if (data.length === 0) {
    return (
      <>
        <Head>
          <title>Listing</title>
          <meta name="description" content="See who has joined the draw" />
        </Head>
        <Layout>
          <PageWrapper>
            <EmptyStateCard>No participants yet. Be the first to join!</EmptyStateCard>
          </PageWrapper>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Listing</title>
        <meta name="description" content="See who has joined the draw" />
      </Head>

      <Layout>
        <PageWrapper>
          <Section>
            <SectionTitle>Participants</SectionTitle>
            <SectionCard>
              <StyledList>
                {data.map(participant => {
                  const isWinner = participant.isWinner === true;
                  return (
                    <ListItemCard
                      key={participant.id}
                      $participantName={participant.name}
                    >
                      <Avatar $participantName={participant.name}>
                        {getInitials(participant.name)}
                      </Avatar>
                      <NameCell>{participant.name}</NameCell>
                      {isWinner && <WinnerBadge>Winner</WinnerBadge>}
                    </ListItemCard>
                  );
                })}
              </StyledList>
            </SectionCard>
          </Section>
        </PageWrapper>
      </Layout>
    </>
  );
};

export default Listing;
