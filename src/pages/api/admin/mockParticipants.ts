import { NextApiRequest, NextApiResponse } from 'next';
import { FIREBASE_URL } from '@/src/constants';
import { Participant } from '@/src/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ success: boolean } | {}>) {
  switch (req.method) {
    case 'POST': {
      const mockedParticipants = Array.from(Array(50).keys()).map(
        (i): Omit<Participant, 'id'> => ({
          name: `test ${i} name`,
          email: `test${i}@devstaff.gr`,
          participationTime: new Date().toISOString(),
          isWinner: false
        })
      );

      await Promise.all(
        mockedParticipants.map(participant =>
          fetch(`${FIREBASE_URL}/participants.json`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ ...participant, participationTime: new Date().toISOString() })
          })
        )
      );

      res.status(200).json({ success: true });
      break;
    }
    default:
      res.status(405).json({});
  }
}
