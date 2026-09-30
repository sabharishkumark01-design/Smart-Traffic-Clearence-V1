import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCK6ZypjJRY7z8C2fi0SQjjmEXrCEBz374",
  authDomain: "smart-traffic-clearence-3b519.firebaseapp.com",
  databaseURL: "https://smart-traffic-clearence-3b519-default-rtdb.firebaseio.com/",
  projectId: "smart-traffic-clearence-3b519",
  storageBucket: "smart-traffic-clearence-3b519.firebasestorage.app",
  messagingSenderId: "323315181905",
  appId: "1:323315181905:web:8ea483dabdb350f4098b70",
  measurementId: "G-W1NJL5Q5LD"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function createVehicle(id, data) {
  await set(ref(db, `vehicles/${id}`), {
    ...data,
    active: true,
    lastUpdated: Date.now()
  });
}

export async function updateVehicle(id, data) {
  await update(ref(db, `vehicles/${id}`), {
    ...data,
    active: true,
    lastUpdated: Date.now()
  });
}

export function watchVehicles(callback) {
  return onValue(
    ref(db, "vehicles"),
    snapshot => callback(snapshot.val() || {}),
    error => {
      console.error("Firebase vehicle listener error:", error);
      window.dispatchEvent(new CustomEvent("firebase-error", { detail: error }));
    }
  );
}

export async function deleteVehicle(id) {
  await remove(ref(db, `vehicles/${id}`));
}

export async function publishEmergencyRoute(id, routeData) {
  await set(ref(db, `emergencyRoutes/${id}`), {
    ...routeData,
    emergencyVehicleId: id,
    updatedAt: Date.now()
  });
}

export function watchEmergencyRoutes(callback) {
  return onValue(
    ref(db, "emergencyRoutes"),
    snapshot => callback(snapshot.val() || {}),
    error => {
      console.error("Firebase emergency route listener error:", error);
      window.dispatchEvent(new CustomEvent("firebase-error", { detail: error }));
    }
  );
}

export async function clearEmergencyRoute(id) {
  await remove(ref(db, `emergencyRoutes/${id}`));
}
