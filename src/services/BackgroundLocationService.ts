class BackgroundLocationService {
  async start() {
    console.warn(
      'Background location tracking not implemented in RN CLI version',
    );
  }

  async stop() {
    // No-op
  }

  isRunning(): boolean {
    return false;
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
