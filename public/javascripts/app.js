/**
 * Created by acer on 27.04.2015.
 */

$( document ).ready(function() {

    $("#order_p").fadeToggle(0);
    $("#order_d").fadeOut(0);
    $("#firms_table").DataTable( {
        "language": {
            "lengthMenu": "Показывать _MENU_ записей на странице",
            "zeroRecords": "Ничего не найдено",
            "info": "Отображается _PAGE_ из _PAGES_ страниц",
            "infoEmpty": "Нет записей",
            "infoFiltered": "(отобрано из _MAX_ записей)",
            "emptyTable":     "Нет записей",
            "infoPostFix":    "",
            "thousands":      ",",
            "loadingRecords": "Загрузка...",
            "processing":     "Обработка...",
            "search":         "Поиск:",
            "paginate": {
                "first":      "Первая",
                "last":       "Последняя",
                "next":       "Следующая",
                "previous":   "Предыдущая"
            },
            "aria": {
                "sortAscending":  ": отсортировать колонку по возрастанию",
                "sortDescending": ": отсортировать колонку по убыванию"
            }
        }
    });
    $( ".size_circle" ).mouseover(function() {
        $( this ).animate({"height": "220px", "width": "220px", "margin-left": "17%"}, 300);
    });

    $( ".size_circle" ).mouseout(function() {
        $( this ).animate({"height": "200px", "width": "200px", "margin-left": "20%"}, 100);
    });

    $.fn.editable.defaults.ajaxOptions = {type: "PUT"};

    $('.Ctype').editable({
        source: [
            {value: 'универсальные', text: 'универсальные'},
            {value: 'хрупкие', text: 'хрупкие'},
            {value: 'очень хрупкие', text: 'очень хрупкие'},
            {value: 'навалочные', text: 'навалочные'},
            {value: 'наливные', text: 'наливные'},
            {value: 'хрупкие', text: 'хрупкие'},
            {value: 'прод. питания', text: 'прод. питания'}
        ]
    });

    $('.Ctitle').editable('option', 'source', function(){
        if(/^$|^\s+/.test($.trim(value))) {
            return 'Обязательное поле';
        }
    });

    $('.Cdangerous').editable({
            source: [
                {value: true, text: 'опасен'},
                {value: false, text: 'безопасен'}
            ]
        }
    );

    $('.type').editable({
        source: [
            {value: 'автомобильный', text: 'автомобильный'},
            {value: 'железнодорожный', text: 'железнодорожный'}
        ]
    });

    $('.cargo_type').editable('option', 'source', function(){
        (require('../../models/product')).find('title', function(err, array){
           return [{value: 'автомобильный', text: 'автомобильный'}];
        });
     });

    $('.title').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.firm_title').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.firm_line').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.firm_proxy').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.firm_phone').editable('option','validate', function(value) {
            if(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test($.trim(value))) {
                return 'Введите номер телефона';
            }
        }
    );

    $('.firm_email').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.firm_address').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.firm_fax').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.firm_description').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.capacity').editable('option','validate', function(value) {
            if(!(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test($.trim(value)))) {
                return 'Введите число';
            }
        }
    );
    $('.cargo_volume').editable('option','validate', function(value) {
            if(!(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test($.trim(value)))) {
                return 'Введите число';
            }
        }
    );
    $('.additional').editable();
    $('.tax_addon').editable('option','validate', function(value) {
            if(!(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test($.trim(value)))) {
                return 'Введите число';
            }
        }
    );

    $( "#units").on('change',function() {
        $("i").text($("#units").val());
    });

    $('#total_costs').validate({
        errorClass: "error-class",
        rules: {
            Q: {number: true},
            S: {number: true},
            p: {number: true},
            m: {number: true},
            q: {number: true},
            t: {number: true},
            d: {number: true},
            k: {number: true}
        }
    });

    $('#addVehicle').validate({
        errorClass: "error-class",
        rules: {
            capacity     : {number: true},
            cargo_volume : {number: true},
            tax_addon    : {number: true}
        }
    });

    $('#planning').validate({
        errorClass: "error-class",
        rules: {
            Q: {number: true},
            p: {number: true},
            m: {number: true},
            d: {number: true},
            T: {number: true},
            O: {number: true},
            I: {number: true},
            k: {number: true}
        }
    });

    $('#login_form').validate({
        errorClass: "error-class"
    });

    $("#submit_total_costs").on('click', function() {
        if ($('#total_costs').valid()) {
            var S = parseInt($("#S").val());
            var Q = parseInt($("#Q").val());
            var m = parseInt($("#m").val()) / 100;
            var p = parseInt($("#p").val());
            var t = parseInt($("#t").val());
            var K = parseInt($("#K").val());
            var d = parseInt($("#d").val());
            var q = parseInt($("#q").val());
            var units = $("#units").val();
            var stock_costs = K * Q / q + m * p * q / 2;
            var total_costs = S * Q +
                               m * p * t * Q +
                               stock_costs +
                               m * p * d * Q;
            var stock_perc = stock_costs * 100/total_costs;
            $("#total_part").text("= " + total_costs.toFixed(2) + "$");
            $("#result_total_costs").removeClass("disp");
            $("#stock_part").html("Из этой суммы <b>&nbsp;" + stock_costs.toFixed(2) + "$&nbsp;</b> - затраты на управление запасами.<br> Что составляет <b>" + stock_perc.toFixed(2) + "%</b> от всех затрат.");
            $("#result_total_costs_part").removeClass("disp");
            if($("#firm").val() == "true") {
                var params = "Годовой спрос: " + Q + " (" + units + ")" + "  Размер партии: " + q + " (" + units + ")" +
                    "  Цена единицы: " + p + "$/" + units + "  Доля затрат на хранение: " + m +
                    "  Тариф на перевозку: " + S + "$/" + units + "  Время в пути(в днях): " + t +
                    "  Постоянные завтраты: " + K + "$" + "  Длительность страхового завпаса(в днях): " + d;
                var results = "Общие логистические издержки составили " + total_costs.toFixed(2) + "$. Затраты на управление запасами - " + stock_costs.toFixed(2) + "$ (" + stock_perc.toFixed(2) + "%).";
                var parameters = {additional: $("#description").val(), params: params, results: results};
                $.post('/total_costs', parameters, function (data) {});
            }
            else{
                $("#invintation").removeClass("disp");
            }
        }
    });

    $( "#origin_country").on('change',function() {
        $('select[name=origin_city]').hide();
        $('#'+ $("#origin_country option:selected").text()).show();
    });
    $( "#destination_country").on('change',function() {
        $('select[name=destination_city]').hide();
        $('#d_'+ $("#destination_country option:selected").text()).show();
    });
    $('select[name=origin_city]').hide();
    $('#Беларусь').show();
    $('select[name=destination_city]').hide();
    $('#d_Беларусь').show();

    $("#submit_login").on('click',function() {
        if ($('#login_form').valid()) {
            $.post('/login', {email: $("#email").val(), password: $("#password").val()}, function (data) {
                if(data.message) {
                    $("#login_error").text(data.message);
                    $("#login_error").removeClass("disp");
                }
                else{
                    window.location.pathname = "/profile";
                }
            });
        }
    });

    $("#submit_transportation").on('click', function() {
        var origin_country = $("#origin_country option:selected").text();
        var origin_city = $('#'+ origin_country + " option:selected").text();
        var destination_country = $("#destination_country option:selected").text();
        var destination_city = $('#d_'+ destination_country + " option:selected").text();
        var request = {
            origin: origin_city,
            provideRouteAlternatives: true,
            destination: destination_city,
            travelMode: google.maps.TravelMode["DRIVING"]
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var parameters = {cargo_type: $("#cargo_type").val(), dimensions: $("#dimensions").val(), additional: $("#description").val(), origin_country: origin_country, origin: origin_city, destination_country: destination_country, destination: destination_city, distance: response.routes[0].legs[0].distance.value/1000};
                $.post('/transportation', parameters, function (data){
                    $('#results_area').html("Расстояние: <b>" + (response.routes[0].legs[0].distance.value/1000).toFixed(1) + " км</b><br><p> Тип транспортного срества: <b>" + data.vehicle.title + "</b></p><p class=\"res_span\">" + data.vehicle.additional + "<p>" + data.additional + "</p>" + "</p>Стоимость транспортировки: <b>" + data.cost + "$</b><br>");
                    $('#resultsModal').modal('show');
                });
            }
        });
    });

    $("#to_planning").on('click', function() {
        if($("#firm").val() == "true") {
            window.location.pathname = "/planning_supplies";
        }
        else{
            $("#invintation").removeClass("disp");
            window.location.pathname = "/planning_supplies/about";
        }
    });

    $("#to_transportation").on('click', function() {
        if($("#firm").val() == "true") {
            window.location.pathname = "/transportation";
        }
        else{
            $("#invintation").removeClass("disp");
        }
    });

    $('#order_point').change(function() {
        if (! $('#order_dates').is(':checked')) {
            $("#order_p").fadeToggle(1500);
        }
    });

    $('#order_dates').change(function() {
        if (!$('#order_point').is(':checked')) {
            $("#order_p").fadeToggle(1500);
        }
        $("#order_d").fadeToggle(1500);
    });

    $("#submit_planning").on('click', function() {
        if ($('#planning').valid()) {
            var Q = parseInt($("#Q").val());
            var m = parseInt($("#m").val()) / 100;
            var p = parseInt($("#p").val());
            var K = parseInt($("#K").val());
            var units = $("#units").val();
            var q = Math.sqrt((2 * K * Q) / (m * p));
            var L = Math.sqrt((2 * K * Q * m * p));
            var params = "Годовой спрос: " + Q + " (" + units + ")" + "  Цена единицы: " + p + "$/" + units +
                         "  Доля затрат на хранение: " + m + "  Постоянные завтраты: " + K + "$";
            var results = "  Размер партии: " + q.toFixed(2) + " (" + units + ")" + " Затраты на управление запасами - " + L.toFixed(2) + "$";
            var results_html = 'Рекомендуемыый размер партии: ' + q.toFixed(2) + " (" + units + ")<br> Затраты на управление запасами: "  + L.toFixed(2) + "$<br>";
            if ($('#order_point').is(':checked') || $('#order_dates').is(':checked')) {
                var T = parseInt($("#T").val());
                var O = parseInt($("#O").val());
                var d = parseInt($("#d").val());
                var r = O * (T + d);
                params = params + "  Время в пути(в днях): " + T + "  Длительность страхового завпаса(в днях): " + d + " Дневное потребление: " + O + units + "/день";
                results = results + "  Точка заказа: " + r.toFixed(2) + " (" + units + ")";
                results_html = results_html + "  Точка заказа: " + r.toFixed(2) + " (" + units + ")<br>";
                if ($('#order_dates').is(':checked')){
                    var I = parseInt($("#I").val());
                    params = params + "  Стартовый запас: " + I + units;
                    var t1 = (I - r)/O;
                    if(t1 < 0) t1 = 0;
                    var I1 = I - (t1 + T) * O + q;
                    var t2 = t1 + T + (I1 - r)/O;
                    if(t2 < 0) t2 = 0;
                    var I2 = I1 - (t2 - t1 + T) * O + q;
                    var t3 = t2 + T +(I2 - r)/O;
                    if(t3 < 0) t3 = 0;
                    results = results + "  Первый заказ: " + getSupplyDate(t1.toFixed(0)) + "  Второй - " + getSupplyDate(t2.toFixed(0)) + "  Третий - " + getSupplyDate(t3.toFixed(0));
                    results_html = results_html + " <br>Интервал времени между заказами при условии соблюдения оптимальной партии поставки.<br> Первый заказ: " + getSupplyDate(t1.toFixed(0)) + "<br>  Второй - " + getSupplyDate(t2.toFixed(0)) + "<br>  Третий - " + getSupplyDate(t3.toFixed(0)) + "<br>";
                }
            }
            var parameters = {additional: $("#description").val(), params: params, results: results};
            $.post('/planning_supplies', parameters, function (data) {});
            $('#results_area').html(results_html);
            $('#resultsModal').modal('show');
        }
    });

    $("#add_vehicle").on('click', function(){
        $('#vehicleModal').modal('show');
    });

    $("#add_product").on('click', function(){
        $('#productModal').modal('show');
    });

    $("#submitAddVehicle").on('click', function() {
        if ($('#addVehicle').valid()) {
            var parameters = {title: $("#title_").val(), type: $("#type_").val(), capacity: $("#capacity_").val(), cargo_volume: $("#cargo_volume_").val(), cargo_type: $("#cargo_type_").val(), tax_addon: $("#tax_addon_").val(), additional: $("#description_").val()};
            $.post('/content_management/transport', parameters, function (data) {
                $("#vehicles_container").load("/content_management/transport #vehicles_container");
                $('#vehicleModal').modal('hide');
            });
        }
    });

    $("#submitAddProduct").on('click', function() {
        var parameters = {title: $("#Ptitle").val(), type: $("#Ptype").val()};
        if ($('#is_dangerous').is(':checked')) {
            parameters["dangerous"] = true;
        }
        $.post('/content_management/cargo', parameters, function (data) {
            $("#products_container").load("/content_management/cargo #products_container");
            $('#productModal').modal('hide');
        });
    });

    $("#delete_history").on('click', function() {
        $.ajax({
            url: '/history',
            type: 'DELETE',
            success: function(result) {
                $("#history_container").load("/history #history_container");
            }
        });
     });

    $("a[name='delete_operation']").on('click', function() {
        $.post('/history', {id: $(this).attr("id")}, function (data){
            $("#history_container").load("/history #history_container");
        });
    });

    $("a[name='delete_product']").on('click', function() {
        $.ajax({
            url: '/content_management/cargo',
            type: 'DELETE',
            data: {id: $(this).attr("id")},
            success: function(result) {
                $("#products_container").load("/content_management/cargo #products_container");
            }
        });
    });

    $("a[name='delete_vehicle']").on('click', function() {
        $.ajax({
            url: '/content_management/transport',
            type: 'DELETE',
            data: {id: $(this).attr("id")},
            success: function(result) {
                $("#vehicles_container").load("/content_management/transport #vehicles_container");
            }
        });
    });
});

