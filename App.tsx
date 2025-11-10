import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TripProvider} from './src/contexts/TripContext';
import {ThemeProvider} from './src/contexts/ThemeContext';
import {SpeedAlertProvider} from './src/contexts/SpeedAlertContext';
import {BottomTabNavigator} from './src/navigation/BottomTabNavigator';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <TripProvider>
        <SpeedAlertProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#1a1a2e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}>
                <Stack.Screen
                  name="MainTabs"
                  component={BottomTabNavigator}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SpeedAlertProvider>
      </TripProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});

export default App;
