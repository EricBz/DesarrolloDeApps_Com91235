import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TasksStack from './TasksStack';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../constants/theme';
// Rutas del Tab raíz
export type RootTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator //Pasamos route para que sepa que icon usar
        screenOptions={({ route }) => ({
          headerShown: false, // el header lo maneja cada Stack interno
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textLight,
          tabBarIcon: ({ color, size }) => {
            // Elegimos el icono según la pestaña activa
            const iconName =
              route.name === 'HomeTab' ? 'list-outline' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={TasksStack}
          options={{ title: 'Inicio' }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}