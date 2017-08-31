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
  created_on timestamp not null,
  status char(10)
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
('Ball', 'to play', 10, 2),
('Bowl', 'to cook', 20, 3);
