
export default function ({ page, pages }) {
  let el = document.createElement('div')
  el.id = 'pagination'

  el.innerHTML = '<span>Go to page: </span>'

  for (let i = 0; i < pages; i++) {
    let current = i === page ? 'current' : ''
    el.innerHTML += `<a href="#${i}" class="page ${current}">${i + 1}</a>`
  }

  return el
}
