// Tipos para a tabela funcionários
export interface Funcionario {
  id: number
  nome: string
  cargo: string
  endereco: string | null
  email: string
  salario: number | null
}

// Tipo para criação de funcionário (sem ID)
export interface CreateFuncionario {
  nome: string
  cargo: string
  endereco?: string | null
  email: string
  salario?: number | null
}

// Tipo para atualização de funcionário (campos opcionais)
export interface UpdateFuncionario {
  nome?: string
  cargo?: string
  endereco?: string | null
  email?: string
  salario?: number | null
}
