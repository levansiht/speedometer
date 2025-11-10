import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';
import {LocationData, GPSError, GPSErrorType, Coordinates} from '../types';
import {speedFilter} from '../utils/speedFilter';

interface GPSServiceConfig {
  accuracy: {
    android: 'high' | 'balanced' | 'low' | 'passive';
    ios:
      | 'bestForNavigation'
      | 'best'
      | 'nearestTenMeters'
      | 'hundredMeters'
      | 'kilometer'
      | 'threeKilometers';
  };
  distanceFilter: number;
  interval: number;
  fastestInterval: number;
}

const HIGH_PERFORMANCE_CONFIG: GPSServiceConfig = {
  accuracy: {
    android: 'high', // GPS + Network + Cell (CHÍNH XÁC NHẤT!)
    ios: 'bestForNavigation', // Optimized cho navigation, real-time GPS
  },
  distanceFilter: 0, // 0 = update liên tục, không filter theo khoảng cách
  interval: 100, // 100ms = 10 updates/giây (CỰC NHANH!)
  fastestInterval: 50, // 50ms = tối đa 20 updates/giây nếu GPS cho phép
};

export const getCurrentLocation = async (): Promise<{
  data?: LocationData;
  error?: GPSError;
}> => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        const locationData: LocationData = mapToLocationData(position);
        resolve({data: locationData});
      },
      error => {
        resolve({error: mapError(error)});
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0, // Không dùng cache, luôn lấy GPS mới
      },
    );
  });
};

export const watchPosition = (
  onUpdate: (location: LocationData) => void,
  onError?: (error: GPSError) => void,
  config: Partial<GPSServiceConfig> = {},
): {remove: () => void} => {
  const finalConfig = {...HIGH_PERFORMANCE_CONFIG, ...config};

  const watchId = Geolocation.watchPosition(
    position => {
      const locationData = mapToLocationData(position);
      onUpdate(locationData);
    },
    error => {
      if (onError) {
        onError(mapError(error));
      }
    },
    {
      enableHighAccuracy: true,
      distanceFilter: finalConfig.distanceFilter,
      timeout: 15000,
      maximumAge: 0,
      useSignificantChanges: false,
    },
  );

  return {
    remove: () => {
      Geolocation.clearWatch(watchId);
      speedFilter.reset();
    },
  };
};

const mapToLocationData = (position: any): LocationData => {
  const {coords, timestamp} = position;

  // Sử dụng speed filter để smooth nhưng vẫn REALTIME
  const filteredSpeed = speedFilter.filter(coords.speed || 0, coords.accuracy);

  return {
    coords: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude ?? null,
      accuracy: coords.accuracy,
      altitudeAccuracy: coords.altitudeAccuracy ?? null,
      speed: filteredSpeed,
      heading: coords.heading ?? null,
    },
    timestamp,
  };
};

export const mapCoordinates = (
  coords: {latitude: number; longitude: number}[],
): Coordinates[] => {
  return coords.map(coord => ({
    latitude: coord.latitude,
    longitude: coord.longitude,
    altitude: null,
    accuracy: 0,
    altitudeAccuracy: null,
    heading: null,
    speed: 0,
  }));
};

const mapError = (error: any): GPSError => {
  let type: GPSErrorType;
  let message = error.message;

  switch (error.code) {
    case 1: // PERMISSION_DENIED
      type = GPSErrorType.PERMISSION_DENIED;
      message = 'Quyền truy cập vị trí bị từ chối';
      break;
    case 2: // POSITION_UNAVAILABLE
      type = GPSErrorType.LOCATION_UNAVAILABLE;
      message = 'Không thể xác định vị trí hiện tại';
      break;
    case 3: // TIMEOUT
      type = GPSErrorType.TIMEOUT;
      message = 'Yêu cầu vị trí hết thời gian chờ';
      break;
    default:
      type = GPSErrorType.UNKNOWN;
  }

  return {
    type,
    message,
    timestamp: Date.now(),
  };
};

// REQUEST PERMISSIONS (Android 6.0+)
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    // iOS will prompt automatically when requesting location
    return true;
  }

  // Android
  try {
    const {PermissionsAndroid} = require('react-native');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Quyền truy cập vị trí',
        message: 'App cần quyền truy cập vị trí để đo tốc độ chính xác',
        buttonNeutral: 'Hỏi sau',
        buttonNegative: 'Từ chối',
        buttonPositive: 'Đồng ý',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
