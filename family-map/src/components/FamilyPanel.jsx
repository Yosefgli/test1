import { useEffect, useState } from "react";
import HouseholdBlock from "./HouseholdBlock.jsx";

export default function FamilyPanel({
  location,
  tree,
  initialHouseholdId,
  onClose,
}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (tree) {
      setActiveId(null);
      return;
    }
    if (!location) {
      setActiveId(null);
      return;
    }
    const households = location.households || [];
    setActiveId(
      initialHouseholdId ||
        (households.length === 1 ? households[0].id : null),
    );
  }, [location, tree, initialHouseholdId]);

  if (!location && !tree) {
    return (
      <aside className="family-panel family-panel--empty" aria-live="polite">
        <div className="family-panel__placeholder">
          <span className="family-panel__icon" aria-hidden="true">
            ✦
          </span>
          <h2>בחרו מקום או משפחה</h2>
          <p>
            לחצו על נקודה במפה, על כתובת ברשימה, או על ענף משפחה כדי לראות את
            הקשרים בין הדורות
          </p>
        </div>
      </aside>
    );
  }

  if (tree) {
    return (
      <aside className="family-panel" aria-label={`עץ משפחה ${tree.label}`}>
        <div className="family-panel__header">
          <div>
            <p className="family-panel__eyebrow">עץ משפחתי</p>
            <h2>{tree.label}</h2>
            <p className="family-panel__summary">
              {tree.families?.length || 0} משפחות בדור שני
            </p>
          </div>
          <button
            type="button"
            className="family-panel__close"
            onClick={onClose}
            aria-label="סגור"
          >
            ×
          </button>
        </div>
        <div className="family-panel__content family-panel__content--tree">
          {tree.household && (
            <HouseholdBlock household={tree.household} />
          )}
          {tree.families?.map((g2) => (
            <div key={g2.id} className="tree-branch">
              <HouseholdBlock household={g2} />
            </div>
          ))}
        </div>
      </aside>
    );
  }

  const households = location.households || [];
  const active = households.find((h) => h.id === activeId);

  return (
    <aside className="family-panel" aria-label={`פרטים: ${location.name}`}>
      <div className="family-panel__header">
        <div>
          <p className="family-panel__eyebrow">כתובת</p>
          <h2>{location.address || location.name}</h2>
          <p className="family-panel__summary">
            {location.familyCount} משקי בית · {location.memberCount} אנשים
          </p>
        </div>
        <button
          type="button"
          className="family-panel__close"
          onClick={onClose}
          aria-label="סגור"
        >
          ×
        </button>
      </div>

      {households.length > 1 && (
        <div className="family-tabs" role="tablist">
          {households.map((hh) => (
            <button
              key={hh.id}
              type="button"
              role="tab"
              aria-selected={activeId === hh.id}
              className={`family-tab${
                activeId === hh.id ? " family-tab--active" : ""
              }`}
              onClick={() => setActiveId(hh.id)}
            >
              <span className="family-tab__gen">
                {hh.generation === 1 ? "א׳" : hh.generation === 2 ? "ב׳" : "ג׳"}
              </span>
              {hh.label}
            </button>
          ))}
        </div>
      )}

      <div className="family-panel__content">
        {active ? (
          <>
            {active.path && (
              <p className="family-panel__path">{active.path}</p>
            )}
            <HouseholdBlock household={active} />
          </>
        ) : (
          <p className="family-panel__pick">בחרו משק בית מהרשימה</p>
        )}
      </div>
    </aside>
  );
}
