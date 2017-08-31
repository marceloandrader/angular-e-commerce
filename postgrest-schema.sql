CREATE TABLE categories (
  id serial primary key,
  name varchar(50) not null
);

CREATE TABLE products (
  id serial primary key,
  name varchar(50) not null,
  description text,
  price numeric(10,2) not null,
  category_id integer references categories (id)
);

CREATE TABLE product_pictures (
  id serial primary key,
  url text not null,
  product_id integer references products (id)
);

CREATE TABLE orders (
  id serial primary key,
  created_on timestamp not null,
  status char(10)
);

CREATE TABLE order_details(
  id serial primary key,
  order_id integer references orders (id),
  product_id integer references products (id),
  qty integer not null,
  price numeric(10,2) not null,
  unique (order_id, product_id)
);

-- seed some data
INSERT INTO categories(name) values ('Technology'), ('Sports'), ('Kitchen');

INSERT INTO products(name, description, price, category_id) values
('Nexus 4', 'Smartphone', 100, 1),
('Ball', 'to play', 10, 2),
('Bowl', 'to cook', 20, 3);
