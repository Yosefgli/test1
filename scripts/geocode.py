import json
import time
from pathlib import Path

from geopy.geocoders import Nominatim

LOCATIONS = [
    "Akron, OH, USA",
    "Athens, OH, USA",
    "Atlanta, GA, USA",
    "Bahia Blanca, Argentina",
    "Budapest, Hungary",
    "Chagrin Falls, OH, USA",
    "Cleveland, Ohio, USA",
    "Cracow, Poland",
    "Crown Heights, Brooklyn, NY, USA",
    "Downtown Cleveland, OH, USA",
    "Kent, OH, USA",
    "Lod, Israel",
    "London, England, UK",
    "Lyndhurst, Ohio, USA",
    "Ma'ale Ephraim, Israel",
    "Migdal Ha'amek, Israel",
    "Munich, Germany",
    "New York City, NY, USA",
    "Ningbo, China",
    "Ofarim, Israel",
    "Ora-Aminadav, Israel",
    "Parkland, FL, USA",
    "Phuket, Thailand",
    "Ramot Hashavim, Israel",
    "Shanghai, China",
    "Solon, OH, USA",
    "Thane, India",
    "The Bronx, NY, USA",
    "Twinsburg, OH, USA",
    "Tzur Itzchak, Israel",
    "Winter Park, FL, USA",
    "Cleveland Heights, OH, USA",
]

geolocator = Nominatim(user_agent="family-world-map/1.0")
coords = {}

for loc in LOCATIONS:
    time.sleep(1.1)
    result = geolocator.geocode(loc)
    if result:
        coords[loc] = {"lat": result.latitude, "lng": result.longitude}
        print(f"OK  {loc} -> {result.latitude}, {result.longitude}")
    else:
        print(f"FAIL {loc}")

out = Path(__file__).parent.parent / "family-map" / "public" / "geocode-cache.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(coords, indent=2), encoding="utf-8")
print(f"Wrote {out}")
