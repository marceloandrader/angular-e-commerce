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
