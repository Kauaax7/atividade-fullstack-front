# Tarefas - Frontend

Aplicativo de lista de tarefas feito com **React Native (Expo)**.
Faz parte da Atividade Individual 06 (App Fullstack). Ele consome a API do repositório **tarefas-backend**.

## Funcionalidades (CRUD completo)

- Cadastrar tarefa
- Listar tarefas
- Editar tarefa (ícone de lápis) e marcar como concluída (toque na tarefa)
- Excluir tarefa (ícone de lixeira)

## O que precisa ter instalado

- [Node.js](https://nodejs.org/)
- App **Expo Go** no celular (ou um emulador Android/iOS)
- O **backend rodando** (veja o README do repositório tarefas-backend)

## Como rodar

1. Clone o repositório e entre na pasta:
   ```bash
   git clone <link-deste-repositorio>
   cd tarefas-frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Abra o arquivo `src/config.js` e troque o endereço da API:
   ```js
   export const API_URL = 'http://SEU_IP:3000';
   ```
   - Celular físico: use o IP do seu computador (ex: `http://192.168.0.10:3000`). O celular e o PC precisam estar na **mesma rede Wi-Fi**.
   - Emulador Android: `http://10.0.2.2:3000`
   - Navegador (web): `http://localhost:3000`
4. Inicie o projeto:
   ```bash
   npx expo start
   ```
5. Escaneie o QR Code com o Expo Go.

## Tecnologias

React Native, Expo, fetch (para chamar a API).
