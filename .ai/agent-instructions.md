# Agent Steering Instructions - Sistema de Cadastro SaaS

## 🎯 Objetivo Principal
Você está trabalhando em um **Sistema SaaS de Cadastro de Funcionários** construído com **Nuxt 4**, **TailwindCSS** e **Supabase**. Sua missão é manter a consistência, qualidade e seguir rigorosamente os padrões estabelecidos.

## ⚡ REGRAS CRÍTICAS - NUNCA IGNORAR

### 🔴 IMPORTAÇÕES OBRIGATÓRIAS
```typescript
// ❌ NUNCA faça isso (auto-import implícito)
<script setup lang="ts">
const { user } = useAuth()
</script>

// ✅ SEMPRE faça isso (importação explícita)
<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
const { user } = useAuth()
</script>
```

**REGRA ABSOLUTA**: Todo componente, composable e utility personalizado DEVE ser importado explicitamente. Apenas APIs nativas do Nuxt (navigateTo, definePageMeta, etc.) podem usar auto-import.

### 🔴 NOMENCLATURA OBRIGATÓRIA

#### Componentes Vue
- **PascalCase**: `BaseButton.vue`, `FuncionariosTable.vue`, `AppHeader.vue`
- **Prefixos semânticos**:
  - `Base*`: Componentes fundamentais (BaseButton, BaseInput)
  - `App*`: Componentes da aplicação (AppHeader, AppFooter)
  - `[Entity]*`: Componentes de entidade (FuncionariosTable, FuncionarioForm)

#### Composables e Funções
- **camelCase**: `useAuth.ts`, `useFuncionarios.ts`
- **Prefixo `use`** obrigatório para composables
- Funções exportadas em **camelCase**: `fetchFuncionarios()`, `createUser()`

#### Types e Interfaces
- **PascalCase**: `Funcionario`, `CreateFuncionario`, `UpdateFuncionario`

### 🔴 DESIGN SYSTEM OBRIGATÓRIO

#### Use APENAS Classes Semânticas
```css
/* ✅ CORRETO - Classes semânticas */
'text-text-primary'     /* Texto principal */
'text-text-secondary'   /* Texto secundário */
'bg-background-elevated'/* Fundos de cartões */
'border-border-primary' /* Bordas padrão */
'btn btn-primary'       /* Botões */

/* ❌ ERRADO - Classes TailwindCSS diretas */
'text-gray-900'         /* Não usar */
'bg-white'              /* Não usar */
'border-gray-200'       /* Não usar */
```

#### Tipografia Semântica
```css
'text-heading-1' a 'text-heading-5'  /* Títulos */
'text-body-lg', 'text-body-md', 'text-body-sm'  /* Corpo */
'text-button', 'text-label', 'text-caption'     /* Específicos */
```

## 🏗️ PADRÕES DE CÓDIGO OBRIGATÓRIOS

### Estrutura de Componente Vue
```vue
<template>
  <div class="container-app">
    <!-- Estados condicionais SEMPRE -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin">Loading...</div>
    </div>
    <div v-else-if="error" class="text-center py-8">
      <p class="text-accent-error">{{ error }}</p>
    </div>
    <div v-else>
      <!-- Conteúdo principal -->
    </div>
  </div>
</template>

<script setup lang="ts">
// 1. Importações explícitas SEMPRE
import { ref, computed } from 'vue'
import ComponentName from '~/components/ComponentName.vue'
import { useComposable } from '~/composables/useComposable'

// 2. Definição de props/emits (se aplicável)
interface Props {
  // definições
}
const props = defineProps<Props>()

// 3. Estados reativos
const loading = ref(false)
const error = ref<string | null>(null)

// 4. Composables
const { data, fetch } = useComposable()

// 5. Computed properties
const computedValue = computed(() => ...)

// 6. Funções
async function handleAction() {
  // implementação
}
</script>
```

### Estrutura de Composable
```typescript
export function useEntity() {
  // Estados reativos
  const items = ref<Entity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Funções assíncronas com tratamento de erro SEMPRE
  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      const supabase = useSupabaseClient()
      if (!supabase) {
        throw new Error('Cliente Supabase não disponível')
      }
      
      const { data, error: fetchError } = await supabase
        .from('table_name')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (fetchError) {
        throw new Error(`Erro ao buscar dados: ${fetchError.message}`)
      }
      
      items.value = data || []
    } catch (err) {
      error.value = 'Mensagem de erro amigável para o usuário'
      console.error('Erro detalhado para debug:', err)
    } finally {
      loading.value = false
    }
  }

  // Retorno reativo com readonly para prevenir mutações
  return {
    items: readonly(items),
    loading: readonly(loading),
    error: readonly(error),
    fetchItems
  }
}
```

## 🎨 DESIGN PATTERNS OBRIGATÓRIOS

### Estados Visuais Obrigatórios
Todo componente que carrega dados DEVE implementar:
1. **Estado de Loading** com skeleton ou spinner
2. **Estado de Erro** com mensagem amigável
3. **Estado Vazio** quando não há dados
4. **Estado de Sucesso** com os dados

