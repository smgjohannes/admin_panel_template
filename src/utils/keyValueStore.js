const KEY_VALUE_STORE_PREFIX = 'store_app_constitution_v1_';

const keyValStore = {
  get(key) {
    return localStorage.getItem(`${KEY_VALUE_STORE_PREFIX}${key}`);
  },
  set(key, val) {
    return localStorage.setItem(`${KEY_VALUE_STORE_PREFIX}${key}`, val);
  },
  clear() {
    return localStorage.clear();
  },
};

export default keyValStore;
