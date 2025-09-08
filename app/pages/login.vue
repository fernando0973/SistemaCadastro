<template>
  <div class="min-h-[70vh] flex items-center justify-center py-8 px-4">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
// Meta da página
definePageMeta({
  layout: 'default'
})

// SEO
useHead({
  title: 'Login - Sistema Cadastro',
  meta: [
    { name: 'description', content: 'Faça login ou crie sua conta no Sistema Cadastro' }
  ]
})
</script>
