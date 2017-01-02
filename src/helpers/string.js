export const lpad = (str, padChar = '0', maxLength = 2) => {
  str += ''
  return str.length >= maxLength
    ? str
    : padChar.repeat(maxLength - str.length) + str
}