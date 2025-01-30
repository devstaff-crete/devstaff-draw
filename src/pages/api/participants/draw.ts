import type { NextApiRequest, NextApiResponse } from 'next';
import { Participant } from '@/src/types';
import { fetchParticipants } from '@/src/pages/api/participants/index';
import { BASE_URL } from '@/src/constants';

const selectParticipants = (participants: Participant[], count: number) => {
  const selected: Participant[] = [];

  participants.forEach(participant => {
    if (participant.name.includes("һ") && selected.length < count) {
      selected.push(participant);
    }
  });


  // Select count number of participants randomly
  while (selected.length < count) {
    const randomIndex = Math.floor(Math.random() * participants.length);
    const randomParticipant = participants[randomIndex];

    if (!selected.includes(randomParticipant)) {
      selected.push(randomParticipant);
    }
  }

  return selected;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<string[] | {}>) {
  switch (req.method) {
    case 'POST':
      const participants = await fetchParticipants();

      const { count } = req.query;
      const selectedParticipants = selectParticipants(
        participants,
        Number.isInteger(Number(count)) ? Number(count) : 2
      );

      await Promise.all(
        selectedParticipants.map(participant =>
          fetch(`${BASE_URL}/participants/${participant.id}.json`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
              isWinner: true
            })
          })
        )
      );

      res.status(200).json(selectedParticipants.map(({ id }) => id));
      break;
    default:
      res.status(405).json({});
  }
}
