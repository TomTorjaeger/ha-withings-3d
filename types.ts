export interface HassEntity {
  entity_id: string;
  state: string | number;
  attributes: {
    unit_of_measurement?: string;
    friendly_name?: string;
    device_class?: string;
    last_reset?: string;
    state_class?: string;
    [key: string]: any;
  };
}

export interface HomeAssistant {
  states: { [key: string]: HassEntity };
  user: {
    name: string;
    is_owner: boolean;
    is_admin: boolean;
  };
  // Weitere HA Properties bei Bedarf
}

export interface LovelaceCardConfig {
  type: string;
  header?: string;
  // Hier können wir eigene Konfigurationsoptionen definieren, z.B. custom entity IDs
}

export interface HealthData {
  [key: string]: HassEntity;
}