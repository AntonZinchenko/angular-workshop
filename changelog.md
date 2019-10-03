                                            Home Task 1
Создал проект shop. Изменил скрипт запуска в package.json

Запуск backend: npm run backend 
Запуск frontend: npm start

1. Модуль товаров
    Страницы:
        Список товаров (localhost:4200\products)
            Компоненты:
                ProductsListComponent - Список товаров
                ProductComponent - Краткое отображение позиции списка

        Страница детализации (localhost:4200\product\:id)
            Компоненты:
                ProductDetailsComponent - Страница с детальным описанием товара
    Сервисы:
        ProductsService - Источник данных для продуктов. Хранилище данных json-server db\db.json

2. Модуль корзины
    Страницы:
        Корзина (localhost:4200\charts)
            Компоненты:
                ShoppingCartComponent - Список товаров выбранных для заказа

3. Корневой модуль
    Страница не найдена
        Компонент PageNotFoundComponent
    Сервисы:
        ShoppingCartService - сквозной сервис для хранения пользовательского выбора
------------------------------------------------------------------------------------------------------