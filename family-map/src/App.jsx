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
  }, []);

  const handleSelectTree = useCallback((tree) => {
    setSelectedTree(tree);
    setSelectedLocation(null);
    setSidebarMode("trees");
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

      <div className="app__body">
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
    </div>
  );
}
