import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue
} from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";


/* =====================================================
   FIREBASE CONFIGURATION
   =====================================================

   REPLACE THESE VALUES WITH YOUR FIREBASE CONFIG.

   Firebase Console
   → Project Settings
   → Your Apps
   → Web App
*/

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

/* INITIALIZE FIREBASE */

const app =
  initializeApp(firebaseConfig);


/* REALTIME DATABASE */

const database =
  getDatabase(app);


/* =====================================================
   CREATE VEHICLE
   ===================================================== */

export async function createVehicle(
  vehicleId,
  vehicleData
) {

  const vehicleReference =
    ref(
      database,
      `vehicles/${vehicleId}`
    );


  await set(
    vehicleReference,
    {

      ...vehicleData,

      active: true,

      lastUpdated:
        Date.now()

    }
  );

}


/* =====================================================
   UPDATE VEHICLE LOCATION
   ===================================================== */

export async function updateVehicleLocation(
  vehicleId,
  latitude,
  longitude,
  speed,
  heading
) {

  const vehicleReference =
    ref(
      database,
      `vehicles/${vehicleId}`
    );


  await update(
    vehicleReference,
    {

      latitude:
        latitude,

      longitude:
        longitude,

      speed:
        speed || 0,

      heading:
        heading ?? null,

      lastUpdated:
        Date.now(),

      active:
        true

    }
  );

}


/* =====================================================
   LISTEN TO ALL VEHICLES
   ===================================================== */

export function listenToVehicles(
  callback
) {

  const vehiclesReference =
    ref(
      database,
      "vehicles"
    );


  return onValue(
    vehiclesReference,
    snapshot => {

      const data =
        snapshot.val();


      callback(
        data || {}
      );

    }
  );

}


/* =====================================================
   REMOVE VEHICLE
   ===================================================== */

export async function removeVehicle(
  vehicleId
) {

  const vehicleReference =
    ref(
      database,
      `vehicles/${vehicleId}`
    );


  await remove(
    vehicleReference
  );

}
