// src/utils/delivery.js

// ======================================================
// HAVERSINE — distance between two coords (km)
// ======================================================
export function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ======================================================
// TIME HELPERS
// ======================================================
function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function nowInMinutes() {
  // Use Pakistan time regardless of user's device timezone
  const now = new Date();
  const pkTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Karachi" })
  );
  return pkTime.getHours() * 60 + pkTime.getMinutes();
}

export function isOpenNow(hours) {
  if (!hours?.open || !hours?.close) return false;
  const open = timeToMinutes(hours.open);
  const close = timeToMinutes(hours.close);
  const now = nowInMinutes();

  // Overnight (e.g. 11:00 → 02:00)
  if (close < open) return now >= open || now < close;
  return now >= open && now < close;
}

export function formatTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

// ======================================================
// FIND OUTLETS FOR USER
// ======================================================
export function findOutletsForUser(userCoords, outlets) {
  return outlets
    .map((outlet) => {
      const distanceKm = getDistanceKm(
        userCoords.lat,
        userCoords.lng,
        outlet.coords.lat,
        outlet.coords.lng
      );

      const withinRadius = distanceKm <= outlet.deliveryRadiusKm;
      const storeOpen = isOpenNow(outlet.hours);
      const deliveryOpen = isOpenNow(outlet.deliveryHours);

      return {
        ...outlet,
        distanceKm: Math.round(distanceKm * 10) / 10,
        withinRadius,
        storeOpen,
        deliveryOpen,
        canDeliver: withinRadius && storeOpen && deliveryOpen,
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}