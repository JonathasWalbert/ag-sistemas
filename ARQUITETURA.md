Desafio técnico - AG Sistemas - Full Stack

Sistema desenvolvido por Jonathas Walbert — aplicação web voltada para registro de intenções e posteriormente cadastro de usuários.

Tecnologias utilizadas

Front-end: Next.js
Linguagem: TypeScript
Estilização: TailwindCSS, Shadcn, Magic UI
Back-end: Next.js
Banco de dados: MongoDB
Autenticação: Ficticia controlado com variável de ambiente.

Pré-requisitos

Antes de iniciar, verifique se você possui instalado:
Node.js
npm
Git


## Getting Started


Setup do projeto

```
1. Clone do repositório
git clone https://github.com/JonathasWalbert/ag-sistemas.git
cd ag-sistemas
```

2. Instalação das dependências
```
# se for npm
npm install
```

# Arquivo: .env.local

# BACK-END
MONGODB_URI="mongodb+srv://<usuario>:<senha>@cluster.vfir66v.mongodb.net/?appName=<DATABASE_NAME>"

# ou outras variáveis conforme necessário
NEXT_PUBLIC_USER_ADMIN="admin" || Variável que simboliza usuario admin, caso esteja vazia, a rota de ADMIN irá redirecionar para tela inicial. Só terá acesso, caso tenha alguma informação nessa variável.


4. Executando a aplicação em modo de desenvolvimento
npm run dev



Abra no navegador: http://localhost:3000 e a aplicação estará rodando localmente.


Estrutura de pastas
```
/
├─ __tests__/           # código de testes    
├─ app/                 # código principal da aplicação
├─ components/          # componentes React reutilizáveis e Shadcn
├─ lib/                 # bibliotecas/utilitários/Banco de dados
├─ public/              # assets públicos
├─ .env.local           # variáveis de ambiente (local)
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Funcionalidades principais

```
-> Página inicial pública que irá registrar a intenção do usuário

-> Página do administrador que está protegida por uma variável de ambiente simulando um sistema de login, nesta página o usuário consegue visualizar as intenções registrada e consegue aprovar ou rejeitar intenção.

-> Após aceitar a intenção, o usuário recebe via console.log uma simulação de envio de email contendo um link para cadastro completo da aplicação, a página acessada terá um token e só poderá acessar com esse token.

-> Ao acessar o link de cadastro completo, o usuário tem um formulário mais completo para preenchimento das informações pessoais e ao finalizar o cadastro, o usuário é registrado no banco de dados na tabela de USERS e sua intenção é atualizada com status de CONCLUIDO, então, é registrado para uma página de cadastro com a mensagem de cadastro completo.

-> Front-end em React (Next.js) estilizado com Tailwind CSS, Shadcn e Magic UI.
```