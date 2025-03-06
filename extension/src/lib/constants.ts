// Permit configuration constants
export const PERMIT_WAIT_TIME = parseInt(process.env.PLASMO_PUBLIC_PERMIT_WAIT_TIME || "86400000"); // default: 24 hours (1 day)
export const PERMIT_LENGTH = parseInt(process.env.PLASMO_PUBLIC_PERMIT_LENGTH || "172800000"); // default: 48 hours (2 days)
export const PERMIT_ON_PAY_GRACE = parseInt(process.env.PLASMO_PUBLIC_PERMIT_ON_PAY_GRACE || "3000000"); // default: 50 minutes

// Format milliseconds to human-readable time
export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}`
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`
  }
}