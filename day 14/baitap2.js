function calculateScore(level, kills, boosted) {
    if (
        typeof level !== "number" ||
        typeof kills !== "number" ||
        level < 0 ||
        kills < 0 ||
        Number.isNaN(level) ||
        Number.isNaN(kills)
    ) {
        return "Dữ liệu không hợp lệ";
    }
    boosted = typeof boosted === "boolean" ? boosted : false;
    const baseScore = kills * 10;
    const bonusScore = baseScore * (level >= 5 ? 0.5 : 0.2);
    const totalScore = baseScore + bonusScore;
    return Math.floor(boosted ? totalScore * 2 : totalScore);
}

console.log(calculateScore(5, 20, true));
console.log(calculateScore(3, 10, false));
console.log(calculateScore(5, 15, false));
console.log(calculateScore(1, 50, true));
console.log(calculateScore(-1, 10, true));
console.log(calculateScore(2, -5, false));
console.log(calculateScore("abc", 10, true));
console.log(calculateScore(2, "abc", false));
console.log(calculateScore(5, 15, null));
console.log(calculateScore(5, 15, "yes"));
console.log(calculateScore(5, 15, undefined));
