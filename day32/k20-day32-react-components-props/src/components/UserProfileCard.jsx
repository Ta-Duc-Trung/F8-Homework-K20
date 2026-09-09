function UserProfileCard({ avatar, fullName, jobTitle, isOnline, skills }) {
  const handleContact = () => {
    alert(`Đang kết nối với ${fullName}...`)
  }

  return (
    <div className="flex w-full max-w-[280px] flex-col items-center gap-3.5 rounded-2xl border border-slate-200 bg-white px-6 pb-6 pt-7 text-center shadow-md shadow-slate-200/60">
      <img
        className="rounded-full border-4 border-teal-50 object-cover"
        style={{ width: 88, height: 88 }}
        src={avatar}
        alt={`Ảnh đại diện của ${fullName}`}
      />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-slate-900">{fullName}</h3>
        <p className="text-sm text-slate-500">{jobTitle}</p>

        <div className="mt-0.5 flex items-center justify-center gap-1.5 text-sm font-medium">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isOnline ? 'bg-emerald-400 ring-4 ring-emerald-100' : 'bg-slate-400'
            }`}
          />
          <span className={isOnline ? 'text-emerald-600' : 'text-slate-500'}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <ul className="mt-1 flex flex-wrap justify-center gap-2 p-0">
        {skills.map((skill) => (
          <li
            key={skill}
            className="list-none rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
          >
            {skill}
          </li>
        ))}
      </ul>

      <button
        className="mt-1.5 w-full rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        onClick={handleContact}
      >
        Liên hệ
      </button>
    </div>
  )
}
export default UserProfileCard