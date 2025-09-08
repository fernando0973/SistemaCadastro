<template>
  <div>
    <!-- Anunciador de rotas para acessibilidade -->
    <NuxtRouteAnnouncer />
    
    <!-- Layout da aplicação -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Área para Notificações/Toast -->
    <div id="toast-container" class="fixed top-4 right-4 z-50 space-y-2"></div>
    
    <!-- Área para Modals -->
    <div id="modal-root" class="relative z-40"></div>
  </div>
</template>

<script setup lang="ts">
// Configurações globais da aplicação
useHead({
  titleTemplate: '%s - Sistema de Cadastro',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      charset: 'utf-8'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

// CSS Global da aplicação
useSeoMeta({
  ogSiteName: 'Sistema de Cadastro',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
</script>

<style>
/* Reset e estilos globais */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Estilos para foco acessível */
*:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Classe para elementos que devem ser escondidos visualmente mas acessíveis para screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Animações customizadas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Scrollbar customizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: theme('colors.background.secondary');
}

::-webkit-scrollbar-thumb {
  background: theme('colors.border.secondary');
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: theme('colors.text.muted');
}
</style>
