export default function Header({ stats, search, onSearchChange }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__eyebrow">מפת המשפחה</span>
        <h1>בעולם</h1>
        <p className="header__subtitle">
          מפה לפי כתובות אמיתיות · עצי משפחה לפי דורות (א׳, ב׳, ג׳)
        </p>
      </div>

      <div className="header__actions">
        <div className="header__stats" aria-label="סטטיסטיקה">
          <span>
            <strong>{stats.locations}</strong> כתובות
          </span>
          <span className="header__stats-divider" aria-hidden="true" />
          <span>
            <strong>{stats.trees}</strong> ענפים
          </span>
          <span className="header__stats-divider" aria-hidden="true" />
          <span>
            <strong>{stats.members}</strong> אנשים
          </span>
        </div>

        <label className="search" htmlFor="family-search">
          <span className="visually-hidden">חיפוש משפחה או מקום</span>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          <input
            id="family-search"
            type="search"
            placeholder="חיפוש לפי שם או עיר…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
          />
        </label>
      </div>
    </header>
  );
}
