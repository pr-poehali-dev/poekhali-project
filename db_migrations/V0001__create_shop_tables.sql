CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  old_price INTEGER,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_sizes (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  size VARCHAR(10) NOT NULL
);

CREATE TABLE product_colors (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  color VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  total_price INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  size VARCHAR(10),
  color VARCHAR(50),
  price INTEGER NOT NULL
);

INSERT INTO products (name, price, old_price, image_url, category) VALUES
('Классическая футболка', 2990, 3990, 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/4f1b5251-c221-4674-bdcb-66ffc9e006cb.jpg', 'tops'),
('Худи с капюшоном', 5990, NULL, 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/ce7e66a9-757d-4fea-be56-50dcaa5a0bca.jpg', 'tops'),
('Пальто оверсайз', 12990, NULL, 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/d25ea0ea-89bb-4040-b216-de88e30e7fea.jpg', 'outerwear'),
('Базовая футболка', 1990, NULL, 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/4f1b5251-c221-4674-bdcb-66ffc9e006cb.jpg', 'tops'),
('Спортивное худи', 4990, 6990, 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/ce7e66a9-757d-4fea-be56-50dcaa5a0bca.jpg', 'tops'),
('Классическое пальто', 15990, NULL, 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/d25ea0ea-89bb-4040-b216-de88e30e7fea.jpg', 'outerwear');

INSERT INTO product_sizes (product_id, size) VALUES
(1, 'XS'), (1, 'S'), (1, 'M'), (1, 'L'), (1, 'XL'),
(2, 'S'), (2, 'M'), (2, 'L'), (2, 'XL'),
(3, 'S'), (3, 'M'), (3, 'L'),
(4, 'XS'), (4, 'S'), (4, 'M'), (4, 'L'), (4, 'XL'), (4, 'XXL'),
(5, 'M'), (5, 'L'), (5, 'XL'),
(6, 'S'), (6, 'M'), (6, 'L'), (6, 'XL');

INSERT INTO product_colors (product_id, color) VALUES
(1, 'Черный'), (1, 'Белый'), (1, 'Серый'),
(2, 'Серый'), (2, 'Черный'), (2, 'Синий'),
(3, 'Бежевый'), (3, 'Черный'), (3, 'Серый'),
(4, 'Белый'), (4, 'Черный'), (4, 'Серый'), (4, 'Бежевый'),
(5, 'Черный'), (5, 'Серый'),
(6, 'Бежевый'), (6, 'Черный');