function getJSON(params) {
    let columns = {};
    // Узнает, подключает
    if (params.isPromo) {
        columns.attract = {name: "Узнаёт", variants: []};
        columns.connection = {name: "Подключает", variants: []};


    } else {
        columns.attract = {name: "Узнаёт/подключает", variants: []};
    }
    if (params.attractionChannel.includes("shop")) {
        columns.attract.variants.push(templates.shopAttract)
    }
    if (params.isPromo) {
        columns.attract.variants.push(templates.promoAttract);
        columns.connection.variants.push(templates.paidConnection);
        columns.connection.variants.push(templates.notPaidConnection);
    }
    if (params.attractionChannel.includes("alreadyInstalled")) {
        columns.attract.variants.push(templates.alreadyInstalledAttract)
    }
    if (params.attractionChannel.includes("ad")) {
        columns.attract.variants.push(templates.adAttract)
    }
    if (params.attractionChannel.includes("operatorCall")) {
        columns.attract.variants.push(templates.operatorCallAttract)
    }

    // Использует
    columns.use = {name: "Использует", variants: []};
    let whereInfo = "";
    if (params.whereInfo.includes("lk")) {
        whereInfo += "в личном кабинете"
    }
    if (params.whereInfo.includes("callCenter")) {
        whereInfo += "в коллцентре"
    }
    if (params.whereInfo.includes("shop")) {
        whereInfo += "в магазине"
    }
    if (params.whereInfo.length > 0) {
        columns.use.variants.push({waysWhereInfo: whereInfo})
    }
    if (params.howPaid !== "free") {
        columns.use.variants.push(templates.days10WhereInfo)
    }

    // Реакция на изменения
    if (params.howPaid !== "free") {
        columns.reaction = {name: "Реакция на изменения", variants: []};
        columns.reaction.variants.push(templates.variantsPaidReaction);
        columns.reaction.variants.push(templates.variantsCallReaction);
        columns.reaction.variants.push(templates.variantsDisableReaction);
    }

    // Отключает
    columns.disconnect = {name: "Отключает", variants: []};

    return JSON.stringify(columns);
}

let templates = {
    shopAttract: {
        hash: "shopAttract",
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

    promoAttract: {
        hash: "promoAttract",
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
    paidConnection: {
        hash: "paidConnection",
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
    notPaidConnection: {
        hash: "notPaidConnection",
        steps: [
            {
                id: "1",
                title: "НАВАЛЬНЫЙ",
                icon: "fa fa-mobile-alt",
                info: "Отключение возможно через Личный кабинет, контактный центр, *111#",
            }
        ]
    },
    alreadyInstalledAttract: {
        hash: "alreadyInstalledAttract",
    },
    adAttract: {
        hash: "adAttract",
        steps: [
            {
                id: "1",
                title: "НАВАЛЬНЫЙ",
                icon: "fa fa-mobile-alt",
                info: "Отключение возможно через Личный кабинет, контактный центр, *111#",
            }
        ]
    },
    operatorCallAttract: {
        hash: "operatorCallAttract",
        steps: [
            {
                id: "1",
                title: "НАВАЛЬНЫЙ",
                icon: "fa fa-mobile-alt",
                info: "Отключение возможно через Личный кабинет, контактный центр, *111#",
            }
        ]
    },
    waysWhereInfo: {
        hash: "waysWhereInfo",
        waysWhereInfo: []
    },
    days10WhereInfo: {
        hash: "days10WhereInfo",
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
    variantsPaidReaction: {
        hash: "variantsPaidReaction",
        steps: [
            {
                id: "1",
                title: "Оставляет платную услугу",
                icon: "far fa-money-bill-alt",
                smsInfo: "SMS с подтверждением окончания акции",
            },
        ]
    },
    variantsCallReaction: {
        hash: "variantsCallReaction",
        steps: [
            {
                id: "2",
                title: "Звонит в КЦ",
                icon: "fas fa-phone",
                danger: "Негативные реакции, если абонент забыл отключить опцию до окончания акции",
            },
        ]
    },
    variantsDisableReaction: {
        hash: "variantsDisableReaction",
        steps: [
            {
                id: "3",
                title: "Отключает пакет",
                icon: "fas fa-ban",
                info: "Отключение возможно через Личный кабинет, контактный центр, по команде",
            },
        ]
    }
};

let formData = {
    howPaid: "monthly",
    isPromo: true,
    howDisable: [
        "lk",
        "shop"
    ],
    whereInfo: [
        "lk",
        "callCenter"
    ],
    attractionChannel: [
        "ad",
        "shop"
    ],
    name: "Some name",
    demoPeriod: 30
};

console.log(getJSON(formData));