const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' as const

export function generateShortId(length: number = 6): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length)
    result += CHARACTERS.charAt(randomIndex)
  }
  return result
}
