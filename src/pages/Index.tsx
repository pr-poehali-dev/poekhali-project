import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  sizes: string[];
  colors: string[];
  category: string;
};

type CartItem = Product & { quantity: number; selectedSize: string; selectedColor: string };

const products: Product[] = [
  {
    id: 1,
    name: 'Классическая футболка',
    price: 2990,
    oldPrice: 3990,
    image: 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/4f1b5251-c221-4674-bdcb-66ffc9e006cb.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Белый', 'Серый'],
    category: 'tops'
  },
  {
    id: 2,
    name: 'Худи с капюшоном',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/ce7e66a9-757d-4fea-be56-50dcaa5a0bca.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Серый', 'Черный', 'Синий'],
    category: 'tops'
  },
  {
    id: 3,
    name: 'Пальто оверсайз',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/d25ea0ea-89bb-4040-b216-de88e30e7fea.jpg',
    sizes: ['S', 'M', 'L'],
    colors: ['Бежевый', 'Черный', 'Серый'],
    category: 'outerwear'
  },
  {
    id: 4,
    name: 'Базовая футболка',
    price: 1990,
    image: 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/4f1b5251-c221-4674-bdcb-66ffc9e006cb.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Белый', 'Черный', 'Серый', 'Бежевый'],
    category: 'tops'
  },
  {
    id: 5,
    name: 'Спортивное худи',
    price: 4990,
    oldPrice: 6990,
    image: 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/ce7e66a9-757d-4fea-be56-50dcaa5a0bca.jpg',
    sizes: ['M', 'L', 'XL'],
    colors: ['Черный', 'Серый'],
    category: 'tops'
  },
  {
    id: 6,
    name: 'Классическое пальто',
    price: 15990,
    image: 'https://cdn.poehali.dev/projects/0723b6eb-ac45-4bda-9869-41f7d51c014a/files/d25ea0ea-89bb-4040-b216-de88e30e7fea.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Бежевый', 'Черный'],
    category: 'outerwear'
  }
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'payment' | 'reviews' | 'delivery'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = ['Черный', 'Белый', 'Серый', 'Бежевый', 'Синий'];

  const filteredProducts = products.filter(product => {
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const colorMatch = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
    return sizeMatch && colorMatch;
  });

  const addToCart = (product: Product) => {
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    const existingItem = cart.find(item => 
      item.id === product.id && 
      item.selectedSize === defaultSize && 
      item.selectedColor === defaultColor
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.selectedSize === defaultSize && item.selectedColor === defaultColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: defaultSize, selectedColor: defaultColor }]);
    }
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id, size, color);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">ONLE STORE</h1>
            
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  currentPage === 'home' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setCurrentPage('catalog')}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  currentPage === 'catalog' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setCurrentPage('payment')}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  currentPage === 'payment' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
                }`}
              >
                Оплата
              </button>
              <button
                onClick={() => setCurrentPage('reviews')}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  currentPage === 'reviews' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
                }`}
              >
                Отзывы
              </button>
              <button
                onClick={() => setCurrentPage('delivery')}
                className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                  currentPage === 'delivery' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500'
                }`}
              >
                Доставка
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Icon name="Search" size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Icon name="Heart" size={20} />
              </button>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 py-4 border-b">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                            <div className="flex-1">
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {item.selectedSize} / {item.selectedColor}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{item.price} ₽</p>
                              <button
                                onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                className="text-xs text-gray-500 hover:text-black mt-2"
                              >
                                Удалить
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-medium">Итого:</span>
                            <span className="text-2xl font-bold">{totalPrice} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentPage === 'home' && (
          <>
            <section className="relative h-[70vh] bg-gray-100 flex items-center justify-center">
              <div className="text-center max-w-2xl px-4">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                  Минималистичный<br />стиль жизни
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Одежда и аксессуары для тех, кто ценит качество и простоту
                </p>
                <Button
                  size="lg"
                  onClick={() => setCurrentPage('catalog')}
                  className="px-8"
                >
                  Смотреть каталог
                </Button>
              </div>
            </section>

            <section className="container mx-auto px-4 py-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Популярные товары</h2>
                <button
                  onClick={() => setCurrentPage('catalog')}
                  className="text-sm font-medium hover:underline"
                >
                  Посмотреть все
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-0 shadow-none">
                    <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">{product.price} ₽</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.oldPrice} ₽</span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      Добавить в корзину
                    </Button>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-gray-50 py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                      <Icon name="Truck" size={32} className="text-white" />
                    </div>
                    <h3 className="font-medium mb-2">Быстрая доставка</h3>
                    <p className="text-sm text-gray-600">По всей России от 1 дня</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                      <Icon name="RotateCcw" size={32} className="text-white" />
                    </div>
                    <h3 className="font-medium mb-2">Легкий возврат</h3>
                    <p className="text-sm text-gray-600">30 дней на возврат товара</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                      <Icon name="Shield" size={32} className="text-white" />
                    </div>
                    <h3 className="font-medium mb-2">Гарантия качества</h3>
                    <p className="text-sm text-gray-600">Проверка перед отправкой</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === 'catalog' && (
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold mb-8">Каталог</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <aside className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Размер</h3>
                  <div className="space-y-2">
                    {allSizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <Checkbox
                          id={`size-${size}`}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => toggleSize(size)}
                        />
                        <label
                          htmlFor={`size-${size}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Цвет</h3>
                  <div className="space-y-2">
                    {allColors.map((color) => (
                      <div key={color} className="flex items-center">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleColor(color)}
                        />
                        <label
                          htmlFor={`color-${color}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSizes([]);
                      setSelectedColors([]);
                    }}
                    className="w-full"
                  >
                    Сбросить фильтры
                  </Button>
                )}
              </aside>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="group overflow-hidden border-0 shadow-none">
                      <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold">{product.price} ₽</span>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">{product.oldPrice} ₽</span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => addToCart(product)}
                      >
                        Добавить в корзину
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'payment' && (
          <section className="container mx-auto px-4 py-8 max-w-2xl">
            <h2 className="text-4xl font-bold mb-8">Оплата</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Icon name="CreditCard" size={20} />
                  Банковские карты
                </h3>
                <p className="text-sm text-gray-600">
                  Принимаем карты Visa, Mastercard и МИР. Оплата проходит через защищенное соединение.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Icon name="Smartphone" size={20} />
                  СБП
                </h3>
                <p className="text-sm text-gray-600">
                  Быстрая оплата по номеру телефона через Систему быстрых платежей.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Icon name="Package" size={20} />
                  При получении
                </h3>
                <p className="text-sm text-gray-600">
                  Оплата наличными или картой курьеру при получении заказа.
                </p>
              </Card>
            </div>
          </section>
        )}

        {currentPage === 'reviews' && (
          <section className="container mx-auto px-4 py-8 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Отзывы покупателей</h2>
            <div className="space-y-6">
              {[
                { name: 'Анна М.', rating: 5, text: 'Отличное качество! Футболка села идеально, ткань приятная к телу. Буду заказывать еще.' },
                { name: 'Дмитрий К.', rating: 5, text: 'Быстрая доставка, товар соответствует описанию. Худи очень теплое и стильное.' },
                { name: 'Елена С.', rating: 4, text: 'Пальто супер! Единственное - размер немного маломерит, стоит брать на размер больше.' }
              ].map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">{review.name}</h3>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="fill-black" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {currentPage === 'delivery' && (
          <section className="container mx-auto px-4 py-8 max-w-2xl">
            <h2 className="text-4xl font-bold mb-8">Доставка</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Icon name="Truck" size={20} />
                  Курьерская доставка
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Москва и Санкт-Петербург - 1-2 дня, бесплатно от 3000 ₽
                </p>
                <p className="text-sm text-gray-600">
                  Другие города России - 3-7 дней, от 300 ₽
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  Пункты выдачи
                </h3>
                <p className="text-sm text-gray-600">
                  Более 5000 пунктов выдачи по всей России. Срок доставки 2-5 дней, от 200 ₽
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Icon name="Mail" size={20} />
                  Почта России
                </h3>
                <p className="text-sm text-gray-600">
                  Доставка в любой населенный пункт. Срок доставки 7-14 дней, от 250 ₽
                </p>
              </Card>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ONLINE STORE</h3>
              <p className="text-sm text-gray-400">
                Минималистичная одежда для современного человека
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentPage('delivery')}>Доставка</button></li>
                <li><button onClick={() => setCurrentPage('payment')}>Оплата</button></li>
                <li><a href="#">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#">О нас</a></li>
                <li><button onClick={() => setCurrentPage('reviews')}>Отзывы</button></li>
                <li><a href="#">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@onlinestore.ru</li>
                <li>+7 (999) 123-45-67</li>
                <li>Пн-Вс: 9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Online Store. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;