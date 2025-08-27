import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { PropertyDoc } from '@/types/property';

export async function getPropertyBySlug(slug: string): Promise<PropertyDoc | null> {
  try {
    const docRef = doc(db, "properties", slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { slug: docSnap.id, ...docSnap.data() } as PropertyDoc;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Error fetching property:', error);
    
    // Handle specific Firebase errors
    if (error.code === 'failed-precondition') {
      console.warn('Firebase offline - using fallback data');
      return null;
    } else if (error.code === 'unavailable') {
      console.warn('Firebase service unavailable - using fallback data');
      return null;
    } else if (error.message?.includes('offline')) {
      console.warn('Firebase client offline - using fallback data');
      return null;
    }
    
    return null;
  }
}

export function formatCurrency(n?: number): string {
  if (n === undefined || n === null) return "—";
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function addressToString(location: PropertyDoc['location']): string {
  const parts = [
    location.addressLine,
    location.city,
    location.state,
    location.postalCode
  ].filter(Boolean);
  
  return parts.join(', ');
}

export const gated = (isAuthenticated: boolean) => !isAuthenticated; 