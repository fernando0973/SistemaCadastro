<template>
  <div class="container-app py-8">
    <!-- Cabeçalho da página -->
    <div class="mb-8">
      <div class="flex items-center space-x-4 mb-4">
        <BaseButton
          variant="secondary"
          size="sm"
          @click="$router.back()"
        >
          ← Voltar
        </BaseButton>
      </div>
      
      <h1 class="text-heading-2 text-text-primary">Novo Funcionário</h1>
      <p class="text-body-md text-text-secondary mt-2">
        Cadastre um novo funcionário no sistema
      </p>
    </div>

    <!-- Formulário de cadastro -->
    <div class="max-w-2xl mx-auto">
      <FuncionarioForm :is-novo="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/BaseButton.vue'
import FuncionarioForm from '~/components/FuncionarioForm.vue'
import { useAuth } from '~/composables/useAuth'

// Meta da página
definePageMeta({
  layout: 'default'
})

// SEO
useHead({
  title: 'Novo Funcionário - Sistema Cadastro',
  meta: [
    { name: 'description', content: 'Cadastrar novo funcionário no sistema' }
  ]
})

// Verificar autenticação
const { isAuthenticated } = useAuth()
</script>
