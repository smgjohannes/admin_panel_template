export const startLoader = () => {
  let i = Math.floor(Math.random() * 40) + 10;
  return i;
};

export const endLoader = (value = 100) => {
  return 100;
};
