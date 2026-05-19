import { avatarColor, initials, roleLabel } from "../utils.js";

export default function MemberCard({ member, generation }) {
  const color = avatarColor(member.name);
  return (
    <article className="member-card">
      <div
        className="member-card__avatar"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      >
        {initials(member.name)}
      </div>
      <div className="member-card__body">
        <h4>{member.name}</h4>
        <p className="member-card__role">
          {roleLabel(member.role, generation)}
        </p>
        {member.birthday && (
          <p className="member-card__detail">
            <span>לועזי:</span> {member.birthday}
          </p>
        )}
        {member.jewishBirthday && (
          <p className="member-card__detail">
            <span>עברי:</span> {member.jewishBirthday}
          </p>
        )}
      </div>
    </article>
  );
}
