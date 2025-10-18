const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']

export function numberToWords(num) {
  if (num === 0) return 'zero'

  if (num < 10) {
    return ones[num]
  }

  if (num < 20) {
    return teens[num - 10]
  }

  if (num < 100) {
    const ten = Math.floor(num / 10)
    const one = num % 10
    return tens[ten] + (one ? '-' + ones[one] : '')
  }

  if (num < 1000) {
    const hundred = Math.floor(num / 100)
    const rest = num % 100
    return ones[hundred] + ' hundred' + (rest ? ' ' + numberToWords(rest) : '')
  }

  if (num < 10000) {
    const thousand = Math.floor(num / 1000)
    const rest = num % 1000
    return ones[thousand] + ' thousand' + (rest ? ' ' + numberToWords(rest) : '')
  }

  return num.toString()
}

// Generate random number based on difficulty
export function generateNumber(difficulty) {
  switch (difficulty) {
    case 'easy':
      // Numbers < 30
      return Math.floor(Math.random() * 30)

    case 'medium':
      // Numbers < 100 and powers of 10
      const usePowerOfTen = Math.random() < 0.2 // 20% chance of power of 10
      if (usePowerOfTen) {
        const powers = [10, 100, 1000]
        return powers[Math.floor(Math.random() * powers.length)]
      }
      return Math.floor(Math.random() * 100)

    case 'hard':
      // Any number < 5000
      return Math.floor(Math.random() * 5000)

    default:
      return Math.floor(Math.random() * 30)
  }
}
