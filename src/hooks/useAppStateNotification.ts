import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {notificationService} from '../services/NotificationService';

export function useAppStateNotification() {
  useEffect(() => {
    let lastState: AppStateStatus = AppState.currentState;
    const onChange = (nextState: AppStateStatus) => {
      if (lastState === 'active' && nextState.match(/background|inactive/)) {
        notificationService.displayNotification(
          'Speedometer vẫn đang chạy',
          'Ứng dụng vẫn ghi lại hành trình và cảnh báo tốc độ.',
        );
      }
      lastState = nextState;
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);
}
