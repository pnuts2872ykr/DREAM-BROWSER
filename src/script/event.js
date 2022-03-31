each()

function each() {
  // when close button clicked
  document.querySelectorAll('div>span>a:last-child').forEach((i, item) => {
    i.addEventListener('click', () => {
      let elements = document.querySelectorAll('div>span')
      const element = i.parentNode
      elements = [].slice.call(elements)
      const index = elements.indexOf(element)
      i.parentNode.remove()
      node.removeTab(index, getCurrent())
    })
  })
  document.querySelectorAll('div>span').forEach((i, item) => {
    //when tab-bar clicked
    i.addEventListener('click', () => {
      //remove #opened's id(Opened)
      if (document.getElementById('opened')) {
        document.getElementById('opened').removeAttribute('id')
      }
      //clicked tab
      i.setAttribute('id', 'opened')
      node.tabMove(getCurrent())
    })
  })
}

let page = document.documentElement.innerHTML
if (node.loadLang()[0]) {
  Object.keys(node.loadLang()[1]).forEach((item) => {
    page = page.replace(
      new RegExp('%' + item + '%', 'g'),
      node.loadLang()[1][item]
    )
    document.documentElement.innerHTML = page
  })
}

document.getElementsByTagName('div')[0].addEventListener('click', () => {
  if (!document.getElementById('opened')) {
    try {
      //if #opened doesn't exist
      document
        .querySelector('div>span:last-child')
        .setAttribute('id', 'opened')
        .catch(() => {
          return true
        })
    } catch (e) {
      //if tab doesn't exist(error handling)
      if (!document.getElementsByTagName('span')[0]) {
        newtab()
      }
    }
  }
})

function newtab(title) {
  if (document.getElementById('opened')) {
    document.getElementById('opened').removeAttribute('id')
  }
  document.getElementsByTagName('div')[0].innerHTML = `
    ${document.getElementsByTagName('div')[0].innerHTML}
    <span id="opened">
      <a href="javascript:void(0)">${title}</a>
      <a href="javascript:void(0)"></a>
    </span>
  `
  each()
  node.newtab()
}
