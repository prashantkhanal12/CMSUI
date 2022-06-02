interface TextBoxinputRulesParams {
  required?: boolean
  maxLength?: number
  minLength?: number
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'contact'
    | 'landline'
    | 'textWithSpace'
    | 'textWithNumber'
    | 'numberWithSpecialCharacter'
    | 'textWithNumberWithoutZeroLeading'
    | 'decimalNumber'
  value: string | number
}

export const regExp: any = {
  text: /^[a-zA-Z]+$/,
  textWithSpace: /^[A-Za-z\s]+$/,
  textWithNumber: /^[a-zA-Z0-9_ ]+$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  contact: /^(98|97)([0-9]{8})$/,
  number: /^[0-9][0-9]*$/,
  numberWithSpecialCharacter: /^[0-9#$%^&*()@!-/.,]*$/,
  decimalNumber: /^[0-9.]*$/,
  landline: /^01[0-9]+$/,
  textWithNumberWithoutZeroLeading: /^[a-zA-Z1-9_ ][a-zA-Z0-9_ ]*$/,
  // numberWithLength: /^[0-9]{1,3}$/,
}

export const validationRule = {
  textbox: (inputRules: TextBoxinputRulesParams) => {
    let error = ''
    if (inputRules.required && !inputRules.value) {
      error = `${inputRules.type} is required`
      return error
    } else if (inputRules.required || inputRules?.value) {
      const value = inputRules.value ? inputRules.value.toString() : ''
      if (inputRules.maxLength) {
        error = regExp[inputRules.maxLength].test(value)
          ? ''
          : `Maximum ${inputRules.maxLength} characters`
      }

      if (inputRules.minLength) {
        error = regExp[inputRules.minLength].test(value)
          ? ''
          : `Maximum ${inputRules.minLength} characters`
      }

      if (inputRules.type === 'text') {
        error = regExp[inputRules.type].test(value) ? '' : `Must be alphabets`
      }

      if (inputRules.type === 'textWithSpace') {
        error = regExp[inputRules.type].test(value) ? '' : `Must be alphabets`
      }

      if (inputRules.type === 'textWithNumber') {
        error = regExp[inputRules.type].test(value) ? '' : `Must be valid`
      }

      if (inputRules.type === 'email') {
        const value = inputRules.value ? inputRules.value.toString() : ''
        error = regExp[inputRules.type].test(value) ? '' : 'Must be valid email'
      }

      if (inputRules.type === 'contact') {
        error = regExp[inputRules.type].test(value) ? '' : `Invalid Contact Number`
      }

      if (inputRules.type === 'landline') {
        error = regExp[inputRules.type].test(value) ? '' : `Invalid Landline Number`
      }

      if (inputRules.type === 'number') {
        error = regExp[inputRules.type].test(value) ? '' : `Must be Numeric`
      }

      if (inputRules.type === 'numberWithSpecialCharacter') {
        error = regExp[inputRules.type].test(value) ? '' : `Must be numeric|special character`
      }

      if (inputRules.type === 'decimalNumber') {
        error = regExp[inputRules.type].test(value) ? '' : `Must be number or decimal`
      }
    }

    return error
  },
}
