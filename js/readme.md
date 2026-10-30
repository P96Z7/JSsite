# Documentação JavaScript

Esta pasta contém a lógica da aplicação Social Media, organizada em módulos ES6.

A arquitetura separa as responsabilidades de comunicação com a API, autenticação, manipulação de dados auxiliares e gerenciamento das interfaces.

## Estrutura

```text
js/
│
├── apiFunc.js
├── auth.js
├── aux.js
├── constants.js
│
├── login/
│   └── script.js
│
├── register/
│   └── script.js
│
└── feed/
    ├── getFeed.js
    └── userFuncs/
        ├── comments.js
        └── post.js
```

---

## 1. Módulos principais

### `apiFunc.js`

Centraliza as requisições HTTP realizadas pela aplicação.

É responsável por estabelecer a comunicação entre o Front-End e a API REST.

**Funções exportadas:**

| Função | Responsabilidade |
|---|---|
| `UsersAPI()` | Recupera a lista de usuários. |
| `loginAPI(user, passwd)` | Realiza a autenticação. |
| `registerAPI(log, password, name, image)` | Envia os dados de cadastro. |
| `getInfoPosts()` | Recupera as publicações. |
| `checkUserLogin()` | Verifica a autenticação do usuário. |
| `getLikes(id)` | Recupera as curtidas de uma publicação. |
| `setLike(id)` | Registra uma curtida. |
| `sendPost(msg, image)` | Envia uma nova publicação. |
| `deletePost(id)` | Exclui uma publicação. |
| `delComment(id)` | Exclui um comentário. |
| `sendComment(text, id)` | Envia um comentário para uma publicação. |
| `getComments(id)` | Recupera os comentários de uma publicação. |

**Dependências:**
- `constants.js`: endereço base da API.
- `auth.js`: recuperação do token de autenticação.

### `auth.js`

Responsável pelo gerenciamento das informações da sessão do usuário utilizando `sessionStorage`.

| Função | Responsabilidade |
|---|---|
| `setToken(token)` | Armazena o token de autenticação. |
| `getToken()` | Recupera o token armazenado. |
| `logout()` | Remove o token da sessão. |
| `getId()` | Recupera o ID do usuário. |
| `setUser(user)` | Armazena nome, imagem e ID do usuário. |
| `getUserInfos()` | Recupera nome e imagem do usuário. |

### `aux.js`

Contém funções auxiliares utilizadas para relacionar informações entre os dados recebidos da API.

| Função | Responsabilidade |
|---|---|
| `checkIfLiked(nome, vector)` | Verifica se um usuário já curtiu uma publicação. |
| `relacionateIdUser(id, vector)` | Localiza o nome de um usuário pelo ID. |
| `relacionateIdimg(id, vector)` | Localiza a imagem de um usuário pelo ID. |

### `constants.js`

Centraliza referências aos elementos HTML e constantes utilizadas pelos módulos.

Entre suas principais responsabilidades estão:

- Definir a URL base da API.
- Disponibilizar referências aos formulários.
- Centralizar referências aos campos de entrada.
- Disponibilizar os templates de publicações e comentários.
- Centralizar referências aos elementos da interface do usuário.

---

## 2. Módulo de login

### `login/script.js`

Controla o fluxo de autenticação.

**Principais responsabilidades:**

1. Capturar o envio do formulário de login.
2. Recuperar usuário e senha.
3. Chamar `loginAPI()`.
4. Armazenar o token e os dados do usuário.
5. Redirecionar para o feed após autenticação.
6. Exibir mensagens em caso de erro.

**Dependências:**
- `constants.js`
- `apiFunc.js`
- `auth.js`

---

## 3. Módulo de cadastro

### `register/script.js`

Gerencia o cadastro de novos usuários.

**Principais responsabilidades:**

1. Capturar os dados do formulário.
2. Consultar os usuários existentes.
3. Verificar se o login já está cadastrado.
4. Enviar os dados utilizando `registerAPI()`.
5. Exibir mensagens de sucesso ou erro.
6. Gerar uma pré-visualização da imagem de perfil informada por URL.

**Dependências:**
- `constants.js`
- `apiFunc.js`

---

## 4. Módulo do feed

### `feed/getFeed.js`

É responsável pela montagem e atualização do feed de publicações.

**Principais responsabilidades:**

- Recuperar as publicações do servidor.
- Inverter a ordem recebida para exibir primeiro os últimos elementos retornados.
- Clonar o template de publicação.
- Recuperar informações dos autores.
- Recuperar e exibir curtidas.
- Identificar publicações curtidas pelo usuário.
- Exibir opções de gerenciamento das próprias publicações.
- Recuperar e renderizar comentários.
- Atualizar os comentários após operações de envio e exclusão.
- Configurar as informações do usuário na interface.

**Funções principais:**

| Função | Responsabilidade |
|---|---|
| `setFeed()` | Limpa e reconstrói o feed. |
| `getCardPosts()` | Recupera as publicações e monta seus elementos HTML. |
| `updateComments(id, container)` | Busca novamente os comentários e atualiza a interface. |
| `setComments(commitsList, bodyApend, postId)` | Renderiza os comentários recebidos. |
| `setUserLayout()` | Atualiza as informações do usuário na interface. |

### Atualização dos comentários

O projeto utiliza um fluxo de atualização após as operações de envio e exclusão:

```text
Operação do usuário
        |
        v
sendComment() / delComment()
        |
        v
updateComments()
        |
        v
getComments()
        |
        v
setComments()
        |
        v
Atualização do DOM
```

Esse fluxo permite buscar novamente os dados do servidor e atualizar a interface sem reconstruir todo o feed.

---

## 5. Módulo de publicações

### `feed/userFuncs/post.js`

Responsável pelo comportamento do formulário de criação de publicações.

**Principais responsabilidades:**

- Capturar o envio do formulário.
- Impedir o comportamento padrão de atualização da página.
- Enviar o conteúdo e a imagem para a API.
- Atualizar o feed após a publicação.

---

## 6. Módulo de comentários

### `feed/userFuncs/comments.js`

Arquivo reservado para a organização das funcionalidades relacionadas aos comentários.

No estado atual da branch `main`, esse arquivo está vazio. A lógica de recuperação, renderização, envio e exclusão de comentários está concentrada em `feed/getFeed.js`.

---

## 7. Fluxo geral da aplicação

```text
             HTML
              |
              v
       JavaScript Modules
              |
      +-------+-------+
      |       |       |
      v       v       v
    auth   aux    constants
      |       |       |
      +-------+-------+
              |
              v
          apiFunc.js
              |
              v
          Fetch API
              |
              v
          API REST
              |
              v
       Dados do servidor
              |
              v
        Manipulação DOM
              |
              v
       Interface atualizada
```

## Observações técnicas

- Os módulos utilizam `import` e `export` para compartilhar funcionalidades.
- As requisições são realizadas principalmente com `fetch()`.
- As operações assíncronas utilizam `async/await`.
- As respostas HTTP são verificadas por meio da propriedade `response.ok`.
- O token de autenticação é enviado no cabeçalho `Authorization` quando necessário.
- Os templates HTML são clonados para gerar elementos dinamicamente.
- As datas das publicações são formatadas utilizando `date-fns`.

---

**Documentação dos módulos JavaScript — Social Media**

Desenvolvimento: Pablo Pazini e Frederico Sanches
