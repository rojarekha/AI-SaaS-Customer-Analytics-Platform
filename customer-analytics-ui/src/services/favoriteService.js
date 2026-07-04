const FAVORITE_KEY = "favorite_customers";

export const getFavorites = () => {
    const data = localStorage.getItem(FAVORITE_KEY);
    return data ? JSON.parse(data) : [];
};

export const toggleFavorite = (id) => {

    const favorites = getFavorites();

    if (favorites.includes(id)) {

        const updated = favorites.filter(f => f !== id);

        localStorage.setItem(
            FAVORITE_KEY,
            JSON.stringify(updated)
        );

    } else {

        favorites.push(id);

        localStorage.setItem(
            FAVORITE_KEY,
            JSON.stringify(favorites)
        );

    }

};

export const isFavorite = (id) => {
    return getFavorites().includes(id);
};