<template>
  <div class="bg-background-elevated rounded-xl shadow-elevated border border-border-primary p-6 w-96">
    <!-- Cabeçalho -->
    <div class="text-center mb-6">
      <h2 class="text-lg font-semibold text-text-primary mb-1">
        {{ activeTab === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta' }}
      </h2>
      <p class="text-sm text-text-secondary">
        {{ activeTab === 'login' ? 'Entre com suas credenciais' : 'Preencha os dados para começar' }}
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex bg-background-secondary rounded-lg p-1 mb-5">
      <button
        @click="setActiveTab('login')"
        :class="[
          'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all',
          activeTab === 'login'
            ? 'bg-background-elevated text-primary-500 shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
        ]"
      >
        Entrar
      </button>
      <button
        @click="setActiveTab('register')"
        :class="[
          'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all',
          activeTab === 'register'
            ? 'bg-background-elevated text-primary-500 shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
        ]"
      >
        Criar Conta
      </button>
    </div>

    <!-- Formulário de Login -->
    <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
      <BaseInput
        v-model="loginForm.email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        required
      />

      <BasePasswordInput
        v-model="loginForm.password"
        label="Senha"
        placeholder="Digite sua senha"
        required
      />

      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input
            v-model="loginForm.rememberMe"
            type="checkbox"
            class="w-4 h-4 text-primary-500 bg-background-primary border-border-primary rounded focus:ring-primary-500 focus:ring-2"
          />
          <span class="ml-2 text-sm text-text-secondary">Lembrar de mim</span>
        </label>

        <a href="#" class="text-sm text-primary-500 hover:text-primary-600 transition-colors">
          Esqueceu a senha?
        </a>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        size="md"
        class="w-full"
      >
        Entrar
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
      />

      <BasePasswordInput
        v-model="registerForm.password"
        label="Senha"
        placeholder="Digite sua senha"
        required
      />

      <BasePasswordInput
        v-model="registerForm.confirmPassword"
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        required
      />

      <div class="flex items-start">
        <input
          v-model="registerForm.acceptTerms"
          type="checkbox"
          class="w-4 h-4 text-primary-500 bg-background-primary border-border-primary rounded focus:ring-primary-500 focus:ring-2 mt-0.5"
          required
        />
        <label class="ml-3 text-sm text-text-secondary">
          Concordo com os 
          <a href="#" class="text-primary-500 hover:text-primary-600 transition-colors">Termos de Uso</a>
          e 
          <a href="#" class="text-primary-500 hover:text-primary-600 transition-colors">Política de Privacidade</a>
        </label>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        size="md"
        class="w-full"
      >
        Criar Conta
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

// Métodos
const setActiveTab = (tab: TabType) => {
  activeTab.value = tab
}

const handleLogin = () => {
  console.log('Login form submitted:', loginForm)
  // Aqui será implementada a lógica de login
}

const handleRegister = () => {
  console.log('Register form submitted:', registerForm)
  // Aqui será implementada a lógica de cadastro
}
</script>
