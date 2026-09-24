-- SEED DATA FOR APEX VETERINARY HOSPITAL OS
INSERT INTO pet_patients (id, patient_code, pet_name, species, breed, age_years, owner_name, owner_phone, microchip_id, triage_priority, current_status)
VALUES
('g1111111-1111-1111-1111-111111111111', 'PET-9041', 'Zeus', 'Canine', 'Cane Corso (110 lbs)', 4.0, 'Dominic Sterling', '512-555-0199', '985-141-002-991', 'CRITICAL', 'ICU_OXYGEN'),
('g2222222-2222-2222-2222-222222222222', 'PET-9042', 'Cleo', 'Feline', 'Bengal Short Hair', 2.0, 'Elena Rostova', '512-555-0812', '985-141-004-128', 'URGENT', 'PRE_OP_FASTING'),
('g3333333-3333-3333-3333-333333333333', 'PET-9043', 'Barnaby', 'Canine', 'Golden Retriever', 7.0, 'Sarah Jenkins', '512-555-0442', '985-141-008-442', 'STABLE', 'TRIAGE_EXAM');

INSERT INTO surgical_queues (or_suite, patient_id, lead_surgeon, procedure_name, anesthesia_risk_score, start_time, duration_minutes, spo2_oxygen_pct, heart_rate_bpm)
VALUES
('OR 1 - Orthopedic', 'g1111111-1111-1111-1111-111111111111', 'Dr. Aris Thorne, DVM (DACVS)', 'Left Stifle Tibial Plateau Leveling Osteotomy (TPLO)', 'ASA_II', '08:30:00', 90, 99.0, 84),
('OR 2 - Soft Tissue', 'g2222222-2222-2222-2222-222222222222', 'Dr. Katherine Lin, DVM', 'Exploratory Laparotomy & Foreign Body Enterotomy', 'ASA_III', '10:45:00', 60, 98.0, 142),
('OR 3 - Dental Suite', 'g3333333-3333-3333-3333-333333333333', 'Dr. Mark Calder, DVM', 'Full Mouth Radiographs & Carnassial Multi-Root Extraction', 'ASA_I', '13:15:00', 75, 99.0, 76);

INSERT INTO pharmacy_dispensary (rx_code, patient_id, medication_name, dosage_protocol, dea_schedule, refill_count, prescribing_vet, dispense_status)
VALUES
('RX-8801', 'g1111111-1111-1111-1111-111111111111', 'Carprofen (Rimadyl Chewables)', '100mg PO q12h x 14 days', 'NON_CONTROLLED', 2, 'Dr. Aris Thorne, DVM', 'READY_FOR_PICKUP'),
('RX-8802', 'g2222222-2222-2222-2222-222222222222', 'Buprenorphine Transmucosal', '0.3mg/mL SL q8h PRN pain', 'SCHEDULE_IV', 0, 'Dr. Katherine Lin, DVM', 'COMPOUNDING'),
('RX-8803', 'g3333333-3333-3333-3333-333333333333', 'Clavamox Antibiotic Suspension', '250mg PO q12h x 10 days', 'NON_CONTROLLED', 1, 'Dr. Mark Calder, DVM', 'REFILL_AUTHORIZED');

INSERT INTO veterinary_staff (staff_callsign, doctor_name, specialty_license, shift_status)
VALUES
('VET-01', 'Dr. Aris Thorne, DVM', 'Board Certified Small Animal Surgery (DACVS)', 'ON_DUTY'),
('VET-02', 'Dr. Katherine Lin, DVM', 'Emergency & Critical Care Resident', 'ON_DUTY'),
('VET-03', 'Dr. Mark Calder, DVM', 'Veterinary Dentistry & Oral Surgery Specialist', 'ON_DUTY');
