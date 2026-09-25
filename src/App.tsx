import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  Pill, 
  Syringe, 
  Clock, 
  MapPin, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  User, 
  Sparkles,
  Search
} from 'lucide-react';
import { AdminPortalModal } from './components/AdminPortalModal';

interface PetPatient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  ownerName: string;
  microchipId: string;
  triagePriority: 'CRITICAL' | 'URGENT' | 'STABLE';
  currentStatus: 'ICU OXYGEN' | 'PRE-OP FASTING' | 'TRIAGE EXAM' | 'DISCHARGE READY';
}

interface SurgeryItem {
  orId: string;
  surgeon: string;
  patientName: string;
  procedure: string;
  anesthesiaRisk: 'ASA I' | 'ASA II' | 'ASA III';
  startTime: string;
  duration: string;
  spo2: number;
  heartRate: number;
}

interface Prescription {
  rxId: string;
  petName: string;
  medication: string;
  dosage: string;
  refillCount: number;
  prescribingVet: string;
  dispenseStatus: 'READY FOR PICKUP' | 'COMPOUNDING' | 'REFILL AUTHORIZED';
}

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'patients' | 'surgery' | 'pharmacy'>('patients');
  const [searchTerm, setSearchTerm] = useState('');

  const patients: PetPatient[] = [
    {
      id: 'PET-9041',
      name: 'Zeus',
      species: 'Canine',
      breed: 'Cane Corso (110 lbs)',
      age: '4 yrs',
      ownerName: 'Dominic Sterling',
      microchipId: '985-141-002-991',
      triagePriority: 'CRITICAL',
      currentStatus: 'ICU OXYGEN'
    },
    {
      id: 'PET-9042',
      name: 'Cleo',
      species: 'Feline',
      breed: 'Bengal Short Hair',
      age: '2 yrs',
      ownerName: 'Elena Rostova',
      microchipId: '985-141-004-128',
      triagePriority: 'URGENT',
      currentStatus: 'PRE-OP FASTING'
    },
    {
      id: 'PET-9043',
      name: 'Barnaby',
      species: 'Canine',
      breed: 'Golden Retriever',
      age: '7 yrs',
      ownerName: 'Sarah Jenkins',
      microchipId: '985-141-008-442',
      triagePriority: 'STABLE',
      currentStatus: 'TRIAGE EXAM'
    },
    {
      id: 'PET-9044',
      name: 'Mochi',
      species: 'Feline',
      breed: 'Scottish Fold',
      age: '5 yrs',
      ownerName: 'Marcus Vance',
      microchipId: '985-141-009-301',
      triagePriority: 'STABLE',
      currentStatus: 'DISCHARGE READY'
    }
  ];

  const surgeries: SurgeryItem[] = [
    {
      orId: 'OR 1 - Orthopedic Suite',
      surgeon: 'Dr. Aris Thorne, DVM (DACVS)',
      patientName: 'Zeus (Cane Corso)',
      procedure: 'Left Stifle Tibial Plateau Leveling Osteotomy (TPLO)',
      anesthesiaRisk: 'ASA II',
      startTime: '08:30 AM',
      duration: '90 mins',
      spo2: 99,
      heartRate: 84
    },
    {
      orId: 'OR 2 - Soft Tissue & Laparoscopy',
      surgeon: 'Dr. Katherine Lin, DVM',
      patientName: 'Cleo (Bengal)',
      procedure: 'Exploratory Laparotomy & Foreign Body Enterotomy',
      anesthesiaRisk: 'ASA III',
      startTime: '10:45 AM',
      duration: '60 mins',
      spo2: 98,
      heartRate: 142
    },
    {
      orId: 'OR 3 - Dental Surgical Suite',
      surgeon: 'Dr. Mark Calder, DVM',
      patientName: 'Barnaby (Golden Retriever)',
      procedure: 'Full Mouth Radiographs & Carnassial Multi-Root Extraction',
      anesthesiaRisk: 'ASA I',
      startTime: '01:15 PM',
      duration: '75 mins',
      spo2: 99,
      heartRate: 76
    }
  ];

  const prescriptions: Prescription[] = [
    {
      rxId: 'RX-8801',
      petName: 'Zeus',
      medication: 'Carprofen (Rimadyl Chewables)',
      dosage: '100mg PO q12h x 14 days',
      refillCount: 2,
      prescribingVet: 'Dr. Aris Thorne, DVM',
      dispenseStatus: 'READY FOR PICKUP'
    },
    {
      rxId: 'RX-8802',
      petName: 'Cleo',
      medication: 'Buprenorphine Transmucosal',
      dosage: '0.3mg/mL SL q8h PRN pain',
      refillCount: 0,
      prescribingVet: 'Dr. Katherine Lin, DVM',
      dispenseStatus: 'COMPOUNDING'
    },
    {
      rxId: 'RX-8803',
      petName: 'Barnaby',
      medication: 'Clavamox Antibiotic Suspension',
      dosage: '250mg PO q12h x 10 days',
      refillCount: 1,
      prescribingVet: 'Dr. Mark Calder, DVM',
      dispenseStatus: 'REFILL AUTHORIZED'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Telemetry Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-emerald-500/20 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black tracking-tight text-white">APEX VETERINARY</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                  HOSPITAL OS v1.0
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">Surgical Queues, Multi-Pet EMR & Controlled Pharmacy Dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> 3 OR SUITES ACTIVE
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Pill className="w-3.5 h-3.5" /> 100% DEA COMPLIANT
              </span>
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 text-base font-semibold font-mono font-bold tracking-wider transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              [ VET PASS ]
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1612] via-[#09100c] to-[#060a08] border border-emerald-500/20 p-6 md:p-10 shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" /> 24/7 Specialty Surgical & Emergency Veterinary Hospital
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Clinical Veterinary Mastery. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                Surgical Queues & Pharmacy Dispatch.
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Institutional operating system built for multi-doctor veterinary animal hospitals, specialty surgical centers, and emergency trauma clinics. Real-time patient triage, microchip electronic records, and controlled dispensary monitoring.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => setActiveTab('surgery')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base font-semibold font-mono tracking-wider transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4" /> MONITOR SURGICAL TELEMETRY
              </button>
              <button 
                onClick={() => setActiveTab('pharmacy')}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-base font-semibold border border-white/10 transition-colors flex items-center gap-2"
              >
                <Pill className="w-4 h-4 text-emerald-400" /> Dispensary Queue
              </button>
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-base font-semibold">
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'patients'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            01 // Inpatient EMR & Triage
          </button>
          <button
            onClick={() => setActiveTab('surgery')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'surgery'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            02 // Surgical OR Telemetry
          </button>
          <button
            onClick={() => setActiveTab('pharmacy')}
            className={`px-4 py-2 rounded-lg transition-all font-bold ${
              activeTab === 'pharmacy'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            03 // Rx Pharmacy Dispensary
          </button>
        </div>

        {/* Tab 1: Inpatient Triage */}
        {activeTab === 'patients' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">Current Hospital Inpatient Census</h3>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                + ADMIT NEW PATIENT
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patients.map((pet) => (
                <div key={pet.id} className="p-6 rounded-2xl bg-[#0b120f] border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">{pet.id}</span>
                        <span className="text-xs font-mono text-slate-400">|</span>
                        <span className="text-base font-bold text-white">{pet.name}</span>
                        <span className="text-xs font-mono text-slate-400">({pet.species})</span>
                      </div>
                      <p className="text-base text-zinc-200 leading-relaxed mt-1">{pet.breed} • {pet.age}</p>
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-1 rounded font-bold uppercase ${
                      pet.triagePriority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' :
                      pet.triagePriority === 'URGENT' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {pet.triagePriority}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Owner of Record:</span>
                      <span className="font-bold text-white">{pet.ownerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Microchip Tag:</span>
                      <span className="text-cyan-300 font-semibold">{pet.microchipId}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/5">
                      <span className="text-slate-400">Current Status:</span>
                      <span className="text-emerald-400 font-bold">{pet.currentStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Surgical OR Telemetry */}
        {activeTab === 'surgery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Active Operating Room Suites</h3>
                <p className="text-base text-zinc-200 leading-relaxed font-mono">Live Anesthesia Monitoring & Multi-Parameter Vitals</p>
              </div>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                + SCHEDULE SURGERY
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {surgeries.map((s, idx) => (
                <div key={idx} className="bg-[#0b120f] border border-emerald-500/20 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-emerald-400 font-bold">{s.orId}</span>
                    <span className="text-slate-400">{s.anesthesiaRisk}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{s.patientName}</h4>
                    <p className="text-base text-zinc-200 leading-relaxed mt-0.5">{s.surgeon}</p>
                    <p className="text-xs text-emerald-200 mt-2 bg-black/40 p-2.5 rounded-xl border border-white/5 font-mono">
                      {s.procedure}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5 text-center font-mono">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-400">Heart Rate</div>
                      <div className="text-lg font-bold text-emerald-400 mt-0.5">{s.heartRate} BPM</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-400">SpO2 Oxygen</div>
                      <div className="text-lg font-bold text-cyan-400 mt-0.5">{s.spo2}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Pharmacy Dispensary */}
        {activeTab === 'pharmacy' && (
          <div className="bg-[#0b120f] border border-emerald-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">In-House Pharmacy & Controlled Substances Log</h3>
                <p className="text-base text-zinc-200 leading-relaxed font-mono">DEA Form 222 Automated Prescription Dispensing System</p>
              </div>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                DISPENSE MEDICATION
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-base font-semibold font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase">
                    <th className="py-3 px-4">Rx Number</th>
                    <th className="py-3 px-4">Patient Name</th>
                    <th className="py-3 px-4">Medication & Route</th>
                    <th className="py-3 px-4">Dosage Protocol</th>
                    <th className="py-3 px-4">Refills</th>
                    <th className="py-3 px-4 text-right">Dispense Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {prescriptions.map((p) => (
                    <tr key={p.rxId} className="hover:bg-white/5">
                      <td className="py-3 px-4 text-emerald-400 font-bold">{p.rxId}</td>
                      <td className="py-3 px-4 font-sans font-bold text-white">{p.petName}</td>
                      <td className="py-3 px-4 text-slate-300">{p.medication}</td>
                      <td className="py-3 px-4 text-slate-400">{p.dosage}</td>
                      <td className="py-3 px-4 text-cyan-300 font-bold">{p.refillCount} Remaining</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                          p.dispenseStatus === 'READY FOR PICKUP' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          p.dispenseStatus === 'COMPOUNDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {p.dispenseStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default App;
