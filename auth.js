
function loginAgent() {

  const username = document.getElementById('username').value

  if (username === 'admin') {

    localStorage.setItem('user_role', 'agent')
    localStorage.setItem('user_name', username)

    alert('Connexion agent réussie')

    location.reload()

  } else {

    alert('Nom invalide')
  }
}