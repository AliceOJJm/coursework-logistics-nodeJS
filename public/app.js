/**
 * Created by acer on 27.04.2015.
 */

$( document ).ready(loadHandlers);
$( document ).ready(function(){
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
    $("#submitAddVehicle").on('click', function() {
        if ($('#addVehicle').valid()) {
            var parameters = {title: $("#title_").val(), type: $("#type_").val(),
                capacity: $("#capacity_").val(), cargo_volume: $("#cargo_volume_").val(),
                cargo_type: $("#cargo_type_").val(), tax_addon: $("#tax_addon_").val(),
                additional: $("#description_").val()};
            $.post('/content_management/transport', parameters, function (data) {
                $("#vehicles_container").load("/content_management/transport #vehicles_container");
                $('#vehicleModal').modal('hide');
            });
        }
    });
});

$(document).ajaxComplete(loadHandlers);

function loadHandlers() {
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
        (require('../models/product')).find('title', function(err, array){
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

    $("#submit_edit_news").on('click', function() {
        if ($('#editNews').valid()) {
            $.ajax({
                url: '/news',
                type: 'PUT',
                data: {id: $("#itemId").text(), title: $("#titleNewsE").val(), text: $("#textNewsE").val(), url: $("#urlNewsE").val()},
                success: function(result) {
                    $("#news_container").load("/news #news_container");
                    $('#itemText').text($("#textNewsE").val());
                    $('#itemTitle').text($("#titleNewsE").val());
                    $('#itemURL').html("<img src='" + $("#urlNewsE").val() + "' class='newsimg' />");
                    $("#editNews").addClass('disp');
                    $("#itemTitle").removeClass('disp');
                    $("#itemText").removeClass('disp');
                }
            });
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
            var parameters = {S: parseInt($("#S").val()), Q: parseInt($("#Q").val()), m: (parseInt($("#m").val()) / 100), p: parseInt($("#p").val()), t: parseInt($("#t").val()), K: parseInt($("#K").val()), d: parseInt($("#d").val()), q: parseInt($("#q").val()), units: $("#units").val(), additional: $("#description").val(), is_logged: $("#firm").val()};
            $.post('/total_costs', parameters, function (data) {
                $("#total_part").text("= " + data.total_costs + "$");
                $("#result_total_costs").removeClass("disp");
                $("#stock_part").html("Из этой суммы <b>&nbsp;" + data.stock_costs + "$&nbsp;</b> - затраты на управление запасами.<br> Что составляет <b>" + data.stock_perc + "%</b> от всех затрат.");
                $("#result_total_costs_part").removeClass("disp");
                if(!$("#firm").val()){
                    $("#invintation").removeClass("disp");
                }
            });
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
            $("#invintation").hide();
            $("#invintation").removeClass("disp");
            $("#invintation").show(800);
            $('html, body').animate({scrollTop: '0px'}, 800);
        }
    });

    $("#to_transportation").on('click', function() {
        if($("#firm").val() == "true") {
            window.location.pathname = "/transportation";
        }
        else{
            $("#invintation").hide();
            $("#invintation").removeClass("disp");
            $("#invintation").show(800);
            $('html, body').animate({scrollTop: '0px'}, 800);
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
            var parameters = {Q: parseInt($("#Q").val()), m: (parseInt($("#m").val()) / 100), p: parseInt($("#p").val()), K: parseInt($("#K").val()), units: $("#units").val(), additional: $("#description").val(), order_point: $('#order_point').is(':checked'), order_dates: $('#order_dates').is(':checked')};
            if ($('#order_point').is(':checked') || $('#order_dates').is(':checked')) {
                parameters['T'] = parseInt($("#T").val());
                parameters['O'] = parseInt($("#O").val());
                parameters['d'] = parseInt($("#d").val());
                if ($('#order_dates').is(':checked')) {
                    parameters['I'] = parseInt($("#I").val());
                }
            }
            $.post('/planning_supplies', parameters, function (data) {
                $('#results_area').html(data.results_html);
                $('#resultsModal').modal('show');
            });
        }
    });

    $("#add_vehicle").on('click', function(){
        $('#vehicleModal').modal('show');
    });

    $("#add_news").on('click', function(){
        $('#add_news_modal').modal('show');
    });

    $("#add_product").on('click', function(){
        $('#productModal').modal('show');
    });

    $("#login").on('click', function(){
        $('#myModal').modal('show');
    });

    $("#submit_add_news").on('click', function() {
        if ($('#addNews').valid()) {
            var parameters = {title: $("#titleNews").val(), text: $("#textNews").val(), url: $("#urlNews").val()};
            $.post('/news', parameters, function (data) {
                $("#news_container").load("/news #news_container");
                $('#add_news_modal').modal('hide');
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

    $("button[name='delete_news']").on('click', function() {
        $.ajax({
            url: '/news',
            type: 'DELETE',
            data: {id: $("#itemId").text()},
            success: function(result) {
                $("#news_container").load("/news #news_container");
                $('#show_news_modal').modal('hide');
            }
        });
     });

    $("button[name='edit_news']").on('click', function() {
        $("#itemTitle").addClass('disp');
        $("#itemText").addClass('disp');
        $("#titleNewsE").attr('value', $("#itemTitle").text());
        $("#textNewsE").text($("#itemText").text());
        $("#editNews").removeClass('disp');
     });

    $("a[name='delete_operation']").on('click', function() {
        $.post('/history', {id: $(this).attr("id")}, function (data){
            $("#history_container").load("/history #history_container");
        });
    });


    $("button[name='show_news']").on('click', function(){
        $('#itemText').text($("#text_" + $(this).attr('id')).text());
        $('#itemTitle').text($("#title_" + $(this).attr('id')).text());
        $('#itemURL').html("<img src='" + $("#url_" + $(this).attr('id')).text() + "' class='newsimg'/>");
        $('#itemId').text($(this).attr('id'));
        $('#show_news_modal').modal('show');
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
}

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