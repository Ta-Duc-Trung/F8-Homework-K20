const players = [
    {
        id: 1,
        name: "DragonSlayer",
        scores: [120, 85, 200, 95],
        level: 8,
        badge: "gold",
    },
    { id: 2, name: "NightWolf", scores: [60, 75, 50], level: 5, badge: null },
    {
        id: 3,
        name: "StarQueen",
        scores: [300, 250, 180, 90, 120],
        level: 12,
        badge: "diamond",
    },
    { id: 4, name: "IronFist", scores: [40, 30], level: 2, badge: null },
    {
        id: 5,
        name: "ShadowBlade",
        scores: [150, 200, 175],
        level: 9,
        badge: "silver",
    },
];

// hàm 1/
function getTotalScore(player) {
    return player.scores.reduce((sum, score) => sum + score, 0);
}
console.log(getTotalScore(players[0]));

console.log(getTotalScore(players[1]));

console.log(getTotalScore(players[2]));
// hàm 2/
function getRanking(players) {
    const step1 = players.map((player) => ({
        name: player.name,
        totalScore: getTotalScore(player),
        badge: player.badge ?? "none",
    }));

    const step2 = step1.sort((a, b) => b.totalScore - a.totalScore);

    const step3 = step2.map((item, index) => ({
        rank: index + 1,
        ...item,
    }));

    return step3;
}

console.log(getRanking(players));
// hàm 3/

function getTopPlayers(players, n) {
    const ranking = getRanking(players);
    const topPlayers = ranking.slice(0, n).map((item) => item.name);
    return topPlayers;
}
console.log(getTopPlayers(players, 3));
// hàm 4/
function formatPlayerCard(player) {
    let badge = "";

    switch (player.badge) {
        case "diamond":
            badge = "💎 DIAMOND";
            break;

        case "gold":
            badge = "🏅 GOLD";
            break;

        case "silver":
            badge = "🥈 SILVER";
            break;

        default:
            badge = "";
    }
    return `${player.name} | Lv.${player.level} | ${getTotalScore(player)} điểm | ${badge ? `${badge}` : ""}`;
}
console.log(formatPlayerCard(players[0]));
console.log(formatPlayerCard(players[1]));
console.log(formatPlayerCard(players[2]));
