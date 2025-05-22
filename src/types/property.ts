
import { Document } from './documents';

export type PropertyType = 'apartment' | 'duplex' | 'bungalow' | 'mansion' | 'terrace' | 'townhouse';
export type PropertyStatus = 'available' | 'reserved' | 'allocated' | 'occupied' | 'under-construction' | 'maintenance' | 'ownership-transferred';
export type OwnershipType = 'fmbn' | 'ppp' | 'cooperative' | 'private';
export type ConstructionStage = 'planning' | 'foundation' | 'structure' | 'finishing' | 'completed';

export interface PropertyLocation {
  state: string;
  lga: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface PropertyUnit {
  id: string;
  unitNumber: string;
  size: number; // in square meters
  bedrooms: number;
  value: number;
  status: PropertyStatus;
  mortgageId?: string;
  customerId?: string;
}

export interface DeveloperInfo {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface InspectionRecord {
  id: string;
  date: string;
  inspector: string;
  status: 'pending' | 'passed' | 'failed';
  notes: string;
  images: string[];
}

export interface ConstructionUpdate {
  date: string;
  stage: ConstructionStage;
  completionPercentage: number;
  notes: string;
  images: string[];
}

export interface MaintenanceRecord {
  id: string;
  unitId: string;
  issue: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  reportedDate: string;
  resolvedDate?: string;
  status: 'pending' | 'in-progress' | 'scheduled' | 'completed' | 'cancelled';
  assignee?: string;
  notes: string;
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  state: string;
  lga?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  value: number;
  buildYear: number;
  area: number; // Total area in square meters
  features: string[];
  images: string[];
  status?: PropertyStatus;
  developer?: string;
  units?: number;
  completionDate?: string;
  ownershipType?: OwnershipType;
  developerId?: string;
  constructionProgress?: number;
  totalUnits?: number;
  availableUnits?: number;
  allocatedUnits?: number;
  occupiedUnits?: number;
  documents?: Document[];
  propertyUnits?: PropertyUnit[];
  inspections?: InspectionRecord[];
  constructionUpdates?: ConstructionUpdate[];
  maintenanceRecords?: MaintenanceRecord[];
}
