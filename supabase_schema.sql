-- ═══════════════════════════════════════════════════════════
-- LAKSHYA ACADEMY — SUPABASE DATABASE SCHEMA
-- Run this in Supabase Dashboard -> SQL Editor -> Run
-- ═══════════════════════════════════════════════════════════

-- 1. LTPE REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.ltpe_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_no TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    parent_email TEXT,
    current_class TEXT NOT NULL,
    school TEXT,
    city TEXT DEFAULT 'Mathura',
    gender TEXT,
    exam_center TEXT DEFAULT 'Lakshya Academy Campus, Krishna Nagar, Mathura',
    exam_date TEXT DEFAULT '11 October 2026',
    status TEXT DEFAULT 'CONFIRMED',
    score NUMERIC,
    rank INTEGER,
    scholarship TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. ENQUIRIES & LEADS TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_no TEXT UNIQUE DEFAULT gen_random_uuid()::text,
    student_name TEXT NOT NULL,
    parent_name TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    current_class TEXT,
    school TEXT,
    city TEXT DEFAULT 'Mathura',
    interested_course TEXT,
    lead_source TEXT DEFAULT 'WEBSITE',
    status TEXT DEFAULT 'NEW',
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    interested_in TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'GENERAL',
    is_active BOOLEAN DEFAULT true,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.ltpe_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- Allow Public Inserts (For Website Visitors registering or enquiring)
CREATE POLICY "Allow public insert to ltpe_registrations" 
    ON public.ltpe_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public read to ltpe_registrations" 
    ON public.ltpe_registrations FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public insert to enquiries" 
    ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public read to enquiries" 
    ON public.enquiries FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public insert to contact_submissions" 
    ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public read notices" 
    ON public.notices FOR SELECT TO anon, authenticated USING (true);

-- Allow full access for service_role / Admin
CREATE POLICY "Admin full access ltpe" 
    ON public.ltpe_registrations FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access enquiries" 
    ON public.enquiries FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access contact" 
    ON public.contact_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access notices" 
    ON public.notices FOR ALL TO service_role USING (true) WITH CHECK (true);
