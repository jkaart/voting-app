const calcPercentage = (value, total) => {
    const percent = Math.round((100 * value) / total);
    return percent;
};
export { calcPercentage };