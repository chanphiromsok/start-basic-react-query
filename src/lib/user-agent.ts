export function getAccountNumber(userAgent: string | null) {
  if (userAgent) {
    const account_number = userAgent.split(':')[4] // "012244356";
    if (
      account_number &&
      account_number.length > 7 &&
      account_number.length < 11
    ) {
      return account_number
    }
  }
  //   Client
  return import.meta.env.REACT_APP_ACCOUNT_NUMBER
}

/**
 * @returns km | en | zh
 */
export function getLanguage(userAgent: string | null) {
  if (userAgent) {
    const language = userAgent.split(':')[2]
    if (language && language.length === 2) {
      if (language.toUpperCase() === 'KH' || language.toUpperCase() === 'KM') {
        return 'km'
      }
      if (language.toUpperCase() === 'CH') {
        return 'ch'
      }

      return language.toLowerCase()
    }
  }
  return 'en'
}
