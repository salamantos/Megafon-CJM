function generateStep(stepData) {
    var step = $('<div>', {class: "step d-flex flex-row align-items-top"});
    var stepBody = $('<div>', {class: "step-body"});
    stepBody.append($('<h5>', {class: "step-title", text: stepData.title}));
    stepBody.append($('<div>', {class: 'fa ' + stepData.icon}));
    stepBody.on("click", function (evt) {
        updateStep(this);
    });


    if (stepData.smsInfo) {
        stepBody.append($('<div>', {class: "sms-info", text: stepData.smsInfo}));
    }

    if (stepData.info) {
        stepBody.append($('<div>', {class: "info", text: stepData.info}));
    }

    if (stepData.danger) {
        stepBody.append($('<div>', {class: "danger", text: stepData.danger}));
    }

    step.append(stepBody);
    // var addButton = $('<button>', {class: "btn btn-light plus", text: '+'});
    // addButton.click(function (evt) {
    //     addNewStep(step);
    // });
    // step.append(addButton);
    return step;
}

function generateVariant(variantData, id) {
    var variant = $('<div>', {id: id, class: "variant"});
    var fb = $('<div>', {class: "d-flex flex-row justify-content-around variant-body"})
    // var firstButton = $('<button>', {class: "btn btn-light plus", text: '+'});
    // firstButton.click(function (evt) {
    //     addNewStep(firstButton);
    // });
    // fb.append(firstButton);

    variant.append(fb);
    variantData.forEach(function (stepData) {
        fb.append(generateStep(stepData));
    });
    // var addBtn = $('<button>', {class: "ml-auto mr-auto btn plus btn-light", text: '+', style: "margin-top: 1em"})
    // addBtn.click(function (evt) {
    //     addNewVariant(variant);
    // });
    // variant.append(addBtn);
    // var deleteButton = $('<button>', {
    //     class: "btn btn-outline-danger",
    //     text: 'x',
    //     style: "margin-top: 1em; margin-left: 1em;"
    // })
    // deleteButton.click(function () {
    //     variant.remove()
    // });
    // variant.append(deleteButton);
    return variant;
}

function generateState() {
    var state = $('<div>', {class: "global-step"});
    var fb = $('<div>', {class: "d-flex flex-row"});
    fb.append($('<div>', {
        class: "header",
        text: "Нажмите на блок для редактирования или добавьте новый",
        style: "width: 30%"
    }));
    var firstButton = $('<button>', {
        class: "btn btn-light plus",
        text: '+',
        style: "margin-top: 5px; font-size: 5em;"
    });
    firstButton.click(function (evt) {
        addNewStep(firstButton);
        //addNewVariant(firstButton);
    });
    fb.append(firstButton);
    state.append(fb);
    var variantsDiv = $('<div>', {class: "d-flex justify-content-around flex-wrap"});

    for (key in steps) {
        console.log(key)
        variantsDiv.append(generateVariant([steps[key]], key));
    }
    state.append(variantsDiv);
    return state;
}

function generateApp(appData) {
    $('#title-text').text("Редактирование шаблонов");
    $('#app').append(generateState());
}

function getHeaderValue() {
    var headerValue = $('input[name="titleRadios"]:checked').val();
    if (headerValue == 'other')
        return $('#title-input').val();
    else
        return headerValue;
}

function updateHeader(header) {
    $('#title-modal').modal('show');
    $('#title-input').val(header.innerText);
    $('#title-button').one("click", function () {
        header.innerText = getHeaderValue();
        $('#title-modal').modal('hide');
    });

    $('#title-delete').one("click", function () {
        $(header).parent().parent().remove();
    });
}

function changeJSON(oldObj, newObj) {

}

