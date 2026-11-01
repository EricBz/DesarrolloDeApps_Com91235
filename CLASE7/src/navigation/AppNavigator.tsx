
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TasksStack from './TasksStack';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../constants/theme';
import FirebaseDemoScreen from '../screens/FirebaseDemoScreen';

export type RootTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
  DemoTab: undefined;
};
const Tab = createBottomTabNavigator<RootTabParamList>();
export default function AppNavigator() {
  return (
    //  Ya NO tiene NavigationContainer: lo pone RootNavigator.
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'HomeTab' ? 'list-outline' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={TasksStack} options={{ title: 'Inicio' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Perfil' }} /> 
      <Tab.Screen name="DemoTab" component={FirebaseDemoScreen} options={{title:"Demo"}}/>   
    </Tab.Navigator>
  );
}