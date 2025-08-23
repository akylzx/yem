-- Create password reset tokens table
create table if not exists public.password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  token text unique not null,
  expires_at timestamp with time zone not null,
  used boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.password_reset_tokens enable row level security;

-- Only system can manage password reset tokens
create policy "password_reset_tokens_system_only"
  on public.password_reset_tokens for all
  using (false); -- Will be handled by functions with service role
