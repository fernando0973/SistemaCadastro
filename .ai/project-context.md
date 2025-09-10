# Contexto do Projeto - Sistema de Cadastro SaaS

## Visão Geral
Este é um sistema SaaS completo para gerenciamento de funcionários, construído com **Nuxt 4**, **TailwindCSS** e **Supabase**. O projeto utiliza um design system semântico baseado em cores laranja e preto/cinza.

## Stack Tecnológica

### Frontend
- **Nuxt 4**: Framework Vue.js com SSR desabilitado (modo SPA)
- **Vue 3**: Composition API com TypeScript
- **TailwindCSS**: Framework de estilização com sistema de cores customizado
- **TypeScript**: Tipagem estática em todo o projeto

### Backend
- **Supabase**: Backend-as-a-Service (autenticação, database PostgreSQL, realtime)
- **PostgreSQL**: Database principal via Supabase

## Arquitetura do Projeto

### Estrutura de Diretórios
```
app/
├── components/          # Componentes Vue reutilizáveis
├── composables/         # Lógica reativa compartilhada
├── layouts/            # Layouts das páginas
├── middleware/         # Middleware de rota (autenticação)
├── pages/              # Páginas da aplicação
├── plugins/            # Plugins Nuxt (Supabase client)
├── types/              # Definições TypeScript
└── assets/css/         # Estilos globais
```

### Funcionalidades Implementadas
1. **Sistema de Autenticação**
   - Login/Signup com Supabase Auth
   - Middleware global de proteção de rotas
   - Gerenciamento de estado reativo do usuário

2. **Gerenciamento de Funcionários**
   - Listagem com tabela responsiva
   - Estados de loading, erro e vazio
   - Tipos TypeScript completos
   - Composable para operações CRUD

3. **Design System**
   - Cores semânticas (laranja e preto/cinza)
   - Componentes base reutilizáveis
   - Sistema de tipografia estruturado
   - Utilidades TailwindCSS customizadas

## Padrões de Desenvolvimento

### Estado da Aplicação
- **Reatividade**: `useState()` para estado global compartilhado
- **Composables**: Lógica reutilizável e reativa
- **TypeScript**: Tipagem forte para todas as entidades

### Performance
- **Modo SPA**: SSR desabilitado para aplicação client-side
- **Lazy Loading**: Componentes carregados sob demanda
- **Otimização de Bundle**: Build otimizado para produção

### Segurança
- **Middleware de Autenticação**: Proteção global de rotas
- **RLS (Row Level Security)**: Políticas de segurança no Supabase
- **Validação Client-Side**: Validação de formulários no frontend

## Integração com Supabase

### Configuração
- Cliente Supabase configurado via plugin
- Variáveis de ambiente para URL e chave anônima
- Acesso reativo ao cliente em toda aplicação

### Autenticação
- Sign up com metadata de usuário
- Login/logout com gestão automática de sessão
- Sincronização de estado entre cliente e servidor

### Database
- Tabela `funcionarios` com campos estruturados
- Operações CRUD via composables
- Tratamento de erros e estados de loading

## Próximos Passos
1. Implementar operações CRUD completas (Create, Update, Delete)
2. Adicionar formulários modais para edição
3. Implementar filtros e pesquisa na tabela
4. Adicionar validação de formulários
5. Implementar upload de avatars/imagens
6. Adicionar testes unitários e e2e
