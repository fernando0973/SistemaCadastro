import { useToast } from 'vue-toastification'

/**
 * Composable para notificações toast
 * Fornece métodos simplificados para mostrar diferentes tipos de toast
 */
export function useNotification() {
  const toast = useToast()

  /**
   * Mostra um toast de sucesso
   * @param message - Mensagem a ser exibida
   */
  function success(message: string) {
    toast.success(message, {
      timeout: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  /**
   * Mostra um toast de erro
   * @param message - Mensagem de erro a ser exibida
   */
  function error(message: string) {
    toast.error(message, {
      timeout: 6000, // Erro fica mais tempo
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  /**
   * Mostra um toast de aviso
   * @param message - Mensagem de aviso a ser exibida
   */
  function warning(message: string) {
    toast.warning(message, {
      timeout: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  /**
   * Mostra um toast de informação
   * @param message - Mensagem informativa a ser exibida
   */
  function info(message: string) {
    toast.info(message, {
      timeout: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  /**
   * Mostra um toast padrão
   * @param message - Mensagem a ser exibida
   */
  function show(message: string) {
    toast(message, {
      timeout: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  /**
   * Limpa todos os toasts ativos
   */
  function clear() {
    toast.clear()
  }

  /**
   * Mostra toast de sucesso para operações de salvamento
   * @param entityName - Nome da entidade salva (ex: "Funcionário")
   */
  function successSave(entityName: string = 'Item') {
    success(`${entityName} salvo com sucesso!`)
  }

  /**
   * Mostra toast de sucesso para operações de atualização
   * @param entityName - Nome da entidade atualizada (ex: "Funcionário")
   */
  function successUpdate(entityName: string = 'Item') {
    success(`${entityName} atualizado com sucesso!`)
  }

  /**
   * Mostra toast de sucesso para operações de exclusão
   * @param entityName - Nome da entidade excluída (ex: "Funcionário")
   */
  function successDelete(entityName: string = 'Item') {
    success(`${entityName} excluído com sucesso!`)
  }

  /**
   * Mostra toast de erro para operações de salvamento
   * @param entityName - Nome da entidade (ex: "Funcionário")
   */
  function errorSave(entityName: string = 'Item') {
    error(`Erro ao salvar ${entityName.toLowerCase()}. Tente novamente.`)
  }

  /**
   * Mostra toast de erro para operações de atualização
   * @param entityName - Nome da entidade (ex: "Funcionário")
   */
  function errorUpdate(entityName: string = 'Item') {
    error(`Erro ao atualizar ${entityName.toLowerCase()}. Tente novamente.`)
  }

  /**
   * Mostra toast de erro para operações de exclusão
   * @param entityName - Nome da entidade (ex: "Funcionário")
   */
  function errorDelete(entityName: string = 'Item') {
    error(`Erro ao excluir ${entityName.toLowerCase()}. Tente novamente.`)
  }

  /**
   * Mostra toast de erro para carregamento de dados
   * @param entityName - Nome da entidade (ex: "funcionários")
   */
  function errorLoad(entityName: string = 'dados') {
    error(`Erro ao carregar ${entityName.toLowerCase()}. Verifique sua conexão.`)
  }

  /**
   * Mostra toast de erro para validação de formulário
   */
  function errorValidation() {
    warning('Por favor, verifique os campos obrigatórios.')
  }

  /**
   * Mostra toast de erro para autenticação
   */
  function errorAuth() {
    error('Erro de autenticação. Faça login novamente.')
  }

  /**
   * Mostra toast de informação para operação em andamento
   * @param message - Mensagem personalizada
   */
  function infoLoading(message: string = 'Processando...') {
    info(message)
  }

  return {
    // Métodos básicos
    success,
    error,
    warning,
    info,
    show,
    clear,
    
    // Métodos para operações comuns
    successSave,
    successUpdate,
    successDelete,
    errorSave,
    errorUpdate,
    errorDelete,
    errorLoad,
    errorValidation,
    errorAuth,
    infoLoading
  }
}
