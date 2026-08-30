-- Table for storing customer inquiries & contact messages in Supabase
create table if not exists public.inquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  product_name text,
  source text default 'contact_form', -- contact_form, product_page, cart_checkout, whatsapp_click
  status text default 'new', -- new, contacted, resolved
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- Policies: Anyone can submit an inquiry, everyone / authenticated admin can view inquiries
create policy "Inquiries are viewable by everyone." on public.inquiries for select using (true);
create policy "Anyone can submit an inquiry." on public.inquiries for insert with check (true);
create policy "Authenticated users can update inquiries." on public.inquiries for update using (true);
create policy "Authenticated users can delete inquiries." on public.inquiries for delete using (true);
