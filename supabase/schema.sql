-- ==============================================================================
-- APEX VETERINARY HOSPITAL OS (Phase 2 - #62)
-- Surgical Queues, Multi-Pet Intake & EMR Pharmacy Schema
-- ==============================================================================

-- 1. Pet Patients EMR Table
CREATE TABLE IF NOT EXISTS pet_patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_code TEXT NOT NULL UNIQUE,
    pet_name TEXT NOT NULL,
    species TEXT NOT NULL, -- Canine, Feline, Exotic, Equine
    breed TEXT NOT NULL,
    age_years NUMERIC NOT NULL,
    owner_name TEXT NOT NULL,
    owner_phone TEXT NOT NULL,
    microchip_id TEXT UNIQUE,
    triage_priority TEXT NOT NULL DEFAULT 'STABLE', -- CRITICAL, URGENT, STABLE
    current_status TEXT NOT NULL DEFAULT 'TRIAGE_EXAM',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Surgical Queues & OR Telemetry Table
CREATE TABLE IF NOT EXISTS surgical_queues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    or_suite TEXT NOT NULL,
    patient_id UUID REFERENCES pet_patients(id) ON DELETE CASCADE,
    lead_surgeon TEXT NOT NULL,
    procedure_name TEXT NOT NULL,
    anesthesia_risk_score TEXT NOT NULL DEFAULT 'ASA_I',
    start_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    spo2_oxygen_pct NUMERIC DEFAULT 99.0,
    heart_rate_bpm INTEGER DEFAULT 80,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Pharmacy Dispensary & Controlled Substances Table
CREATE TABLE IF NOT EXISTS pharmacy_dispensary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rx_code TEXT NOT NULL UNIQUE,
    patient_id UUID REFERENCES pet_patients(id) ON DELETE CASCADE,
    medication_name TEXT NOT NULL,
    dosage_protocol TEXT NOT NULL,
    dea_schedule TEXT NOT NULL DEFAULT 'NON_CONTROLLED', -- SCHEDULE_II, SCHEDULE_IV, NON_CONTROLLED
    refill_count INTEGER DEFAULT 0,
    prescribing_vet TEXT NOT NULL,
    dispense_status TEXT NOT NULL DEFAULT 'READY_FOR_PICKUP',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Veterinary Staff & Attending Techs Table
CREATE TABLE IF NOT EXISTS veterinary_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_callsign TEXT NOT NULL UNIQUE,
    doctor_name TEXT NOT NULL,
    specialty_license TEXT NOT NULL,
    shift_status TEXT NOT NULL DEFAULT 'ON_DUTY',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE pet_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE surgical_queues ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacy_dispensary ENABLE ROW LEVEL SECURITY;
ALTER TABLE veterinary_staff ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public Read Access pet_patients" ON pet_patients FOR SELECT USING (true);
CREATE POLICY "Public Write Access pet_patients" ON pet_patients FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access surgical_queues" ON surgical_queues FOR SELECT USING (true);
CREATE POLICY "Public Write Access surgical_queues" ON surgical_queues FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access pharmacy_dispensary" ON pharmacy_dispensary FOR SELECT USING (true);
CREATE POLICY "Public Write Access pharmacy_dispensary" ON pharmacy_dispensary FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Access veterinary_staff" ON veterinary_staff FOR SELECT USING (true);
CREATE POLICY "Public Write Access veterinary_staff" ON veterinary_staff FOR INSERT WITH CHECK (true);
