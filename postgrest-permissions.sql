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
grant SELECT on table public.categories, public.products to anon;