function updateStep(step) {
    console.log("here", step);
    $('#step-modal').modal('show');
    $('#step-title').val($(step).children('.step-title')[0].innerText);
    var iconValue = $(step).children('.fa, .fas, .far')[0].className;
    $('[name="icon"]').removeAttr('checked');
    $("input[name=icon][value='" + iconValue + "']").prop('checked', true);
    var infoDiv = $(step).children('.info')[0];
    if (infoDiv)
        $('#step-info').val(infoDiv.innerText);
    else
        $('#step-info').val("");
    var smsInfoDiv = $(step).children('.sms-info')[0];
    if (smsInfoDiv)
        $('#step-sms-info').val(smsInfoDiv.innerText);
    else
        $('#step-sms-info').val("");
    var dangerDiv = $(step).children('.danger')[0];
    if (dangerDiv)
        $('#step-danger').val(dangerDiv.innerText);
    else
        $('#step-danger').val("");

    $('#step-button').one("click", function () {
        console.log($(step).parent().parent().parent().first()[0].id);
        addStep($(step).parent());
        // console.log($(step).children(".step-title").first()[0].innerText);
        // console.log($(step).children(".danger").first()[0].innerText);
        // console.log($(step).children(".fa").first()[0].innerText);
        $('#step-modal').modal('hide');
        console.log("sofsd", $(step).parent().next().parent().parent().parent());
        console.log("qqqq", $(step).parent().next().children(".step-body").children(".step-title").first()[0].innerText);
        let ebuchayaVar = $(step).parent().next().parent().parent().first()[0].id;
        console.log("ebuchayaVar", ebuchayaVar)
        steps[ebuchayaVar].title = $(step).parent().next().children(".step-body").children(".step-title").first()[0].innerText;
        console.log(JSON.stringify(steps));

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(steps));
        let dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "templates.json");
        dlAnchorElem.click();


        $(step).parent().remove();
    });

    $('#step-delete').one("click", function () {
        $(step).parent().remove();
    });
}

function addStep(parentElement) {
    var stepData = {
        title: $('#step-title').val(),
        icon: $('input[name="icon"]:checked').val(),
        info: $('#step-info').val(),
        smsInfo: $('#step-sms-info').val(),
        danger: $('#step-danger').val(),
    }
    //step = generateStep(stepData);
    parentElement.after(generateStep(stepData));
}

function addNewStep(parentElement) {
    // var stepData = {
    //     title: "Test",
    //     info: "info info info"
    // }
    let stepData = {
        title: $('#step-title').val(),
        icon: $('input[name="icon"]:checked').val(),
        info: $('#step-info').val(),
        smsInfo: $('#step-sms-info').val(),
        danger: $('#step-danger').val(),
    };
    let id = "newElem";
    parentElement.after(generateStep(stepData, id));
    console.log(parentElement.next().children('.step-body').first());
    updateStep(parentElement.next().children('.step-body').first()[0]);
}

function addNewVariant(parentElement) {
    var variantData = [];
    let id = "newElem";
    parentElement.after(generateVariant(variantData, id));
    // updateStep(parentElement.next().children('.variant').first()[0]);
}

function addState(evt) {
    var stateData = {
        name: '',
        variants: [],
    }
    var state = generateState(stateData);
    var header = $($(state).children()[0]).children()[0];
    $(header).click(function (evt) {
        updateHeader(evt.target);
    });
    updateHeader(header);
    $(evt.target).parent().parent().after(state);
}

function deleteState(evt) {
    $(evt.target).parent().remove();
}

