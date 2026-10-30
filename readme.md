# Social Media 🌏

Uma aplicação web de rede social desenvolvida com **HTML, CSS e JavaScript**, integrada a uma API REST para gerenciamento de usuários, publicações, curtidas e comentários.

O projeto tem como objetivo explorar o desenvolvimento Front-End, especialmente a comunicação assíncrona com servidores, manipulação do DOM, consumo de APIs e organização de código JavaScript em módulos.

## Funcionalidades

### Usuários
- Cadastro de usuários.
- Autenticação por login e senha.
- Armazenamento da sessão utilizando `sessionStorage`.
- Exibição de informações do usuário autenticado.
- Logout.

### Publicações
- Criação de publicações com texto e imagem por URL.
- Exibição das publicações disponíveis no servidor.
- Ordenação cronológica invertida da lista recebida.
- Exclusão de publicações próprias.
- Exibição de informações do autor e data relativa da publicação.

### Interações
- Curtir e descurtir publicações.
- Exibição da quantidade de curtidas.
- Identificação de publicações já curtidas pelo usuário.
- Envio de comentários.
- Exibição dos comentários e informações de seus autores.
- Exclusão de comentários próprios.

## Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e layout |
| JavaScript ES6+ | Lógica e interatividade |
| Fetch API | Comunicação com o servidor |
| JavaScript Modules | Organização e reutilização de código |
| date-fns | Formatação de datas |
| sessionStorage | Persistência da sessão no navegador |
| REST API | Gerenciamento dos dados |

## Estrutura do projeto

```text
JSsite/
│
├── index.html
│
├── pages/
│   ├── feed.html
│   └── register.html
│
├── js/
│   ├── apiFunc.js
│   ├── auth.js
│   ├── aux.js
│   ├── constants.js
│   │
│   ├── login/
│   │   └── script.js
│   │
│   ├── register/
│   │   └── script.js
│   │
│   └── feed/
│       ├── getFeed.js
│       └── userFuncs/
│           ├── comments.js
│           └── post.js
│
├── style/
│   ├── style_feed.css
│   └── style_logReg.css
│
├── package.json
└── README.md
```

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/P96Z7/JSsite.git
```

### 2. Entre na pasta

```bash
cd JSsite
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie um servidor local

O projeto utiliza módulos JavaScript e requisições HTTP. Por isso, recomenda-se executá-lo por meio de um servidor local.

Uma opção é utilizar a extensão **Live Server** no Visual Studio Code.

Abra o arquivo `index.html` utilizando a opção `Open with Live Server`.

## API

O projeto utiliza a API disponibilizada pelo Professor Dr.Tiago Trojahn docente do IFSP:

[https://ifsp.trojahn.uk/redesocial](https://ifsp.trojahn.uk/redesocial)

Os principais recursos utilizados são:

| Recurso | Método HTTP | Finalidade |
|---|---|---|
| `/usuarios/` | GET | Consultar usuários |
| `/usuarios` | POST | Cadastrar usuário |
| `/usuarios/login` | POST | Autenticar usuário |
| `/usuarios/check` | GET | Verificar autenticação |
| `/posts/` | GET | Consultar publicações |
| `/posts/` | POST | Criar publicação |
| `/posts/{id}` | DELETE | Excluir publicação |
| `/posts/{id}` | PUT | Editar publicação |  ~ EM DESENVOLVIMENTO
| `/posts/{id}/likes` | GET / POST | Consultar e registrar curtidas |
| `/posts/{id}/comentarios` | GET / POST | Consultar e enviar comentários |
| `/comentarios/{id}` | DELETE | Excluir comentário |
| `/comentarios/{id}` | PUT | editar um comentário |  ~ EM DESENVOLVIMENTO


As operações que exigem autenticação utilizam o token retornado pelo servidor no cabeçalho `Authorization`, no formato Bearer.

## Organização do código

O JavaScript foi dividido em módulos com responsabilidades distintas:

- `apiFunc.js`: comunicação com a API.
- `auth.js`: gerenciamento dos dados da sessão.
- `aux.js`: funções auxiliares para relacionar usuários, imagens e curtidas.
- `constants.js`: centralização de referências aos elementos HTML e constantes.
- `login/`: lógica de autenticação.
- `register/`: lógica de cadastro.
- `feed/`: montagem e gerenciamento das publicações e interações.

Para entender melhor a arquitetura, consulte o [README da pasta js](./js/README.md).

## Objetivos de aprendizado

Este projeto está sendo desenvolvido como prática de Engenharia de Software e desenvolvimento Front-End, explorando:

- Consumo de APIs REST.
- Requisições assíncronas com `async/await`.
- Tratamento de erros com `try/catch`.
- Manipulação dinâmica do DOM.
- Uso de templates HTML.
- Modularização com `import` e `export`.
- Gerenciamento de sessão.
- Manipulação de arrays e objetos.
- Eventos e formulários.

---

**OBS:**O projeto está em continuo desenvolvimento , portanto ainda temos coisas a fazer
**Desenvolvimento:** Pablo Pazini e Frederico Sanches

**Repositório:** [github.com/P96Z7/JSsite](https://github.com/P96Z7/JSsite)
