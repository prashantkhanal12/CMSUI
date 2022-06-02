export const setToLS = (key: string, value: { [key: string]: string }) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLS = (key: string) => {
    const value = window.localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }
}