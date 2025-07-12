export const getTagColor = () => {
    const colors = [
        '#E8F5E9',
        '#E3F2FD',
        '#E8F5E9',
        '#FFF8E1',
        '#FFF8E1',
        '#F3E5F5',
        '#E0F7FA',
        '#E0F7FA',
        '#FFEBEE',
    ];

    return colors[Math.floor(Math.random() * colors.length) % 9];
};
