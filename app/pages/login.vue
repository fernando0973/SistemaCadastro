<template>
  <div class="min-h-[70vh] flex items-start justify-center py-8 px-4">
    <div class="mt-16">
      <LoginForm />
    </div>
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
