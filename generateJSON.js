function getJSON(params) {
    let columns = [];

    let attract = {name: "Узнаёт", variants: []};
    let connection = {name: "Подключает", variants: []};
    if (params.attractionChannel.includes("shop")) {
        /*let temp = steps.shopAttract;
        String.prototype.splice = function (idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };
        console.log("suka1", temp.steps[1].info, temp.steps[1].info.indexOf("%"));
        if (temp.steps[1].info.indexOf("%") >= 0) {
            temp.steps[1].info = temp.steps[1].info.splice(temp.steps[1].info.indexOf("%"), 1, params.demoPeriod);
        }
        attract.variants.push(temp);*/
    }
    let sms = steps.smsInfo;
    if (params.isPromo) {
        /*-let temp = steps.promoAttract;
        String.prototype.splice = function (idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };

        if (temp.info.indexOf("%") >= 0) {
            temp.info = temp.info.splice(temp.indexOf("%"), 1, params.demoPeriod);
        }
        attract.variants.push(temp);*/
        sms = steps.smsPayed;
        let line = [];
        line.push(steps.promoAttract);
        line.push(sms);
        attract.variants.push(line);
        connection.variants.push(steps.paidConnection);
    }
    if (params.attractionChannel.includes("alreadyInstalled")) {
        let line = [];
        line.push(steps.shopAttract);
        line.push(sms);
        attract.variants.push(line);
    }
    if (params.attractionChannel.includes("ad")) {
        let line = [];
        line.push(steps.adAttract);
        line.push(sms);
        attract.variants.push(line);
    }
    if (params.attractionChannel.includes("operatorCall")) {
        let line = [];
        line.push(steps.operatorCallAttract);
        line.push(sms);
        attract.variants.push(line);
    }
    if (params.attractionChannel.includes("sms")) {
        let line = [];
        line.push(steps.operatorCallAttract);
        line.push(sms);
        attract.variants.push(line);
    }

    columns.push(attract);

    // Использует
    let use;
    use = {name: "Использует", variants: []};
    let whereInfo = "Управление возможно в следующих местах: ";
    if (params.whereInfo.includes("lk")) {
        whereInfo += "\nв личном кабинете"
    }
    if (params.whereInfo.includes("callCenter")) {
        whereInfo += "\nв коллцентре"
    }
    if (params.whereInfo.includes("shop")) {
        whereInfo += "\nв магазине"
    }
    if (params.whereInfo.length > 0) {
        let temp = steps.waysWhereInfo;
        temp.info = whereInfo;
        use.variants.push(temp);

    }
    if (params.howPaid !== "free") {
       // use.variants.push(steps.days10WhereInfo)
        use.variants.push(steps.smsTime);
        use.variants.push(steps.smsPayed);
    }
    columns.push(use);

    // Реакция на изменения
    let reaction;
    if (params.howPaid !== "free") {
        reaction = {name: "Реакция на изменения", variants: []};
        reaction.variants.push(steps.PaidReaction);
        reaction.variants.push(steps.CallReaction);
        reaction.variants.push(steps.DisableReaction);
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