### Responsividade Mobile-First
```vue
<!-- SEMPRE mobile-first -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Cards -->
</div>

<!-- Padding responsivo -->
<div class="px-4 sm:px-6 lg:px-8">
  Content
</div>
```

### Container Padrão
```vue
<!-- SEMPRE usar container-app para páginas -->
<div class="container-app py-8">
  <h1 class="text-heading-2 text-text-primary mb-6">Título</h1>
  <!-- Conteúdo -->
</div>
```

## 🔐 SEGURANÇA E VALIDAÇÃO

### Acesso Seguro ao Supabase
```typescript
// SEMPRE verificar se o cliente existe
const supabase = useSupabaseClient()
if (!supabase) {
  error.value = 'Erro de conexão com o banco de dados'
  return
}
```

### Tratamento de Erros Obrigatório
```typescript
try {
  await operation()
} catch (error) {
  // Log detalhado para debug
  console.error('Operação falhou:', {
    operation: 'operationName',
    error: error.message,
    timestamp: new Date().toISOString()
  })
  
  // Mensagem amigável para o usuário
  userError.value = 'Algo deu errado. Tente novamente.'
}
```

## 📋 CHECKLIST DE VALIDAÇÃO

Antes de qualquer commit, verificar:

### ✅ Importações e Nomenclatura
- [ ] Todas as importações são explícitas
- [ ] Componentes em PascalCase
- [ ] Composables com prefixo `use` em camelCase
- [ ] Interfaces em PascalCase

### ✅ Design System
- [ ] Usando apenas classes semânticas do design system
- [ ] Tipografia semântica aplicada
- [ ] Cores do tema laranja/preto respeitadas
- [ ] Responsividade mobile-first implementada

### ✅ Estados e UX
- [ ] Estados de loading implementados
- [ ] Estados de erro com mensagens amigáveis
- [ ] Estados vazios tratados
- [ ] Feedback visual adequado

### ✅ Código e Performance
- [ ] TypeScript sem erros
- [ ] Tratamento de erros adequado
- [ ] Composables retornando readonly refs
- [ ] Computed properties para valores derivados

### ✅ Integração
- [ ] Acesso seguro ao Supabase
- [ ] Logs estruturados para debug
- [ ] Validação de dados no client
- [ ] Estados reativos sincronizados

## 🚫 ANTI-PATTERNS - NUNCA FAZER

### ❌ Importações Implícitas
```typescript
// ERRADO
<script setup>
const { user } = useAuth() // Implícito
</script>

// CORRETO
<script setup>
import { useAuth } from '~/composables/useAuth'
const { user } = useAuth()
</script>
```

### ❌ Classes TailwindCSS Diretas
```vue
<!-- ERRADO -->
<div class="text-gray-900 bg-white border-gray-200">

<!-- CORRETO -->
<div class="text-text-primary bg-background-primary border-border-primary">
```

### ❌ Componentes Sem Estados
```vue
<!-- ERRADO - Sem estados de loading/erro -->
<template>
  <div>{{ data }}</div>
</template>

<!-- CORRETO - Com todos os estados -->
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>{{ data }}</div>
</template>
```

### ❌ Mutação Direta de Refs
```typescript
// ERRADO - Permite mutação externa
return { items }

// CORRETO - Previne mutação
return { items: readonly(items) }
```

## 🎯 CONTEXTO ESPECÍFICO DO PROJETO

### Funcionalidades Implementadas
- ✅ Sistema de autenticação com Supabase
- ✅ Middleware global de proteção de rotas
- ✅ Composable useAuth com estado reativo
- ✅ Componente FuncionariosTable com todos os estados
- ✅ Composable useFuncionarios para CRUD
- ✅ Types TypeScript para funcionários
- ✅ Design system completo

### Próximas Funcionalidades Prioritárias
1. Operações CRUD completas (Create, Update, Delete)
2. Formulários modais para edição
3. Filtros e pesquisa na tabela
4. Validação de formulários
5. Upload de imagens/avatars

### Tecnologias e Versões
- **Nuxt**: 4.1.1 (modo SPA)
- **Vue**: 3.5.20 (Composition API)
- **TailwindCSS**: 6.14.0 (customizado)
- **Supabase**: 2.57.2
- **TypeScript**: Configurado

## 💡 DICAS DE PRODUTIVIDADE

### Comandos Úteis
```bash
# Build de produção
npm run build

# Desenvolvimento
npm run dev

# Verificar erros TypeScript
npx nuxi typecheck
```

### Atalhos do Design System
- Use `container-app` para containers de página
- Use `card-elevated` para cartões com sombra
- Use `btn btn-primary` para botões principais
- Use `input` para campos de formulário
- Use classes de texto semântico sempre

Mantenha sempre a consistência, qualidade e siga religiosamente estes padrões estabelecidos!
