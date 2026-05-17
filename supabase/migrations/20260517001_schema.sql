-- =============================================
-- SCHEMA PRINCIPAL — Brand System Editora Teosófica
-- =============================================

-- 1. Enum de roles
CREATE TYPE public.user_role AS ENUM ('admin', 'staff', 'gratuito');

-- 2. Tabela profiles (vinculada a auth.users)
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT,
  avatar_url  TEXT,
  role        public.user_role NOT NULL DEFAULT 'gratuito',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Trigger: cria profile automaticamente ao criar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'gratuito'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Tabela brand_modules (espelho da navegação, para controle de visibilidade)
CREATE TABLE public.brand_modules (
  id           SERIAL PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  wave         TEXT NOT NULL CHECK (wave IN ('estrategia', 'verbal', 'visual')),
  ord          INTEGER NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inserir os 28 módulos
INSERT INTO public.brand_modules (slug, title, wave, ord) VALUES
  ('auditoria-mercado',   'Auditoria de Mercado',   'estrategia', 1),
  ('auditoria-publico',   'Auditoria de Público',   'estrategia', 2),
  ('auditoria-negocio',   'Auditoria de Negócio',   'estrategia', 3),
  ('benchmarking',        'Benchmarking',            'estrategia', 4),
  ('posicionamento',      'Posicionamento',          'estrategia', 5),
  ('golden-circle',       'Golden Circle',           'estrategia', 6),
  ('plano-de-midia',      'Plano de Mídia',          'estrategia', 7),
  ('buyer-persona',       'Buyer Persona',           'estrategia', 8),
  ('nucleo-da-marca',     'Núcleo da Marca',         'estrategia', 9),
  ('roteiro-da-marca',    'Roteiro da Marca',        'verbal',     10),
  ('virtudes-da-marca',   'Virtudes da Marca',       'verbal',     11),
  ('arquetipos-da-marca', 'Arquétipos da Marca',     'verbal',     12),
  ('brand-persona',       'Brand Persona',           'verbal',     13),
  ('tom-e-voz',           'Tom e Voz',               'verbal',     14),
  ('naming',              'Naming',                  'verbal',     15),
  ('vocabulario-da-marca','Vocabulário da Marca',    'verbal',     16),
  ('manifesto',           'Manifesto',               'verbal',     17),
  ('manual-verbal',       'Manual Verbal',           'verbal',     18),
  ('identidade-visual',   'Sistema Visual',          'visual',     19),
  ('moodboards',          'Moodboards',              'visual',     20),
  ('simbolos-e-logotipo', 'Símbolos e Logotipo',     'visual',     21),
  ('paleta-de-cores',     'Paleta de Cores',         'visual',     22),
  ('conjunto-tipografico','Conjunto Tipográfico',    'visual',     23),
  ('grafismos',           'Grafismos',               'visual',     24),
  ('direcao-de-imagem',   'Direção de Imagem',       'visual',     25),
  ('manual-visual',       'Manual Visual',           'visual',     26),
  ('aplicacoes',          'Aplicações',              'visual',     27),
  ('lancamento-da-marca', 'Lançamento da Marca',     'visual',     28);

-- 5. Tabela assets (arquivos da marca no storage)
CREATE TABLE public.assets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN (
    'logotipos','imagens','videos','audios','documentos','tipografia','cores','outros'
  )),
  storage_path  TEXT NOT NULL,
  size_bytes    BIGINT,
  mime_type     TEXT,
  uploaded_by   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Helper function para checar role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- 7. Trigger updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_assets_updated_at
  BEFORE UPDATE ON public.assets
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES: profiles
-- =============================================

CREATE POLICY "profiles_select_authenticated"
  ON public.profiles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "profiles_delete_admin"
  ON public.profiles FOR DELETE TO authenticated
  USING (public.get_user_role(auth.uid()) = 'admin');

-- =============================================
-- RLS POLICIES: brand_modules
-- =============================================

CREATE POLICY "modules_select_authenticated"
  ON public.brand_modules FOR SELECT TO authenticated
  USING (is_published = true OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "modules_insert_admin"
  ON public.brand_modules FOR INSERT TO authenticated
  WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "modules_update_admin"
  ON public.brand_modules FOR UPDATE TO authenticated
  USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "modules_delete_admin"
  ON public.brand_modules FOR DELETE TO authenticated
  USING (public.get_user_role(auth.uid()) = 'admin');

-- =============================================
-- RLS POLICIES: assets
-- =============================================

CREATE POLICY "assets_select_authenticated"
  ON public.assets FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "assets_insert_staff_admin"
  ON public.assets FOR INSERT TO authenticated
  WITH CHECK (public.get_user_role(auth.uid()) IN ('admin', 'staff'));

CREATE POLICY "assets_update_staff_admin"
  ON public.assets FOR UPDATE TO authenticated
  USING (public.get_user_role(auth.uid()) IN ('admin', 'staff'));

CREATE POLICY "assets_delete_admin"
  ON public.assets FOR DELETE TO authenticated
  USING (public.get_user_role(auth.uid()) = 'admin');
