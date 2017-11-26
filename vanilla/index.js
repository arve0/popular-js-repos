import githubMostPopular from './github-most-popular.js'
import currentPage from './current-page.js'
import Table from './Table.js'
import Pagination from './Pagination.js'

const state = {
  page: currentPage(),
  pages: 0,
  pageSize: 20,
  repos: []
}

githubMostPopular().then(res => {
  state.repos = res
  state.pages = Math.floor(res.length / state.pageSize)
  render()
})

window.onhashchange = function () {
  state.page = currentPage()
  render()
}

function render () {
  const appEl = document.getElementById('app')
  appEl.innerHTML = ''  // remove content from div

  appEl.appendChild(Pagination(state))
  appEl.appendChild(Table(state))
  appEl.appendChild(Pagination(state))
}
