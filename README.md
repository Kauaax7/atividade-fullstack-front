# Tarefas - Frontend

Aplicativo de lista de tarefas feito com **React Native (Expo)**.
Faz parte da Atividade Individual 06 (App Fullstack). Ele consome a API do repositório [atividade-fullstack-back](https://github.com/Kauaax7/atividade-fullstack-back).

## Funcionalidades (CRUD completo)

- Cadastrar tarefa
- Listar tarefas
- Editar tarefa (ícone de lápis) e marcar como concluída (toque na tarefa)
- Excluir tarefa (ícone de lixeira)

## O que precisa ter instalado

- [Node.js](https://nodejs.org/)
- App **Expo Go** no celular (ou um emulador Android/iOS)
- O **backend rodando** (veja o README do repositório [atividade-fullstack-back](https://github.com/Kauaax7/atividade-fullstack-back))

## Como rodar

1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/Kauaax7/atividade-fullstack-front.git
   cd atividade-fullstack-front
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Abra o arquivo `src/config.js` e troque o endereço da API:
   ```js
   export const API_URL = 'http://SEU_IP:3000';
   ```
   - **Celular físico:** use o IP do seu computador (ex: `http://192.168.1.25:3000`). Para descobrir, rode `ipconfig` no Windows e pegue o "Endereço IPv4". O celular e o PC precisam estar na **mesma rede Wi-Fi**.
   - **Emulador Android:** `http://10.0.2.2:3000`
   - **Navegador (web):** `http://localhost:3000`
4. Com o backend já rodando, inicie o projeto:
   ```bash
   npx expo start
   ```
5. Escaneie o QR Code com o Expo Go.

## Problemas comuns

- **"Não consegui conectar na API":** confira se o backend está rodando, se o IP no `src/config.js` está certo e se o celular está na mesma rede Wi-Fi do computador.
- **A lista não carrega:** confira se o `API_URL` não termina com barra (`/`).

## Tecnologias

React Native, Expo e `fetch` (para chamar a API).
