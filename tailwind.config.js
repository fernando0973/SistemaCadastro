/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/composables/**/*.{js,ts}",
    "./app/utils/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      // Sistema de Cores Semânticas - Preto e Laranja
      colors: {
        // Cores Primárias - Laranja
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Laranja principal
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407'
        },
        
        // Cores Secundárias - Tons de Preto/Cinza
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Cinza médio
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // Quase preto
          950: '#020617'  // Preto profundo
        },

        // Sistema de Texto Semântico
        text: {
          primary: '#0f172a',     // Texto principal (preto)
          secondary: '#475569',   // Texto secundário (cinza escuro)
          muted: '#64748b',       // Texto menos importante (cinza médio)
          inverse: '#ffffff',     // Texto em fundos escuros (branco)
          disabled: '#94a3b8',    // Texto desabilitado (cinza claro)
          accent: '#f97316'       // Texto de destaque (laranja)
        },

        // Sistema de Fundos Semânticos
        background: {
          primary: '#ffffff',     // Fundo principal (branco)
          secondary: '#f8fafc',   // Fundo secundário (cinza muito claro)
          muted: '#f1f5f9',       // Fundo suave (cinza claro)
          elevated: '#ffffff',    // Cartões elevados (branco)
          dark: '#0f172a',        // Fundo escuro (preto)
          overlay: 'rgba(15, 23, 42, 0.8)' // Overlay escuro
        },

        // Estados e Feedbacks
        accent: {
          primary: '#f97316',     // Accent principal (laranja)
          secondary: '#ea580c',   // Accent secundário (laranja escuro)
          success: '#10b981',     // Sucesso (verde)
          warning: '#f59e0b',     // Aviso (amarelo)
          error: '#ef4444',       // Erro (vermelho)
          info: '#3b82f6'         // Informação (azul)
        },

        // Estados de Erro/Sucesso com mais variações
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },

        // Bordas Semânticas
        border: {
          primary: '#e2e8f0',     // Borda padrão (cinza claro)
          secondary: '#cbd5e1',   // Borda mais visível (cinza médio)
          muted: '#f1f5f9',       // Borda sutil (cinza muito claro)
          focus: '#f97316',       // Borda de foco (laranja)
          error: '#ef4444',       // Borda de erro (vermelho)
          dark: '#334155'         // Borda escura
        }
      },

      // Tipografia Semântica
      fontSize: {
        // Cabeçalhos
        'heading-1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }], // 56px
        'heading-2': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }], // 36px
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],  // 24px
        'heading-4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }], // 20px
        'heading-5': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }], // 18px

        // Corpo do texto
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],  // 18px
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],      // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],  // 14px
        'body-xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],   // 12px

        // Elementos específicos
        'caption': ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],   // 12px
        'button': ['0.875rem', { lineHeight: '1.2', fontWeight: '500' }],   // 14px
        'label': ['0.875rem', { lineHeight: '1.3', fontWeight: '500' }]     // 14px
      },

      // Espaçamentos Semânticos
      spacing: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '3rem',      // 48px
        '3xl': '4rem',      // 64px
        '4xl': '6rem',      // 96px
        '5xl': '8rem'       // 128px
      },

      // Gradientes Semânticos - Laranja e Preto
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', // Laranja claro
        'gradient-secondary': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', // Cinza claro
        'gradient-accent': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', // Laranja vibrante
        'gradient-hero': 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)', // Laranja degradê
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', // Preto para cinza escuro
        'gradient-orange-to-dark': 'linear-gradient(135deg, #f97316 0%, #0f172a 100%)', // Laranja para preto
        'gradient-dark-to-orange': 'linear-gradient(135deg, #0f172a 0%, #f97316 100%)' // Preto para laranja
      },

      // Sombras Semânticas
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      },

      // Raios de Borda Semânticos
      borderRadius: {
        'card': '0.75rem',      // 12px
        'button': '0.5rem',     // 8px
        'input': '0.375rem',    // 6px
        'badge': '9999px'       // Pill shape
      }
    }
  },
  plugins: [
    // Plugin para criar classes de utilitários semânticos
    function({ addUtilities }) {
      addUtilities({
        // Botões Semânticos
        '.btn': {
          '@apply px-6 py-3 rounded-button font-medium text-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2': {},
        },
        '.btn-primary': {
          '@apply bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm': {},
        },
        '.btn-secondary': {
          '@apply bg-secondary-100 text-secondary-700 hover:bg-secondary-200 focus:ring-secondary-500 border border-secondary-300': {},
        },
        '.btn-accent': {
          '@apply bg-accent-success text-white hover:bg-green-600 focus:ring-accent-success': {},
        },
        '.btn-dark': {
          '@apply bg-secondary-900 text-white hover:bg-secondary-800 focus:ring-secondary-700': {},
        },
        '.btn-outline-primary': {
          '@apply border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500': {},
        },
        '.btn-outline-dark': {
          '@apply border-2 border-secondary-900 text-secondary-900 hover:bg-secondary-900 hover:text-white focus:ring-secondary-700': {},
        },

        // Cards Semânticos
        '.card': {
          '@apply bg-background-elevated rounded-card border border-border-primary': {},
        },
        '.card-elevated': {
          '@apply card shadow-card hover:shadow-card-hover transition-shadow duration-200': {},
        },
        '.card-body': {
          '@apply p-6': {},
        },

        // Inputs Semânticos
        '.input': {
          '@apply w-full px-4 py-3 rounded-input border border-border-primary bg-background-primary text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent': {},
        },
        '.input-error': {
          '@apply border-border-error focus:ring-accent-error': {},
        },

        // Container Semântico
        '.container-app': {
          '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
        }
      })
    }
  ]
}

