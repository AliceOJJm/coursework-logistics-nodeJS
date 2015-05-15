/**
 * Created by acer on 10.05.2015.
 */
var Country = require('./country');
var City = require('./city');
var Operation = require('./operation');
var Vehicle = require('./vehicle');
var Product = require('./product');
var Firm = require('./firm');

function Transaction(type){
    this.type = type;
}

Transaction.prototype.recordOperation = function(params, results, additional, firm_id){
    Operation.create({type: this.type, parameters: params, results: results, additional: additional, firm_id: firm_id}, function (err) {
        if (err) return handleError(err);
    });
}

Transaction.prototype.transportationCosts = function(request, firm, send){
    Vehicle.find({}).sort('capacity').exec(function(err, vehicles) {
        var additional = "";
        var weight = parseFloat(request.dimensions.split(',')[0]);
        var volume = request.dimensions.split(',')[1];
        var counter;
        for(counter = 0; counter < vehicles.length; counter ++){
            if(vehicles[counter].capacity >= weight)
                break;
        }
        if(counter == vehicles.length){
            counter --;
            additional += "Для перевозки потребуется до " + ((weight/vehicles[counter].capacity).toFixed(0) + 1) + " вагонов."
        }
        Country.findOne({title: request.origin_country}, function(err, origin_country){
            Country.findOne({title: request.destination_country}, function(err, destination_country){
                var tax;
                if(vehicles[counter].type == 'railway'){
                    tax = (origin_country.railway_tax + destination_country.railway_tax)/2 + vehicles[counter].tax_addon;
                }
                else{
                    tax = (origin_country.tax + destination_country.tax)/2 + vehicles[counter].tax_addon;
                }
                var cost = (tax * weight * request.distance).toFixed(2);
                var params = " Тип груза: " + request.cargo_type + " Вес(кг): " + weight + " Объём(м3): " + volume + " Точка погрузки: " + origin_country.title + ", " + request.origin + " Точка отгрузки: " + destination_country.title + ", " + request.destination;
                var results = " Тип транспортного средства: " + vehicles[counter].title + " " + additional + " Примерная стоимость перевозки: " + cost + " Длина кратчайшего пути(км): " + request.distance;
                var t = new Transaction("transportation");
                t.recordOperation(params, results, request.additional, firm._id);
                var query = {};
                query['local.operations'] = firm.local.operations + 1;
                Firm.update({_id: firm._id}, query, function (err) {
                });
                var result = {vehicle: vehicles[counter], cost: cost, additional: additional};
                send(result);
            });
        });
    });
};

Transaction.prototype.totalCosts = function(request, firm, send) {
    var K = request.K;
    var Q = request.Q;
    var m = request.m;
    var p = request.p;
    var q = request.q;
    var S = request.S;
    var t = request.t;
    var d = request.d;
    var units = request.units;
    var stock_costs = K * Q / q + m * p * q / 2;
    var total_costs = S * Q +
        m * p * t * Q +
        stock_costs +
        m * p * d * Q;
    var stock_perc = stock_costs * 100 / total_costs;
    var params = "Годовой спрос: " + Q + " (" + units + ")" + "  Размер партии: " + q + " (" + units + ")" +
                 "  Цена единицы: " + p + "$/" + units + "  Доля затрат на хранение: " + m +
                 "  Тариф на перевозку: " + S + "$/" + units + "  Время в пути(в днях): " + t +
                 "  Постоянные завтраты: " + K + "$" + "  Длительность страхового завпаса(в днях): " + d;
    var results = "Общие логистические издержки составили " + total_costs.toFixed(2) + "$. Затраты на управление запасами - " + stock_costs.toFixed(2) + "$ (" + stock_perc.toFixed(2) + "%).";
    if (request.is_logged == 'true') {
        var t = new Transaction("total");
        t.recordOperation(params, results, request.additional, firm._id);
        var query = {};
        query['local.operations'] = firm.local.operations + 1;
        Firm.update({_id: firm._id}, query, function (err) {});
    }
    var result = {total_costs: total_costs.toFixed(2), stock_costs: stock_costs.toFixed(2), stock_perc: stock_perc.toFixed(2)};
    send(result);
};

Transaction.prototype.planningSupplies = function(request, firm, send) {
    var K = parseFloat(request.K);
    var Q = parseFloat(request.Q);
    var m = parseFloat(request.m);
    var p = parseFloat(request.p);
    var units = request.units;
    var q = Math.sqrt((2 * K * Q) / (m * p));
    var L = Math.sqrt((2 * K * Q * m * p));
    var params = "Годовой спрос: " + Q + " (" + units + ")" + "  Цена единицы: " + p + "$/" + units +
                 "  Доля затрат на хранение: " + m + "  Постоянные завтраты: " + K + "$";
    var results = "  Размер партии: " + q.toFixed(2) + " (" + units + ")" + " Затраты на управление запасами - " + L.toFixed(2) + "$";
    var results_html = 'Рекомендуемыый размер партии: ' + q.toFixed(2) + " (" + units + ")<br> Затраты на управление запасами: "  + L.toFixed(2) + "$<br>";
    if (request.order_point == "true" || request.order_dates == "true") {
        var T = parseFloat(request.T);
        var O = parseFloat(request.O);
        var d = parseFloat(request.d);
        var r = O * (T + d);
        params = params + "  Время в пути(в днях): " + T + "  Длительность страхового завпаса(в днях): " + d + " Дневное потребление: " + O + units + "/день";
        results = results + "  Точка заказа: " + r.toFixed(2) + " (" + units + ")";
        results_html = results_html + "  Точка заказа: " + r.toFixed(2) + " (" + units + ")<br>";
        if (request.order_dates == "true"){
            var I = parseFloat(request.I);
            params = params + "  Стартовый запас: " + I + units;
            var t1 = (I - r)/O;
            if(t1 < 0) t1 = 0;
            var I1 = I - (t1 + T) * O + q;
            var t2 = t1 + T + (I1 - r)/O;
            if(t2 < 0) t2 = 0;
            var I2 = I1 - (t2 - t1 + T) * O + q;
            var t3 = t2 + T +(I2 - r)/O;
            if(t3 < 0) t3 = 0;
            var date1 = getSupplyDate(t1);
            var date2 = getSupplyDate(t2);
            var date3 = getSupplyDate(t3);
            results = results + "  Первый заказ: " + date1 + "  Второй - " + date2 + "  Третий - " + date3;
            results_html = results_html + " <br>Интервал времени между заказами при условии соблюдения оптимальной партии поставки.<br> Первый заказ: " + date1 + "<br>  Второй - " + date2 + "<br>  Третий - " + date3 + "<br>";
        }
    }
    var t = new Transaction("planning");
    t.recordOperation(params, results, request.additional, firm._id);
    var query = {};
    query['local.operations'] = firm.local.operations + 1;
    Firm.update({_id: firm._id}, query, function (err) {});
    var result = {results_html: results_html};
    send(result);
};

function getSupplyDate(days){
    var date = new Date(Date.now() + days*24*3600*1000);
    var result = "";
    result += date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + "г.";
    return result;
};

module.exports = Transaction;