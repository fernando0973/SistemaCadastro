import type { Funcionario } from '~/types/funcionario'

export const useFuncionarios = () => {
  // Estados reativos
  const funcionarios = useState<Funcionario[]>('funcionarios.list', () => [])
  const isLoading = useState<boolean>('funcionarios.loading', () => false)
  const error = useState<string | null>('funcionarios.error', () => null)

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

  // Função para buscar todos os funcionários
  const fetchFuncionarios = async () => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      error.value = 'Cliente Supabase não disponível'
      return { data: null, error: error.value }
    }

    try {
      isLoading.value = true
      error.value = null

      const { data, error: supabaseError } = await supabase
        .from('funcionarios')
        .select('*')
        .order('nome', { ascending: true })

      if (supabaseError) {
        console.error('Erro ao buscar funcionários:', supabaseError.message)
        error.value = supabaseError.message
        return { data: null, error: supabaseError }
      }

      // Atualizar estado reativo
      funcionarios.value = data || []
      
      return { data, error: null }
    } catch (err: any) {
      console.error('Erro inesperado ao buscar funcionários:', err)
      error.value = 'Erro inesperado ao buscar funcionários'
      return { data: null, error: err }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // Estados
    funcionarios: readonly(funcionarios),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Ações
    fetchFuncionarios
  }
}
