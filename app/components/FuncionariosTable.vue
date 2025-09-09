<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Cabeçalho da tabela -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">
        Lista de Funcionários
      </h3>
      <p class="text-sm text-gray-600 mt-1">
        Gerencie os funcionários cadastrados no sistema
      </p>
    </div>

    <!-- Estado de loading -->
    <div v-if="isLoading" class="px-6 py-8 text-center">
      <div class="inline-flex items-center">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mr-3"></div>
        <span class="text-gray-600">Carregando funcionários...</span>
      </div>
    </div>

    <!-- Estado de erro -->
    <div v-else-if="error" class="px-6 py-8 text-center">
      <div class="text-red-600 mb-4">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-sm font-medium">Erro ao carregar funcionários</p>
        <p class="text-xs text-gray-500 mt-1">{{ error }}</p>
      </div>
      <button 
        @click="fetchFuncionarios"
        class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
      >
        Tentar Novamente
      </button>
    </div>

    <!-- Lista vazia -->
    <div v-else-if="funcionarios.length === 0" class="px-6 py-8 text-center">
      <div class="text-gray-400 mb-4">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <p class="text-sm font-medium text-gray-500">Nenhum funcionário encontrado</p>
        <p class="text-xs text-gray-400 mt-1">Adicione funcionários para vê-los aqui</p>
      </div>
    </div>

    <!-- Tabela de funcionários -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Cabeçalho -->
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cargo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-mail
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>

        <!-- Corpo da tabela -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="funcionario in funcionarios" 
            :key="funcionario.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <!-- Nome -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-orange-800">
                      {{ funcionario.nome.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ funcionario.nome }}
                  </div>
                  <div v-if="funcionario.endereco" class="text-sm text-gray-500">
                    {{ funcionario.endereco }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Cargo -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {{ funcionario.cargo }}
              </span>
            </td>

            <!-- E-mail -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ funcionario.email }}</div>
              <div v-if="funcionario.salario" class="text-sm text-gray-500">
                Salário: {{ formatCurrency(funcionario.salario) }}
              </div>
            </td>

            <!-- Ações -->
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                class="text-orange-600 hover:text-orange-900 mr-3 transition-colors"
                @click="editFuncionario(funcionario)"
              >
                Editar
              </button>
              <button 
                class="text-red-600 hover:text-red-900 transition-colors"
                @click="deleteFuncionario(funcionario)"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer com total -->
    <div v-if="funcionarios.length > 0" class="px-6 py-3 bg-gray-50 border-t border-gray-200">
      <p class="text-sm text-gray-700">
        Total de <span class="font-medium">{{ funcionarios.length }}</span> funcionário{{ funcionarios.length !== 1 ? 's' : '' }} encontrado{{ funcionarios.length !== 1 ? 's' : '' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Funcionario } from '~/types/funcionario'

// Usar o composable de funcionários
const { funcionarios, isLoading, error, fetchFuncionarios } = useFuncionarios()

// Buscar funcionários quando o componente for montado
onMounted(async () => {
  await fetchFuncionarios()
})

// Função para formatar moeda
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// Funções para ações (placeholders por enquanto)
const editFuncionario = (funcionario: Funcionario) => {
  console.log('Editar funcionário:', funcionario)
  // TODO: Implementar edição
}

const deleteFuncionario = (funcionario: Funcionario) => {
  console.log('Excluir funcionário:', funcionario)
  // TODO: Implementar exclusão
}
</script>
