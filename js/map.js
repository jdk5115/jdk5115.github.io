// Interactive 3D city map — MapLibre GL + OpenFreeMap (OpenStreetMap data, no API key)
const CITIES = {
  nyc:     { center: [-74.0066, 40.7135], zoom: 15.4, pitch: 60, bearing: -20, label: "New York" },
  chicago: { center: [-87.6278, 41.8819], zoom: 15.2, pitch: 60, bearing: 10,  label: "Chicago" },
  philly:  { center: [-75.1652, 39.9526], zoom: 15.2, pitch: 60, bearing: -15, label: "Philadelphia" },
  seattle: { center: [-122.3355, 47.6080], zoom: 15.2, pitch: 60, bearing: 20, label: "Seattle" },
};

const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: CITIES.nyc.center,
  zoom: CITIES.nyc.zoom,
  pitch: CITIES.nyc.pitch,
  bearing: CITIES.nyc.bearing,
  antialias: true,
});
map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

let buildings3d = true;
const LAYER_ID = "jk-3d-buildings";

map.on("load", () => {
  add3dBuildings();
});

function add3dBuildings() {
  if (map.getLayer(LAYER_ID)) return;
  // Find the first symbol layer so buildings render beneath labels
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (l) => l.type === "symbol" && l.layout && l.layout["text-field"]
  )?.id;

  map.addLayer(
    {
      id: LAYER_ID,
      source: "openmaptiles",
      "source-layer": "building",
      type: "fill-extrusion",
      minzoom: 13,
      paint: {
        "fill-extrusion-color": [
          "interpolate", ["linear"], ["coalesce", ["get", "render_height"], 0],
          0, "#ccd8ec",
          50, "#29b5e8",
          150, "#7c5cff",
          250, "#ec4d9b",
          350, "#ff8a3d",
        ],
        "fill-extrusion-height": [
          "interpolate", ["linear"], ["zoom"],
          13, 0,
          14.5, ["coalesce", ["get", "render_height"], 8],
        ],
        "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
        "fill-extrusion-opacity": 0.85,
      },
    },
    labelLayerId
  );
}

function remove3dBuildings() {
  if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
}

// City buttons
document.querySelectorAll(".map-btn[data-city]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".map-btn[data-city]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    stopOrbit();
    const c = CITIES[btn.dataset.city];
    map.flyTo({ center: c.center, zoom: c.zoom, pitch: c.pitch, bearing: c.bearing, duration: 3500, essential: true });
  });
});

// 3D toggle
document.getElementById("toggle-3d").addEventListener("click", () => {
  buildings3d = !buildings3d;
  if (buildings3d) {
    add3dBuildings();
    map.easeTo({ pitch: 60, duration: 800 });
  } else {
    remove3dBuildings();
    map.easeTo({ pitch: 0, duration: 800 });
  }
});

// Orbit animation
let orbiting = false;
let orbitFrame;
function orbit() {
  if (!orbiting) return;
  map.rotateTo(map.getBearing() + 0.08, { duration: 0 });
  orbitFrame = requestAnimationFrame(orbit);
}
function stopOrbit() {
  orbiting = false;
  if (orbitFrame) cancelAnimationFrame(orbitFrame);
  document.getElementById("spin-btn").classList.remove("active");
}
document.getElementById("spin-btn").addEventListener("click", function () {
  orbiting = !orbiting;
  this.classList.toggle("active", orbiting);
  if (orbiting) orbit();
  else stopOrbit();
});
map.on