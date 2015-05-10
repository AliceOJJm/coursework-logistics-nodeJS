/**
 * Created by acer on 27.04.2015.
 */
var mongoose = require('mongoose');
var Country = require('../models/country');
var City = require('../models/city');
var Vehicle = require('../models/vehicle');
var Firm = require('../models/firm');
var Product = require('../models/product');

var db = mongoose.connection.db;
mongoose.connection.on('open', function (ref) {

    db.listCollections({name: 'countries'}).next(function(err, collinfo) {
            if (!collinfo) {
                var array = [{ title: 'Беларусь', tax: '0.05', railway_tax: '0.035' },
                    { title: 'Россия', tax: '0.025', railway_tax: '0.02'},
                    { title: 'Украина', tax: '0.05', railway_tax: '0.03' },
                    { title: 'Литва', tax: '0.075', railway_tax: '0.04' },
                    { title: 'Польша', tax: '0.085', railway_tax: '0.05' },
                    { title: 'Казахстан', tax: '0.05', railway_tax: '0.035' },
                    { title: 'Латвия', tax: '0.075', railway_tax: '0.038' }];
                Country.create(array, function (err) {
                    if (err) return handleError(err);
                });
            }
        }
    );

    db.listCollections({name: 'cities'}).next(function(err, collinfo) {
            if (!collinfo) {
            //TODO: Создать коллекцию городов по странам.
                Country.find(function(err, countries) {
                    for (var counter in countries) {
                        var id = countries[counter]._id;
                        if (countries[counter].title == "Беларусь") {
                            var array = [{title: 'Минск', country_id: id},
                                {title: 'Гродно', country_id: id},
                                {title: 'Гомель', country_id: id},
                                {title: 'Брест', country_id: id},
                                {title: 'Могилёв', country_id: id},
                                {title: 'Витебск', country_id: id},
                                {title: 'Бобруйск', country_id: id},
                                {title: 'Барановичи', country_id: id},
                                {title: 'Борисов', country_id: id},
                                {title: 'Пинск', country_id: id},
                                {title: 'Мозырь', country_id: id},
                                {title: 'Орша', country_id: id}];
                        }
                        else if (countries[counter].title == "Россия") {
                            var array = [{title: 'Москва', country_id: id},
                                {title: 'Санкт-Петербург', country_id: id},
                                {title: 'Новосибирск', country_id: id},
                                {title: 'Екатеринбург', country_id: id},
                                {title: 'Нижний Новгород', country_id: id},
                                {title: 'Казань', country_id: id},
                                {title: 'Самара', country_id: id},
                                {title: 'Челябинск', country_id: id},
                                {title: 'Омск', country_id: id},
                                {title: 'Ростов-на-Дону', country_id: id}];
                        }
                        else if (countries[counter].title == "Украина") {
                            var array = [{title: 'Киев', country_id: id},
                                {title: 'Харьков', country_id: id},
                                {title: 'Одесса', country_id: id},
                                {title: 'Днепропетровск', country_id: id},
                                {title: 'Донецк', country_id: id},
                                {title: 'Запорожье', country_id: id},
                                {title: 'Львов', country_id: id},
                                {title: 'Кривой Рог', country_id: id},
                                {title: 'Николаев', country_id: id},
                                {title: 'Мариуполь', country_id: id}];
                        }
                        else if (countries[counter].title == "Литва") {
                            var array = [{title: 'Вильнюс', country_id: id},
                                {title: 'Каунас', country_id: id},
                                {title: 'Паланга', country_id: id},
                                {title: 'Клайпеда', country_id: id},
                                {title: 'Неринга', country_id: id},
                                {title: 'Бирштонас', country_id: id},
                                {title: 'Друскининкай', country_id: id},
                                {title: 'Паневежис', country_id: id},
                                {title: 'Шяуляй', country_id: id},
                                {title: 'Тракай', country_id: id}];
                        }
                        else if (countries[counter].title == "Латвия") {
                            var array = [{title: 'Вентспилс', country_id: id},
                                {title: 'Резекне', country_id: id},
                                {title: 'Юрмала', country_id: id},
                                {title: 'Рига', country_id: id},
                                {title: 'Даугавпилс', country_id: id},
                                {title: 'Лиепая', country_id: id},
                                {title: 'Елгава', country_id: id},
                                {title: 'Валмиера', country_id: id},
                                {title: 'Екабпилс', country_id: id}];
                        }
                        else if (countries[counter].title == "Казахстан") {
                            var array = [{title: 'Алматы', country_id: id},
                                {title: 'Караганда', country_id: id},
                                {title: 'Шымкент', country_id: id},
                                {title: 'Павлодар', country_id: id},
                                {title: 'Усть-Каменогорск', country_id: id},
                                {title: 'Шымкент', country_id: id},
                                {title: 'Актобе', country_id: id},
                                {title: 'Тараз', country_id: id},
                                {title: 'Семей', country_id: id}];
                        }
                        else if (countries[counter].title == "Польша") {
                            var array = [{title: 'Варшава', country_id: id},
                                {title: 'Краков', country_id: id},
                                {title: 'Лодзь', country_id: id},
                                {title: 'Познань', country_id: id},
                                {title: 'Гданьск', country_id: id},
                                {title: 'Щетин', country_id: id},
                                {title: 'Белосток', country_id: id},
                                {title: 'Люблин', country_id: id},
                                {title: 'Катовице', country_id: id}];
                        }
                        City.create(array, function (err) {
                        });
                    }
              });
            }
        });

    db.listCollections({name: 'vehicles'}).next(function(err, collinfo) {
            if (!collinfo) {
                var array = [{type: "железнодорожный", title: "грузовой (контейнерный) поезд", capacity: 30, cargo_volume: 38, cargo_type: "универсальные", tax_addon: 0.01, additional: "Контейнерный поезд подходит для перевозки крупногабаритных и крупнотоннажных грузов большими партиями."},
                             {type: "автомобильный", title: "фура(тент)", capacity: 20, cargo_volume: 82, cargo_type: "универсальные", tax_addon: 0.02, additional: "Данный тип транспорта самый широко используемый в международных грузоперевозках. Тентованный полуприцеп можно загружать грузы на паллетах, груз в бочках, грузы в ящиках, бигбегах, кеги для перевозки пива, перевозки грузов в кипах, прессованные материалы разных составов."}
                ];
                Vehicle.create(array, function (err) {
                    if (err) return handleError(err);
                });
            }
        }
    );

    db.listCollections({name: 'products'}).next(function(err, collinfo) {
            if (!collinfo) {
                var array = [{type: "универсальные", title: "Автошины"},
                             {type: "хрупкие", title: "Алкогольные напитки"},
                             {type: "хрупкие", title: "Безалкогольные напитки"},
                             {type: "универсальные", title: "Бумага"},
                             {type: "универсальные", title: "Бытовая техника"},
                             {type: "универсальные", title: "Бытовая химия"},
                             {type: "универсальные", title: "Доски"},
                             {type: "универсальные", title: "Древесина"},
                             {type: "навалочные", title: "Древесный уголь"},
                             {type: "насыпные", title: "Зерно и семена"},
                             {type: "универсальные", title: "Изделия из кожи"},
                             {type: "универсальные", title: "Изделия из металла"},
                             {type: "универсальные", title: "Изделия из резины"},
                             {type: "универсальные", title: "Кабель"},
                             {type: "хрупкие", title: "Канц. товары"},
                             {type: "навалочные", title: "Кирпич"},
                             {type: "универсальные", title: "Ковры"},
                             {type: "хрупкие", title: "Компьютеры"},
                             {type: "прод. питания", title: "Кондитерские изделия"},
                             {type: "универсальные", title: "Макулатура"},
                             {type: "универсальные", title: "Мебель"},
                             {type: "очень хрупкие", title: "Медикаменты"},
                             {type: "универсальные", title: "Металл"},
                             {type: "навалочные", title: "Металлолом"},
                             {type: "прод. питания", title: "Молоко сухое"},
                             {type: "прод. питания", title: "Мороженое"},
                             {type: "прод. питания", title: "Мука"},
                             {type: "наливные", title: "Нефтепродукты", dangerous: true},
                             {type: "универсальные", title: "Обувь/одежда"},
                             {type: "универсальные", title: "Овощи"},
                             {type: "хрупкие", title: "Парфюмерия и косметика"},
                             {type: "универсальные", title: "Пенопласт"},
                             {type: "универсальные", title: "Пластик"},
                             {type: "универсальные", title: "Поддоны"},
                             {type: "прод. питания", title: "Продукты питания"},
                             {type: "насыпные", title: "Сахар"},
                             {type: "очень хрупкие", title: "Стекло и фарфор"},
                             {type: "универсальные", title: "Табачные изделия"},
                             {type: "универсальные", title: "Транспортные средства"},
                             {type: "наливные", title: "Хим. продукты", dangerous: true},
                             {type: "наливные", title: "Хим. продукты неопасные"},
                             {type: "универсальные", title: "Хозтовары"},
                             {type: "насыпные", title: "Цемент"},
                             {type: "хрупкие", title: "Электроника"},
                             {type: "универсальные", title: "Другие грузы"}
                ];
                Product.create(array, function (err) {
                    if (err) return handleError(err);
                });
            }
        }
    );
});