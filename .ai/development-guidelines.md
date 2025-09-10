# Diretrizes de Desenvolvimento - Sistema de Cadastro SaaS

## Regras Fundamentais

### 🚀 Importações e Modules
- **SEMPRE** usar importações explícitas para todos os componentes
- **NUNCA** confiar em auto-imports para componentes personalizados
- Usar `import ComponentName from '~/components/ComponentName.vue'`
- Composables devem ser importados explicitamente: `import { useAuth } from '~/composables/useAuth'`
- APIs do Nuxt (navigateTo, definePageMeta) podem usar auto-import

### 📁 Convenções de Nomenclatura

#### Componentes Vue
- **PascalCase** para nomes de componentes: `BaseButton.vue`, `FuncionariosTable.vue`
- **Prefixos semânticos**:
  - `Base`: Componentes fundamentais (BaseButton, BaseInput)
  - `App`: Componentes específicos da aplicação (AppHeader, AppFooter)
  - `[Entity]`: Componentes de entidade (FuncionariosTable, FuncionarioForm)

#### Composables
- **camelCase** com prefixo `use`: `useAuth.ts`, `useFuncionarios.ts`
- Funções exportadas em **camelCase**: `signUp()`, `fetchFuncionarios()`

#### Types/Interfaces
- **PascalCase** para interfaces: `Funcionario`, `CreateFuncionario`
- Sufixos descritivos para operações: `CreateFuncionario`, `UpdateFuncionario`

### 🎨 Design System e Estilização

#### Cores Semânticas (Obrigatório)
```typescript
// USAR SEMPRE estas classes semânticas:
'text-text-primary'     // Texto principal
'text-text-secondary'   // Texto secundário  
'text-text-muted'       // Texto menos importante
'bg-background-primary' // Fundo principal
'bg-background-elevated'// Cartões e modais
'border-border-primary' // Bordas padrão
'bg-primary-500'        // Cor principal (laranja)
'bg-secondary-900'      // Cor secundária (preto/cinza)
```

#### Sistema de Tipografia
```typescript
// Classes de tipografia semântica:
'text-heading-1' a 'text-heading-5'  // Títulos
'text-body-lg', 'text-body-md', 'text-body-sm'  // Corpo
'text-button', 'text-label', 'text-caption'     // Elementos específicos
```

#### Componentes Base
```typescript
// Classes utilitárias disponíveis:
'btn', 'btn-primary', 'btn-secondary'  // Botões
'card', 'card-elevated', 'card-body'   // Cartões
'input', 'input-error'                 // Inputs
'container-app'                        // Container responsivo
```

### 🔧 Estrutura de Componentes

#### Template Structure
```vue
<template>
  <!-- Sempre usar container-app para páginas -->
  <div class="container-app">
    <!-- Estados condicionais -->
    <div v-if="loading" class="...">Loading...</div>
    <div v-else-if="error" class="...">Error...</div>
    <div v-else>
      <!-- Conteúdo principal -->
    </div>
  </div>
</template>
```

#### Script Setup Structure
```vue
<script setup lang="ts">
// 1. Importações explícitas
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

### 🔄 Padrões de Estado e Reatividade

#### Composables Pattern
```typescript
// Estrutura padrão de composable
export function useEntity() {
  // Estados reativos
  const items = ref<Entity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Funções assíncronas com tratamento de erro
  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      // lógica de fetch
    } catch (err) {
      error.value = 'Mensagem de erro amigável'
    } finally {
      loading.value = false
    }
  }

  // Retorno reativo
  return {
    items: readonly(items),
    loading: readonly(loading),
    error: readonly(error),
    fetchItems
  }
}
```

#### Estado Global
```typescript
// Usar useState para estado compartilhado
const user = useState<User | null>('auth.user', () => null)
```

### 🛡️ TypeScript e Validação

#### Interfaces Obrigatórias
```typescript
// Sempre definir interfaces para entidades
interface Entity {
  id: string
  created_at: string
  // outros campos
}

// Separar interfaces para operações
interface CreateEntity extends Omit<Entity, 'id' | 'created_at'> {}
interface UpdateEntity extends Partial<CreateEntity> {}
```

#### Tratamento de Erros
```typescript
// Sempre capturar e tratar erros
try {
  await operation()
} catch (error) {
  console.error('Contexto do erro:', error)
  // Mostrar mensagem amigável ao usuário
}
```

### 🌐 Integração com Supabase

#### Acesso Seguro ao Cliente
```typescript
// Sempre verificar se o cliente existe
const supabase = useSupabaseClient()
if (!supabase) {
  error.value = 'Erro de conexão'
  return
}
```

#### Operações de Database
```typescript
// Padrão para operações CRUD
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .order('created_at', { ascending: false })

if (error) {
  throw new Error(`Erro ao buscar dados: ${error.message}`)
}
```

### 📱 Responsividade e UX

#### Classes Responsivas
```typescript
// Sempre considerar mobile-first
'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
'px-4 sm:px-6 lg:px-8'
'text-sm md:text-base'
```

#### Estados de Carregamento
```vue
<!-- Sempre implementar estados visuais -->
<div v-if="loading" class="flex items-center justify-center py-8">
  <div class="animate-spin ...">Loading...</div>
</div>
```

### ⚡ Performance

#### Lazy Loading
```vue
<!-- Para componentes pesados -->
<script setup lang="ts">
const Component = defineAsyncComponent(() => import('~/components/Heavy.vue'))
</script>
```

#### Computed vs Reactive
```typescript
// Usar computed para valores derivados
const filteredItems = computed(() => 
  items.value.filter(item => item.active)
)
```

### 🧪 Debugging e Logs

#### Console Logs Estruturados
```typescript
// Usar logs estruturados para debug
console.error('Operação falhou:', {
  operation: 'fetchFuncionarios',
  error: error.message,
  timestamp: new Date().toISOString()
})
```

### 📋 Checklist de Code Review

#### Antes de Commit
- [ ] Todas as importações são explícitas
- [ ] Nomes seguem convenções (PascalCase para componentes, camelCase para funções)
- [ ] Cores semânticas utilizadas
- [ ] Estados de loading/error implementados
- [ ] TypeScript sem erros
- [ ] Responsividade testada
- [ ] Tratamento de erros adequado

#### Estrutura de Commit
```
type(scope): description

feat(components): adicionar FuncionariosTable com estados de loading
fix(auth): corrigir redirecionamento após logout
docs(readme): atualizar instruções de setup
```
