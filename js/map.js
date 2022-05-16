mapboxgl.accessToken =
  "pk.eyJ1IjoibGlsaWlhLXIiLCJhIjoiY2t1bGpiM2lvMTN5ODJwcnYxcW5lYWVtYyJ9.9JLLVa0itCn-zkykInIeWg";

const map = new mapboxgl.Map({
  container: "map",
  center: [2.3364, 48.86091],
  zoom: 15.77,
  style: "mapbox://styles/mapbox/light-v10",
});

map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({
  color: "black",
  draggable: true,
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker2 = new mapboxgl.Marker({
  color: "grey",
  draggable: true,
})
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker3 = new mapboxgl.Marker({
  color: "grey",
  draggable: true,
})
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker4 = new mapboxgl.Marker({
  color: "grey",
  draggable: true,
})
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const marker5 = new mapboxgl.Marker({
  color: "grey",
  draggable: true,
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);
