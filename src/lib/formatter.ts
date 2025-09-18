export const timeConversion = (milliseconds: number) => {
  if (!milliseconds) return 0;
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  console.log(seconds);

  let time = hours !== 0 ? `${hours}h` : ``;

  time += minutes !== 0 ? ` ${minutes}m` : ``;
  time += ` ${seconds}s`;

  return time;
};
