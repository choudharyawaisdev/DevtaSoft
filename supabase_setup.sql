-- ═══════════════════════════════════════════════════════════════════════════
-- DEVTASOFT SUPABASE DATABASE & STORAGE SETUP SCRIPT
-- Copy and paste this script into your Supabase Dashboard -> SQL Editor -> Run
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  show_on_landing BOOLEAN DEFAULT true,
  created_at BIGINT NOT NULL
);

-- 2. Create Portfolio Table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT,
  show_on_landing BOOLEAN DEFAULT false,
  created_at BIGINT NOT NULL
);

-- 3. Create Visibility Table
CREATE TABLE IF NOT EXISTS public.visibility (
  id TEXT PRIMARY KEY,
  settings JSONB NOT NULL
);

-- 4. Create Messages Table for Contact Form Submissions
CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  read BOOLEAN DEFAULT false,
  created_at BIGINT NOT NULL
);

-- 5. Enable Row Level Security (RLS) & Set Public Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read and write on products" ON public.products;
CREATE POLICY "Allow public read and write on products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on portfolio" ON public.portfolio;
CREATE POLICY "Allow public read and write on portfolio" ON public.portfolio FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on visibility" ON public.visibility;
CREATE POLICY "Allow public read and write on visibility" ON public.visibility FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on messages" ON public.messages;
CREATE POLICY "Allow public read and write on messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);

-- 6. Enable Realtime Broadcasting for Multi-Device Live Sync
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio;
ALTER PUBLICATION supabase_realtime ADD TABLE public.visibility;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- 7. Create Storage Bucket for high-res project & product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('devtasoft-assets', 'devtasoft-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow public storage access" ON storage.objects;
CREATE POLICY "Allow public storage access" ON storage.objects
FOR ALL USING (bucket_id = 'devtasoft-assets') WITH CHECK (bucket_id = 'devtasoft-assets');
