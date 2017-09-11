-- Execute only if this roles doesn't exist yet
create role  anon;
create role  api_user;
create role  api_manager;
create role  api_admin;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM anon;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM anon;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM api_user;
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM api_user;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM api_user;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM api_manager;
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM api_manager;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM api_manager;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM api_admin;
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM api_admin;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM api_admin;

-- This grants can be executed multiple times
grant SELECT on table public.categories, public.products, public.users to anon;
grant INSERT on table public.users to anon;
grant USAGE on sequence public.users_id_seq to anon;
grant execute on function login(text,text) to anon;

-- API USER
grant SELECT on table public.categories, public.products, public.users to api_user;
grant execute on function checkout(json) to api_user;

grant SELECT, INSERT on table public.orders, public.order_details to api_user;
grant USAGE on sequence public.orders_id_seq, public.order_details_id_seq to api_user;

-- API MANAGER
grant SELECT on table public.categories, public.products, public.users to api_manager;
grant update, insert on public.products to api_manager;
grant USAGE on sequence public.products_id_seq to api_manager;

-- API ADMIN
grant SELECT on table public.categories, public.products, public.users to api_admin;
grant update, insert, delete on public.products to api_admin;
grant USAGE on sequence public.products_id_seq to api_admin;
