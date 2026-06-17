function classifyUser(user) {
    const displayName = user.name ? user.name : "Ẩn danh";
    const isAdult = user.age >= 18;
    const hasEmail = typeof user.email === "string" && user.email !== "";
    const role =
        user.role !== null && user.role !== undefined ? user.role : "guest";
    let status;
    if (user.score >= 80) {
        status = "vip";
    } else if (user.score >= 50) {
        status = "normal";
    } else {
        status = "new";
    }
    const canAccess = isAdult && role !== "guest";
    return {
        displayName,
        isAdult,
        hasEmail,
        role,
        status,
        canAccess,
    };
}
console.log(
    classifyUser({
        name: "Bình",
        age: 22,
        email: "binh@gmail.com",
        score: 85,
        role: "admin",
    }),
);
console.log(
    classifyUser({ name: "An", age: 17, email: "", score: 0, role: null }),
);
console.log(
    classifyUser({
        name: "Chi",
        age: 20,
        email: "chi@gmail.com",
        score: 55,
        role: undefined,
    }),
);
console.log(
    classifyUser({ name: "", age: 30, email: "", score: 80, role: "member" }),
);
console.log(
    classifyUser({
        name: "Duy",
        age: 16,
        email: "duy@gmail.com",
        score: 90,
        role: "admin",
    }),
);
