import { t } from 'i18next';

export function trans(key, replace) {
  let translation = t(key);

  for (const placeholder in replace) {
    if (Object.prototype.hasOwnProperty.call(replace, placeholder)) {
      translation = translation.replace(`:${placeholder}`, replace[placeholder].toString());
    }
  }

  return translation;
}

export function checkJsonObject(text) {
  try {
    const parsedJson = text && JSON.parse(text);

    return parsedJson;
  } catch (e) {
    return false;
  }
}
