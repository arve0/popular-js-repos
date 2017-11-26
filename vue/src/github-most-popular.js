const URL = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100'

/**
 * Get 100 most popular js repositories from github.
 *
 * @returns {Promise} Resolves to array of repositories.
 */
export default function () {
  return window.fetch(URL)
    .then(r => r.json())
    .then(r => {
      return r.items
    })
    .catch(() => []) // failback, TODO: show error msg
}
