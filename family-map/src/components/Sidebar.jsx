export default function Sidebar({
  mode,
  onModeChange,
  locations,
  trees,
  selectedLocationId,
  selectedTreeId,
  onSelectLocation,
  onSelectTree,
}) {
  return (
    <aside className="sidebar" aria-label="ניווט">
      <div className="sidebar__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "places"}
          className={`sidebar__tab${mode === "places" ? " sidebar__tab--active" : ""}`}
          onClick={() => onModeChange("places")}
        >
          מקומות
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "trees"}
          className={`sidebar__tab${mode === "trees" ? " sidebar__tab--active" : ""}`}
          onClick={() => onModeChange("trees")}
        >
          עצי משפחה
        </button>
      </div>

      <ul className="sidebar__list">
        {mode === "places" &&
          locations.map((loc) => (
            <li key={loc.id}>
              <button
                type="button"
                className={`location-card${
                  selectedLocationId === loc.id ? " location-card--active" : ""
                }`}
                onClick={() => onSelectLocation(loc)}
                aria-pressed={selectedLocationId === loc.id}
              >
                <span className="location-card__name">
                  {loc.address?.split(",")[0] || loc.name}
                </span>
                <span className="location-card__meta">
                  {loc.familyCount} משקי בית · {loc.memberCount} אנשים
                </span>
              </button>
            </li>
          ))}

        {mode === "trees" &&
          trees.map((tree) => (
            <li key={tree.id}>
              <button
                type="button"
                className={`location-card${
                  selectedTreeId === tree.id ? " location-card--active" : ""
                }`}
                onClick={() => onSelectTree(tree)}
                aria-pressed={selectedTreeId === tree.id}
              >
                <span className="location-card__name">{tree.label}</span>
                <span className="location-card__meta">
                  {tree.families?.length || 0} משפחות · דור ראשון
                </span>
              </button>
            </li>
          ))}

        {mode === "places" && locations.length === 0 && (
          <li className="sidebar__empty">לא נמצאו מקומות</li>
        )}
        {mode === "trees" && trees.length === 0 && (
          <li className="sidebar__empty">לא נמצאו עצים</li>
        )}
      </ul>
    </aside>
  );
}
