class BackgroundLocationService {
  async start() {
    console.warn(
      'Background location tracking not implemented in RN CLI version',
    );
  }

  async stop() {
  }

  isRunning(): boolean {
    return false;
  }

  async setSpeedAlert(_enabled: boolean, _threshold: number): Promise<void> {
  }
}

export const backgroundLocationService = new BackgroundLocationService();

export const isBackgroundTrackingActive = async (): Promise<boolean> => {
  return backgroundLocationService.isRunning();
};

export const stopBackgroundTracking = async (): Promise<void> => {
  await backgroundLocationService.stop();
};

export const startBackgroundTracking = async (): Promise<void> => {
  await backgroundLocationService.start();
};

export const setBackgroundSpeedAlert = async (
  enabled: boolean,
  threshold: number,
): Promise<void> => {
  await backgroundLocationService.setSpeedAlert(enabled, threshold);
};
