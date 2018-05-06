function generateInfoStep(stepData) {
  if (stepData.cnm) {
    var step = $('<div>', { class: "step d-flex flex-row align-items-center" });
    var stepBody = $('<div>', { class: "step-body" });
    stepBody.append($('<h5>', { class: "step-title", text: stepData.title }));
    stepBody.append($('<div>', { class: "info", text: stepData.cnm }));
    step.append(stepBody)
    return step;
  } else {
    return null;
  }
}

function generateStep(stepData) {
  var step = $('<div>', { class: "step d-flex flex-row align-items-center" });
  var stepBody = $('<div>', { class: "step-body" });
  stepBody.append($('<h5>', { class: "step-title", text: stepData.title }));
  stepBody.append($('<div>', { class: 'fa ' + stepData.icon }));
  stepBody.on("click", function(evt) {
    updateStep(this);
  });

  
  if (stepData.smsInfo) {
    stepBody.append($('<div>', { class: "sms-info", text: stepData.smsInfo }));
  }

  if (stepData.info) {
    stepBody.append($('<div>', { class: "info", text: stepData.info }));
  }

  if (stepData.danger) {
    stepBody.append($('<div>', { class: "danger", text: stepData.danger }));
  } 

  if (stepData.cnm) {
    stepBody.append($('<div>', { class: "cnm", text: stepData.cnm, style: "display: none" }));
  } 

  step.append(stepBody);
  var addButton = $('<button>', { class: "btn btn-light plus", text: '+' });
  addButton.click(function(evt) {
    addNewStep(step);
  });
  step.append(addButton);
  return step;
}

function generateInfoVariant(variantData) {
  var variant = $('<div>', { class: "variant" })
  var fb = $('<div>', { class: "d-flex flex-row justify-content-around variant-body" })
  variantData.forEach(function (stepData) {
    var step = generateInfoStep(stepData);
    if (step)
      fb.append(step);
  });
  if (fb.children().length) {
    variant.append(fb);
    return variant;
  }
}

function generateVariant(variantData) {
  var variant = $('<div>', { class: "variant" })
  var fb = $('<div>', { class: "d-flex flex-row justify-content-around variant-body" })
  var firstButton = $('<button>', { class: "btn btn-light plus", text: '+' });
  firstButton.click(function(evt) {
    addNewStep(firstButton);
  });
  fb.append(firstButton);

  variant.append(fb);
  variantData.forEach(function (stepData) {
    fb.append(generateStep(stepData));
  });
  var addBtn = $('<button>', { class: "ml-auto mr-auto btn plus btn-light", text: '+' , style: "margin-top: 1em" })
  addBtn.click(function(evt) {
    addNewVariant(variant);
  });
  variant.append(addBtn);
  var deleteButton = $('<button>', { class: "btn btn-outline-danger", text: 'x', style: "margin-top: 1em; margin-left: 1em;"})
  deleteButton.click(function () { variant.remove() });
  variant.append(deleteButton);
  return variant;
}

function generateInfoState(stateData) {
  var state = $('<div>', { class: "global-step" });
  var fb = $('<div>', { class: "d-flex flex-row" })
  fb.append($('<div>', { class: "header", text: stateData.name }));
  state.append(fb);
  var variantsDiv = $('<div>', { class: "d-flex justify-content-around flex-column" });
  stateData.variants.forEach(function (variantData) {
    var variant = generateInfoVariant(variantData);
    if (variant)
      variantsDiv.append(generateInfoVariant(variantData));
  });
  if (variantsDiv.children().length) {
    state.append(variantsDiv);
    return state;
  }
}


function generateState(stateData) {
  var state = $('<div>', { class: "global-step" });
  var fb = $('<div>', { class: "d-flex flex-row" })
  fb.append($('<div>', { class: "header", text: stateData.name }));
  var addBtn = $('<button>', { class: "btn plus btn-light mr-auto", click: addState, text: '+', style: "display: inline-block" })
  fb.append(addBtn);
  state.append(fb);
  var variantsDiv = $('<div>', { class: "d-flex justify-content-around flex-column" });
  var firstBtn = $('<button>', { class: "mr-auto  btn plus btn-light", text: '+' , style: "margin-top: 1em" })
  firstBtn.click(function(evt) {
    addNewVariant(firstBtn);
  });
  state.append(firstBtn);

  stateData.variants.forEach(function (variantData) {
    variantsDiv.append(generateVariant(variantData));
  });
  state.append(variantsDiv);
  return state;
}

