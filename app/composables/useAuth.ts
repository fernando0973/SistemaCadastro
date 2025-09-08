import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  // Estados reativos para autenticação
  const user = useState<User | null>('auth.user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  // Configurar cliente Supabase
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseAnonKey as string
  )

  // Função para fazer login
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Erro no login:', error.message)
        return { error }
      }

      if (data.user) {
        user.value = data.user
      }

      return { data, error: null }
    } catch (error: any) {
      console.error('Erro inesperado no login:', error)
      return { error }
    }
  }

  // Função para fazer logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      user.value = null
      return { error }
    } catch (error: any) {
      console.error('Erro no logout:', error)
      return { error }
    }
  }

  // Função para verificar sessão ativa
  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        user.value = session.user
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error)
    }
  }

  // Verificar sessão ao inicializar
  onMounted(() => {
    checkSession()
  })

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    logout,
    checkSession
  }
}
