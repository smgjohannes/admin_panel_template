import config from '../config';

export const imageUrl = (img) => {
  return `${config.baseUrl}/${img.disk}/${img.directory}/${img.filename}.${img.extension}`;
};