function getSteps(element) {
  steps = [];
  element.children().each(function() {
    var stepBody = $(this).children('.step-body').first()
    if (stepBody.children('.step-title').text()) {
      steps.push({
        title: stepBody.children('.step-title').text(),
        icon: stepBody.children('.fa').attr('class'),
        info: stepBody.children('.info').text(),
        smsInfo: stepBody.children('.smsInfo').text(),
        danger: stepBody.children('.danger').text(),
        cnm: stepBody.children('.cnm').text(),
      });
    }
  });
  return steps;
}

function getVariants(element) { 
  variants =  [];
  element.children().each(function() {
    variants.push(getSteps($(this).children()))
  });
  return variants;
}

function getStates() {
  states = [];

  $('.global-step').each(function(i) {
    var vm = this;
    states.push({
      name: $(vm).children().first().children().first().text(),
      variants: getVariants($(vm).children('.flex-column').first())
    });
  })
  return states;
}

function generateInfoApp(appData) {
  appData.name = $('#title-text').text()
  appData.states = getStates();
  $('#app').empty();
  $('#CJM').prop('disabled', false);
  $('#CNM').prop('disabled', true);
  $('#title-text').text(appData.name);
  appData.states.forEach(function (stateData) {
    $('#app').append(generateInfoState(stateData));
  });
}

function generateApp(appData) {
  $('#app').empty();
  $('#CJM').prop('disabled', true);
  $('#CNM').prop('disabled', false);
  $('#title-text').text(appData.name);
  appData.states.forEach(function (stateData) {
    $('#app').append(generateState(stateData));
  });
  $('.header').click(function(evt) {
    updateHeader(evt.target);
  });

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
  $('#title-button').one("click", function() {
    header.innerText = getHeaderValue();
    $('#title-modal').modal('hide');
  });

  $('#title-delete').one("click", function() {
    $(header).parent().parent().remove();
  });
}

