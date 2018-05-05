function generateStep(stepData) {
  var step = $('<div>', { id: stepData.id, class: "step" });
  step.append($('<h5>', { class: "step-title", text: stepData.title }));
  step.append($('<div>', { class: stepData.icon }));
  
  if (stepData.smsInfo) {
    step.append($('<div>', { class: "sms-info", text: stepData.smsInfo }));
  }

  if (stepData.info) {
    step.append($('<div>', { class: "info", text: stepData.info }));
  }

  if (stepData.danger) {
    step.append($('<div>', { class: "danger", text: stepData.danger }));
  } 

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
  state.append($('<div>', { class: "header", text: stateData.name }));
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

$('document').ready(function() {
  generateApp(appData);
});
