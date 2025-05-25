document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const usuario = document.getElementById('loginUser').value;
  const senha = document.getElementById('loginPass').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  });

  const data = await response.json();
  const msgBox = document.getElementById('mensagem');
  const result = document.getElementById('resultado');

  if (response.ok) {
    msgBox.textContent = 'Login bem-sucedido!';
    msgBox.className = 'message-box success';

    if (data.mensagem === 'admin') {
      let lista = '<h3>Área do Administrador</h3><ul>';
      for (let user in data.dados) {
        lista += `<li>${user} / ${data.dados[user].senha}</li>`;
      }
      lista += '</ul>';
      result.innerHTML = lista;
    } else {
      result.innerHTML = `<p>Bem-vindo, ${data.nome}. Seu perfil é <strong>usuário comum</strong>.</p>`;
    }
  } else {
    msgBox.textContent = data.mensagem;
    msgBox.className = 'message-box error';
    result.innerHTML = '';
  }
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const usuario = document.getElementById('regUser').value;
  const senha = document.getElementById('regPass').value;
  const perfil = document.getElementById('perfil').value;

  const response = await fetch('/cadastrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha, perfil })
  });

  const data = await response.json();
  const msgBox = document.getElementById('mensagem');
  msgBox.textContent = data.mensagem;
  msgBox.className = 'message-box success';
});