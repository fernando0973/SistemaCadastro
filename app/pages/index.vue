<template>
  <div class="min-h-screen bg-background-secondary">
    <div class="container-app py-8">
      <!-- Cabeçalho -->
      <div class="bg-background-elevated rounded-card shadow-card p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-heading-2 text-text-primary font-bold">
              Sistema de Cadastro
            </h1>
            <p class="text-body-md text-text-secondary mt-1">
              Bem-vindo ao seu painel de controle
            </p>
          </div>
          
          <div v-if="isAuthenticated" class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-body-sm text-text-secondary">Logado como:</p>
              <p class="text-body-md text-text-primary font-medium">{{ user?.email }}</p>
            </div>
            <BaseButton 
              variant="secondary" 
              size="sm" 
              @click="handleLogout"
              :disabled="isLoggingOut"
            >
              {{ isLoggingOut ? 'Saindo...' : 'Sair' }}
            </BaseButton>
          </div>
          
          <div v-else>
            <BaseButton 
              variant="primary" 
              size="md" 
              @click="$router.push('/login')"
            >
              Fazer Login
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Conteúdo Principal -->
      <div v-if="isAuthenticated" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card de Boas-vindas -->
        <div class="bg-background-elevated rounded-card shadow-card p-6">
          <div class="flex items-center">
            <div class="bg-primary-100 rounded-full p-3">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-heading-5 text-text-primary font-semibold">Perfil</h3>
              <p class="text-body-sm text-text-secondary">Gerencie suas informações</p>
            </div>
          </div>
        </div>

        <!-- Card de Configurações -->
        <div class="bg-background-elevated rounded-card shadow-card p-6">
          <div class="flex items-center">
            <div class="bg-accent-info/10 rounded-full p-3">
              <svg class="w-6 h-6 text-accent-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-heading-5 text-text-primary font-semibold">Configurações</h3>
              <p class="text-body-sm text-text-secondary">Personalize sua experiência</p>
            </div>
          </div>
        </div>

        <!-- Card de Segurança -->
        <div class="bg-background-elevated rounded-card shadow-card p-6">
          <div class="flex items-center">
            <div class="bg-accent-success/10 rounded-full p-3">
              <svg class="w-6 h-6 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-heading-5 text-text-primary font-semibold">Segurança</h3>
              <p class="text-body-sm text-text-secondary">Proteja sua conta</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado não autenticado -->
      <div v-else class="text-center py-12">
        <div class="bg-background-elevated rounded-card shadow-card p-8 max-w-md mx-auto">
          <div class="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-heading-3 text-text-primary font-semibold mb-2">
            Acesso Necessário
          </h2>
          <p class="text-body-md text-text-secondary mb-6">
            Faça login para acessar todas as funcionalidades do sistema.
          </p>
          <BaseButton 
            variant="primary" 
            size="md" 
            @click="$router.push('/login')"
            class="w-full"
          >
            Fazer Login
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Página inicial
definePageMeta({
  layout: 'default'
})

// Estado de loading para logout
const isLoggingOut = ref(false)

// Usar o composable de autenticação
const { isAuthenticated, user, logout } = useAuth()

// Função para fazer logout
async function handleLogout() {
  isLoggingOut.value = true
  try {
    await logout()
    // Redirecionar para a página de login após logout
    await navigateTo('/login')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  } finally {
    isLoggingOut.value = false
  }
}
</script>
