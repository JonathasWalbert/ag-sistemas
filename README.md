# 🚀 Desafio Técnico — AG Sistemas (Full Stack)

**Sistema desenvolvido por:** [Jonathas Walbert](https://github.com/JonathasWalbert)

Aplicação web voltada para **registro de intenções** e posterior **cadastro de membros**, simulando um fluxo real de aprovação e onboarding.

---

## 🧠 Tecnologias Utilizadas

| Camada | Tecnologias |
|--------|--------------|
| **Front-end** | Next.js (App Router), TypeScript |
| **Estilização** | Tailwind CSS, Shadcn/UI, Magic UI |
| **Back-end** | Next.js (API Routes) |
| **Banco de Dados** | MongoDB (Mongoose) |
| **Autenticação** | Simulada por variável de ambiente (`NEXT_PUBLIC_USER_ADMIN`) |

---

## ⚙️ Pré-requisitos

Antes de iniciar, verifique se você possui instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- npm ou yarn
- [Git](https://git-scm.com/)

---

## 🧩 Setup do Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/JonathasWalbert/ag-sistemas.git
cd ag-sistemas
```

### 2️⃣ Instalar as dependências

```bash
# usando npm
npm install
# ou yarn
yarn install
```

### 3️⃣ Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```bash
# MongoDB
MONGODB_URI="mongodb+srv://<usuario>:<senha>@cluster.vfir66v.mongodb.net/?appName=<DATABASE_NAME>"

# Simulação de autenticação ADMIN
NEXT_PUBLIC_USER_ADMIN="admin"
```

> ⚠️ Caso a variável `NEXT_PUBLIC_USER_ADMIN` esteja vazia, as rotas de administração serão automaticamente redirecionadas para a tela inicial.

---

## ▶️ Executando a aplicação

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura de Pastas (Atualizada)

```
src/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx                  # Página pública de intenção
│  │  └─ cadastro-final/
│  │     └─ page.tsx               # Página de cadastro completo via token
│  │
│  ├─ cadastrado/
│  │  └─ page.tsx                  # Tela de sucesso pós-cadastro
│  │
│  ├─ admin/
│  │  ├─ page.tsx                  # Painel principal do admin
│  │  ├─ components/
│  │  │  └─ CardIntent.tsx         # Card de intenções
│  │  └─ intents/
│  │     ├─ page.tsx               # Lista de intenções
│  │     ├─ [id]/
│  │     │  ├─ approved/
│  │     │  │  └─ route.ts         # POST → Aprovar intenção
│  │     │  └─ completed/
│  │     │     └─ route.ts         # PUT → Marcar como concluída
│  │     └─ route.ts               # GET → Listar intenções (admin)
│  │
│  ├─ api/
│  │  ├─ intent/
│  │  │  ├─ route.ts               # POST → Registrar intenção pública
│  │  │  └─ validate/
│  │  │     └─ route.ts            # GET → Validar token de convite
│  │  ├─ user/
│  │  │  └─ register/
│  │  │     └─ route.ts            # POST → Cadastrar usuário final
│  │  └─ admin/
│  │     └─ intent/
│  │        ├─ route.ts            # GET → Listar intenções admin
│  │        └─ [id]/
│  │           ├─ approved/
│  │           │  └─ route.ts
│  │           └─ completed/
│  │              └─ route.ts
│  │
│  ├─ layout.tsx                   # Layout global
│  ├─ globals.css                  # Estilos globais
│  └─ page.tsx                     # Página inicial
│
├─ components/
│  ├─ common/
│  │  ├─ IntentForm.tsx            # Formulário de intenção
│  │  └─ CompleteIntentForm.tsx    # Formulário completo pós-aprovação
│  ├─ ui/                          # Componentes visuais do Shadcn e Magic UI
│  │  ├─ form.tsx
│  │  ├─ input.tsx
│  │  ├─ button.tsx
│  │  ├─ textarea.tsx
│  │  ├─ spinner.tsx
│  │  └─ border-beam.tsx
│
├─ modules/                        # Camada de domínio
│  ├─ intent/
│  │  └─ intent.model.ts           # Schema e operações Mongoose
│  └─ user/
│     └─ user.model.ts
│
├─ lib/
│  ├─ db.ts                        # Conexão com o MongoDB
│  ├─ utils.ts                     # Funções auxiliares
│
├─ __tests__/                      # Testes unitários e integração (Vitest)
│  ├─ success/
│  │  ├─ intentForm.validation.test.tsx
│  │  └─ completeIntentForm.validation.test.tsx
│  ├─ bad/
│  │  ├─ intentForm.validation.test.tsx
│  │  └─ completeIntentForm.validation.test.tsx
│
│
├─ public/
├─ .env.local
├─ package.json
└─ tsconfig.json
```

---

## 🧪 Testes

O projeto inclui testes de:

- **Componentes**: React Testing Library  
- **Integração**: Vitest  

> Os testes validam fluxo de envio, validações Zod e sucesso de submissão.

---

## 📄 Licença

Projeto desenvolvido para fins **de avaliação técnica**.  
Autor: **Jonathas Walbert**
