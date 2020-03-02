/* eslint-disable max-len */
/* eslint-disable no-useless-escape */

export default class Regex {
  public static REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  public static REGEX_PASSWORD_LENGTH = /(?=.{8,})/;
  public static REGEX_PASSWORD_LOWERCASE = /(?=.*[a-z])/;
  public static REGEX_PASSWORD_UPPERCASE = /(?=.*[A-Z])/;
  public static REGEX_PASSWORD_NUMBER = /(?=.*[0-9])/;
  public static REGEX_PASSWORD_SPECIAL_CHARACTER = /(?=.*[!@#$%^&*])/;
}