function updateStep(step) {
  console.log(step);
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

  $('#step-button').one("click", function() {
    addStep($(step).parent());
    $(step).parent().remove();
    $('#step-modal').modal('hide');
  }); 

  $('#step-delete').one("click", function() {
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
  step = generateStep(stepData);
  parentElement.after(generateStep(stepData));
}

function addNewStep(parentElement) {
  var stepData = {
    title: "Test",
    info: "info info info"
  }
  parentElement.after(generateStep(stepData));
  updateStep(parentElement.next().children('.step-body').first()[0]);
}

function addNewVariant(parentElement) {
  var variantData = [];
  parentElement.after(generateVariant(variantData));
}

function addState(evt) {
  var stateData = {
    name: '',
    variants: [],
  }
  var state = generateState(stateData);
  var header = $($(state).children()[0]).children()[0];
  $(header).click(function(evt) {
    updateHeader(evt.target);
  });
  updateHeader(header);
  $(evt.target).parent().parent().after(state);
}

function deleteState(evt) {
  $(evt.target).parent().remove();
}

var appData = {"states":[{"name":"Узнаёт","variants":[[{"title":"Подключает услугу по акции","icon":"fas fa-tag","info":"","smsInfo":"","danger":"","cnm":""},{"title":"Получает SMS с подтверждением","icon":"far fa-comment-alt","info":"SMS с информацией о платной опции приходит чрез X дней после подключения","smsInfo":"","danger":"","cnm":""}],[{"title":"Подключает новый ТП","icon":"fas fa-cart-arrow-down","info":"Клиент становится участником акции (нулевой профиль на ряде тарифов)","smsInfo":"Краткая информация по тарифному плану","danger":"","cnm":"Новый тарифный план активирован! Абонентская плата 299 рублей/месяц. Пакеты услуг смотрите в личном кабинете"},{"title":"Получает SMS с подтверждением","icon":"far fa-comment-alt","info":"SMS с информацией о платной опции приходит чрез X дней после подключения","smsInfo":"","danger":"","cnm":""}],[{"title":"Подключает услугу по звонку оператора","icon":"fas fa-tag","info":"","smsInfo":"","danger":"","cnm":""},{"title":"Получает SMS с подтверждением","icon":"far fa-comment-alt","info":"SMS с информацией о платной опции приходит чрез X дней после подключения","smsInfo":"","danger":"","cnm":""}]]},{"name":"Использует","variants":[{"title":"Управляет услугой","icon":"fas fa-user","info":"Управление возможно в следующих местах: \nв личном кабинете\nв коллцентре\nв магазине","smsInfo":"","danger":"","cnm":"Спасибо за то, что решили и дальше пользоваться бесплатной услугой"},{"title":"За 10 дней получает SMS уведомление","icon":"far fa-comment-alt","info":"SMS с информацией об окончании срока действия акции. Так же текст может включать информацию о подключенной опии «Мне Звонили S»","smsInfo":"SMS с уведомлением об окончании акции и информацией об условиях опции","danger":"","cnm":"Несколько дней назад вы подключили платную услугу. Пробный период заканчивается через X дней. Если хотите отключить услугу, вы можете сделать это в личном кабинете"},{"title":"Получает SMS с подтверждением","icon":"far fa-comment-alt","info":"SMS с информацией о платной опции приходит чрез X дней после подключения","smsInfo":"","danger":"","cnm":""}]},{"name":"Реакция на изменения","variants":[{"title":"Оставляет платную услугу","icon":"far fa-money-bill-alt","info":"","smsInfo":"SMS с подтверждением окончания акции","danger":"","cnm":"Спасибо за то, что остаись с нами и решили продолжить пользоваться услугой"},{"title":"Звонит в КЦ","icon":"fas fa-phone","info":"","smsInfo":"","danger":"Негативные реакции, если абонент забыл отключить опцию до окончания акции","cnm":""},{"title":"Отключает пакет","icon":"fas fa-ban","info":"Отключение возможно через Личный кабинет, контактный центр, по команде","smsInfo":"Сказать, что будем рады видеть еще","danger":"","cnm":"Нам жаль, что вы решили отключить нашу услугу. Мы будем работать над ее улучшением и надеемся, что вы когда-нибудь подключите ее снова"}]}],"name":"Кто звонил+++"}


$('document').ready(function() {
      document.getElementById('btnOpen').onclick = function() {
          if ('FileReader' in window) {
              //document.getElementById('exampleInputFile').click();
          } else {
              alert('Your browser does not support the HTML5 FileReader.');
          }
      };
      var apt_body = "";
      document.getElementById('exampleInputFile').onchange = function(event) {
          var fileToLoad = event.target.files[0];
          if (fileToLoad) {
              var reader = new FileReader();
              reader.onload = function(fileLoadedEvent) {
                  var textFromFileLoaded = fileLoadedEvent.target.result;
                  console.log(textFromFileLoaded);
                  $('#start').remove();
                  $('#then').css('visibility', 'visible');
                  appData = JSON.parse(textFromFileLoaded);
                  console.log(appData);
                  generateApp(appData);
                  $('#CJM').click(function () { generateApp(appData) })
                  $('#CNM').click(function () { generateInfoApp(appData) })
                  $('.header').click(function(evt) {
                    updateHeader(evt.target);
                  });
                  $('#download').click(function(evt) {
                    $('#title-text').text(appData.name);
                    appData.states.forEach(function (stateData) {
                      $('#app').append(generateInfoState(stateData));
                    });
                    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData));
                    this.setAttribute("href", 'data:' + data + ' download="maps.json"');
                  });
                 
                  $.each(steps, function(index, value) {
                    var option = $('<a>', { class: 'dropdown-item', href: '#', text: value.title });
                    option.click(function() {
                      $('#step-title').val(value.title);
                      $('#step-info').val(value.info);
                      $('#step-sms-info').val(value.smsInfo);
                      $('#step-danger').val(value.danger);
                      $('[name="icon"]').removeAttr('checked');
                      $("input[name=icon][value='" + value.icon + "']").prop('checked', true);
                    });
                    $('#step-options').append(option);
                  });
              };
              reader.readAsText(fileToLoad, 'UTF-8');
          }
      };


});
