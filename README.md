# 🚀 Desafio Técnico — AG Sistemas (Full Stack)

**Sistema desenvolvido por:** [Jonathas Walbert](https://github.com/JonathasWalbert)

Aplicação web voltada para **registro de intenções** e posterior **cadastro de membros**, simulando um fluxo real de aprovação e onboarding.

Como parte do desafio, foi implementado um **sistema de indicações** onde, o usuário (logado) cria uma indicação de negócio e além disso, o mesmo poderá gerenciar apenas as indicações que ele mesmo criou.

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
│  ├─ layout.tsx                   # Layout global
│  ├─ globals.css                  # Estilos globais
│  ├─ page.tsx                     # Página pública de intenção
│  ├─ components/                  # Componentes da página pública
│  │   ├─ button.tsx                  
│  │   └─ intentForm.tsx  
│  │
│  │    
│  ├─ admin/
│  │  ├─ page.tsx                  # Página principal do admin
│  │  └─ components/               # Componentes da página de admin
│  │     └─ CardIntent.tsx         
│  │
│  │
│  ├─ area-membro/
│  │  ├─ page.tsx                  # Página principal da área membro
│  │  ├─ components/               # Componentes da página da área de membro   
│  │  │  ├─ buttonLogout.tsx               
│  │  │  ├─ buttonMyIndications.tsx               
│  │  │  └─ indicationForm.tsx               
│  │  └─ minhas-indicacoes/        # Rota dentro da area membro para verificar as próprias indicações         
│  │      ├─ components/           # Componentes da página de minhas indicações            
│  │      │    ├─ buttonBack.tsx               
│  │      │    └─ cardReferral.tsx  
│  │      └─ page.tsx              # Página dentro da rota da area membro para verificar as próprias indicações
│  │  
│  │
│  ├─ cadastrado/
│  │  └─ page.tsx                  # Tela de sucesso pós-cadastro
│  │
│  ├─ cadastro-final/
│  │  ├─ page.tsx                  # Página Cadastro final
│  │  └─ components/               # Componentes da página de cadastro final
│  │     └─ completeIntentForm.tsx       
│  │
│  │
│  ├─ login/
│  │  ├─ page.tsx                  # Página de login
│  │  └─ components/               # Componentes da página de login
│  │     └─ loginForm.tsx   
│  │
│  │
│  │
│  │
│  │
│  └─ api/
│     ├─ intent/
│     │  ├─ route.ts               # POST → Registrar intenção pública
│     │  └─ validate/
│     │     └─ route.ts            # GET → Validar token de convite
│     ├─ user/
│     │  ├─ register/
│     │  │   └─ route.ts            # POST → Cadastrar membro
│     │  ├─ login/
│     │  │   └─ route.ts            # POST → Realizar login membro
│     │  └─ logout/
│     │     └─ route.ts            # POST → Realizar logout membro
│     ├─ admin/
│     │   └─ intent/
│     │     ├─ route.ts            # GET → Listar intenções admin
│     │     └─ [id]/
│     │         ├─ approved/
│     │         │  └─ route.ts     # POST → Aprovar intenção
│     │         └─ completed/
│     │            └─ route.ts     # PUT → Atulizar status da intenção para Completo
│     └─ referrals/
│        ├─ route.ts               # POST → Registrar indicação de negócio
│        ├─ [id]/
│        │  └─ route.ts            # GET → Listar indicações dos membros   
│        └─ status/
│           └─ route.ts            # PUT → Atulizar status das indicações 
│  
│      
│  
│
├─ components/
│  ├─ ui/                          # Componentes visuais do Shadcn e Magic UI
│  │  └─ border-beam.tsx
│  │  ├─ button.tsx
│  │  └─ confetti.tsx
│  │  ├─ form.tsx
│  │  └─ globe.tsx
│  │  ├─ input.tsx
│  │  └─ label.tsx
│  │  └─ select.tsx
│  │  └─ skeleton.tsx
│  │  └─ sonner.tsx
│  │  ├─ spinner.tsx
│  │  ├─ textarea.tsx
│
├─ modules/                        # Camada de domínio
│  ├─ intent/
│  │  └─ intent.model.ts           # Schema e operações Mongoose
│  └─ user/
│     └─ user.model.ts
│  └─ referral/
│     └─ referral.model.ts
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
