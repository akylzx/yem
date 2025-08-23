-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, 
    email, 
    first_name, 
    last_name,
    display_name
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Trigger for profiles updated_at
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Function to log profile changes
create or replace function public.log_profile_changes()
returns trigger
language plpgsql
security definer
as $$
begin
  if TG_OP = 'UPDATE' then
    insert into public.audit_logs (
      user_id,
      action,
      resource_type,
      resource_id,
      old_values,
      new_values
    ) values (
      new.id,
      'profile_update',
      'profile',
      new.id::text,
      to_jsonb(old),
      to_jsonb(new)
    );
  end if;
  
  return coalesce(new, old);
end;
$$;

-- Trigger for profile audit logging
drop trigger if exists profile_audit_log on public.profiles;
create trigger profile_audit_log
  after update on public.profiles
  for each row
  execute function public.log_profile_changes();
