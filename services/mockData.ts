import { HealthData } from '../types';

export const MOCK_WITHINGS_DATA: HealthData = {
  "sensor.withings_aktive_zeit_heute": {
    entity_id: "sensor.withings_aktive_zeit_heute",
    state: 0.0,
    attributes: { unit_of_measurement: "h", friendly_name: "Aktive Zeit heute" }
  },
  "sensor.withings_diastolischer_blutdruck": {
    entity_id: "sensor.withings_diastolischer_blutdruck",
    state: 70,
    attributes: { unit_of_measurement: "mmHg", friendly_name: "Diastolischer Blutdruck" }
  },
  "sensor.withings_systolischer_blutdruck": {
    entity_id: "sensor.withings_systolischer_blutdruck",
    state: 112,
    attributes: { unit_of_measurement: "mmHg", friendly_name: "Systolischer Blutdruck" }
  },
  "sensor.withings_fettanteil": {
    entity_id: "sensor.withings_fettanteil",
    state: 11.6,
    attributes: { unit_of_measurement: "%", friendly_name: "Fettanteil" }
  },
  "sensor.withings_fettfreie_masse": {
    entity_id: "sensor.withings_fettfreie_masse",
    state: 56.84,
    attributes: { unit_of_measurement: "kg", friendly_name: "Fettfreie Masse" }
  },
  "sensor.withings_fettmasse": {
    entity_id: "sensor.withings_fettmasse",
    state: 7.46,
    attributes: { unit_of_measurement: "kg", friendly_name: "Fettmasse" }
  },
  "sensor.withings_gesamtkalorienverbrauch_heute": {
    entity_id: "sensor.withings_gesamtkalorienverbrauch_heute",
    state: 1575.991,
    attributes: { unit_of_measurement: "kcal", friendly_name: "Gesamtkalorien" }
  },
  "sensor.withings_gewicht": {
    entity_id: "sensor.withings_gewicht",
    state: 65.975,
    attributes: { unit_of_measurement: "kg", friendly_name: "Gewicht" }
  },
  "sensor.withings_zielgewicht": {
    entity_id: "sensor.withings_zielgewicht",
    state: 64.5,
    attributes: { unit_of_measurement: "kg", friendly_name: "Zielgewicht" }
  },
  "sensor.withings_herzschlag": {
    entity_id: "sensor.withings_herzschlag",
    state: 79,
    attributes: { unit_of_measurement: "bpm", friendly_name: "Herzschlag" }
  },
  "sensor.withings_heute_aktiv_verbrannte_kalorien": {
    entity_id: "sensor.withings_heute_aktiv_verbrannte_kalorien",
    state: 3.43,
    attributes: { unit_of_measurement: "kcal", friendly_name: "Aktiv Kalorien" }
  },
  "sensor.withings_heute_zuruckgelegte_strecke": {
    entity_id: "sensor.withings_heute_zuruckgelegte_strecke",
    state: 93.58,
    attributes: { unit_of_measurement: "m", friendly_name: "Strecke" }
  },
  "sensor.withings_knochenmasse": {
    entity_id: "sensor.withings_knochenmasse",
    state: 2.35,
    attributes: { unit_of_measurement: "kg", friendly_name: "Knochenmasse" }
  },
  "sensor.withings_muskelmasse": {
    entity_id: "sensor.withings_muskelmasse",
    state: 54.48,
    attributes: { unit_of_measurement: "kg", friendly_name: "Muskelmasse" }
  },
  "sensor.withings_pulswellengeschwindigkeit": {
    entity_id: "sensor.withings_pulswellengeschwindigkeit",
    state: 6.398,
    attributes: { unit_of_measurement: "m/s", friendly_name: "Pulswelle" }
  },
  "sensor.withings_schritte_heute": {
    entity_id: "sensor.withings_schritte_heute",
    state: 123,
    attributes: { unit_of_measurement: "steps", friendly_name: "Schritte" }
  },
  "sensor.withings_schrittziel": {
    entity_id: "sensor.withings_schrittziel",
    state: 10000,
    attributes: { unit_of_measurement: "steps", friendly_name: "Schrittziel" }
  },
  "sensor.withings_spo2": {
    entity_id: "sensor.withings_spo2",
    state: 100,
    attributes: { unit_of_measurement: "%", friendly_name: "SpO₂" }
  },
};