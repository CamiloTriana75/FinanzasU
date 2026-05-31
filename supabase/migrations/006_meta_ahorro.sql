-- HU-22: Agregar campo meta_ahorro_mensual a la tabla perfiles
-- Este campo almacena la meta de ahorro mensual configurada por el usuario.
-- Un valor de 0 significa que no ha configurado ninguna meta todavía.

ALTER TABLE public.perfiles
  ADD COLUMN IF NOT EXISTS meta_ahorro_mensual numeric NOT NULL DEFAULT 0;

-- Restricción: el monto debe ser no negativo
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'perfiles_meta_ahorro_mensual_check'
      AND conrelid = 'public.perfiles'::regclass
  ) THEN
    EXECUTE 'ALTER TABLE public.perfiles
      ADD CONSTRAINT perfiles_meta_ahorro_mensual_check
      CHECK (meta_ahorro_mensual >= 0)';
  END IF;
END
$$;
