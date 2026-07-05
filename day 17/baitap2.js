const comments = [
    {
        id: 1,
        user: "An",
        content: "Sản phẩm rất tốt!",
        rating: 5,
        verified: true,
        likes: 12,
    },
    { id: 2, user: "", content: "ok", rating: 3, verified: false, likes: 0 },
    {
        id: 3,
        user: "Bình",
        content: "Mua lần 2 rồi, vẫn chất lượng",
        rating: 4,
        verified: true,
        likes: 8,
    },
    {
        id: 4,
        user: "Chi",
        content: "   ",
        rating: null,
        verified: false,
        likes: 2,
    },
    {
        id: 5,
        user: "Duy",
        content: "Giao hàng nhanh, đóng gói cẩn thận, sẽ ủng hộ tiếp!",
        rating: 5,
        verified: true,
        likes: 20,
    },
    {
        id: 6,
        user: null,
        content: "Tệ quá",
        rating: 1,
        verified: false,
        likes: 0,
    },
    {
        id: 7,
        user: "Em",
        content: "Bình thường",
        rating: 3,
        verified: true,
        likes: 1,
    },
];

// hàm 1/
function isValidComment(comment) {
    return (
        typeof comment.user === "string" &&
        comment.user.trim() !== "" &&
        typeof comment.content === "string" &&
        comment.content.trim().length >= 5 &&
        typeof comment.rating === "number" &&
        comment.rating >= 1 &&
        comment.rating <= 5
    );
}
console.log(
    isValidComment({
        id: 1,
        user: "An",
        content: "Sản phẩm rất tốt!",
        rating: 5,
        verified: true,
        likes: 12,
    }),
);
// hàm 2/
function filterValidComments(comments) {
    return comments.filter(isValidComment);
}
console.log(filterValidComments(comments));
// hàm 3/

function getCommentStats(validComments) {
    let total = validComments.length;
    let totalRating = validComments.reduce(
        (sum, comment) => sum + comment.rating,
        0,
    );
    let totalLikes = validComments.reduce(
        (sum, comment) => sum + comment.likes,
        0,
    );
    let verifiedCount = validComments.filter(
        (comment) => comment.verified,
    ).length;
    let topComment = validComments.reduce((max, comment) =>
        comment.likes > max.likes ? comment : max,
    );
    return {
        total,
        avgRating: Number((totalRating / total).toFixed(1)),
        totalLikes,
        verifiedCount,
        topComment,
    };
}
const validComments = filterValidComments(comments);

console.log(getCommentStats(validComments));
// hàm 4 /
function formatComment(comment) {
    let stars = "⭐".repeat(comment.rating);
    let userName = comment.user ?? "Ẩn danh";
    let verified = comment.verified ? " ✓" : "";
    return `${stars}| ${userName}${verified}| ${comment.content} | 👍 ${comment.likes}`;
}
console.log(formatComment(comments[3]));
