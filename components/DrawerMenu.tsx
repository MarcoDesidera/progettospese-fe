import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { Appbar, Drawer as PaperDrawer, PaperProvider } from 'react-native-paper';
import theme from '../styles/default.theme';

const Drawer = createDrawerNavigator();

// Componente personalizzato per il contenuto della Sidebar
function CustomDrawerContent({ navigation, state }: DrawerContentComponentProps) {
  return (
    <PaperProvider theme={theme}>
      <PaperDrawer.Section title="Menu Principale" style={{ marginTop: 40 }}>
      <PaperDrawer.Item
        label="Home"
        icon="home"
        active={state.index === 0}
        onPress={() => router.replace('/(app)')}
      />
      <PaperDrawer.Item
        label="Impostazioni"
        icon="cog"
        active={state.index === 1}
        onPress={() => {navigation.navigate('settings')}}
      />
    </PaperDrawer.Section>
    </PaperProvider>
  );
}

export default function DrawerMenu({ContiCorrenteScreen, SettingsScreen} : any) {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768; // Tablet o Web

  return (
    <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
        // Su schermi grandi la sidebar è fissa (permanent), su mobile è a comparsa (front)
        // drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerType: 'front',
        header: () => (
            <Appbar.Header>
              <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
              <Appbar.Content title="Progetto Spese"/>
            </Appbar.Header>
        ),
        })}> 

        <Drawer.Screen name="index" component={ContiCorrenteScreen} />
        <Drawer.Screen name="settings" component={SettingsScreen} />

    </Drawer.Navigator>
    );
}