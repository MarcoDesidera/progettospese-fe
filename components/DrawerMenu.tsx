import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { Appbar, configureFonts, MD3LightTheme, Drawer as PaperDrawer, PaperProvider } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const baseFontConfig = {
  fontFamily: 'PublicSans-Regular',
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({
    config: {
      // Devi definire l'oggetto completo per ogni variante che vuoi personalizzare
      labelLarge: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 16,
        fontWeight: '500', 
        lineHeight: 22,
        letterSpacing: 0.1,
      },
      titleSmall: {
        fontFamily: 'PublicSans-Bold',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 20,
        letterSpacing: 0.5,
      },
      // Se vuoi un fallback per tutto il resto senza scriverli tutti:
      default: {
        fontFamily: 'PublicSans-Regular',
        fontWeight: '400',
        lineHeight: 20,
        fontSize: 14,
        letterSpacing: 0.1,
      },
    },
  }),
};

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