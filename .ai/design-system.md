# Design System - Sistema de Cadastro SaaS

## 🎨 Paleta de Cores

### Cores Primárias - Laranja
```css
primary-50:  #fff7ed  /* Fundo muito claro */
primary-100: #ffedd5  /* Fundo claro */
primary-200: #fed7aa  /* Borda clara */
primary-300: #fdba74  /* Elementos sutis */
primary-400: #fb923c  /* Hover states */
primary-500: #f97316  /* COR PRINCIPAL - Laranja */
primary-600: #ea580c  /* Botões ativos */
primary-700: #c2410c  /* Estados pressed */
primary-800: #9a3412  /* Texto em fundos claros */
primary-900: #7c2d12  /* Texto muito escuro */
primary-950: #431407  /* Acentos profundos */
```

### Cores Secundárias - Preto/Cinza
```css
secondary-50:  #f8fafc  /* Fundo suave */
secondary-100: #f1f5f9  /* Fundo de cards */
secondary-200: #e2e8f0  /* Bordas sutis */
secondary-300: #cbd5e1  /* Bordas visíveis */
secondary-400: #94a3b8  /* Texto placeholder */
secondary-500: #64748b  /* Texto secundário */
secondary-600: #475569  /* Texto médio */
secondary-700: #334155  /* Texto escuro */
secondary-800: #1e293b  /* Texto principal escuro */
secondary-900: #0f172a  /* COR PRINCIPAL - Preto */
secondary-950: #020617  /* Preto profundo */
```

## 📝 Sistema de Tipografia

### Classes de Texto Disponíveis
```css
/* Cabeçalhos */
.text-heading-1  /* 56px, font-bold, line-height: 1.1 */
.text-heading-2  /* 36px, font-semibold, line-height: 1.2 */
.text-heading-3  /* 24px, font-semibold, line-height: 1.3 */
.text-heading-4  /* 20px, font-medium, line-height: 1.4 */
.text-heading-5  /* 18px, font-medium, line-height: 1.4 */

/* Corpo do texto */
.text-body-lg    /* 18px, font-normal, line-height: 1.6 */
.text-body-md    /* 16px, font-normal, line-height: 1.6 */
.text-body-sm    /* 14px, font-normal, line-height: 1.5 */
.text-body-xs    /* 12px, font-normal, line-height: 1.4 */

/* Elementos específicos */
.text-caption    /* 12px, font-medium, line-height: 1.3 */
.text-button     /* 14px, font-medium, line-height: 1.2 */
.text-label      /* 14px, font-medium, line-height: 1.3 */
```

### Hierarquia de Uso
```vue
<!-- Títulos de página -->
<h1 class="text-heading-2 text-text-primary">Página Principal</h1>

<!-- Títulos de seção -->
<h2 class="text-heading-3 text-text-primary">Seção Importante</h2>

<!-- Subtítulos -->
<h3 class="text-heading-4 text-text-primary">Subsection</h3>

<!-- Texto principal -->
<p class="text-body-md text-text-primary">Conteúdo principal da aplicação</p>

<!-- Texto secundário -->
<p class="text-body-sm text-text-secondary">Informações complementares</p>

<!-- Texto auxiliar -->
<span class="text-caption text-text-muted">Detalhes ou metadados</span>
```

## 🎯 Sistema de Cores Semânticas

### Cores de Texto
```css
.text-text-primary    /* #0f172a - Texto principal (preto) */
.text-text-secondary  /* #475569 - Texto secundário (cinza escuro) */
.text-text-muted      /* #64748b - Texto menos importante (cinza médio) */
.text-text-inverse    /* #ffffff - Texto em fundos escuros (branco) */
.text-text-disabled   /* #94a3b8 - Texto desabilitado (cinza claro) */
.text-text-accent     /* #f97316 - Texto de destaque (laranja) */
```

### Cores de Fundo
```css
.bg-background-primary    /* #ffffff - Fundo principal (branco) */
.bg-background-secondary  /* #f8fafc - Fundo secundário (cinza muito claro) */
.bg-background-muted      /* #f1f5f9 - Fundo suave (cinza claro) */
.bg-background-elevated   /* #ffffff - Cartões elevados (branco) */
.bg-background-dark       /* #0f172a - Fundo escuro (preto) */
```

### Cores de Estado
```css
.text-accent-success  /* #10b981 - Sucesso (verde) */
.text-accent-warning  /* #f59e0b - Aviso (amarelo) */
.text-accent-error    /* #ef4444 - Erro (vermelho) */
.text-accent-info     /* #3b82f6 - Informação (azul) */

.bg-accent-success    /* Fundo verde para sucesso */
.bg-accent-error      /* Fundo vermelho para erros */
/* ... etc */
```

