<template>
  <div class="card-elevated">
    <div class="card-body">
      <!-- Cabeçalho do formulário -->
      <div class="mb-6">
        <h2 class="text-heading-3 text-text-primary">
          {{ isNovo ? 'Novo Funcionário' : 'Editar Funcionário' }}
        </h2>
        <p class="text-body-sm text-text-secondary mt-1">
          {{ isNovo ? 'Preencha os dados do novo funcionário' : 'Atualize as informações do funcionário' }}
        </p>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nome -->
        <BaseInput
          v-model="formData.nome"
          label="Nome completo"
          type="text"
          placeholder="Digite o nome completo"
          required
          :readonly="readonly"
          :errorMessage="errors.nome"
        />

        <!-- Email -->
        <BaseInput
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="exemplo@empresa.com"
          required
          :readonly="readonly"
          :errorMessage="errors.email"
        />

        <!-- Cargo -->
        <BaseDropdown
          v-model="formData.cargo"
          label="Cargo"
          placeholder="Selecione o cargo..."
          required
          :readonly="readonly"
          :options="cargoOptions"
          :errorMessage="errors.cargo"
        />

        <!-- Endereço -->
        <BaseInput
          v-model="formData.endereco"
          label="Endereço"
          type="text"
          placeholder="Digite o endereço completo (opcional)"
          :readonly="readonly"
          :errorMessage="errors.endereco"
        />

        <!-- Salário -->
        <BaseInput
          v-model="formData.salario"
          label="Salário"
          type="number"
          placeholder="0.00"
          hint="Digite apenas números. Ex: 5000.50"
          :readonly="readonly"
          :errorMessage="errors.salario"
        />

        <!-- Botões de ação -->
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-border-primary">
          <!-- Botões quando está em modo readonly -->
          <template v-if="readonly && showEditButton">
            <button
              type="button"
              @click="emit('toggle-edit')"
              class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
          </template>

          <!-- Botões quando está em modo edição -->
          <template v-else-if="!readonly">
            <BaseButton
              type="button"
              variant="secondary"
              @click="handleCancel"
              :disabled="loading"
            >
              Cancelar
            </BaseButton>
            
            <BaseButton
              type="submit"
              variant="primary"
              :disabled="loading || !isFormValid"
            >
              {{ loading ? 'Processando...' : (isNovo ? 'Salvar Funcionário' : 'Atualizar Funcionário') }}
            </BaseButton>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from 'vue'
import BaseInput from '~/components/BaseInput.vue'
import BaseButton from '~/components/BaseButton.vue'
import BaseDropdown from '~/components/BaseDropdown.vue'
import { useNotification } from '~/composables/useNotification'
import { useFuncionarios } from '~/composables/useFuncionarios'
import type { CreateFuncionario, UpdateFuncionario, Funcionario } from '~/types/funcionario'

// Composables
const { success, error, warning } = useNotification()
const { createFuncionario, updateFuncionario, isLoading } = useFuncionarios()
const router = useRouter()

// Props
interface Props {
  isNovo?: boolean
  funcionarioData?: Funcionario | null
  readonly?: boolean
  showEditButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isNovo: true,
  funcionarioData: null,
  readonly: false,
  showEditButton: false
})

// Emits
interface Emits {
  'toggle-edit': [],
  'update-success': [data: Funcionario]
}

const emit = defineEmits<Emits>()

// Opções de cargo
const cargoOptions = [
  'Desenvolvedor Frontend',
  'Desenvolvedor Backend', 
  'Desenvolvedor Full Stack',
  'Engenheiro de Software',
  'Analista de Sistemas',
  'Cientista de Dados',
  'Administrador de Banco de Dados (DBA)',
  'Especialista em Segurança da Informação',
  'DevOps Engineer',
  'Product Owner'
]

// Estados reativos
const loading = computed(() => isLoading.value)

// Dados do formulário
const formData = reactive({
  nome: '',
  email: '',
  cargo: '',
  endereco: '',
  salario: ''
})

// Erros de validação
const errors = reactive({
  nome: '',
  email: '',
  cargo: '',
  endereco: '',
  salario: ''
})

// Computed para validação do formulário
const isFormValid = computed(() => {
  return formData.nome.trim() !== '' &&
         formData.email.trim() !== '' &&
         formData.cargo.trim() !== '' &&
         isValidEmail(formData.email) &&
         (formData.salario === '' || isValidSalario(formData.salario))
})

