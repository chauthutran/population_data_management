// export const getRandomColor = () => {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// };

export const getColorFromString = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate distinct Hue from hash (0-360 degrees in HSL)
    const hue = Math.abs(hash % 360);

    // Set high saturation and varied lightness for better contrast
    const saturation = 70 + (hash % 20); // Keep saturation between 70-90%
    const lightness = 40 + (hash % 30); // Keep lightness between 40-70%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


// Get color for a specific number
export const getColorForNumber = (value: number, minValue: number, maxValue: number) => {
    const percentage = (value - minValue) / (maxValue - minValue); // Normalize to 0-1
    const hue = 60 - percentage * 60; // 60 (yellow) → 0 (red)
    return `hsl(${hue}, 100%, 50%)`; // Adjust lightness for variation
};