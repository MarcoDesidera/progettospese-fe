import { authStorage } from "@/utils/authStorage";
import { Slot, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {

  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await authStorage.getToken();
        setAccessToken(token);
      } catch (e) {
        setAccessToken(null);
      } finally {
        setIsChecking(false); // Abbiamo finito di controllare
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    // Se stiamo ancora caricando il token o la navigazione non è pronta, aspetta
    if (isChecking || !navigationState?.key) return;

    const inAppGroup = segments[0] === '(app)';

    if (!accessToken && inAppGroup) {
      router.replace("/(auth)/login");
    } else if (accessToken && !inAppGroup) {
      router.replace("/(app)");
    }
  }, [accessToken, segments, navigationState?.key, isChecking]);

  
  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return
    <GluestackUIProvider mode="dark">
      <Slot />
    </GluestackUIProvider>
    ;

}
