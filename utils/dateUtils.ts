export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZoneName: "short"
    });
    
    return formatter.format(date);
}
