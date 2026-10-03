<div align="center">

# Discord Self Bot

**Projeto legado de self bot para Discord, mantido como estudo e arquivo pessoal.**

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Legacy-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge)

</div>

---

> Self bots não são suportados pelo Discord e podem resultar em punições na conta. Este repositório é mantido como projeto legado e deve ser usado por conta e risco.

## Recursos

- Sistema simples de comandos
- Alteração de nome e avatar
- Informações de status e uptime
- Presença rotativa
- Configuração por `.env`
- Divulgação por texto ou embed para uma lista explícita de destinatários
- Intervalo configurável entre envios
- Logs básicos no terminal

Os comandos de divulgação usam somente os IDs definidos manualmente em `RECIPIENT_IDS`.

## Configuração

Instale as dependências:

```bash
npm install
```

Copie `.env.example` para `.env` e configure:

```env
DISCORD_TOKEN=SEU_TOKEN_AQUI
OWNER_ID=SEU_ID
PREFIX=!
RECIPIENT_IDS=ID_1,ID_2
BROADCAST_DELAY_MS=2000
MAX_RECIPIENTS=20
```

Depois execute:

```bash
npm start
```

## Comandos

| Comando | Função |
| --- | --- |
| `!help` | Lista os comandos |
| `!status` | Mostra informações da sessão |
| `!nome <nome>` | Altera o nome da conta |
| `!avatar <url>` | Altera o avatar |
| `!div <mensagem>` | Envia texto aos destinatários configurados |
| `!divembed <título> \| <mensagem>` | Envia um embed aos destinatários configurados |

## Estrutura

```text
Discord-Self_Bot/
├── commands/
│   ├── avatar.js
│   ├── div.js
│   ├── divembed.js
│   ├── help.js
│   ├── nome.js
│   └── status.js
├── src/
│   ├── config.js
│   ├── logger.js
│   └── utils.js
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Projeto legado

A base `discord.js-selfbot-v11` foi preservada de propósito. Migrar este projeto para uma stack atual mudaria a natureza do repositório e provavelmente exigiria uma implementação não oficial diferente.

## Licença

Distribuído sob a [Licença MIT](LICENSE).

---

<div align="center">

Feito por [UserWhare](https://github.com/UserWhare)

</div>
