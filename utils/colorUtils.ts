export const getColorFromString = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Pink hue range (300° to 330°) and Orange hue range (30° to 40°)
    // const hueRanges = [
    //     [300, 330],  // Pink
    //     [30, 40],    // Orange
    // ];
    const hueRanges = [
        [180, 210], // Light Blue (Hue 180 to 210) - Soft Blue
        [120, 150], // Light Green (Hue 120 to 150) - Light Mint Green
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
export const getColorForNumber = (
    value: number,
    minValue: number,
    maxValue: number,
) => {
    const percentage = (value - minValue) / (maxValue - minValue); // Normalize to 0-1
    const hue = 60 - percentage * 60; // 60 (yellow) → 0 (red)
    return `hsl(${hue}, 100%, 50%)`; // Adjust lightness for variation
};
