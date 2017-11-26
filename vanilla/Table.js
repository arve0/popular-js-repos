const HEADERS = {
  name: 'Name',
  stargazers_count: 'Stars',
  forks: 'Forks',
  open_issues_count: 'Open issues'
}

export default function ({ repos, page, pageSize }) {
  let table = document.createElement('table')
  table.appendChild(Header())

  let start = page * pageSize
  let end = start + pageSize

  for (let i = start; i < end; i++) {
    let repo = repos[i]
    table.appendChild(Repo(repo))
  }

  return table
}

function Header () {
  let row = document.createElement('tr')

  for (let header in HEADERS) {
    let th = document.createElement('th')
    th.innerText = HEADERS[header]
    row.appendChild(th)
  }

  return row
}

function Repo (data) {
  let row = document.createElement('tr')

  for (let header in HEADERS) {
    let td = document.createElement('td')
    td.innerText = data[header]
    row.appendChild(td)
  }

  return row
}
