import { createClient } from '@supabase/supabase-js'
import type { User, Session } from '@supabase/supabase-js'

export const useAuth = () => {
  // Estados globais para o usuário e sessão
  const user = useState<User | null>('auth.user', () => null)
  const session = useState<Session | null>('auth.session', () => null)
  const loading = useState<boolean>('auth.loading', () => false)

  // Configuração do cliente Supabase
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  )

  /**
   * Função para fazer login com email e senha
   */
  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      // Atualiza os estados globais
      user.value = data.user
      session.value = data.session

      return { success: true, data }
    } catch (error: any) {
      console.error('Erro no login:', error)
      return { 
        success: false, 
        error: error.message || 'Erro ao fazer login' 
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Função para fazer logout
   */
  const logout = async () => {
    try {
      loading.value = true
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }

      // Limpa os estados globais
      user.value = null
      session.value = null

      // Redireciona para a página de login
      await navigateTo('/login')

      return { success: true }
    } catch (error: any) {
      console.error('Erro no logout:', error)
      return { 
        success: false, 
        error: error.message || 'Erro ao fazer logout' 
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Função para verificar se o usuário está logado
   */
  const isAuthenticated = computed(() => !!user.value && !!session.value)

  /**
   * Função para obter o usuário atual
   */
  const getCurrentUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        throw error
      }

      return user
    } catch (error) {
      console.error('Erro ao obter usuário:', error)
      return null
    }
  }

  /**
   * Função para inicializar a autenticação (verificar sessão existente)
   */
  const initialize = async () => {
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession()
      
      if (error) {
        throw error
      }

      if (currentSession) {
        user.value = currentSession.user
        session.value = currentSession
      }
    } catch (error) {
      console.error('Erro ao inicializar auth:', error)
    }
  }

  // Listener para mudanças de estado de autenticação
  supabase.auth.onAuthStateChange((event, newSession) => {
    if (event === 'SIGNED_IN' && newSession) {
      user.value = newSession.user
      session.value = newSession
    } else if (event === 'SIGNED_OUT') {
      user.value = null
      session.value = null
    }
  })

  return {
    // Estados
    user: readonly(user),
    session: readonly(session),
    loading: readonly(loading),
    isAuthenticated,
    
    // Métodos
    login,
    logout,
    getCurrentUser,
    initialize,
    
    // Cliente Supabase (caso precise de acesso direto)
    supabase
  }
}