$(document).ajaxComplete(function(){

    $("#delete_history").on('click', function() {
        $.ajax({
            url: '/history',
            type: 'DELETE',
            success: function(result) {
                $("#history_container").load("/history #history_container");
            }
        });
    });

    $("a[name='delete_operation']").on('click', function() {
        $.post('/history', {id: $(this).attr("id")}, function (data){
            $("#history_container").load("/history #history_container");
        });
    });

    $("a[name='delete_vehicle']").on('click', function() {
        $.ajax({
            url: '/content_management/transport',
            type: 'DELETE',
            data: {id: $(this).attr("id")},
            success: function(result) {
                $("#vehicles_container").load("/content_management/transport #vehicles_container");
            }
        });
    });

    $("#submitAddVehicle").on('click', function() {
        if ($('#addVehicle').valid()) {
            var parameters = {title: $("#title").val(), type: $("#type").val(), capacity: $("#capacity").val(), cargo_volume: $("#cargo_volume").val(), cargo_type: $("#cargo_type").val(), tax_addon: $("#tax_addon").val(), additional: $("#description").val()};
            $.post('/content_management/transport', parameters, function (data) {
                $("#vehicles_container").load("/content_management/transport #vehicles_container");
                $('#vehicleModal').modal('hide');
            });
        }
    });

    $("#add_vehicle").on('click', function(){
        $('#vehicleModal').modal('show');
    });

    $('.title').editable('option','validate', function(value) {
            if(/^$|^\s+/.test($.trim(value))) {
                return 'Введите число';
            }
        }
    );
    $('.type').editable({
        source: [
            {value: 'автомобильный', text: 'автомобильный'},
            {value: 'железнодорожный', text: 'железнодорожный'}
        ]
    });

    //$('.cargo_type').editable();

    $('.capacity').editable('option','validate', function(value) {
            if(!(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test($.trim(value)))) {
                return 'Обязательное поле';
            }
        }
    );

    $('.cargo_volume').editable('option','validate', function(value) {
            if(!(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test($.trim(value)))) {
                return 'Введите число';
            }
        }
    );
    $('.additional').editable();
    $('.tax_addon').editable('option','validate', function(value) {
            if(!(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/.test($.trim(value)))) {
                return 'Введите число';
            }
        }
    );

    $("a[name='delete_product']").on('click', function() {
        $.ajax({
            url: '/content_management/cargo',
            type: 'DELETE',
            data: {id: $(this).attr("id")},
            success: function(result) {
                $("#products_container").load("/content_management/cargo #products_container");
            }
        });
    });

    $("#add_product").on('click', function(){
        $('#productModal').modal('show');
    });

    $('.Ctype').editable({
        source: [
            {value: 'универсальные', text: 'универсальные'},
            {value: 'хрупкие', text: 'хрупкие'},
            {value: 'очень хрупкие', text: 'очень хрупкие'},
            {value: 'навалочные', text: 'навалочные'},
            {value: 'наливные', text: 'наливные'},
            {value: 'хрупкие', text: 'хрупкие'},
            {value: 'прод. питания', text: 'прод. питания'}
        ]
    });

    $('.Ctitle').editable('option', 'source', function(){
        if(/^$|^\s+/.test($.trim(value))) {
            return 'Обязательное поле';
        }
    });

    $('.Cdangerous').editable({
            source: [
                {value: true, text: 'опасен'},
                {value: false, text: 'безопасен'}
            ]
        }
    );

    $("#submitAddProduct").on('click', function() {
        var parameters = {title: $("#Ptitle").val(), type: $("#Ptype").val()};
        if ($('#is_dangerous').is(':checked')) {
            parameters["dangerous"] = true;
        }
        $.post('/content_management/cargo', parameters, function (data) {
            $("#products_container").load("/content_management/cargo #products_container");
            $('#productModal').modal('hide');
        });
    });
});

function createChart(){
    $.get('/content_management/chart_data', function (res) {
        new Morris.Area({
            element: 'users_chart',
            data: res.users_data,
            xkey: 'users_time',
            ykeys: ['users'],
            labels: ['Количество зарегистрированных фирм']
        });
        new Morris.Area({
            element: 'operations_chart',
            data: res.operations_data,
            xkey: 'time',
            ykeys: ['total', 'transportation', 'planning'],
            labels: ['Расчёты общих логистических издержек', 'Расчёты затрат на транспортировку', 'Планирование размеров поставок']
        });
    });
}

function getSupplyDate(days){
    var date = new Date(Date.now() + days*24*3600*1000);
    var result = "";
    result += date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + "г.";
    return result;
};