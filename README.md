# 🤖 Discord-Self-Bot

Um **selfbot** simples para **divulgação automática no Discord**, com funcionalidades úteis para personalização e interação em múltiplos servidores.

> ⚠️ **Atenção:** Selfbots violam os Termos de Serviço do Discord. Use por sua conta e risco.

---

## 📦 Módulos Utilizados

- [`discord.js-selfbot-v11`](https://www.npmjs.com/package/discord.js-selfbot-v11)
- [`enmap`](https://www.npmjs.com/package/enmap)
- [`fs`](https://nodejs.org/api/fs.html) (nativo do Node.js)

---

## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/discord-self-bot
   cd discord-self-bot
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `config.json`:
   ```json
   {
     "token": "SEU_TOKEN_AQUI",
     "dono": "SEU_ID",
     "prefix": "!"
   }
   ```

---

## ✅ Comandos Disponíveis

| Comando     | Descrição                                                         |
|-------------|-------------------------------------------------------------------|
| `!nome`     | Altera o nome de usuário do bot                                   |
| `!avatar`   | Altera o avatar do bot                                            |
| `!status`   | Exibe informações como tempo online, membros e servidores         |
| `!div`      | Envia uma mensagem de divulgação para todos os DMs disponíveis    |
| `!divs`     | Envia um embed com informações para todos os usuários             |

> Prefixo padrão: `!` (configurável no `config.json`)

---

## 📂 Estrutura de Pastas

```
📦 discord-self-bot
┣ 📂 Comandos
┃ ┣ 📜 avatar.js
┃ ┣ 📜 nome.js
┃ ┣ 📜 status.js
┃ ┣ 📜 div.js
┃ ┗ 📜 divs.js
┣ 📜 config.json
┣ 📜 index.js
┣ 📜 README.md
┗ 📜 package.json
```

---

## 🔐 Aviso Legal

Este projeto é para **fins educacionais e testes pessoais**.  
**Não** incentive ou promova spam no Discord. Use com responsabilidade.

---

## 💻 Autor

- Feito por [Yusuke](https://github.com/UserWhare)
