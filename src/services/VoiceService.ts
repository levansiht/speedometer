import Tts from 'react-native-tts';

interface VoiceConfig {
  enabled: boolean;
  intervalKm: number;
  rate: number;
  pitch: number;
}

class VoiceService {
  private config: VoiceConfig = {
    enabled: false,
    intervalKm: 1,
    rate: 0.5,
    pitch: 1.0,
  };
  private lastSpokenSpeed: number = 0;
  private lastAnnouncedDistanceKm: number = 0;
  private readonly speedThreshold: number = 5; // km/h

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      await Tts.setDefaultLanguage('vi-VN');
      await Tts.setDefaultRate(this.config.rate);
      await Tts.setDefaultPitch(this.config.pitch);
    } catch (error) {
      console.warn('TTS initialization error:', error);
    }
  }

  getConfig(): VoiceConfig {
    return {...this.config};
  }

  async updateConfig(newConfig: Partial<VoiceConfig>): Promise<void> {
    this.config = {...this.config, ...newConfig};

    try {
      if (newConfig.rate !== undefined) {
        await Tts.setDefaultRate(newConfig.rate);
      }
      if (newConfig.pitch !== undefined) {
        await Tts.setDefaultPitch(newConfig.pitch);
      }
      if (newConfig.enabled === false) {
        Tts.stop();
      }
    } catch (error) {
      console.warn('TTS update config error:', error);
    }
  }

  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
    if (!enabled) {
      Tts.stop();
    }
  }

  async speak(text: string): Promise<void> {
    if (!this.config.enabled) {
      return;
    }

    try {
      await Tts.stop();
      await Tts.speak(text);
    } catch (error) {
      console.warn('TTS speak error:', error);
    }
  }

  async announceSpeed(speedKmh: number): Promise<void> {
    if (!this.config.enabled) {
      return;
    }

    const speedDiff = Math.abs(speedKmh - this.lastSpokenSpeed);
    if (speedDiff < this.speedThreshold) {
      return;
    }

    this.lastSpokenSpeed = speedKmh;
    const roundedSpeed = Math.round(speedKmh);
    await this.speak(`${roundedSpeed} kilômét giờ`);
  }

  async announceAlert(message: string): Promise<void> {
    await this.speak(message);
  }

  async announceTripStart(): Promise<void> {
    await this.speak('Bắt đầu ghi lại hành trình');
  }

  async announceTripPause(): Promise<void> {
    await this.speak('Tạm dừng ghi lại hành trình');
  }

  async announceTripResume(): Promise<void> {
    await this.speak('Tiếp tục ghi lại hành trình');
  }

  async announceTripEnd(stats: {
    distance: number;
    duration: number;
    avgSpeed: number;
  }): Promise<void> {
    const distanceKm = (stats.distance / 1000).toFixed(1);
    const minutes = Math.floor(stats.duration / 60);
    await this.speak(
      `Kết thúc hành trình. Quãng đường ${distanceKm} kilômét. Thời gian ${minutes} phút. Tốc độ trung bình ${Math.round(
        stats.avgSpeed,
      )} kilômét giờ`,
    );
  }

  announceDistance(stats: {distance: number}): void {
    if (!this.config.enabled) {
      return;
    }

    const distanceKm = Math.floor(stats.distance / 1000);
    const interval = this.config.intervalKm;

    // Only announce at interval milestones (1km, 2km, etc.)
    if (
      distanceKm > 0 &&
      distanceKm % interval === 0 &&
      distanceKm !== this.lastAnnouncedDistanceKm
    ) {
      this.lastAnnouncedDistanceKm = distanceKm;
      this.speak(`Đã đi được ${distanceKm} kilômét`);
    }
  }

  resetAnnouncementCounter(): void {
    this.lastSpokenSpeed = 0;
    this.lastAnnouncedDistanceKm = 0;
  }

  stop(): void {
    Tts.stop();
  }
}

export const voiceService = new VoiceService();
