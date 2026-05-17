-- =============================================
-- STORAGE — bucket brand-assets
-- =============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', false)
ON CONFLICT (id) DO NOTHING;

-- Todos autenticados podem visualizar/baixar
CREATE POLICY "storage_select_authenticated"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'brand-assets');

-- Admin e staff podem fazer upload
CREATE POLICY "storage_insert_staff_admin"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'brand-assets'
    AND public.get_user_role(auth.uid()) IN ('admin', 'staff')
  );

-- Admin e staff podem atualizar
CREATE POLICY "storage_update_staff_admin"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'brand-assets'
    AND public.get_user_role(auth.uid()) IN ('admin', 'staff')
  );

-- Somente admin pode deletar
CREATE POLICY "storage_delete_admin"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'brand-assets'
    AND public.get_user_role(auth.uid()) = 'admin'
  );
