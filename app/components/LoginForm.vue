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
        v-model="registerForm.fullName"
        type="text"
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        required
        :disabled="isLoading"
      />

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
  fullName: string
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
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// Estado de loading e erro
const isLoading = ref(false)
const errorMessage = ref('')

// Usar o composable de autenticação
const { login, signUp, isAuthenticated } = useAuth()

// Métodos
const setActiveTab = (tab: TabType) => {
  activeTab.value = tab
  errorMessage.value = ''
}

const handleLogin = async () => {
  // Limpar mensagem de erro anterior
  errorMessage.value = ''

  // Validações básicas
  if (!loginForm.email.trim()) {
    errorMessage.value = 'O email é obrigatório'
    return
  }

  if (!loginForm.password.trim()) {
    errorMessage.value = 'A senha é obrigatória'
    return
  }

  // Validação de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(loginForm.email)) {
    errorMessage.value = 'Por favor, insira um email válido'
    return
  }

  // Validação de comprimento mínimo da senha
  if (loginForm.password.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  isLoading.value = true

  try {
    const { error } = await login(loginForm.email, loginForm.password)
    
    if (error) {
      // Tratar diferentes tipos de erro de autenticação
      if (error.message.includes('Invalid login credentials')) {
        errorMessage.value = 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.'
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage.value = 'Por favor, confirme seu email antes de fazer login.'
      } else if (error.message.includes('Too many requests')) {
        errorMessage.value = 'Muitas tentativas de login. Tente novamente em alguns minutos.'
      } else if (error.message.includes('User not found')) {
        errorMessage.value = 'Usuário não encontrado. Verifique o email digitado.'
      } else {
        errorMessage.value = 'Erro ao fazer login. Tente novamente.'
      }
    } else {
      // Login bem-sucedido - limpar formulário e redirecionar
      loginForm.email = ''
      loginForm.password = ''
      loginForm.rememberMe = false
      await navigateTo('/')
    }
  } catch (error: any) {
    console.error('Erro inesperado no login:', error)
    errorMessage.value = 'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  // Limpar mensagem de erro anterior
  errorMessage.value = ''

  // Validações básicas
  if (!registerForm.fullName.trim()) {
    errorMessage.value = 'O nome completo é obrigatório'
    return
  }

  if (!registerForm.email.trim()) {
    errorMessage.value = 'O email é obrigatório'
    return
  }

  if (!registerForm.password.trim()) {
    errorMessage.value = 'A senha é obrigatória'
    return
  }

  // Validação de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.email)) {
    errorMessage.value = 'Por favor, insira um email válido'
    return
  }

  // Validação de comprimento mínimo da senha
  if (registerForm.password.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  // Verificar se as senhas coincidem
  if (registerForm.password !== registerForm.confirmPassword) {
    errorMessage.value = 'As senhas não coincidem'
    return
  }

  // Verificar se aceitou os termos
  if (!registerForm.acceptTerms) {
    errorMessage.value = 'Você deve aceitar os termos de uso'
    return
  }

  isLoading.value = true

  try {
    const { error, needsConfirmation, message } = await signUp(
      registerForm.email,
      registerForm.password,
      registerForm.fullName
    )
    
    if (error) {
      // Tratar diferentes tipos de erro de registro
      if (error.message.includes('User already registered')) {
        errorMessage.value = 'Este email já está cadastrado. Tente fazer login ou use outro email.'
      } else if (error.message.includes('Password should be at least')) {
        errorMessage.value = 'A senha deve ter pelo menos 6 caracteres'
      } else if (error.message.includes('Invalid email')) {
        errorMessage.value = 'Por favor, insira um email válido'
      } else if (error.message.includes('signup is disabled')) {
        errorMessage.value = 'Cadastro temporariamente desabilitado. Tente novamente mais tarde.'
      } else {
        errorMessage.value = error.message || 'Erro ao criar conta. Tente novamente.'
      }
    } else {
      // Registro bem-sucedido
      if (needsConfirmation) {
        // Mostrar mensagem de confirmação de email
        errorMessage.value = ''
        // Você pode criar uma mensagem de sucesso aqui
        alert(message || 'Conta criada! Verifique seu email para confirmar.')
        
        // Limpar formulário
        registerForm.fullName = ''
        registerForm.email = ''
        registerForm.password = ''
        registerForm.confirmPassword = ''
        registerForm.acceptTerms = false
        
        // Voltar para a aba de login
        activeTab.value = 'login'
      } else {
        // Login automático após registro
        alert(message || 'Conta criada e login realizado com sucesso!')
        
        // Limpar formulário
        registerForm.fullName = ''
        registerForm.email = ''
        registerForm.password = ''
        registerForm.confirmPassword = ''
        registerForm.acceptTerms = false
        
        // Redirecionar para a página inicial
        await navigateTo('/')
      }
    }
  } catch (error: any) {
    console.error('Erro inesperado no registro:', error)
    errorMessage.value = 'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
  } finally {
    isLoading.value = false
  }
}
</script>
