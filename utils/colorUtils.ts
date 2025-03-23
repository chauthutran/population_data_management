// export const getColorFromString = (str: string): string => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     // Generate distinct Hue from hash (0-360 degrees in HSL)
//     const hue = Math.abs(hash % 360);

//     // Set high saturation and varied lightness for better contrast
//     const saturation = 70 + (hash % 5); // Keep saturation between 70-90%
//     const lightness = 40 + (hash % 5); // Keep lightness between 40-70%

//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// };

export const getColorFromString = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Restrict Hue to Blue (180-240°), Green (90-160°), and Yellow (40-60°)
    const hueRanges = [
        [40, 60],   // Yellow
        [90, 160],  // Green
        [180, 240], // Blue
    ];

    // Pick a hue range based on the hash
    const range = hueRanges[Math.abs(hash) % hueRanges.length];
    const hue = range[0] + (Math.abs(hash) % (range[1] - range[0]));

    // Keep strong saturation and balanced lightness for good contrast
    const saturation = 75 + (hash % 15); // Between 75-90%
    const lightness = 45 + (hash % 20); // Between 45-65%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


// Get color for a specific number
export const getColorForNumber = (value: number, minValue: number, maxValue: number) => {
    const percentage = (value - minValue) / (maxValue - minValue); // Normalize to 0-1
    const hue = 60 - percentage * 60; // 60 (yellow) → 0 (red)
    return `hsl(${hue}, 100%, 50%)`; // Adjust lightness for variation
};