# 🏗️ Arquitetura — AG Sistemas Network Platform

## Sumário
- [Visão Geral](#visão-geral)
- [1) Diagrama da Arquitetura](#1-diagrama-da-arquitetura)
- [2) Modelo de Dados (MongoDB)](#2-modelo-de-dados-mongodb)
- [3) Estrutura de Componentes (Next.js)](#3-estrutura-de-componentes-nextjs)
- [4) Definição da API (REST)](#4-definição-da-api-rest)
- [Padrões Transversais](#padrões-transversais)
- [Testes](#testes)
- [Roadmap de Evolução](#roadmap-de-evolução)

---

## Visão Geral
Plataforma para gestão de networking profissional com:
- Gestão de membros
- Engajamento e comunicação
- Geração de negócios
- Performance e relatórios
- Financeiro e mensalidades

Tecnologias:
- **Next.js**, **MongoDB**, **Zod**, **Tailwind**, **shadcn/ui**, **magic/ui**, **Vitest**

---

## 1) Diagrama da Arquitetura

```mermaid
flowchart LR
  U[Usuário (Browser)] --> |HTTP/HTTPS| FE[Next.js]

  subgraph Next.js App
    FE --> API[(API Routes)]
  end

  API --> DB[(MongoDB Atlas)]
  FE --> AUTH[NextAuth]
  AUTH --> DB
```

---

## 2) Modelo de Dados (MongoDB)

### Principais coleções

| Coleção | Finalidade |
|---|---|
| `users` | Membros do grupo |
| `intents` | Intenções públicas de participação |
| `announcements` | Comunicados |
| `meetings` | Reuniões |
| `attendance` | Presença dos membros |
| `oneToOnes` | Reuniões 1:1 |
| `referrals` | Indicações e negócios |
| `gratitudes` | Obrigados / agradecimentos |
| `payments` | Mensalidades |

A escolha do banco de dados MongoDB se dá pela sua estrutura NoSQL que registra as informações através de coleções e suas principais características são a flexilidade, escabalabilidade e perfomance. Diferente de se utilizar um SQLite, por exemplo, que são banco de dados voltados para pequenas aplicabilidade e visando escalabilidade e expansão de projeto, futuramente poderia não nos atender.

---

## 3) Estrutura de Componentes (Next.js)

```bash
src/
  app/
  components/
    common/
    ui/
  lib/
  models/
  tests/
```

Regras:
- Formulários → `react-hook-form` + `zod`
- Server Components para listagens
- Zustand opcional para estados globais

---

## 4) Definição da API (REST)

### Exemplos

#### POST `/api/intent`
Cria intenção pública

#### POST `/api/user/register`
Cadastra usuário no banco de dados e encerra a intent com status de Concluído.

#### GET `/api/admin`
Busca todas as intenções no banco de dados com status que são diferentes de concluídos e as organiza em PENDENTE, APROVADO, REJEITADO.


---

## Padrões Transversais
- JWT + RBAC (`ADMIN` / `MEMBER`)
- Validação com Zod
- Logs estruturados
- Rate limit em rotas públicas

---

## Testes
- Unitários: Vitest
- E2E: Playwright

---

## Roadmap
1. Membros e indicações
2. Dashboards e relatórios
3. Financeiro com gateway
4. App mobile Expo com QR Code para check-in

---

_Fim do documento_
