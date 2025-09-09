# Sistema de Autenticação - Middleware

## 📋 Visão Geral

O sistema de autenticação foi implementado com um middleware global que protege todas as rotas, exceto a página de login. 

### 🔒 Funcionalidades Implementadas

1. **Middleware Global de Autenticação** (`middleware/auth.global.ts`)
   - Protege automaticamente todas as rotas
   - Redireciona usuários não autenticados para `/login`
   - Redireciona usuários autenticados que tentam acessar `/login` para `/`

2. **Composable Aprimorado** (`composables/useAuth.ts`)
   - Estado reativo de autenticação sincronizado
   - Funções de login/logout melhoradas
   - Inicialização automática do estado
   - Escuta mudanças de estado do Supabase

3. **Plugin de Inicialização** (`plugins/auth.client.ts`)
   - Inicializa o estado de autenticação quando a app carrega
   - Funciona apenas no cliente (client-side)

## 🚀 Como Funciona

### Fluxo de Proteção de Rotas

1. **Usuário acessa qualquer rota**
   - O middleware `auth.global.ts` é executado automaticamente
   - Verifica se há uma sessão válida no Supabase

2. **Se o usuário NÃO estiver logado:**
   - E tentar acessar qualquer rota exceto `/login`
   - É redirecionado automaticamente para `/login`

3. **Se o usuário ESTIVER logado:**
   - E tentar acessar `/login`
   - É redirecionado automaticamente para `/` (página inicial)
   - Pode acessar normalmente qualquer outra rota

### Páginas e Rotas

- **`/login`** - Página de login (pública)
- **`/`** - Página inicial (protegida)
- **`/novocadastro`** - Nova página de cadastro (protegida)
- **Qualquer outra rota** - Protegida por padrão

## ⚙️ Configuração

### 1. Configurar Variáveis do Supabase

Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here
```

### 2. Usar o Composable de Autenticação

```vue
<script setup>
const { user, isAuthenticated, login, logout } = useAuth()

// user - dados do usuário logado
// isAuthenticated - boolean se está autenticado
// login(email, password) - função para fazer login
// logout() - função para fazer logout
</script>
```

### 3. Adicionar Novas Rotas Públicas

Para adicionar rotas que não precisam de autenticação, edite `middleware/auth.global.ts`:

```typescript
// Rotas que não precisam de autenticação
const publicRoutes = ['/login', '/nova-rota-publica']
```

## 🛡️ Segurança

- Todas as verificações são feitas no servidor Supabase
- Tokens de sessão são gerenciados automaticamente
- Estado de autenticação é sincronizado em tempo real
- Redirecionamentos usam `replace: true` para não criar histórico desnecessário

## 🔧 Desenvolvimento

### Executar o projeto
```bash
npm run dev
```

### Estrutura de Arquivos
```
app/
├── middleware/
│   └── auth.global.ts          # Middleware de proteção global
├── composables/
│   └── useAuth.ts              # Composable de autenticação
├── plugins/
│   ├── auth.client.ts          # Plugin de inicialização do auth
│   └── supabase.client.ts      # Plugin do Supabase
├── pages/
│   ├── login.vue               # Página de login (pública)
│   ├── index.vue               # Página inicial (protegida)
│   └── novocadastro.vue        # Página de cadastro (protegida)
└── components/
    └── LoginForm.vue           # Componente de formulário de login
```

## 📝 Notas Importantes

1. **SSR Desabilitado**: O projeto usa `ssr: false` para funcionar como SPA
2. **Cliente Only**: O plugin de auth roda apenas no cliente
3. **Estado Global**: O estado de autenticação é compartilhado em toda a aplicação
4. **Redirecionamentos Automáticos**: Usuários são redirecionados automaticamente baseado no estado de autenticação

## 🐛 Troubleshooting

- **Erro "Cannot assign to readonly"**: Certifique-se de usar `syncUserState()` no composable
- **Redirecionamentos infinitos**: Verifique se as rotas públicas estão configuradas corretamente
- **Estado não sincronizado**: Verifique se o plugin auth.client.ts está sendo carregado
