const URL = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100'

/**
 * Get 100 most popular js repositories from github.
 *
 * @returns {Promise} Resolves to array of repositories.
 */
export default function () {
  return window.fetch(URL)
    .then(r => {
      if (!r.ok) {
        throw new Error(r.statusText)
      }
      return r.json()
    })
    .then(r => {
      return r.items
    })
}
