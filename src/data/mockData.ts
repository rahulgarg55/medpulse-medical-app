import { MedicineItem, Doctor, MedicationSchedule, PrescriptionScan } from '../types';

export const MEDICINES_DATA: MedicineItem[] = [
  {
    id: 'med-1',
    name: 'Atorvastatin LipidCare',
    genericName: 'Atorvastatin Calcium 20mg',
    category: 'Cardiology',
    price: 18.50,
    originalPrice: 24.00,
    dosage: '20mg once daily at bedtime',
    form: 'Tablets',
    rxRequired: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 142,
    image: '💊',
    activeIngredients: 'Atorvastatin Calcium Trihydrate',
    manufacturer: 'Pfizer / MedPulse Global',
    instructions: 'Take orally once daily in the evening with or without food. Avoid grapefruit juice.',
    contraindications: 'Active liver disease, pregnancy, or hypersensitivity to statins.'
  },
  {
    id: 'med-2',
    name: 'Metformin Glucophage XR',
    genericName: 'Metformin Hydrochloride 500mg',
    category: 'Diabetes',
    price: 12.00,
    originalPrice: 16.50,
    dosage: '500mg twice daily with meals',
    form: 'Tablets',
    rxRequired: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 230,
    image: '🩸',
    activeIngredients: 'Metformin HCl Extended Release',
    manufacturer: 'Merck Healthcare',
    instructions: 'Take with morning and evening meals to minimize gastrointestinal discomfort.',
    contraindications: 'Severe renal impairment (eGFR < 30 mL/min), acute metabolic acidosis.'
  },
  {
    id: 'med-3',
    name: 'Amoxicillin Trihydrate Duo',
    genericName: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    price: 14.25,
    originalPrice: 19.00,
    dosage: '500mg every 8 hours for 7 days',
    form: 'Capsules',
    rxRequired: true,
    inStock: true,
    rating: 4.7,
    reviewsCount: 88,
    image: '🧬',
    activeIngredients: 'Amoxicillin Trihydrate',
    manufacturer: 'GlaxoSmithKline',
    instructions: 'Complete full prescribed 7-day course even if clinical symptoms improve.',
    contraindications: 'History of penicillin or beta-lactam allergic anaphylaxis.'
  },
  {
    id: 'med-4',
    name: 'Ventolin ProAir Inhaler',
    genericName: 'Albuterol / Salbutamol Sulfate 100mcg',
    category: 'Respiratory',
    price: 29.99,
    originalPrice: 38.00,
    dosage: '1-2 puffs every 4-6 hours as needed for bronchospasm',
    form: 'Inhaler',
    rxRequired: true,
    inStock: true,
    rating: 4.95,
    reviewsCount: 312,
    image: '🫁',
    activeIngredients: 'Micronized Salbutamol Sulfate',
    manufacturer: 'GSK Respiratory USA',
    instructions: 'Shake well before inhalation. Prime canister prior to initial activation.',
    contraindications: 'Tachyarrhythmias, hypersensitivity to propellant HFA-134a.'
  },
  {
    id: 'med-5',
    name: 'Neurofen Rapid Relief Extra',
    genericName: 'Ibuprofen 400mg + Paracetamol 325mg',
    category: 'Pain Relief',
    price: 8.75,
    originalPrice: 11.50,
    dosage: '1 tablet every 6 hours (Max 3/day)',
    form: 'Tablets',
    rxRequired: false,
    inStock: true,
    rating: 4.6,
    reviewsCount: 405,
    image: '⚡',
    activeIngredients: 'Ibuprofen Micronized & Acetaminophen',
    manufacturer: 'Reckitt Benckiser',
    instructions: 'Take after food with a full glass of water. Do not exceed 3 tablets in 24 hours.',
    contraindications: 'Active peptic ulcer, severe heart failure, third trimester pregnancy.'
  },
  {
    id: 'med-6',
    name: 'Ultra-Pure D3 + K2 Complex',
    genericName: 'Cholecalciferol 60,000 IU + Menaquinone-7',
    category: 'Vitamins',
    price: 15.00,
    originalPrice: 22.00,
    dosage: '1 softgel weekly with fatty meal',
    form: 'Capsules',
    rxRequired: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 520,
    image: '☀️',
    activeIngredients: 'Vitamin D3 (Lanolin) 60,000 IU, MK-7 100mcg',
    manufacturer: 'NutriHealth Labs USA',
    instructions: 'Take once weekly on the same day with breakfast or lunch containing dietary fat.',
    contraindications: 'Hypercalcemia, hypervitaminosis D, severe nephrolithiasis.'
  }
];

export const INITIAL_SCHEDULE: MedicationSchedule[] = [
  {
    id: 'sch-1',
    name: 'Metformin XR 500mg',
    dosage: '1 Tablet',
    time: '08:00 AM',
    taken: true,
    mealTiming: 'With Breakfast'
  },
  {
    id: 'sch-2',
    name: 'Ultra-Pure D3 + K2',
    dosage: '1 Softgel',
    time: '01:00 PM',
    taken: true,
    mealTiming: 'With Lunch'
  },
  {
    id: 'sch-3',
    name: 'Atorvastatin 20mg',
    dosage: '1 Tablet',
    time: '09:00 PM',
    taken: false,
    mealTiming: 'Before Sleep'
  }
];

export const TOP_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins, MD, FACC',
    specialty: 'Chief Cardiologist',
    hospital: 'Johns Hopkins / MedPulse Virtual Hub',
    rating: 4.98,
    reviews: 384,
    fee: 45,
    avatar: '👩‍⚕️',
    nextSlot: 'Today, 3:30 PM'
  },
  {
    id: 'doc-2',
    name: 'Dr. Arun Varma, MBBS, MD',
    specialty: 'Endocrinologist & Diabetologist',
    hospital: 'Apollo Hospitals / Fortis Healthcare',
    rating: 4.92,
    reviews: 219,
    fee: 35,
    avatar: '👨‍⚕️',
    nextSlot: 'Tomorrow, 10:00 AM'
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova, PhD, MD',
    specialty: 'Pulmonary & Critical Care',
    hospital: 'Memorial Sloan Kettering Center',
    rating: 4.95,
    reviews: 167,
    fee: 50,
    avatar: '👩‍⚕️',
    nextSlot: 'Tomorrow, 2:15 PM'
  }
];

export const SAMPLE_PRESCRIPTIONS: PrescriptionScan[] = [
  {
    id: 'rx-scan-01',
    patientName: 'Rahul Garg (Patient ID #49281)',
    doctorName: 'Dr. Sarah Jenkins, MD (Lic #MED-94021)',
    hospital: 'Metropolitan Clinical Health Institute',
    date: 'October 21, 2026',
    verified: true,
    confidenceScore: 99.4,
    medications: [
      {
        name: 'Atorvastatin LipidCare',
        dosage: '20mg',
        frequency: 'Once Daily (Night)',
        duration: '30 Days',
        matchedMedicineId: 'med-1'
      },
      {
        name: 'Metformin Glucophage XR',
        dosage: '500mg',
        frequency: 'Twice Daily (Post Meal)',
        duration: '60 Days',
        matchedMedicineId: 'med-2'
      }
    ]
  }
];
