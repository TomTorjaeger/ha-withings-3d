import React, { useMemo } from 'react';
import { 
  Heart, 
  Activity, 
  Scale, 
  Zap, 
  Flame, 
  Droplets, 
  Gauge, 
  Footprints,
  Percent,
  Bone
} from 'lucide-react';
import { Avatar3D } from './components/Avatar3D';
import { StatCard } from './components/StatCard';
import { HomeAssistant, LovelaceCardConfig, HealthData } from './types';
import { MOCK_WITHINGS_DATA } from './services/mockData';

interface AppProps {
  hass?: HomeAssistant;
  config?: LovelaceCardConfig;
}

const App: React.FC<AppProps> = ({ hass, config }) => {
  // Fallback zu Mock Data, wenn wir nicht in Home Assistant sind (zum Testen im Browser)
  const isDev = !hass;
  
  // Wir bauen uns ein Daten-Objekt zusammen, das entweder aus echten HA-Daten oder Mock-Daten besteht
  const data: HealthData = useMemo(() => {
    if (isDev || !hass) return MOCK_WITHINGS_DATA;

    const relevantSensors = [
      "sensor.withings_aktive_zeit_heute",
      "sensor.withings_diastolischer_blutdruck",
      "sensor.withings_systolischer_blutdruck",
      "sensor.withings_fettanteil",
      "sensor.withings_fettfreie_masse",
      "sensor.withings_fettmasse",
      "sensor.withings_gesamtkalorienverbrauch_heute",
      "sensor.withings_gewicht",
      "sensor.withings_zielgewicht",
      "sensor.withings_herzschlag",
      "sensor.withings_heute_aktiv_verbrannte_kalorien",
      "sensor.withings_heute_zuruckgelegte_strecke",
      "sensor.withings_knochenmasse",
      "sensor.withings_muskelmasse",
      "sensor.withings_pulswellengeschwindigkeit",
      "sensor.withings_schritte_heute",
      "sensor.withings_schrittziel",
      "sensor.withings_spo2"
    ];

    const mappedData: HealthData = {};
    relevantSensors.forEach(id => {
      if (hass.states[id]) {
        mappedData[id] = hass.states[id];
      }
    });
    return mappedData;
  }, [hass, isDev]);

  const get = (key: string) => data[`sensor.withings_${key}`];

  return (
    // Wir nutzen hier w-full statt min-h-screen, damit es in die HA Karte passt
    <div className="w-full h-full bg-[#0b0f19] text-white p-4 font-sans selection:bg-blue-500/30 rounded-xl">
      
      {/* Header - Optional via Config in HA ausblendbar */}
      {config?.header !== 'false' && (
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              {config?.header || "Health Dashboard"}
            </h1>
            <p className="text-gray-400 text-xs mt-1">Withings Ecosystem</p>
          </div>
          {isDev && <div className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">DEV MODE</div>}
        </header>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Left Column: 3D Visualization */}
        <div className="h-[500px] flex flex-col">
          <Avatar3D data={data} />
        </div>

        {/* Right Column: Detailed Grid */}
        <div className="flex flex-col gap-4">
          
          {/* Main Stats Row - Cardio */}
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Heart size={14} className="text-red-500" /> Cardiovascular
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard entity={get('herzschlag')} icon={Heart} colorClass="text-red-500" />
              <StatCard entity={get('systolischer_blutdruck')} labelOverride="Systolic" icon={Gauge} colorClass="text-orange-400" />
              <StatCard entity={get('diastolischer_blutdruck')} labelOverride="Diastolic" icon={Gauge} colorClass="text-orange-300" />
              <StatCard entity={get('pulswellengeschwindigkeit')} labelOverride="Pulse Wave" icon={Activity} colorClass="text-purple-400" />
            </div>
          </section>

          {/* Activity Row */}
          <section>
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Flame size={14} className="text-orange-500" /> Activity
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard entity={get('schritte_heute')} icon={Footprints} colorClass="text-green-400" />
              <StatCard entity={get('heute_zuruckgelegte_strecke')} labelOverride="Distance" icon={Activity} colorClass="text-blue-400" />
              <StatCard entity={get('heute_aktiv_verbrannte_kalorien')} labelOverride="Active Cal" icon={Flame} colorClass="text-orange-500" />
              <StatCard entity={get('gesamtkalorienverbrauch_heute')} labelOverride="Total Burn" icon={Zap} colorClass="text-yellow-400" />
            </div>
          </section>

          {/* Body Composition Detailed */}
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Scale size={14} className="text-blue-500" /> Composition
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
               <StatCard entity={get('fettanteil')} labelOverride="Fat %" icon={Percent} colorClass="text-yellow-200" />
               <StatCard entity={get('fettmasse')} labelOverride="Fat kg" icon={Droplets} colorClass="text-yellow-600" />
               <StatCard entity={get('muskelmasse')} labelOverride="Muscle" icon={Zap} colorClass="text-red-400" />
               <StatCard entity={get('knochenmasse')} labelOverride="Bone" icon={Bone} colorClass="text-gray-200" />
               <StatCard entity={get('spo2')} labelOverride="SpO₂" icon={Droplets} colorClass="text-cyan-400" />
            </div>
          </section>

          {/* Progress Bar */}
          {get('schritte_heute') && get('schrittziel') && (
            <section className="bg-gray-800/40 rounded-xl p-4 border border-white/5 mt-2">
              <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="text-gray-300 text-sm font-medium">Daily Goal</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white">
                      {Math.round((Number(get('schritte_heute')?.state) / Number(get('schrittziel')?.state)) * 100)}%
                    </span>
                  </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-400 h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min((Number(get('schritte_heute')?.state) / Number(get('schrittziel')?.state)) * 100, 100)}%` }}
                  ></div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;