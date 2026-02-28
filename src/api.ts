import { NewParticipant, Participant } from '@/src/types';

export const getParticipants = async (): Promise<Participant[]> => {
  const res = await fetch('/api/participants');
  return res.json();
};

export class RegistrationError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'RegistrationError';
  }
}

export const registerNewParticipant = async (participant: NewParticipant): Promise<unknown> => {
  const res = await fetch('/api/participants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(participant)
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new RegistrationError(data?.message ?? res.statusText, res.status);
  }

  return res.json();
};

export const draw = async (count: number): Promise<string[]> => {
  const res = await fetch(`/api/participants/draw?count=${count}`, { method: 'POST' });
  return res.json();
};

export const newDraw = async () => {
  const res = await fetch(`/api/admin/newDraw`, { method: 'POST' });
  return res.json();
};

export const generateParticipants = async (): Promise<Response> => {
  const res = await fetch('/api/admin/mockParticipants', {
    method: 'POST'
  });

  return res.json();
};

export const removeParticipant = async (id: string): Promise<Response> => {
  const res = await fetch(`/api/participants/${id}`, {
    method: 'DELETE'
  });

  return res.json();
};

export const authenticate = async (password: string): Promise<{}> => {
  const res = await fetch('/api/authenticate', {
    method: 'POST',
    body: JSON.stringify({ password })
  });

  if (!res.ok) {
    throw new Error('Invalid password');
  }

  return res.json();
};
