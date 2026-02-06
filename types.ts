
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface School {
  id: string;
  name: string;
  location: string;
  coordinates: Coordinates;
}

export enum RiskLevel {
  GREEN = 'GREEN',
  AMBER = 'AMBER',
  RED = 'RED',
  UNKNOWN = 'UNKNOWN',
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  apparentTemperature: number;
  uvIndex: number;
  timestamp: string; // ISO string for 12:30 today
}

export interface SafetyStatus {
  level: RiskLevel;
  title: string;
  safetyStatus: string;
  modifications: string;
  generatedAdvice: string;
  safeExposureDuration: string;
}

export interface SchoolStatus {
  school: School;
  weather: WeatherData | null;
  status: SafetyStatus | null;
  loading: boolean;
  error: string | null;
}
