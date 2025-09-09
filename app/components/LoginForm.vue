<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-96">
    <!-- Cabeçalho -->
    <div class="text-center mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-1">
        {{ activeTab === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta' }}
      </h2>
      <p class="text-sm text-gray-600">
        {{ activeTab === 'login' ? 'Entre com suas credenciais' : 'Preencha os dados para começar' }}
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex bg-gray-100 rounded-lg p-1 mb-5">
      <button
        @click="setActiveTab('login')"
        :class="[
          'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all',
          activeTab === 'login'
            ? 'bg-white text-orange-500 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        ]"
      >
        Entrar
      </button>
      <button
        @click="setActiveTab('register')"
        :class="[
          'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all',
          activeTab === 'register'
            ? 'bg-white text-orange-500 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        ]"
      >
        Criar Conta
      </button>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-sm text-red-600">{{ errorMessage }}</p>
    </div>

    <!-- Formulário de Login -->
    <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
      <BaseInput
        v-model="loginForm.email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        required
        :disabled="isLoading"
      />

      <BasePasswordInput
        v-model="loginForm.password"
        label="Senha"
        placeholder="Digite sua senha"
        required
        :disabled="isLoading"
      />

      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input
            v-model="loginForm.rememberMe"
            type="checkbox"
            class="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
            :disabled="isLoading"
          />
          <span class="ml-2 text-sm text-gray-600">Lembrar de mim</span>
        </label>

        <a href="#" class="text-sm text-orange-500 hover:text-orange-600 transition-colors">
          Esqueceu a senha?
        </a>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        size="md"
        class="w-full"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </BaseButton>
    </form>

    <!-- Formulário de Cadastro -->
    <form v-else @submit.prevent="handleRegister" class="space-y-4">
      <BaseInput
        v-model="registerForm.email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        required
        :disabled="isLoading"
      />

      <BasePasswordInput
        v-model="registerForm.password"
        label="Senha"
        placeholder="Digite sua senha"
        required
        :disabled="isLoading"
      />

      <BasePasswordInput
        v-model="registerForm.confirmPassword"
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        required
        :disabled="isLoading"
      />

      <div class="flex items-start">
        <input
          v-model="registerForm.acceptTerms"
          type="checkbox"
          class="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2 mt-0.5"
          required
          :disabled="isLoading"
        />
        <label class="ml-3 text-sm text-gray-600">
          Concordo com os 
          <a href="#" class="text-orange-500 hover:text-orange-600 transition-colors">Termos de Uso</a>
          e 
          <a href="#" class="text-orange-500 hover:text-orange-600 transition-colors">Política de Privacidade</a>
        </label>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        size="md"
        class="w-full"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Criando...' : 'Criar Conta' }}
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Tipos
interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

type TabType = 'login' | 'register'

// Estado das abas
const activeTab = ref<TabType>('login')

// Formulários
const loginForm = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false
})

const registerForm = reactive<RegisterForm>({
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// Estado de loading e erro
const isLoading = ref(false)
const errorMessage = ref('')

// Usar o composable de autenticação
const { login, isAuthenticated } = useAuth()

// Métodos
const setActiveTab = (tab: TabType) => {
  activeTab.value = tab
  errorMessage.value = ''
}

const handleLogin = async () => {
  if (!loginForm.email || !loginForm.password) {
    errorMessage.value = 'Email e senha são obrigatórios'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const { error } = await login(loginForm.email, loginForm.password)
    if (error) {
      errorMessage.value = error.message
    } else {
      // Redirecionar para a página principal após login bem-sucedido
      await navigateTo('/')
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Ocorreu um erro inesperado'
  } finally {
    isLoading.value = false
  }
}

const handleRegister = () => {
  if (!registerForm.email || !registerForm.password) {
    errorMessage.value = 'Email e senha são obrigatórios'
    return
  }
  
  if (registerForm.password !== registerForm.confirmPassword) {
    errorMessage.value = 'As senhas não coincidem'
    return
  }
  
  if (!registerForm.acceptTerms) {
    errorMessage.value = 'Você deve aceitar os termos de uso'
    return
  }

  console.log('Register form submitted:', registerForm)
  errorMessage.value = 'Funcionalidade de registro ainda não implementada'
  // Aqui será implementada a lógica de cadastro
}
</script>
