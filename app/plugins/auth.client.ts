export default defineNuxtPlugin(async () => {
  // Aguardar o Nuxt App estar totalmente carregado
  await nextTick()
  
  try {
    // Verificar se o Supabase está disponível
    const { $supabase } = useNuxtApp()
    
    if (!$supabase) {
      console.warn('Supabase client não disponível ainda')
      return
    }

    // Inicializar o estado de autenticação
    const { initializeAuth } = useAuth()
    await initializeAuth()
  } catch (error) {
    console.error('Erro ao inicializar autenticação:', error)
  }
})
