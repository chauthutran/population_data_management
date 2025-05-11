export const sortList = <T, K extends keyof T>(list: T[], key: K): T[] => {
    return [...list].sort((a, b) => {
        const x = a[key];
        const y = b[key];

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
    });
};
