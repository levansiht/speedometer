import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

class NotificationService {
  async displayNotification(title: string, body: string) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: await this.ensureChannel(),
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        smallIcon: 'ic_launcher',
        pressAction: {id: 'default'},
      },
    });
  }

  private async ensureChannel(): Promise<string> {
    const channelId = 'default';
    await notifee.createChannel({
      id: channelId,
      name: 'Default',
      importance: AndroidImportance.HIGH,
    });
    return channelId;
  }
}

export const notificationService = new NotificationService();
