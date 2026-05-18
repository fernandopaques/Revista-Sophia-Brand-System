# Supabase — Brand System Revista Sophia

## Como aplicar as migrations

### Via Dashboard (recomendado)
1. Acesse https://supabase.com/dashboard → seu projeto → SQL Editor
2. Execute `20260517001_schema.sql` primeiro (tabelas + RLS)
3. Execute `20260517002_storage.sql` em seguida (bucket + políticas)

### Via CLI
```bash
supabase db push
```

## Ordem obrigatória
1. `20260517001_schema.sql` — enum, tabelas, triggers, RLS
2. `20260517002_storage.sql` — bucket brand-assets e políticas

## Promover primeiro admin
Após criar sua conta pelo app, execute no SQL Editor:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'seu@email.com');
```

## Variáveis de ambiente necessárias
Copie `.env.example` para `.env.local` e preencha:
- `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto (Settings → API)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — chave anon pública
- `SUPABASE_SERVICE_ROLE_KEY` — chave service role (secreta, nunca expor no client)
