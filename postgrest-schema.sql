CREATE TYPE role AS ENUM ('user', 'manager', 'admin');

CREATE TABLE users (
  id serial primary key,
  email varchar(100)  check ( email ~* '^.+@.+\..+$' ),
  role role not null,
  password text not null check (length(password) < 512),
  first_name varchar(100) null,
  last_name varchar(100) null,
  phone varchar(100) null,
  unique(email)
);

CREATE TABLE categories (
  id serial primary key,
  name varchar(50) not null,
  unique(name)
);

CREATE TABLE products (
  id serial primary key,
  name varchar(50) not null,
  description text,
  price numeric(10,2) not null,
  category_id integer,
  CONSTRAINT category_id FOREIGN KEY (category_id)
    references categories (id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE orders (
  id serial primary key,
  user_id integer,
  created_on timestamp not null,
  status char(10),
  CONSTRAINT user_id FOREIGN KEY (user_id)
    references users (id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE order_details(
  id serial primary key,
  order_id integer,
  product_id integer,
  qty integer not null,
  price numeric(10,2) not null,
  unique (order_id, product_id),
  CONSTRAINT order_id FOREIGN KEY (order_id)
    references orders (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT product_id FOREIGN KEY (product_id)
    references products (id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- seed some data

INSERT INTO categories(name) values ('Technology'),
('Sports'),
('Kitchen');

INSERT INTO products(name, description, price, category_id) values
('Nexus 4', 'Smartphone', 100, 1),
('Nexus 5', 'Smartphone', 200, 1),
('Nexus 6', 'Smartphone', 300, 1),
('Nexus 6p', 'Smartphone', 400, 1),
('Pixel', 'Smartphone', 500, 1),
('Pixel 2', 'Smartphone', 600, 1),
('Nexus 4', 'Smartphone', 700, 1),
('Ball', 'to play', 10, 2),
('Paddle', 'to rowl', 20, 2),
('Stopwatch', 'to time', 30, 2),
('Towel', 'to dry', 40, 2),
('Pants', 'to wear', 50, 2),
('Knee Compression Sleeve', 'Lightweight', 60, 2),
('Leggins', 'to wear', 70, 2),
('Bowl', 'to cook', 20, 3),
('Espresso Machine', 'to coffee', 21, 3),
('Drip Coffee', 'to cook', 23, 3),
('Food Saver', 'to cook', 22, 3),
('Lunch Storage', 'to cook', 24, 3),
('Bake', 'to cook', 25, 3),
('Plastic Party Cups', 'to cook', 26, 3),
('Candles', 'to cook', 27, 3);

-- functions to create jwt tokens

CREATE EXTENSION pgcrypto;

CREATE OR REPLACE FUNCTION url_encode(data bytea) RETURNS text LANGUAGE sql AS $$
    SELECT translate(encode(data, 'base64'), E'+/=\n', '-_');
$$;


CREATE OR REPLACE FUNCTION url_decode(data text) RETURNS bytea LANGUAGE sql AS $$
WITH t AS (SELECT translate(data, '-_', '+/') AS trans),
     rem AS (SELECT length(t.trans) % 4 AS remainder FROM t) -- compute padding size
    SELECT decode(
        t.trans ||
        CASE WHEN rem.remainder > 0
           THEN repeat('=', (4 - rem.remainder))
           ELSE '' END,
    'base64') FROM t, rem;
$$;


CREATE OR REPLACE FUNCTION algorithm_sign(signables text, secret text, algorithm text)
RETURNS text LANGUAGE sql AS $$
WITH
  alg AS (
    SELECT CASE
      WHEN algorithm = 'HS256' THEN 'sha256'
      WHEN algorithm = 'HS384' THEN 'sha384'
      WHEN algorithm = 'HS512' THEN 'sha512'
      ELSE '' END AS id)  -- hmac throws error
SELECT url_encode(hmac(signables, secret, alg.id)) FROM alg;
$$;


CREATE OR REPLACE FUNCTION sign(payload json, secret text, algorithm text DEFAULT 'HS256')
RETURNS text LANGUAGE sql AS $$
WITH
  header AS (
    SELECT url_encode(convert_to('{"alg":"' || algorithm || '","typ":"JWT"}', 'utf8')) AS data
    ),
  payload AS (
    SELECT url_encode(convert_to(payload::text, 'utf8')) AS data
    ),
  signables AS (
    SELECT header.data || '.' || payload.data AS data FROM header, payload
    )
SELECT
    signables.data || '.' ||
    algorithm_sign(signables.data, secret, algorithm) FROM signables;
$$;


CREATE OR REPLACE FUNCTION verify(token text, secret text, algorithm text DEFAULT 'HS256')
RETURNS table(header json, payload json, valid boolean) LANGUAGE sql AS $$
  SELECT
    convert_from(url_decode(r[1]), 'utf8')::json AS header,
    convert_from(url_decode(r[2]), 'utf8')::json AS payload,
    r[3] = algorithm_sign(r[1] || '.' || r[2], secret, algorithm) AS valid
  FROM regexp_split_to_array(token, '\.') r;
$$;

-- Authentication

create or replace function
encrypt_pass() returns trigger
  language plpgsql
  as $$
begin
  if tg_op = 'INSERT' or new.password <> old.password then
    new.password = crypt(new.password, gen_salt('bf'));
  end if;
  return new;
end
$$;

drop trigger if exists encrypt_pass on users;
create trigger encrypt_pass
  before insert or update on users
  for each row
  execute procedure encrypt_pass();

create or replace function
 user_role(email text, pass text) returns name
   language plpgsql
   as $$
 begin
   return (
   select role from users
    where users.email = user_role.email
      and users.password = crypt(user_role.pass, users.password)
   );
 end;
 $$;

CREATE TYPE jwt_token AS (
   token text,
   role text,
   email text
 );

create or replace function
login(email text, pass text) returns jwt_token
  language plpgsql
  as $$
declare
  _role name;
  result jwt_token;
begin
  -- check email and password
  select user_role(email, pass) into _role;
  if _role is null then
    raise invalid_password using message = 'invalid user or password';
  end if;

  select sign(
      row_to_json(r), 'this-is-a-hardcoded-secret'
    ) as token, r.role, r.email
    from (
      select 'api_' || _role as role, login.email as email,
         extract(epoch from now())::integer + 60*60 as exp
    ) r
    into result;
  return result;
end;
$$;

-- seed some users
INSERT INTO users (email, role, password)
VALUES ( 'user@gmail.com', 'user', 'user'),
 ( 'manager@gmail.com', 'manager', 'manager'),
 ( 'admin@gmail.com', 'admin', 'admin');


create or replace function
checkout(products json) returns orders
  language plpgsql
  as $$
declare
  _email varchar(100);
  result orders;
  i json;
begin
  SELECT current_setting('request.jwt.claim.email') INTO _email;

  insert into orders (user_id, created_on, status) 
  select id, CURRENT_TIMESTAMP, 'ordered' from users where email = _email
  returning * into result;
  
  FOR i IN SELECT * FROM json_array_elements(products)
  LOOP
    insert into order_details(order_id,  product_id, qty, price )
    values (result.id, (i->>'id')::integer, (i->>'quantity')::integer, (i->>'price')::numeric);
  END LOOP;
  
  return result;
end;
$$;
