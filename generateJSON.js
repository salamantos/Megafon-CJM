function getJSON(params) {
    let columns = [];
    // Узнает, подключает
    let attract;
    let connection;
    if (params.isPromo) {
        attract = {name: "Узнаёт", variants: []};
        connection = {name: "Подключает", variants: []};


    } else {
        attract = {name: "Узнаёт/подключает", variants: []};
    }
    if (params.attractionChannel.includes("shop")) {
        attract.variants.push(templates.shopAttract)
    }
    if (params.isPromo) {
        attract.variants.push(templates.promoAttract);
        connection.variants.push(templates.paidConnection);
        connection.variants.push(templates.notPaidConnection);
    }
    if (params.attractionChannel.includes("alreadyInstalled")) {
        attract.variants.push(templates.alreadyInstalledAttract)
    }
    if (params.attractionChannel.includes("ad")) {
        attract.variants.push(templates.adAttract)
    }
    if (params.attractionChannel.includes("operatorCall")) {
        attract.variants.push(templates.operatorCallAttract)
    }
    columns.push(attract);

    // Использует
    let use;
    use = {name: "Использует", variants: []};
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
        use.variants.push({waysWhereInfo: whereInfo})
    }
    if (params.howPaid !== "free") {
        use.variants.push(templates.days10WhereInfo)
    }
    columns.push(use);

    // Реакция на изменения
    let reaction;
    if (params.howPaid !== "free") {
        reaction = {name: "Реакция на изменения", variants: []};
        reaction.variants.push(templates.variantsPaidReaction);
        reaction.variants.push(templates.variantsCallReaction);
        reaction.variants.push(templates.variantsDisableReaction);
    }
    columns.push(reaction);

    // Отключает
    columns.disconnect = {name: "Отключает", variants: []};

    columns = {"states": columns, name: params.name};
    return JSON.stringify(columns);
}

// Пример входящих данных
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