import { nanoid } from 'nanoid';

export const generateShortId = () => {
  // Generate a short ID of 8 characters
  return nanoid(8);
};