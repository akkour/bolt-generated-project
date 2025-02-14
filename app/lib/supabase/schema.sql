-- Define the service_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Define the profiles table to include 'role' and 'email'
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL, -- Re-add email column, and make it unique
    role VARCHAR(50) NOT NULL, -- Role column
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Define the provider_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    bio TEXT,
    services_offered TEXT,
    hourly_rate DECIMAL,
    availability TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Define the service_requests table if it doesn't exist, enhancing it for job tracking
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
  service_category_id UUID NOT NULL REFERENCES public.service_categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL, -- Added job title
  description TEXT,             -- Added job description
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- Using VARCHAR for status for flexibility, consider ENUM in future
  scheduled_date DATE,          -- Added scheduled date
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optionally, add indexes for faster queries, especially if you plan to filter by status or provider_id frequently
CREATE INDEX IF NOT EXISTS idx_service_requests_client_id ON public.service_requests (client_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_provider_id ON public.service_requests (provider_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON public.service_requests (status);
