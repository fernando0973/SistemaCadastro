<template>
  <div class="space-y-1">
    <label 
      v-if="label" 
      :for="inputId" 
      class="block text-sm font-medium text-text-primary"
    >
      {{ label }}
      <span v-if="required" class="text-accent-error ml-1">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        ref="inputRef"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :value="modelValue"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Toggle para visualizar senha -->
      <button
        type="button"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-text-primary transition-colors"
        :class="hasError ? 'mr-8' : ''"
        :disabled="disabled"
      >
        <svg 
          v-if="showPassword" 
          class="h-5 w-5 text-text-muted" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
        </svg>
        <svg 
          v-else 
          class="h-5 w-5 text-text-muted" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
      </button>
      
      <!-- Ícone de erro -->
      <div 
        v-if="hasError" 
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg class="h-5 w-5 text-accent-error" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    
    <p 
      v-if="errorMessage" 
      class="text-sm text-accent-error"
    >
      {{ errorMessage }}
    </p>
    
    <p 
      v-else-if="hint" 
      class="text-sm text-text-secondary"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

interface Emits {
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  readonly: false,
  size: 'md'
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()
const inputId = useId()
const showPassword = ref(false)

const hasError = computed(() => !!props.errorMessage)

const inputClasses = computed(() => {
  const baseClasses = 'block w-full rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset transition-colors duration-200'
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }
  
  const stateClasses = hasError.value
    ? 'ring-accent-error text-text-primary placeholder:text-text-muted focus:ring-accent-error'
    : 'ring-border-input text-text-primary placeholder:text-text-muted focus:ring-primary-500'
  
  const disabledClasses = props.disabled
    ? 'bg-background-disabled cursor-not-allowed opacity-50'
    : 'bg-background-primary'
  
  const readonlyClasses = props.readonly
    ? 'bg-background-muted cursor-default'
    : ''
  
  return [
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    disabledClasses,
    readonlyClasses
  ].filter(Boolean).join(' ')
})

const togglePasswordVisibility = () => {
  if (!props.disabled && !props.readonly) {
    showPassword.value = !showPassword.value
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

defineExpose({
  focus,
  blur,
  inputRef
})
</script>
