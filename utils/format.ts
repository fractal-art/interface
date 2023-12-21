export const shortenAddress = (address?: string, frontLen = 10, backLen = 6) => {
  if (!address) return ''
  return address.slice(0, frontLen) + '...' + address.slice(-backLen)
}
