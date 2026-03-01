import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Participant } from '@/src/types';
import { Button, Table } from '@mantine/core';
import { generateParticipants, getParticipants, newDraw, removeParticipant } from '@/src/api';
import { Colors, breakpoints, borderRadius, spacing } from '@/src/constants';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.pagePadding};
`;


const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;

  @media (min-width: ${breakpoints.md}) {
    justify-content: flex-start;
  }

  & button {
    min-width: 160px;
  }
  @media (max-width: ${breakpoints.sm}) {
    & button {
      width: 100%;
      min-width: 0;
    }
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: ${borderRadius.md}px;
  border: 1px solid ${Colors.border};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const StyledTable = styled(Table)`
  min-width: 600px;

  th, td {
    padding: 12px 16px;
    font-size: 0.9375rem;
    vertical-align: middle;
  }
  th {
    background: ${Colors.headerBg};
    font-weight: 700;
    color: ${Colors.colorSecondary};
    text-align: left;
  }
  th:nth-child(4) {
    text-align: center;
  }
  th:last-child {
    min-width: 180px;
  }
  td {
    text-align: left;
  }
  td:nth-child(4) {
    text-align: center;
  }
  tbody tr:hover {
    background: rgba(120, 190, 33, 0.06);
  }
`;

const ActionsCell = styled.td`
  display: table-cell !important;
`;

const ActionsWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-width: 160px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: clamp(48px, 10vw, 80px) 24px;
  color: ${Colors.textMuted};
  font-size: 1.125rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: ${Colors.textMuted};
`;

const Admin = () => {
  const queryClient = useQueryClient();
  const { data, isSuccess, refetch } = useQuery<Participant[]>({
    queryKey: ['participants'],
    queryFn: getParticipants
  });

  const invalidateParticipants = () => {
    void queryClient.invalidateQueries({ queryKey: ['participants'] });
  };

  const { mutate: newDrawMutation } = useMutation({
    mutationFn: newDraw,
    onSuccess: invalidateParticipants,
    onError: error => {
      console.log({ error });
    }
  });

  const { mutate: removeParticipantMutation } = useMutation({
    mutationFn: removeParticipant,
    onSuccess: invalidateParticipants,
    onError: error => {
      console.log({ error });
    }
  });

  const { mutate: generateParticipantsMutation } = useMutation({
    mutationFn: generateParticipants,
    onSuccess: () => {
      invalidateParticipants();
      void refetch();
    },
    onError: error => {
      console.log({ error });
    }
  });

  if (!isSuccess) {
    return (
      <Wrapper>
        <LoadingWrapper>Loading…</LoadingWrapper>
      </Wrapper>
    );
  }

  if (data.length === 0) {
    return (
      <Wrapper>
        <EmptyState>
          <p style={{ marginBottom: 24 }}>No participants yet</p>
          <Button
            size="md"
            radius="md"
            style={{ backgroundColor: Colors.colorSecondary, color: Colors.white }}
            onClick={() => generateParticipantsMutation()}
          >
            Mock Participants
          </Button>
        </EmptyState>
      </Wrapper>
    );
  }

  const onNewDrawClick = () => {
    const text = 'All participants will be removed!\nEither OK or Cancel.';
    if (confirm(text)) {
      newDrawMutation();
    }
  };

  return (
    <Wrapper>
      <ButtonGroup>
        <Button
          size="md"
          radius="md"
          style={{ backgroundColor: Colors.colorPrimary, color: Colors.white }}
          onClick={onNewDrawClick}
        >
          NEW DRAW
        </Button>
        <Button
          size="md"
          radius="md"
          style={{ backgroundColor: Colors.colorSecondary, color: Colors.white }}
          onClick={() => generateParticipantsMutation()}
        >
          Mock Participants
        </Button>
      </ButtonGroup>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Winner</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(participant => (
              <tr key={participant.id}>
                <td>{participant.id}</td>
                <td>{participant.name}</td>
                <td>{participant.email}</td>
                <td>{participant.isWinner ? 'Yes' : 'No'}</td>
                <td>{participant.participationTime}</td>
                <ActionsCell>
                  <ActionsWrap>
                    <Button
                      size="xs"
                      variant="filled"
                      style={{
                        backgroundColor: '#c53030',
                        color: Colors.white,
                        flexShrink: 0
                      }}
                      onClick={() => removeParticipantMutation(participant.id)}
                    >
                      Delete
                    </Button>
                    {participant.isWinner ? (
                      <a href={`mailto:${participant.email}`}>
                        <Button size="xs" variant="light" style={{ flexShrink: 0 }}>
                          Mail winner
                        </Button>
                      </a>
                    ) : (
                      <span style={{ minWidth: 86, display: 'inline-block' }} />
                    )}
                  </ActionsWrap>
                </ActionsCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Wrapper>
  );
};

export default Admin;
