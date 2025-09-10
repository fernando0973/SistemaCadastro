<template>
  <div class="space-y-1">
    <label 
      v-if="label" 
      :for="dropdownId" 
      class="block text-sm font-medium text-text-primary"
    >
      {{ label }}
      <span v-if="required" class="text-accent-error ml-1">*</span>
    </label>

    <Listbox v-model="selectedValue" :disabled="disabled || readonly">
      <div class="relative">
        <ListboxButton
          :id="dropdownId"
          :class="buttonClasses"
        >
          <span class="block truncate text-left">
            {{ displayValue || placeholder }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronUpDownIcon class="h-5 w-5 text-text-muted" aria-hidden="true" />
          </span>
        </ListboxButton>

        <div 
          v-if="hasError" 
          class="absolute inset-y-0 right-8 pr-3 flex items-center pointer-events-none"
        >
          <svg class="h-5 w-5 text-accent-error" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-primary shadow-elevated border border-border-primary focus:outline-none"
          >
            <ListboxOption
              v-for="option in options"
              :key="getOptionValue(option)"
              v-slot="{ active, selected }"
              :value="getOptionValue(option)"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-primary-50 text-primary-900' : 'text-text-primary',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-primary-50'
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate'
                  ]"
                >
                  {{ getOptionLabel(option) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

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
import { computed, useId, watch } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/20/solid'

// Tipos para as opções do dropdown
type DropdownOption = string | { value: string; label: string }

interface Props {
  modelValue?: string
  options: DropdownOption[]
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
}

interface Emits {
  'update:modelValue': [value: string]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  required: false,
  size: 'md',
  placeholder: 'Selecione uma opção...'
})

const emit = defineEmits<Emits>()

const dropdownId = useId()

// Valor selecionado interno
const selectedValue = computed({
  get: () => props.modelValue || '',
  set: (value: string) => emit('update:modelValue', value)
})

// Computed para verificar se há erro
const hasError = computed(() => !!props.errorMessage)

// Valor a ser exibido no botão
const displayValue = computed(() => {
  if (!selectedValue.value) return ''
  
  const option = props.options.find(opt => getOptionValue(opt) === selectedValue.value)
  return option ? getOptionLabel(option) : selectedValue.value
})

// Classes do botão
const buttonClasses = computed(() => {
  const baseClasses = 'relative w-full cursor-pointer rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset transition-colors duration-200 focus:outline-none'
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }
  
  const stateClasses = hasError.value
    ? 'ring-accent-error text-text-primary focus:ring-accent-error'
    : 'ring-border-primary text-text-primary focus:ring-primary-500'
  
  const disabledClasses = props.disabled
    ? 'bg-background-muted cursor-not-allowed opacity-50'
    : 'bg-background-primary'

  const placeholderClasses = !selectedValue.value ? 'text-text-muted' : ''
  
  return [
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    disabledClasses,
    placeholderClasses
  ].filter(Boolean).join(' ')
})

// Função para obter o valor de uma opção
function getOptionValue(option: DropdownOption): string {
  return typeof option === 'string' ? option : option.value
}

// Função para obter o label de uma opção
function getOptionLabel(option: DropdownOption): string {
  return typeof option === 'string' ? option : option.label
}

// Função para limpar seleção
function clearSelection() {
  selectedValue.value = ''
}

// Expor funções para componente pai
defineExpose({
  clearSelection
})
</script>
