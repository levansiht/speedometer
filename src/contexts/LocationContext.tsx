import React, {createContext, useContext, ReactNode} from 'react';
import {useLocation} from '../hooks/useLocation';
import type {LocationData, GPSError, PermissionStatus} from '../types';

interface LocationContextValue {
  location: LocationData | null;
  permission: PermissionStatus;
  isTracking: boolean;
  error: GPSError | null;
  isLoading: boolean;
  isLocationServicesEnabled: boolean;

  requestPermission: () => Promise<void>;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  getCurrentPosition: () => Promise<void>;
}

const LocationContext = createContext<LocationContextValue | null>(null);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({children}: LocationProviderProps) {
  const locationState = useLocation({autoStart: true});

  return (
    <LocationContext.Provider value={locationState}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext(): LocationContextValue {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within LocationProvider');
  }
  return context;
}
