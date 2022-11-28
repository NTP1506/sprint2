const GetAge = (dateString) => {
    var today = new Date();
    var age = today.getFullYear() - dateString.getFullYear();
    var m = today.getMonth() - dateString.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateString.getDate())) {
        age--;
    }
    return age;
}

const GetDate = (dateString) => {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1; //January is 0!
    var year = date.getFullYear();

    if (day < 10) {
        day = `0${day}`
    }

    if (month < 10) {
        month = `0${month}`
    }

    return `${year}-${month}-${day}`;
}

const MapObject = (obj, properties) => {
    console.log(obj)
    let result = {};
    properties.forEach(property => {
        result[property] = obj[property]
    });
    return result
}

export {
    GetAge,
    GetDate,

    MapObject,
}