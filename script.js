let map, marker;

// ===== GEO + BUILDINGS MAP =====
document.getElementById("locBtn").onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude, accuracy } = pos.coords;

    lat.textContent = latitude.toFixed(5);
    lon.textContent = longitude.toFixed(5);
    acc.textContent = accuracy.toFixed(1);

    if (!map) {
      map = L.map("map", { preferCanvas: true })
        .setView([latitude, longitude], 18);

      // خريطة حديثة تُظهر المباني
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { maxZoom: 20 }
      ).addTo(map);

      marker = L.marker([latitude, longitude]).addTo(map);
    } else {
      map.setView([latitude, longitude], 18);
      marker.setLatLng([latitude, longitude]);
    }
  });
};

// ===== IP INFO =====
document.getElementById("ipBtn").onclick = () => {
  fetch("https://ipapi.co/json/")
    .then(r => r.json())
    .then(d => {
      ip.textContent = d.ip;
      country.textContent = d.country_name;
      city.textContent = d.city;
      isp.textContent = d.org;
    });
};

// ===== TERMINAL SIM =====
cmd.onkeydown = e => {
  if (e.key === "Enter") {
    terminal.innerHTML += `<div>> ${cmd.value}</div>`;
    terminal.innerHTML += `<div style="color:#888">[simulation output]</div>`;
    cmd.value = "";
    terminal.scrollTop = terminal.scrollHeight;
  }
};
