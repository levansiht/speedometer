import Geolocation from 'react-native-geolocation-service';
import {Platform} from 'react-native';

export const requestLocationPermission = async (): Promise<
  'granted' | 'denied' | 'never_ask_again'
> => {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'granted') {
      return 'granted';
    }
    if (auth === 'denied') {
      return 'denied';
    }
    return 'denied';
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

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return 'granted';
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      return 'never_ask_again';
    }
    return 'denied';
  } catch (err) {
    console.warn(err);
    return 'denied';
  }
};

export const checkLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true;
  }

  try {
    const {PermissionsAndroid} = require('react-native');
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const isLocationEnabled = async (): Promise<boolean> => {
  try {
    // On Android, check if location services are enabled
    if (Platform.OS === 'android') {
      // For now, always return true as checking requires additional native code
      // In production, you would implement a native module to check this
      return true;
    }

    // On iOS, location services are always enabled if permission is granted
    return true;
  } catch (error) {
    console.warn('Error checking location services:', error);
    return true; // Default to true to avoid blocking the app
  }
};
