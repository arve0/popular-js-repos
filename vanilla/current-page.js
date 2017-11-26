/**
 * Get current page from browser hash (#page=1).
 *
 * @returns {number}
 */
export default function () {
  let hash = window.location.hash
  return hash === '' ? 0 : parseInt(hash.slice(1))
}