### Cores de Borda
```css
.border-border-primary   /* #e2e8f0 - Borda padrão (cinza claro) */
.border-border-secondary /* #cbd5e1 - Borda mais visível (cinza médio) */
.border-border-muted     /* #f1f5f9 - Borda sutil (cinza muito claro) */
.border-border-focus     /* #f97316 - Borda de foco (laranja) */
.border-border-error     /* #ef4444 - Borda de erro (vermelho) */
```

## 🔘 Sistema de Componentes

### Botões
```css
/* Classe base */
.btn {
  @apply px-6 py-3 rounded-button font-medium text-button 
         transition-all duration-200 focus:outline-none 
         focus:ring-2 focus:ring-offset-2;
}

/* Variações */
.btn-primary      /* Laranja - ação principal */
.btn-secondary    /* Cinza claro - ação secundária */
.btn-accent       /* Verde - ação de sucesso */
.btn-dark         /* Preto - ação alternativa */
.btn-outline-primary  /* Borda laranja */
.btn-outline-dark     /* Borda preta */
```

### Cards
```css
.card {
  @apply bg-background-elevated rounded-card border border-border-primary;
}

.card-elevated {
  @apply card shadow-card hover:shadow-card-hover 
         transition-shadow duration-200;
}

.card-body {
  @apply p-6;
}
```

### Inputs
```css
.input {
  @apply w-full px-4 py-3 rounded-input border border-border-primary 
         bg-background-primary text-text-primary placeholder-text-muted 
         focus:outline-none focus:ring-2 focus:ring-primary-500 
         focus:border-transparent;
}

.input-error {
  @apply border-border-error focus:ring-accent-error;
}
```

## 📐 Sistema de Espaçamento

### Espaçamentos Semânticos
```css
.spacing-xs   /* 4px - Espaçamento mínimo */
.spacing-sm   /* 8px - Espaçamento pequeno */
.spacing-md   /* 16px - Espaçamento médio */
.spacing-lg   /* 24px - Espaçamento grande */
.spacing-xl   /* 32px - Espaçamento extra grande */
.spacing-2xl  /* 48px - Espaçamento muito grande */
.spacing-3xl  /* 64px - Espaçamento seção */
.spacing-4xl  /* 96px - Espaçamento página */
.spacing-5xl  /* 128px - Espaçamento hero */
```

### Guia de Uso
```vue
<!-- Padding interno de cards -->
<div class="p-6">Card content</div>

<!-- Margem entre seções -->
<div class="mb-8">Section</div>

<!-- Espaçamento entre elementos -->
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## 🌊 Gradientes

### Gradientes Disponíveis
```css
.bg-gradient-primary       /* Laranja claro degradê */
.bg-gradient-secondary     /* Cinza claro degradê */
.bg-gradient-accent        /* Laranja vibrante degradê */
.bg-gradient-hero          /* Laranja completo para heroes */
.bg-gradient-dark          /* Preto para cinza escuro */
.bg-gradient-orange-to-dark /* Laranja para preto */
.bg-gradient-dark-to-orange /* Preto para laranja */
```

## 💫 Sombras

### Tipos de Sombra
```css
.shadow-card       /* Sombra sutil para cards */
.shadow-card-hover /* Sombra para hover em cards */
.shadow-elevated   /* Sombra para elementos elevados */
.shadow-modal      /* Sombra intensa para modais */
```

## 📱 Sistema Responsivo

### Breakpoints
```css
sm: 640px   /* Mobile grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
2xl: 1536px /* Desktop extra grande */
```

### Padrões Responsivos
```vue
<!-- Layout responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>

<!-- Texto responsivo -->
<h1 class="text-heading-3 md:text-heading-2 lg:text-heading-1">
  Título Responsivo
</h1>

<!-- Padding responsivo -->
<div class="px-4 sm:px-6 lg:px-8">
  Container
</div>
```

## 🎯 Exemplos de Uso

### Card de Dashboard
```vue
<div class="card-elevated card-body">
  <div class="flex items-center space-x-4">
    <div class="bg-primary-100 rounded-full p-3">
      <svg class="w-6 h-6 text-primary-600"><!-- icon --></svg>
    </div>
    <div>
      <h3 class="text-heading-5 text-text-primary">Título</h3>
      <p class="text-body-sm text-text-secondary">Descrição</p>
    </div>
  </div>
</div>
```

### Botão Principal
```vue
<button class="btn btn-primary">
  Ação Principal
</button>
```

### Formulário
```vue
<form class="space-y-6">
  <div>
    <label class="text-label text-text-primary">Nome</label>
    <input class="input mt-1" type="text" placeholder="Digite o nome">
  </div>
  <button class="btn btn-primary w-full">Salvar</button>
</form>
```

### Container de Página
```vue
<div class="container-app py-8">
  <h1 class="text-heading-2 text-text-primary mb-6">Página</h1>
  <!-- Conteúdo -->
</div>
```
