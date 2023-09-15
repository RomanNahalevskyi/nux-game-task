export function extractUserIds(data) {
    const userIdsSet = new Set();
    data.forEach((item) => {
        userIdsSet.add(item.userId);
    });

    const uniqueUserIds = Array.from(userIdsSet);
    const options = [{ value: 'all', label: 'All users' }];

    uniqueUserIds.forEach((userId) => {
        options.push({ value: userId, label: userId });
    });

    return options;
}

export function filterTodosBy(data, filterCriteria) {
    if (filterCriteria === 'all') {
        return data;
    }

    if (filterCriteria === 'completed') {
        return data.filter((item) => item.completed);
    }

    if (filterCriteria === 'uncompleted') {
        return data.filter((item) => !item.completed);
    }

    if (filterCriteria === 'favorites') {
        return data.filter((item) => item.favorite);
    }

    if (typeof filterCriteria === 'string' && !isNaN(Number(filterCriteria))) {
        const userId = Number(filterCriteria);
        return data.filter((item) => Number(item.userId) === userId);
    }

    return data;
}

export function concatFavoritesWithTodos(favoritesArr, currentArr) {
    const indexMap = {};

    favoritesArr.forEach((item) => {
        indexMap[item.id] = item;
    });

    currentArr.forEach((item) => {
        if (indexMap[item.id] && indexMap[item.id].favorite) {
            item.favorite = true;
        }
    });

    return currentArr;
}

export function updateLocalStorage(data) {
    localStorage.setItem('favoritesTodo', JSON.stringify(data));
}

export function getLocalStorageData() {
    const jsonDataFromStorage = localStorage.getItem('favoritesTodo');
    return JSON.parse(jsonDataFromStorage) || [];
}

export function filterStorageData(mainTodosData) {
    const getStorageData = getLocalStorageData();

    const getIdFromMainTodo = mainTodosData.map((item) => item.id);

    return getStorageData.filter((item) => getIdFromMainTodo.includes(item.id));
}

export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

export function generateRandomNumberAbove201() {
    const min = 202;
    const max = 1000;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
