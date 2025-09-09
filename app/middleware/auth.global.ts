export default defineNuxtRouteMiddleware(async (to) => {
  // Tentar obter o cliente Supabase de forma segura
  try {
    const { $supabase } = useNuxtApp()
    
    if (!$supabase) {
      console.warn('Supabase client não disponível no middleware')
      return
    }
    
    // Obter o composable de autenticação para sincronizar o estado
    const { syncUserState, user } = useAuth()
    
    // Verificar sessão atual de forma assíncrona
    const { data: { session } } = await $supabase.auth.getSession()
    
    // Sincronizar o estado do usuário com a sessão atual
    if (session?.user) {
      // Se há uma sessão válida, sincronizar o usuário
      if (!user.value || user.value.id !== session.user.id) {
        syncUserState(session.user)
      }
    } else {
      // Se não há sessão, limpar o estado do usuário
      if (user.value) {
        syncUserState(null)
      }
    }
    
    // Rotas que não precisam de autenticação
    const publicRoutes = ['/login']
    
    // Verificar se a rota atual é pública
    const isPublicRoute = publicRoutes.includes(to.path)
    
    // Se o usuário está autenticado e tenta acessar a página de login
    if (session?.user && to.path === '/login') {
      return navigateTo('/', { replace: true })
    }
    
    // Se o usuário não está autenticado e tenta acessar uma rota protegida
    if (!session?.user && !isPublicRoute) {
      return navigateTo('/login', { replace: true })
    }
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error)
    
    // Em caso de erro crítico, verificar se é uma rota pública
    const publicRoutes = ['/login']
    const isPublicRoute = publicRoutes.includes(to.path)
    
    if (!isPublicRoute) {
      // Se não é uma rota pública e há erro, redirecionar para login por segurança
      return navigateTo('/login', { replace: true })
    }
  }
})
