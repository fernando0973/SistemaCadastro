import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Verificar se as variáveis de ambiente estão disponíveis e válidas
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseAnonKey as string

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
    console.warn('⚠️  Configurações do Supabase não encontradas ou inválidas')
    console.log('Para configurar o Supabase, edite o arquivo .env com as credenciais corretas')
    return
  }

  try {
    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })

    console.log('✅ Cliente Supabase criado com sucesso')

    // Disponibilizar o cliente globalmente
    return {
      provide: {
        supabase
      }
    }
  } catch (error) {
    console.error('❌ Erro ao criar cliente Supabase:', error)
    return
  }
})
