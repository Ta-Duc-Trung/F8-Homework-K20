function analyzeClass(scores) {
    let excellent = 0;
    let good = 0;
    let fairlyGood = 0;
    let averageLevel = 0;
    let weak = 0;

    let invalidCount = 0;
    let validCount = 0;
    let totalScore = 0;

    let highestScore = null;
    let lowestScore = null;

    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];

        if (score < 0 || score > 10) {
            invalidCount++;
        } else {
            validCount++;
            totalScore += score;

            if (highestScore === null) {
                highestScore = score;
            } else if (score > highestScore) {
                highestScore = score;
            }

            if (lowestScore === null) {
                lowestScore = score;
            } else if (score < lowestScore) {
                lowestScore = score;
            }

            if (score >= 9) {
                excellent++;
            } else if (score >= 8) {
                good++;
            } else if (score >= 6.5) {
                fairlyGood++;
            } else if (score >= 5) {
                averageLevel++;
            } else {
                weak++;
            }
        }
    }
    let averageScore = 0;

    if (validCount > 0) {
        averageScore = totalScore / validCount;

        averageScore = Math.round(averageScore * 100) / 100;
    }

      let comment = "";

    if (validCount === 0) {
        comment = "No valid data";
    } else {
        let fairlyGoodOrHigher = excellent + good + fairlyGood;

        if (fairlyGoodOrHigher > validCount / 2) {
            comment = "Class performance is good";
        } else if (weak > validCount / 2) {
            comment = "Needs improvement";
        } else {
            comment = "Class performance is average";
        }
    }

    return {
        validStudents: validCount,
        invalidScores: invalidCount,

        excellent,
        good,
        fairlyGood,
        averageLevel,
        weak,

        highestScore,
        lowestScore,
        averageScore,

        comment,
    };
}

// Test
console.log(analyzeClass([9, 7, -2, 5.5, 10, 4, 11, 6.5, 8]));
