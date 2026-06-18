-- HeritageLoom Supabase SQL Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Categories Table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price numeric not null default 0,
  images text[] not null default '{}',
  category_id uuid references public.categories(id),
  material text,
  stock integer not null default 0,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Users Table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  status text not null default 'pending', -- pending, paid, shipped, delivered, cancelled
  total_amount numeric not null,
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Order Items Table
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  quantity integer not null,
  price_at_time numeric not null
);

-- Setup Row Level Security (RLS)

-- Products & Categories are viewable by everyone
alter table public.categories enable row level security;
alter table public.products enable row level security;

create policy "Categories are viewable by everyone." on public.categories for select using (true);
create policy "Products are viewable by everyone." on public.products for select using (true);

-- Profiles are viewable/editable by the user who owns them
alter table public.profiles enable row level security;
create policy "Users can view their own profile." on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile." on public.profiles for update using (auth.uid() = id);

-- Orders are viewable by the user who created them
alter table public.orders enable row level security;
create policy "Users can view their own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders." on public.orders for insert with check (auth.uid() = user_id);

-- Order Items are viewable if the order belongs to the user
alter table public.order_items enable row level security;
create policy "Users can view their own order items." on public.order_items for select using (
  exists (select 1 from public.orders where public.orders.id = public.order_items.order_id and public.orders.user_id = auth.uid())
);
create policy "Users can insert their own order items." on public.order_items for insert with check (
  exists (select 1 from public.orders where public.orders.id = public.order_items.order_id and public.orders.user_id = auth.uid())
);
