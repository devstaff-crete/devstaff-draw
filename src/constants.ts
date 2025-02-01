export const FIREBASE_URL = process.env.FIREBASE_URL;

export const emailRegex = () => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

export const Colors: Record<string, string> = {
  headerBg: '#F7F7FF',
  colorPrimary: '#78be21',
  colorSecondary: '#3e3e40',
  colorError: '#D92929FF',
  grey: '#6D6E71'
};
