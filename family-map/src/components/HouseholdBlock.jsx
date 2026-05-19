import MemberCard from "./MemberCard.jsx";
import { genBadge } from "../utils.js";

export default function HouseholdBlock({ household, nested = false }) {
  const gen = household.generation;
  const atHome = household.childrenAtHome || [];

  return (
    <section
      className={`household-block${nested ? " household-block--nested" : ""}`}
    >
      <header className="household-block__head">
        <span className="household-block__gen">{genBadge(gen)}</span>
        <div>
          <h3>{household.label}</h3>
          {household.address && (
            <p className="household-block__addr">{household.address}</p>
          )}
        </div>
      </header>

      <div className="member-grid">
        {household.parents?.map((m) => (
          <MemberCard key={m.name} member={m} generation={gen} />
        ))}
      </div>

      {atHome.length > 0 && (
        <>
          <h4 className="household-block__subtitle">
            ילדים בבית ({atHome.length})
          </h4>
          <div className="member-grid member-grid--children">
            {atHome.map((m) => (
              <MemberCard key={m.name} member={m} generation={gen} />
            ))}
          </div>
        </>
      )}

      {(household.gen3Families || []).map((g3) => (
        <HouseholdBlock key={g3.id} household={g3} nested />
      ))}
    </section>
  );
}
