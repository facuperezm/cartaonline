const DIACRITICS_REGEX = /[\u0300-\u036f]/g
const NON_SLUG_CHARS_REGEX = /[^a-z0-9]+/g
const SLUG_EDGE_DASH_REGEX = /^-+|-+$/g
const SLUG_SEPARATOR_REGEX = /[-_]+/g
const WHITESPACE_REGEX = /\s+/

export function slugifyCityName(cityName: string) {
  return cityName
    .normalize('NFD')
    .replace(DIACRITICS_REGEX, '')
    .toLowerCase()
    .trim()
    .replace(NON_SLUG_CHARS_REGEX, '-')
    .replace(SLUG_EDGE_DASH_REGEX, '')
}

export function humanizeCitySlug(citySlug: string) {
  return citySlug
    .replace(SLUG_SEPARATOR_REGEX, ' ')
    .trim()
    .split(WHITESPACE_REGEX)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
}
