# README - Agent Steering Files

Este diretório contém arquivos de direcionamento para agentes de IA que trabalham no projeto **Sistema de Cadastro SaaS**.

## 📁 Arquivos Disponíveis

### 🎯 `agent-instructions.md`
**Arquivo principal** com instruções diretas e objetivas para agentes de IA.

**Conteúdo:**
- Regras críticas e obrigatórias
- Padrões de código obrigatórios
- Checklist de validação
- Anti-patterns a evitar
- Contexto específico do projeto

**Uso:** Leia este arquivo PRIMEIRO antes de qualquer modificação no código.

### 🏗️ `technical-architecture.md`
Documentação técnica detalhada da arquitetura do sistema.

**Conteúdo:**
- Visão geral da stack tecnológica
- Estrutura de diretórios detalhada
- Fluxos de autenticação
- Padrões de composables e componentes
- Integração com Supabase

**Uso:** Consulte para entender a arquitetura e tomar decisões técnicas.

### 🎨 `design-system.md`
Documentação completa do design system customizado.

**Conteúdo:**
- Paleta de cores semânticas (laranja + preto/cinza)
- Sistema de tipografia
- Componentes e classes utilitárias
- Padrões de responsividade
- Exemplos de uso

**Uso:** Referência obrigatória para qualquer trabalho de UI/UX.

### 📋 `development-guidelines.md`
Diretrizes detalhadas de desenvolvimento e boas práticas.

**Conteúdo:**
- Convenções de nomenclatura
- Estrutura de componentes
- Padrões de reatividade
- Integração com Supabase
- Checklist de code review

**Uso:** Guia para manter consistência no código.

### 🌍 `project-context.md`
Contexto geral do projeto e funcionalidades implementadas.

**Conteúdo:**
- Visão geral do sistema
- Stack tecnológica utilizada
- Funcionalidades implementadas
- Arquitetura do projeto
- Próximos passos

**Uso:** Entenda o contexto geral antes de começar a trabalhar.

## 🚀 Como Usar

### Para Agentes de IA
1. **Leia primeiro:** `agent-instructions.md`
2. **Entenda o contexto:** `project-context.md`
3. **Consulte a arquitetura:** `technical-architecture.md`
4. **Use o design system:** `design-system.md`
5. **Siga as diretrizes:** `development-guidelines.md`

### Para Desenvolvedores
Estes arquivos servem como documentação viva do projeto e devem ser mantidos atualizados conforme o projeto evolui.

## ⚠️ Regras Importantes

### 🔴 Importações Explícitas
```typescript
// ✅ SEMPRE faça assim
import ComponentName from '~/components/ComponentName.vue'
import { useComposable } from '~/composables/useComposable'

// ❌ NUNCA faça assim
// Usando auto-imports implícitos para componentes personalizados
```

### 🔴 Design System Obrigatório
```css
/* ✅ Use classes semânticas */
'text-text-primary'
'bg-background-elevated'
'btn btn-primary'

/* ❌ Não use classes TailwindCSS diretas */
'text-gray-900'
'bg-white'
'px-4 py-2'
```

### 🔴 Nomenclatura Consistente
- **Componentes:** PascalCase (`BaseButton.vue`)
- **Composables:** camelCase com `use` (`useAuth.ts`)
- **Types:** PascalCase (`Funcionario`)

## 📊 Status do Projeto

### ✅ Implementado
- Sistema de autenticação completo
- Middleware de proteção de rotas
- Composable de gerenciamento de funcionários
- Componente de tabela com estados
- Design system semântico completo
- Tipos TypeScript estruturados

### 🔄 Em Desenvolvimento
- Operações CRUD completas
- Formulários modais
- Filtros e pesquisa

### 📋 Próximos Passos
- Validação de formulários
- Upload de imagens
- Testes automatizados

## 💡 Dicas Rápidas

### Build & Deploy
```bash
npm run build    # Build de produção
npm run dev      # Desenvolvimento
git add .        # Adicionar mudanças
git commit -m "feat: descrição"  # Commit
git push origin main             # Push para GitHub
```

### Design System
- **Container:** `container-app`
- **Cards:** `card-elevated card-body`
- **Botões:** `btn btn-primary`
- **Inputs:** `input`
- **Texto:** `text-heading-*`, `text-body-*`

### Cores Principais
- **Laranja:** `primary-500` (#f97316)
- **Preto:** `secondary-900` (#0f172a)
- **Cinza:** `secondary-500` (#64748b)

---

**Importante:** Mantenha estes arquivos atualizados conforme o projeto evolui. Eles são a fonte da verdade para manter a consistência e qualidade do código.
