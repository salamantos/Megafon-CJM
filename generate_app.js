function generateStep(stepData) {
  var step = $('<div>', { class: "step d-flex flex-row align-items-center" });
  var stepBody = $('<div>', { class: "step-body" });
  stepBody.append($('<h5>', { class: "step-title", text: stepData.title }));
  stepBody.append($('<div>', { class: stepData.icon }));
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

  step.append(stepBody);
  var addButton = $('<button>', { class: "btn btn-light", text: '+'}));
  return step;
}

function generateVariant(variantData) {
  var variant = $('<div>', { class: "d-flex flex-row align-items-center variant" })
  variantData.steps.forEach(function (stepData) {
    variant.append(generateStep(stepData));
  });
  return variant;
}

function generateState(stateData) {
  var state = $('<div>', { class: "global-step" });
  var fb = $('<div>', { class: "d-flex flex-row" })
  fb.append($('<div>', { class: "header", text: stateData.name }));
  var addBtn = $('<button>', { class: "btn btn-light mr-auto", text: '+', click: addState, style: "display: inline-block" })
  fb.append(addBtn);
  state.append(fb);
  var variantsDiv = $('<div>', { class: "d-flex justify-content-around flex-column" });
  stateData.variants.forEach(function (variantData) {
    variantsDiv.append(generateVariant(variantData));
  });
  state.append(variantsDiv);
  return state;
}

function generateApp(appData) {
  $('#title-text').text(appData.name);
  appData.states.forEach(function (stateData) {
    $('#app').append(generateState(stateData));
  });
}

appData = {
  name: "Кто звонил+",
  states: [ 
    {
      name: "Узнает",
      variants: [
        {
          steps: [
            {
              id: "1",
              title: "Подключает услугу по акции",
              icon: "fas fa-tag",
            },
            {
              id: "2",
              title: "Получает SMS с подтверждением",
              icon: "far fa-comment-alt",
              info: "SMS с информацией о платной опции приходит чрез X дней после подключения"
            },
          ]
        },
        {
          steps: [
            {
              id: "3",
              title: "Подключает новый ТП",
              icon: "fas fa-cart-arrow-down",
              info: "Клиент становится участником акции (нулевой профиль на ряде тарифов)"
            },
            {
              id: "4",
              title: "Получает SMS с описанием опции",
              icon: "far fa-comment-alt",
              info: "SMS с информацией о платной опции приходит чрез X дней после подключения"
            },
          ]
        },
      ]
    },
    {
      name: "Использует",
      variants: [
        {
          steps: [
            {
              id: "1",
              title: "Пользуется опцией",
              icon: "fa fa-mobile-alt",
              info: "Отключение возможно через Личный кабинет, контактный центр, *111#",
            },
            {
              id: "2",
              title: "За 10 дней получает SMS уведомление",
              icon: "far fa-comment-alt",
              smsInfo: "SMS с уведомлением об окончании акции и информацией об условиях опции",
              info: "SMS с информацией об окончании срока действия акции. Так же текст может включать информацию о подключенной опии «Мне Звонили S»",
            },
            {
              id: "3",
              title: "Услуга становится платной / отключается с заменой на бесплатную",
              icon: "far fa-money-bill-alt",
              danger: "За 10 дней абоненты могут забыть об окончании акции. Рекомендуется еще раз уведомить абонента в день окончания акции",
            },
          ]
        },
      ]
    },
    {
      name: "Изменяет",
      variants: [
        {
          steps: [
            {
              id: "1",
              title: "Оставляет платную услугу",
              icon: "far fa-money-bill-alt",
              smsInfo: "SMS с подтверждением окончания акции",
            },
          ]
        },
        {
          steps: [
            {
              id: "2",
              title: "Звонит в КЦ",
              icon: "fas fa-phone",
              danger: "Негативные реакции, если абонент забыл отключить опцию до окончания акции",
            },
          ]
        },
        {
          steps: [
            {
              id: "3",
              title: "Отключает пакет",
              icon: "fas fa-ban",
              info: "Отключение возможно через Личный кабинет, контактный центр, по команде",
            },
          ]
        },
      ]
    }
  ] 
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
  console.log(parentElement);
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


$('document').ready(function() {
  generateApp(appData);
  $('.header').click(function(evt) {
    updateHeader(evt.target);
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
});
