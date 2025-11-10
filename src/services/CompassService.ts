import { magnetometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

class CompassService {
  private subscription: any = null;
  private currentHeading: number = 0;

  start(onHeadingChange: (heading: number) => void): void {
    setUpdateIntervalForType(SensorTypes.magnetometer, 100); // 100ms updates

    this.subscription = magnetometer.subscribe(({ x, y, z }) => {
      // Calculate heading from magnetometer data
      let heading = Math.atan2(y, x) * (180 / Math.PI);
      if (heading < 0) heading += 360;
      
      this.currentHeading = heading;
      onHeadingChange(heading);
    });
  }

  stop(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  getCurrentHeading(): number {
    return this.currentHeading;
  }
}

export const compassService = new CompassService();
