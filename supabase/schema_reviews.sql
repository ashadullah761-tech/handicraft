-- Table for storing customer reviews in Supabase
create table if not exists public.reviews (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  city text,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.reviews enable row level security;

-- Policies for public access (Read all reviews, Insert new review)
create policy "Reviews are viewable by everyone." on public.reviews for select using (true);
create policy "Anyone can submit a review." on public.reviews for insert with check (true);
