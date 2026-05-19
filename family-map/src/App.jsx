import { useCallback, useEffect, useMemo, useState } from "react";
import FamilyMap from "./components/FamilyMap.jsx";
import FamilyPanel from "./components/FamilyPanel.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarMode, setSidebarMode] = useState("places");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTree, setSelectedTree] = useState(null);
  const [search, setSearch] = useState("");
  const [mobileTab, setMobileTab] = useState("map");

  useEffect(() => {
    fetch("/families.json")
      .then((res) => {
        if (!res.ok) throw new Error("לא ניתן לטעון את נתוני המשפחות");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  const filteredLocations = useMemo(() => {
    if (!data?.locations) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data.locations;
    return data.locations.filter(
      (loc) =>
        loc.address?.toLowerCase().includes(q) ||
        loc.households?.some(
          (hh) =>
            hh.label?.toLowerCase().includes(q) ||
            hh.members?.some((m) => m.name.toLowerCase().includes(q)),
        ),
    );
  }, [data, search]);

  const filteredTrees = useMemo(() => {
    if (!data?.trees) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data.trees;
    return data.trees.filter(
      (tree) =>
        tree.label?.toLowerCase().includes(q) ||
        tree.families?.some(
          (g2) =>
            g2.label?.toLowerCase().includes(q) ||
            g2.members?.some((m) => m.name.toLowerCase().includes(q)),
        ),
    );
  }, [data, search]);

  const handleSelectLocation = useCallback((loc) => {
    setSelectedLocation(loc);
    setSelectedTree(null);
    setSidebarMode("places");
    setMobileTab("details");
  }, []);

  const handleSelectTree = useCallback((tree) => {
    setSelectedTree(tree);
    setSelectedLocation(null);
    setSidebarMode("trees");
    setMobileTab("details");
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedLocation(null);
    setSelectedTree(null);
  }, []);

  if (error) {
    return (
      <div className="app app--error">
        <p role="alert">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app app--loading">
        <div className="loader" aria-label="טוען נתונים" />
        <p>טוען את מפת המשפחה…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        stats={{
          locations: data.locationCount,
          members: data.memberCount,
          trees: data.treeCount,
        }}
        search={search}
        onSearchChange={setSearch}
      />

      <div className={`app__body app__body--tab-${mobileTab}`}>
        <Sidebar
          mode={sidebarMode}
          onModeChange={setSidebarMode}
          locations={filteredLocations}
          trees={filteredTrees}
          selectedLocationId={selectedLocation?.id}
          selectedTreeId={selectedTree?.id}
          onSelectLocation={handleSelectLocation}
          onSelectTree={handleSelectTree}
        />

        <FamilyMap
          locations={filteredLocations}
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
        />

        <FamilyPanel
          location={selectedLocation}
          tree={selectedTree}
          onClose={handleClosePanel}
        />
      </div>

      <nav className="mobile-tabs" aria-label="ניווט ראשי">
        <button
          type="button"
          className={`mobile-tabs__btn${mobileTab === "map" ? " mobile-tabs__btn--active" : ""}`}
          onClick={() => setMobileTab("map")}
          aria-pressed={mobileTab === "map"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
          </svg>
          <span>מפה</span>
        </button>
        <button
          type="button"
          className={`mobile-tabs__btn${mobileTab === "list" ? " mobile-tabs__btn--active" : ""}`}
          onClick={() => setMobileTab("list")}
          aria-pressed={mobileTab === "list"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
          <span>רשימה</span>
        </button>
        <button
          type="button"
          className={`mobile-tabs__btn${mobileTab === "details" ? " mobile-tabs__btn--active" : ""}`}
          onClick={() => setMobileTab("details")}
          aria-pressed={mobileTab === "details"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <span>פרטים</span>
        </button>
      </nav>
    </div>
  );
}
