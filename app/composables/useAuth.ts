import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  // Estados reativos para autenticação
  const user = useState<User | null>('auth.user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = useState<boolean>('auth.loading', () => false)

  // Função para obter o cliente Supabase de forma segura
  const getSupabaseClient = () => {
    try {
      const { $supabase } = useNuxtApp()
      return $supabase
    } catch (error) {
      console.warn('Supabase client não disponível:', error)
      return null
    }
  }

  // Função para sincronizar estado do usuário
  const syncUserState = (newUser: User | null) => {
    const userState = useState<User | null>('auth.user')
    userState.value = newUser
  }

  // Função para fazer login
  const login = async (email: string, password: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return { error: { message: 'Cliente Supabase não disponível' } }
    }

    try {
      isLoading.value = true
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Erro no login:', error.message)
        return { error }
      }

      if (data.user) {
        syncUserState(data.user)
      }

      return { data, error: null }
    } catch (error: any) {
      console.error('Erro inesperado no login:', error)
      return { error }
    } finally {
      isLoading.value = false
    }
  }

  // Função para criar conta
  const signUp = async (email: string, password: string, fullName?: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return { error: { message: 'Cliente Supabase não disponível' } }
    }

    try {
      isLoading.value = true
      
      // Criar conta no Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || '',
            display_name: fullName || email.split('@')[0]
          }
        }
      })

      if (error) {
        console.error('Erro no registro:', error.message)
        return { error }
      }

      // Se o usuário foi criado mas precisa confirmar email
      if (data.user && !data.session) {
        return { 
          data, 
          error: null,
          needsConfirmation: true,
          message: 'Conta criada! Verifique seu email para confirmar a conta.' 
        }
      }

      // Se o usuário foi criado e já está logado
      if (data.user && data.session) {
        syncUserState(data.user)
        return { 
          data, 
          error: null,
          needsConfirmation: false,
          message: 'Conta criada e login realizado com sucesso!' 
        }
      }

      return { data, error: null }
    } catch (error: any) {
      console.error('Erro inesperado no registro:', error)
      return { error }
    } finally {
      isLoading.value = false
    }
  }

  // Função para fazer logout
  const logout = async () => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      syncUserState(null)
      return { error: null }
    }

    try {
      isLoading.value = true
      const { error } = await supabase.auth.signOut()
      syncUserState(null)
      return { error }
    } catch (error: any) {
      console.error('Erro no logout:', error)
      syncUserState(null)
      return { error }
    } finally {
      isLoading.value = false
    }
  }

  // Função para verificar sessão ativa
  const checkSession = async () => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return null
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        syncUserState(session.user)
      } else {
        syncUserState(null)
      }
      return session
    } catch (error) {
      console.error('Erro ao verificar sessão:', error)
      syncUserState(null)
      return null
    }
  }

  // Inicializar auth state
  const initializeAuth = async () => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      console.warn('Não foi possível inicializar auth: Supabase não disponível')
      return
    }

    if (process.client) {
      await checkSession()
      
      // Escutar mudanças no estado de autenticação
      supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          syncUserState(session.user)
        } else {
          syncUserState(null)
        }
      })
    }
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    login,
    signUp,
    logout,
    checkSession,
    initializeAuth,
    syncUserState
  }
}
