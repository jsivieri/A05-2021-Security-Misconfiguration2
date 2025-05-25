document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  const dados = JSON.parse(localStorage.getItem('usuarios')) || {};

  if (dados[user] && dados[user].senha === pass) {
    document.getElementById('mensagem').textContent = 'Login bem-sucedido!';
    document.getElementById('mensagem').className = 'message-box success';

    const resultado = document.getElementById('resultado');
    if (dados[user].perfil === 'admin') {
      resultado.innerHTML = '<h3>Área do Administrador</h3><ul>' +
        Object.entries(dados).map(([u, info]) => `<li>${u} / ${info.senha}</li>`).join('') +
        '</ul>';
    } else {
      resultado.innerHTML = `<p>Bem-vindo, ${user}. Seu perfil é <strong>usuário comum</strong>.</p>`;
    }
  } else {
    document.getElementById('mensagem').textContent = 'Usuário ou senha inválidos.';
    document.getElementById('mensagem').className = 'message-box error';
    document.getElementById('resultado').innerHTML = '';
  }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const newUser = document.getElementById('regUser').value;
  const newPass = document.getElementById('regPass').value;
  const perfil = document.getElementById('perfil').value;
  const dados = JSON.parse(localStorage.getItem('usuarios')) || {};

  dados[newUser] = { senha: newPass, perfil: perfil };
  localStorage.setItem('usuarios', JSON.stringify(dados));

  document.getElementById('mensagem').textContent = 'Usuário cadastrado com sucesso.';
  document.getElementById('mensagem').className = 'message-box success';
});
