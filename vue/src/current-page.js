/**
 * Get current page from browser hash (#1, #2, #3, ...).
 *
 * @returns {number}
 */
export default function () {
  let hash = window.location.hash
  return hash === '' ? 0 : parseInt(hash.slice(1))
}