// Função para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para validar salário
function isValidSalario(salario: string): boolean {
  if (salario === '') return true // Salário é opcional
  const numero = parseFloat(salario)
  return !isNaN(numero) && numero >= 0
}

// Função para popular formulário com dados existentes
function populateForm(funcionario: Funcionario) {
  formData.nome = funcionario.nome
  formData.email = funcionario.email
  formData.cargo = funcionario.cargo
  formData.endereco = funcionario.endereco || ''
  formData.salario = funcionario.salario ? funcionario.salario.toString() : ''
}

// Função para limpar formulário
function clearForm() {
  formData.nome = ''
  formData.email = ''
  formData.cargo = ''
  formData.endereco = ''
  formData.salario = ''
  
  // Limpar erros
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}

// Observar mudanças nos dados do funcionário
watch(() => props.funcionarioData, (newData) => {
  if (newData) {
    populateForm(newData)
  } else if (props.isNovo) {
    clearForm()
  }
}, { immediate: true })

// Inicializar formulário quando componente for montado
onMounted(() => {
  if (props.funcionarioData) {
    populateForm(props.funcionarioData)
  }
})

// Função para validar formulário
function validateForm(): boolean {
  // Limpar erros anteriores
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Validar nome
  if (!formData.nome.trim()) {
    errors.nome = 'Nome é obrigatório'
    isValid = false
  }

  // Validar email
  if (!formData.email.trim()) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  // Validar cargo
  if (!formData.cargo.trim()) {
    errors.cargo = 'Cargo é obrigatório'
    isValid = false
  }

  // Validar salário (se preenchido)
  if (formData.salario && !isValidSalario(formData.salario)) {
    errors.salario = 'Salário deve ser um número válido'
    isValid = false
  }

  return isValid
}

// Função para preparar dados para envio
function prepareFormData(): CreateFuncionario | UpdateFuncionario {
  const data = {
    nome: formData.nome.trim(),
    email: formData.email.trim(),
    cargo: formData.cargo.trim(),
    endereco: formData.endereco.trim() || null,
    salario: formData.salario ? parseFloat(formData.salario) : null
  }

  return data
}

// Função para lidar com o submit
async function handleSubmit() {
  if (!validateForm()) {
    warning('Por favor, verifique os campos obrigatórios.')
    return
  }

  try {
    const data = prepareFormData()
    
    if (props.isNovo) {
      // Criar novo funcionário
      const result = await createFuncionario(data as CreateFuncionario)
      
      if (result.error) {
        // Mostrar erro específico
        if (result.error.message?.includes('email')) {
          error('Este email já está cadastrado. Use um email diferente.')
        } else {
          error('Erro ao criar funcionário. Tente novamente.')
        }
        return
      }

      // Sucesso - mostrar toast e resetar formulário
      success('Funcionário criado com sucesso!')
      resetForm()
      
    } else {
      // Atualizar funcionário existente
      if (!props.funcionarioData?.id) {
        error('ID do funcionário não encontrado para atualização.')
        return
      }
      
      const result = await updateFuncionario(props.funcionarioData.id, data)
      
      if (result.error) {
        // Mostrar erro específico
        if (result.error.message?.includes('email')) {
          error('Este email já está cadastrado. Use um email diferente.')
        } else {
          error('Erro ao atualizar funcionário. Tente novamente.')
        }
        return
      }

      // Sucesso - mostrar toast e navegar para a página de listagem
      success('Funcionário atualizado com sucesso!')
      
      // Notificar componente pai sobre atualização bem-sucedida
      if (result.data) {
        emit('update-success', result.data)
      }
      
      // Voltar para modo visualização
      emit('toggle-edit')
      
      // Navegar para a página inicial após atualização bem-sucedida
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }

  } catch (err: any) {
    console.error('Erro ao processar formulário:', err)
    error('Erro inesperado ao processar formulário. Tente novamente.')
  }
}

// Função para cancelar
function handleCancel() {
  if (!props.isNovo) {
    // Se está editando um funcionário existente, volta para modo readonly
    emit('toggle-edit')
  } else {
    // Se é novo funcionário, limpa o formulário
    resetForm()
  }
}

// Função para limpar formulário
function resetForm() {
  Object.assign(formData, {
    nome: '',
    email: '',
    cargo: '',
    endereco: '',
    salario: ''
  })
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}

// Expor funções para componente pai
defineExpose({
  resetForm,
  validateForm
})
</script>
