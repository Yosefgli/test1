export default function LocationList({ locations, selectedId, onSelect }) {
  return (
    <aside className="location-list" aria-label="רשימת מקומות">
      <h2 className="location-list__title">מקומות מגורים</h2>
      <ul className="location-list__items">
        {locations.length === 0 && (
          <li className="location-list__empty">לא נמצאו תוצאות</li>
        )}
        {locations.map((loc) => (
          <li key={loc.id}>
            <button
              type="button"
              className={`location-card${
                selectedId === loc.id ? " location-card--active" : ""
              }`}
              onClick={() => onSelect(loc)}
              aria-pressed={selectedId === loc.id}
            >
              <span className="location-card__name">{loc.name}</span>
              <span className="location-card__meta">
                {loc.familyCount} משפחות · {loc.memberCount} אנשים
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
