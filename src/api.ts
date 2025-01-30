import { NewParticipant, Participant } from '@/src/types';

export const getParticipants = async (): Promise<Participant[]> => {
  const res = await fetch('api/participants');
  console.log("hello");
  //console.log(res.json());
  return res.json();
};

export const registerNewParticipant = async (participant: NewParticipant): Promise<Response> => {
  const res = await fetch('api/participants', {
    method: 'POST',
    body: JSON.stringify(participant)
  });

  if (!res.ok) {
    throw new Error('Error');
  }

  return res.json();
};

export const draw = async (count: number): Promise<string[]> => {
  const res = await fetch(`api/participants/draw?count=${count}`, { method: 'POST' });
  return res.json();
};

export const newDraw = async () => {
  const res = await fetch(`api/admin/newDraw`, { method: 'POST' });
  return res.json();
};

export const generateParticipants = async (): Promise<Response> => {
  const res = await fetch('api/admin/mockParticipants', {
    method: 'POST'
  });

  return res.json();
};

export const removeParticipant = async (id: string): Promise<Response> => {
  const res = await fetch(`api/participants/${id}`, {
    method: 'DELETE'
  });

  return res.json();
};

export const authenticate = async (password: string): Promise<{}> => {
  const res = await fetch('api/authenticate', {
    method: 'POST',
    body: JSON.stringify({ password })
  });

  if (!res.ok) {
    throw new Error('Invalid password');
  }

  return res.json();
};
