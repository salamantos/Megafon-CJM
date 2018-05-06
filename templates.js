var templates = {
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
        steps: [
            {
                id: "1",
                title: "НАВАЛЬНЫЙ",
                icon: "fa fa-mobile-alt",
                info: "Отключение возможно через Личный кабинет, контактный центр, *111#",
            }
        ]
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