function UserSkillBadge({ label, value }) {
  if (!value) return null;
  return (
    <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded-full text-xs">
      <strong className="font-semibold">{label}:</strong> {value}
    </span>
  );
}

export default UserSkillBadge;