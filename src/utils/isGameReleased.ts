export const isGameReleased = (timestamp?: number): boolean => {
  if (!timestamp) return false;
  const now = Math.floor(Date.now() / 1000);

  return timestamp <= now;
};
