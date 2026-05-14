export const calculateHealthMetrics = (
    foodLogs,
    user
) => {

    if (!foodLogs || foodLogs.length === 0) {
        return {
            healthScore: 0
        };
    }

    let multiplier = 1;

    const gender =
        user.gender?.toLowerCase();

    const goal =
        user.goal?.toLowerCase();

    if (gender === "male") {

        if (goal === "fat loss") {
            multiplier = 1.5;
        }
        else if (goal === "muscle gain") {
            multiplier = 2.0;
        }
        else {
            multiplier = 1.0;
        }

    }
    else if (gender === "female") {

        if (goal === "fat loss") {
            multiplier = 1.3;
        }
        else if (goal === "muscle gain") {
            multiplier = 1.8;
        }
        else {
            multiplier = 0.9;
        }

    }

    const proteinTarget =
        user.weight * multiplier;


    const totalProtein = foodLogs.reduce(
        (sum, meal) => sum + meal.protein,
        0
    );

    const proteinScore = Math.min(
        (totalProtein / proteinTarget) * 100,
        100
    );



    const junkMeals = foodLogs.filter(
        meal => meal.category === "junk"
    ).length;

    const junkPercent =
        (junkMeals / foodLogs.length) * 100;

    const junkScore =
        100 - junkPercent;



    const totalSugar = foodLogs.reduce(
        (sum, meal) => sum + meal.sugar,
        0
    );

    let sugarScore = 100;

    if (totalSugar > 25) {
        sugarScore = Math.max(
            100 - ((totalSugar - 25) * 2),
            0
        );
    }



    const uniqueDays = new Set(
        foodLogs.map(
            meal =>
                new Date(meal.date)
                    .toDateString()
        )
    );

    const consistencyScore =
        Math.min(
            (uniqueDays.size / 7) * 100,
            100
        );



    const healthScore =
        (proteinScore * 0.35) +
        (junkScore * 0.25) +
        (sugarScore * 0.20) +
        (consistencyScore * 0.20);


    return {
        proteinTarget:
            Math.round(proteinTarget),

        totalProtein,
        totalSugar,

        proteinScore:
            Math.round(proteinScore),

        junkScore:
            Math.round(junkScore),

        sugarScore:
            Math.round(sugarScore),

        consistencyScore:
            Math.round(consistencyScore),

        healthScore:
            Math.round(healthScore)
    };
};