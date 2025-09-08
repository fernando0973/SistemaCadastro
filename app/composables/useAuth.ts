import { createClient } from '@supabase/supabase-js'
import type { User, SupabaseClient } from '@supabase/supabase-js'

export const useAuth = () => {
  // Estados reativos para autenticação
  const user = useState<User | null>('auth.user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  // Inicializar cliente Supabase apenas no lado do cliente
  const supabase = ref<SupabaseClient | null>(null)

  // Função para inicializar o cliente Supabase
  const initSupabase = () => {
    if (process.client && !supabase.value) {
      const config = useRuntimeConfig()
      
      if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
        console.error('Configurações do Supabase não encontradas')
        return null
      }

      supabase.value = createClient(
        config.public.supabaseUrl as string,
        config.public.supabaseAnonKey as string
      )
    }
    return supabase.value
  }

  // Função para fazer login
  const login = async (email: string, password: string) => {
    const client = initSupabase()
    if (!client) {
      return { error: new Error('Cliente Supabase não inicializado') }
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
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
    const client = initSupabase()
    if (!client) {
      return { error: new Error('Cliente Supabase não inicializado') }
    }

    try {
      const { error } = await client.auth.signOut()
      user.value = null
      return { error }
    } catch (error: any) {
      console.error('Erro no logout:', error)
      return { error }
    }
  }

  // Função para verificar sessão ativa (apenas no cliente)
  const checkSession = async () => {
    if (!process.client) return

    const client = initSupabase()
    if (!client) return

    try {
      const { data: { session } } = await client.auth.getSession()
      if (session?.user) {
        user.value = session.user
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error)
    }
  }

  // Verificar sessão ao inicializar (apenas no cliente)
  if (process.client) {
    onMounted(() => {
      checkSession()
    })
  }

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    logout,
    checkSession
  }
}
