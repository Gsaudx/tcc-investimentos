# TCC Investimentos - SaaS B2B para Assessores

Plataforma de gestão de portfólio e otimização de investimentos.
Projeto de TCC + Iniciação Científica (Algoritmo da Mochila).

##  Arquitetura e Padrões

### Backend: Monolito Modular (NestJS)
Não usamos arquitetura de camadas tradicional (Controller/Service/Repo) na raiz.
Agrupamos por **Domínio de Negócio**.

- **Módulos:** Cada pasta em modules/ é um domínio isolado (ex: optimization, wallet).
- **Comunicação:** Módulos podem importar uns aos outros via imports: [] no Module.
- **Banco de Dados:** Prisma ORM como fonte da verdade.

### Frontend: Feature-Based (React)
Não aglomeramos componentes em uma pasta gigante.
Usamos **Colocation**: O código vive perto de onde é usado.

- **Features:** Cada pasta em features/ contém tudo que uma funcionalidade precisa (api, componentes, rotas).
- **Shared:** Apenas componentes genéricos (UI Kit) ficam em components/ui.

##  Estrutura de Pastas (Guia de Referência Estrito)

### 1. Backend: Modular Monolith (`/backend/src`)
```text
src/
├── common/                             # Código reutilizável GLOBALMENTE (não atrelado a negócio)
│   ├── decorators/                     # Ex: @CurrentUser(), @Public()
│   ├── filters/                        # Ex: HttpExceptionFilter
│   ├── guards/                         # Ex: JwtAuthGuard
│   └── pipes/                          # Ex: ParseIntPipe customizado
├── config/                             # Configurações de ambiente (env vars, validação Zod)
├── modules/                            # DOMÍNIOS DE NEGÓCIO (Onde a mágica acontece)
│   ├── {domain}/                       # Ex: assets, wallet, optimization
│   │   ├── dto/                        # Contratos de dados (Input/Output)
│   │   │   ├── create-{domain}.dto.ts  # Com class-validator
│   │   │   └── update-{domain}.dto.ts
│   │   ├── entities/                   # Regras de negócio puras / Interfaces de Domínio
│   │   ├── {domain}.controller.ts      # Rotas HTTP (apenas orquestração)
│   │   ├── {domain}.service.ts         # Regra de Negócio e chamadas ao Prisma
│   │   └── {domain}.module.ts          # Definição de dependências
└── prisma/                             # Schema do Banco de Dados
```

### 2. Frontend: Feature-Based Architecture (`/frontend/src`)
```text
src/
├── assets/                 # Imagens, fontes, ícones estáticos globais
├── components/             # Componentes VISUAIS compartilhados (Dumb Components)
│   ├── ui/                 # Biblioteca de UI (Shadcn, Radix) - Botões, Inputs
│   └── layout/             # Estruturas de página (Sidebar, Header, PageWrapper)
├── config/                 # Configurações globais (env vars, constantes)
├── features/               # FUNCIONALIDADES DO SISTEMA (Smart Components)
│   ├── {feature}/          # Ex: dashboard, optimization, assets
│   │   ├── api/            # Hooks do TanStack Query (ex: useGetAssets.ts)
│   │   ├── components/     # Componentes exclusivos desta feature
│   │   ├── hooks/          # Hooks de lógica exclusivos desta feature
│   │   ├── types/          # Tipagem TypeScript exclusiva desta feature
│   │   └── index.ts        # Ponto de entrada (exporta a Page principal)
├── hooks/                  # Hooks genéricos globais (ex: useDebounce, useTheme)
├── lib/                    # Configurações de libs (axios, queryClient, utils)
├── pages/                  # Roteamento (apenas importa a feature e renderiza)
└── services/               # (Opcional) Camada de API crua se não usar Hooks direto
```

### 3. Árvore de Decisão (Onde salvo meu arquivo?)

**Backend:**
*   "É uma regra de negócio de Investimentos?" -> `modules/investments`
*   "É uma validação genérica de CPF?" -> `common/validators`
*   "É uma configuração de conexão com API externa?" -> `config/` ou `modules/integrations`

**Frontend:**
*   "Esse botão é usado em várias telas?" -> `components/ui`
*   "Esse gráfico só aparece no Dashboard?" -> `features/dashboard/components`
*   "Essa chamada de API busca dados do usuário?" -> `features/auth/api` ou `features/user/api`

##  Guia de Desenvolvimento

### Criando uma Nova Funcionalidade (Ex: Relatórios)

1. **Backend:**
   - Crie modules/reports/reports.module.ts.
   - Defina o DTO de entrada (create-report.dto.ts) com class-validator.
   - Implemente a lógica no Service e exponha no Controller.
   - **Regra:** Sempre use injeção de dependência.

2. **Frontend:**
   - Crie features/reports/.
   - Crie o hook de API em features/reports/api/useReports.ts.
   - Crie a UI em features/reports/components/ReportChart.tsx.
   - Exporte a página principal em features/reports/index.ts e adicione ao Router.

##  Stack Tecnológica

- **Core:** NestJS, React, TypeScript.
- **Dados:** PostgreSQL, Prisma.
- **UI:** TailwindCSS, Shadcn/ui.
- **Infra:** AWS (EC2/RDS/S3/CloudFront), Docker.

##  Regras de Ouro

1. **Zero Over-engineering:** Se uma função resolve, não crie uma classe.
2. **Tipagem Estrita:** Sem any. Interfaces do Front espelham DTOs.
3. **Commits:** Siga o padrão Conventional Commits (feat, fix, chore).

##  Como Rodar Localmente

### Opção 1: Via Docker Compose (Recomendado para Simular Produção)
Este comando sobe o Banco, Backend e Frontend em containers.

`bash
docker-compose up --build -d
` 
- Frontend: http://localhost:80 
- Backend: http://localhost:3000 
- Banco: localhost:5432 

### Opção 2: Desenvolvimento Local (Hot Reload)

1. **Suba apenas o Banco de Dados:**
   `bash
   docker-compose up postgres -d
   ` 

2. **Backend (NestJS):**
   `bash
   cd backend
   npm install
   npx prisma generate
   npm run start:dev
   ` 

3. **Frontend (React + Vite):**
   `bash
   cd frontend
   npm install
   npm run dev
   ` 

##  CI/CD (GitHub Actions)

O projeto possui pipeline automatizada de deploy para AWS EC2.

**Secrets Necessárias no GitHub:**
- DOCKERHUB_USERNAME / DOCKERHUB_TOKEN: Credenciais Docker Hub.
- EC2_HOST: IP Público da instância.
- EC2_USER: Usuário SSH (ex: ec2-user).
- EC2_SSH_KEY: Conteúdo da chave privada .pem.
- DATABASE_URL: Connection string do RDS (Prod).