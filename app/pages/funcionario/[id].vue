<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              {{ isEditMode ? 'Editar Funcionário' : 'Visualizar Funcionário' }}
            </h1>
            <p class="mt-2 text-gray-600">
              {{ isEditMode ? 'Atualize as informações do funcionário' : 'Dados do funcionário selecionado' }}
            </p>
          </div>
          <!-- Botão Voltar -->
          <NuxtLink 
            to="/" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </NuxtLink>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span class="ml-3 text-gray-600">Carregando funcionário...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Erro ao carregar funcionário
            </h3>
            <div class="mt-2 text-sm text-red-700">
              {{ error }}
            </div>
          </div>
        </div>
      </div>

      <!-- Funcionário encontrado -->
      <div v-else-if="funcionario" class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">
            Informações do Funcionário
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            ID: {{ funcionario.id }}
          </p>
        </div>
        
        <div class="p-6">
          <FuncionarioForm 
            :is-novo="false"
            :funcionario-data="funcionario"
            :readonly="!isEditMode"
            :show-edit-button="!isEditMode"
            @toggle-edit="toggleEditMode"
            @update-success="handleUpdateSuccess"
          />
        </div>
      </div>

      <!-- Funcionário não encontrado -->
      <div v-else class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">
              Funcionário não encontrado
            </h3>
            <div class="mt-2 text-sm text-yellow-700">
              Não foi possível encontrar um funcionário com o ID: {{ route.params.id }}
            </div>
            <div class="mt-4">
              <NuxtLink 
                to="/" 
                class="text-sm font-medium text-yellow-800 underline hover:text-yellow-700"
              >
                Voltar para a lista de funcionários
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Definir meta da página
definePageMeta({
  title: 'Visualizar Funcionário'
})

// Imports
import type { Funcionario } from '~/types/funcionario'

const route = useRoute()
const router = useRouter()
const { funcionarios, isLoading, error, fetchFuncionarios } = useFuncionarios()
const { success } = useNotification()

// Estado reativo para o funcionário atual
const funcionario = ref<Funcionario | null>(null)

// Estado para controlar o modo de edição
const isEditMode = ref(false)

// Função para alternar modo de edição
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}

// Função para lidar com atualização bem-sucedida
const handleUpdateSuccess = (updatedFuncionario: Funcionario) => {
  funcionario.value = updatedFuncionario
  isEditMode.value = false
  success(`Funcionário ${updatedFuncionario.nome} atualizado com sucesso!`)
}

// Função para buscar funcionário por ID
const findFuncionario = (): Funcionario | null => {
  const id = parseInt(route.params.id as string)
  if (!id || isNaN(id)) return null
  
  return funcionarios.value.find(f => f.id === id) || null
}

// Buscar funcionários se não temos dados ainda
onMounted(async () => {
  try {
    // Se não temos funcionários carregados, buscar
    if (funcionarios.value.length === 0) {
      await fetchFuncionarios()
    }
    
    // Buscar o funcionário específico
    funcionario.value = findFuncionario()
  } catch (err) {
    console.error('Erro ao carregar funcionário:', err)
  }
})

// Observar mudanças nos funcionários (caso sejam recarregados)
watch(funcionarios, () => {
  funcionario.value = findFuncionario()
}, { deep: true })

// Meta para SEO
useHead(() => ({
  title: funcionario.value 
    ? `${funcionario.value.nome} - Visualizar Funcionário`
    : 'Funcionário - Sistema de Cadastro'
}))
</script>
