import UserSkillBadge from "./UserSkillBadge.jsx";
function UserProfileCard({ user }) {
    const fullName = `${user.firstName} ${user.lastName}`;
    const jobTitle = `${user.company?.title || "Chưa rõ chức danh"} - ${
        user.company?.name || "Chưa rõ công ty"
    }`;
    const isOnline = user.age > 25;
    const infoBadges = [
        { label: "Vai trò", value: user.role },
        { label: "Giới tính", value: user.gender },
        { label: "Nhóm máu", value: user.bloodGroup },
        { label: "Phòng ban", value: user.company?.department },
    ];
    const handleContactClick = () => {
        alert(`Đang kết nối với ${user.firstName} qua email ${user.email}...`);
    };
    return (
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <img
                src={user.image}
                alt={`Avatar của ${fullName}`}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 my-1">
                {fullName}
            </h2>
            <p className="text-sm text-gray-500 mb-3">{jobTitle}</p>
            <div className="flex items-center justify-center gap-1.5 mb-4 text-sm text-gray-600">
                <span
                    className={`w-2.5 h-2.5 rounded-full inline-block ${
                        isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                ></span>
                {isOnline ? "Online" : "Offline"}
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-5">
                {infoBadges.map((item) => (
                    <UserSkillBadge
                        key={item.label}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </div>
            <button
                className="px-5 py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                onClick={handleContactClick}
            >
                Liên hệ
            </button>
        </div>
    );
}
export default UserProfileCard;
