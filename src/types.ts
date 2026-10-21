export type DeviceType = 'iphone' | 'pixel' | 'fullscreen';

export type TabType = 'home' | 'pharmacy' | 'scanner' | 'claude_ai' | 'vitals' | 'claude_ux';

export interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  category: 'Cardiology' | 'Diabetes' | 'Antibiotics' | 'Pain Relief' | 'Respiratory' | 'Vitamins';
  price: number;
  originalPrice?: number;
  dosage: string;
  form: 'Tablets' | 'Syrup' | 'Capsules' | 'Inhaler';
  rxRequired: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  activeIngredients: string;
  manufacturer: string;
  instructions: string;
  contraindications: string;
}

export interface CartItem {
  medicine: MedicineItem;
  quantity: number;
}

export interface PrescriptionScan {
  id: string;
  patientName: string;
  doctorName: string;
  hospital: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    matchedMedicineId?: string;
  }[];
  verified: boolean;
  confidenceScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'claude';
  text: string;
  timestamp: string;
  urgencyTag?: 'Low Urgency' | 'Moderate Concern' | 'Emergency Alert';
  specialistReferral?: string;
  interactionWarning?: string;
}

export interface MedicationSchedule {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  mealTiming: 'Before Meal' | 'After Meal' | 'With Water';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  fee: number;
  avatar: string;
  nextSlot: string;
}
