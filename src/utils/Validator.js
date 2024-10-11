const regex = {
  email: new RegExp(
    "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
  ),
  number: new RegExp("^[0-9]+$"),
};

export class Validators {
  /**
   *  Validate email address
   * @param {*} value
   * @param {*} message
   * @returns
   */
  static email(value, message) {
    if (value) {
      const result = regex.email.test(value);
      if (!result) return { error: true, message };
    }
    // return false;
  }

  /**
   *  set input as required
   * @param {*} value
   * @param {*} message
   * @returns
   */
  static required(value, message) {
    if (!value || !value.toString().trim().length) {
      return { error: true, message };
    }
    return false;
  }

  /**
   * Validate number
   * @param {*} value
   * @param {*} message
   * @returns
   */
  static number(value, message) {
    const length = value ? value.toString().length : 0;

    if (length > 0) {
      const result = regex.number.test(value);
      if (!result) {
        return { error: true, message };
      }
    }

    return false;
  }

  /**
   * Validate id number
   * @param {*} value
   * @param {*} message
   * @returns
   */
  static length(value, message) {
    const length = value ? value.toString().length : 0;
    const min = 11;

    if (length < min) {
      return { error: true, message };
    }

    if (length > min) {
      return { error: true, message };
    }

    return false;
  }
}

export const validateInput = (validators, value) => {
  if (validators && validators.length) {
    for (let i = 0; i < validators.length; i++) {
      const error = validators[i].check(value, validators[i].message);
      if (error) {
        return error;
      }
    }
  }
  return false;
};
