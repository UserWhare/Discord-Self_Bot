# 🤖 Discord-Self-Bot

Selfbot simples para **divulgação automática** no Discord, com comandos úteis para personalização e interação.

> ⚠️ **Atenção:** Selfbots violam os Termos de Serviço do Discord. Use por sua conta e risco.

---

## 📦 Módulos

- [`discord.js-selfbot-v11`](https://www.npmjs.com/package/discord.js-selfbot-v11)
- [`enmap`](https://www.npmjs.com/package/enmap)
- [`fs`](https://nodejs.org/api/fs.html)

---

## ⚙️ Instalação

1. Clone o projeto:
```bash
git clone https://github.com/UserWhare/discord-self-bot
cd discord-self-bot
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o `config.json`:
```json
{
  "token": "SEU_TOKEN_AQUI",
  "dono": "SEU_ID",
  "prefix": "!"
}
```

---

## ✅ Comandos

| Comando   | Função                                                  |
|-----------|----------------------------------------------------------|
| `!nome`   | Troca o nome do bot                                      |
| `!avatar` | Troca o avatar                                           |
| `!status` | Mostra tempo online, membros e servidores                |
| `!div`    | Envia divulgação para todos os DMs disponíveis           |
| `!divs`   | Envia embed com informações para todos os usuários       |

> Prefixo padrão: `!` (ajustável no `config.json`)

---

## 📂 Estrutura

```
📦 discord-self-bot
┣ 📂 Comandos
┃ ┣ 📜 avatar.js
┃ ┣ 📜 nome.js
┃ ┣ 📜 status.js
┃ ┣ 📜 div.js
┃ ┗ 📜 divembled.js
┣ 📜 config.json
┣ 📜 index.js
┣ 📜 README.md
┗ 📜 package.json
```

---

## 🔐 Aviso

Projeto para **fins educacionais e testes**.  
Não promova spam. Use com responsabilidade.

---

## 💻 Autor

Feito por [Yusuke](https://github.com/UserWhare)
