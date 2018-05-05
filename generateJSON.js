function getBase(params) {
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
        columns.reaction.variants.push(templates.variantsReaction)
    }

    // Отключает
    columns.disconnect = {name: "Отключает", variants: []};

    return JSON.stringify(columns);
}

let templates = {
    shopAttract: {
        name: "Чета там"
    },

    promoAttract: {},
    paidConnection: {},
    notPaidConnection: {},
    alreadyInstalledAttract: {},
    adAttract: {},
    operatorCallAttract: {},
    waysWhereInfo: {waysWhereInfo: []},
    lkWhereInfo: {},
    callCenterWhereInfo: {},
    shopWhereInfo: {},
    days10WhereInfo: {},
    variantsReaction: {}
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

console.log(getBase(formData));