<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Novo Cadastro</h1>
          <p class="text-lg text-gray-600 mb-8">
            Bem-vindo à página de novo cadastro do sistema.
          </p>
          
          <!-- Aqui será implementado o conteúdo específico da página -->
          <div class="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <p class="text-gray-500">
              Conteúdo da página de novo cadastro será implementado aqui.
            </p>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Meta da página
definePageMeta({
  layout: false // Não usar layout padrão, pois já incluímos header/footer aqui
})

// SEO
useHead({
  title: 'Novo Cadastro - Sistema Cadastro',
  meta: [
    { name: 'description', content: 'Página de novo cadastro do Sistema Cadastro' }
  ]
})

// Verificar autenticação
const { isAuthenticated } = useAuth()
</script>