var appData = {
    "states": [{
        "name": "Узнаёт",
        "variants": [[{
            "title": "Подключает новый Тарифный План",
            "icon": "fas fa-cart-arrow-down",
            "info": "Опция предустановлена на определенных тарифах",
            "smsInfo": "",
            "danger": "",
            "cnm": "Новый тарифный план активирован! Абонентская плата 299 рублей/месяц. Пакеты услуг смотрите в личном кабинете"
        }, {
            "title": "Получает уведомление об опции",
            "icon": "far fa-comment-alt",
            "info": "SMS с информацией о подключенной опции и ее условиях",
            "smsInfo": "",
            "danger": "",
            "cnm": ""
        }], [{
            "title": "Подключает в магазине",
            "icon": "fas fa-cart-arrow-down",
            "info": "Клиенту предлагает поставить услугу продавец",
            "smsInfo": "",
            "danger": "",
            "cnm": ""
        }, {
            "title": "Получает уведомление об опции",
            "icon": "far fa-comment-alt",
            "info": "SMS с информацией о подключенной опции и ее условиях",
            "smsInfo": "",
            "danger": "",
            "cnm": ""
        }]]
    }, {
        "name": "Подключает",
        "variants": [[{
            "title": "Подключает услугу",
            "icon": "far fa-money-bill-alt",
            "info": "Подключение возможно\nв личном кабинете\nв коллцентре\nв магазине",
            "smsInfo": "",
            "danger": "",
            "cnm": "Спасибо за то, что решили пользоваться услугой"
        }]]
    }, {
        "name": "Использует",
        "variants": [[{
            "title": "Управляет услугой",
            "icon": "fas fa-user",
            "info": "Управление возможно в следующих местах: \nв личном кабинете",
            "smsInfo": "",
            "danger": "",
            "cnm": "Спасибо за то, что решили и дальше пользоваться бесплатной услугой"
        }], [{
            "title": "За 10 дней получает SMS уведомление",
            "icon": "far fa-comment-alt",
            "info": "SMS с информацией об окончании срока действия акции. Так же текст может включать информацию о подключенной опии «Мне Звонили S»",
            "smsInfo": "SMS с уведомлением об окончании акции и информацией об условиях опции",
            "danger": "",
            "cnm": "Несколько дней назад вы подключили платную услугу. Пробный период заканчивается через X дней. Если хотите отключить услугу, вы можете сделать это в личном кабинете"
        }, {
            "title": "Получает SMS с подтверждением",
            "icon": "far fa-comment-alt",
            "info": "SMS с информацией о платной опции приходит через X дней после подключения",
            "smsInfo": "",
            "danger": "",
            "cnm": ""
        }]]
    }, {
        "name": "Реакция на изменения",
        "variants": [[{
            "title": "Оставляет платную услугу",
            "icon": "far fa-money-bill-alt",
            "info": "",
            "smsInfo": "SMS с подтверждением окончания акции",
            "danger": "",
            "cnm": "Спасибо за то, что остаись с нами и решили продолжить пользоваться услугой"
        }], [{
            "title": "Звонит в КЦ",
            "icon": "fas fa-phone",
            "info": "",
            "smsInfo": "",
            "danger": "Негативные реакции, если абонент забыл отключить опцию до окончания акции",
            "cnm": ""
        }], [{
            "title": "Отключает пакет",
            "icon": "fas fa-ban",
            "info": "Отключение возможно через Личный кабинет, контактный центр, по команде",
            "smsInfo": "Сказать, что будем рады видеть еще",
            "danger": "",
            "cnm": "Нам жаль, что вы решили отключить нашу услугу. Мы будем работать над ее улучшением и надеемся, что вы когда-нибудь подключите ее снова"
        }]]
    }, {
        "name": "Отключает",
        "variants": [[{
            "title": "Отключает пакет",
            "icon": "fas fa-ban",
            "info": "Отключение возможно\nв личном кабинете\nв коллцентре\nв магазине",
            "smsInfo": "SMS с подтверждением отключения",
            "danger": "Клиент чем-то недоволен",
            "cnm": "Пакет был отключен. Подробная информация в личном кабинете"
        }]]
    }], "name": "Услуга-Хуюга"
}


$('document').ready(function () {
    generateApp(appData);
    $('.header').click(function (evt) {
        updateHeader(evt.target);
    });
    $.each(steps, function (index, value) {
        var option = $('<a>', {class: 'dropdown-item', href: '#', text: value.title});
        option.click(function () {
            $('#step-title').val(value.title);
            $('#step-info').val(value.info);
            $('#step-sms-info').val(value.smsInfo);
            $('#step-danger').val(value.danger);
            $('[name="icon"]').removeAttr('checked');
            $("input[name=icon][value='" + value.icon + "']").prop('checked', true);
        });
        $('#step-options').append(option);
    });
});
