
function loginApporteur() {

  const username = document.getElementById('username').value

  if (username === 'default') {

    localStorage.setItem('user_role', 'apporteur')
    localStorage.setItem('user_name', username)

    alert('Connexion apporteur réussie')

    location.reload()

  } else {

    alert('Nom invalide')
  }
} 
