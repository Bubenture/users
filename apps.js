const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase()
  const filteredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(value)
  )
  render(filteredUsers)
})

async function start() {
  list.innerHTML = 'Loading...'
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    })
    const data = await resp.json()
    setTimeout(() => {
      USERS = data
      render(data)
    }, 2000)
  } catch (err) {
    list.innerHTML = err.message
  }
}

function render(users = []) {
  if (users.length === 0) {
    list.innerHTML = 'No users'
  } else {
    const html = users.map(toHtml).join('')
    list.innerHTML = html
  }
}

function toHtml(user) {
  return `
  <li class="list-group-item">${user.name}</li>
  `
}

start()
