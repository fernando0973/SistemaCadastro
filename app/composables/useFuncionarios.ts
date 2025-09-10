import type { Funcionario, CreateFuncionario, UpdateFuncionario } from '~/types/funcionario'

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

  // Função para criar um novo funcionário
  const createFuncionario = async (funcionarioData: CreateFuncionario) => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      error.value = 'Cliente Supabase não disponível'
      return { data: null, error: error.value }
    }

    try {
      isLoading.value = true
      error.value = null

      // Validar dados obrigatórios
      if (!funcionarioData.nome?.trim()) {
        throw new Error('Nome é obrigatório')
      }
      if (!funcionarioData.email?.trim()) {
        throw new Error('Email é obrigatório')
      }
      if (!funcionarioData.cargo?.trim()) {
        throw new Error('Cargo é obrigatório')
      }

      // Preparar dados para inserção
      const dataToInsert = {
        nome: funcionarioData.nome.trim(),
        email: funcionarioData.email.trim().toLowerCase(),
        cargo: funcionarioData.cargo.trim(),
        endereco: funcionarioData.endereco?.trim() || null,
        salario: funcionarioData.salario || null
      }

      const { data, error: supabaseError } = await supabase
        .from('funcionarios')
        .insert([dataToInsert])
        .select()
        .single()

      if (supabaseError) {
        console.error('Erro ao criar funcionário:', supabaseError.message)
        
        // Tratar erro de email duplicado
        if (supabaseError.code === '23505' && supabaseError.message.includes('email')) {
          error.value = 'Este email já está cadastrado'
        } else {
          error.value = supabaseError.message
        }
        
        return { data: null, error: supabaseError }
      }

      // Adicionar novo funcionário ao estado local
      if (data) {
        funcionarios.value = [...funcionarios.value, data]
      }
      
      return { data, error: null }
    } catch (err: any) {
      console.error('Erro inesperado ao criar funcionário:', err)
      error.value = err.message || 'Erro inesperado ao criar funcionário'
      return { data: null, error: err }
    } finally {
      isLoading.value = false
    }
  }

  // Função para atualizar um funcionário existente
  const updateFuncionario = async (id: number, funcionarioData: UpdateFuncionario) => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      error.value = 'Cliente Supabase não disponível'
      return { data: null, error: error.value }
    }

    try {
      isLoading.value = true
      error.value = null

      // Validar dados obrigatórios
      if (funcionarioData.nome !== undefined && !funcionarioData.nome.trim()) {
        throw new Error('Nome é obrigatório')
      }
      if (funcionarioData.email !== undefined && !funcionarioData.email.trim()) {
        throw new Error('Email é obrigatório')
      }
      if (funcionarioData.cargo !== undefined && !funcionarioData.cargo.trim()) {
        throw new Error('Cargo é obrigatório')
      }

      // Preparar dados para atualização
      const dataToUpdate = {
        ...(funcionarioData.nome !== undefined && { nome: funcionarioData.nome.trim() }),
        ...(funcionarioData.email !== undefined && { email: funcionarioData.email.trim().toLowerCase() }),
        ...(funcionarioData.cargo !== undefined && { cargo: funcionarioData.cargo.trim() }),
        endereco: funcionarioData.endereco?.trim() || null,
        salario: funcionarioData.salario || null
      }

      // Executar a atualização no Supabase
      const { data, error: supabaseError } = await supabase
        .from('funcionarios')
        .update(dataToUpdate)
        .eq('id', id)
        .select()
        .single()

      if (supabaseError) {
        console.error('Erro ao atualizar funcionário:', supabaseError.message)
        
        // Tratar erro de email duplicado
        if (supabaseError.code === '23505' && supabaseError.message.includes('email')) {
          error.value = 'Este email já está cadastrado'
        } else {
          error.value = supabaseError.message
        }
        
        return { data: null, error: supabaseError }
      }

      // Atualizar o funcionário no estado local
      if (data) {
        const index = funcionarios.value.findIndex(f => f.id === id)
        if (index !== -1) {
          // Criar uma nova referência para o array para garantir a reatividade
          funcionarios.value = [
            ...funcionarios.value.slice(0, index),
            data,
            ...funcionarios.value.slice(index + 1)
          ]
        }
      }
      
      return { data, error: null }
    } catch (err: any) {
      console.error('Erro inesperado ao atualizar funcionário:', err)
      error.value = err.message || 'Erro inesperado ao atualizar funcionário'
      return { data: null, error: err }
    } finally {
      isLoading.value = false
    }
  }

  // Função para excluir um funcionário
  const deleteFuncionario = async (id: number) => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      error.value = 'Cliente Supabase não disponível'
      return { success: false, error: error.value }
    }

    try {
      isLoading.value = true
      error.value = null

      // Executar a exclusão no Supabase
      const { error: supabaseError } = await supabase
        .from('funcionarios')
        .delete()
        .eq('id', id)

      if (supabaseError) {
        console.error('Erro ao excluir funcionário:', supabaseError.message)
        error.value = supabaseError.message
        return { success: false, error: supabaseError }
      }

      // Atualizar o estado local removendo o funcionário excluído
      funcionarios.value = funcionarios.value.filter(f => f.id !== id)
      
      return { success: true, error: null }
    } catch (err: any) {
      console.error('Erro inesperado ao excluir funcionário:', err)
      error.value = err.message || 'Erro inesperado ao excluir funcionário'
      return { success: false, error: err }
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
    fetchFuncionarios,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario
  }
}
