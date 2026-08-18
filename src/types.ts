/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  experience?: string;
  credentials: string[];
}

export interface PressItem {
  id: string;
  newspaperName: string;
  logo: string; // Tailwind icon/class or image placeholder
  title: string;
  summary: string;
  date: string;
  image: string;
  url: string;
}

export interface TimelineStation {
  id: string;
  date: string;
  rawDate?: string;
  location: string;
  province: string;
  details: string;
  status?: 'completed' | 'current' | 'upcoming';
  slotsAvailable: number;
}

export interface GalleryItem {
  id: string;
  category?: string;
  title?: string;
  description?: string;
  image: string;
  images?: string[];
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CoreValue {
  title: string;
  description: string;
  detail: string;
  icon: string;
  color: string;
}
