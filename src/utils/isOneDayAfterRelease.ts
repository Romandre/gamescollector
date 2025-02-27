export const isOneDayAfterRelease = (timestamp?: number): boolean => {
  if (!timestamp) return false;
  const now = Math.floor(Date.now() / 1000);
  const oneDayInSeconds = 24 * 60 * 60;

  return timestamp <= now - oneDayInSeconds;
};
