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
        :type="type"
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
  modelValue?: string | number
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search'
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
  type: 'text',
  disabled: false,
  required: false,
  readonly: false,
  size: 'md'
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()
const inputId = useId()

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
