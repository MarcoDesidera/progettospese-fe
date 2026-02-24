import { authStorage } from '@/utils/authStorage';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

// Necessario per chiudere il popup/reindirizzare correttamente su Web
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // 1. Discovery degli endpoint di Azure (usando il Tenant ID dalle variabili d'ambiente)
  const discovery = useAutoDiscovery(
    `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_AZURE_TENANT_ID}/v2.0`
  );

  // 2. Definizione del Redirect URI
  const redirectUri = makeRedirectUri({
    scheme: 'progettospese', // Assicurati che coincida con app.json
    preferLocalhost: true,
  });

  // 3. Configurazione della richiesta di autenticazione
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_AZURE_CLIENT_ID!,
      scopes: [
        'openid', 
        'profile', 
        'email', 
        'offline_access', 
        `${process.env.EXPO_PUBLIC_AZURE_CLIENT_ID}/.default`
      ],
      redirectUri,
    },
    discovery
  );

  // 4. Effetto per gestire la risposta e scambiare il CODE con l'ACCESS TOKEN
  React.useEffect(() => {
    const exchangeToken = async (code: string, codeVerifier: string) => {
      setLoading(true);
      const tokenUrl = discovery?.tokenEndpoint!;

      const params = new URLSearchParams();
      params.append('client_id', process.env.EXPO_PUBLIC_AZURE_CLIENT_ID!);
      params.append('code', code);
      params.append('redirect_uri', redirectUri);
      params.append('grant_type', 'authorization_code');
      params.append('code_verifier', codeVerifier);

      try {
        const res = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });

        const data = await res.json();

        if (data.access_token) {
          console.log("✅ ACCESS TOKEN RICEVUTO:", data.access_token);
          
          // Salvataggio per il frontend
          //sessionStorage.setItem('access_token', data.access_token);
          await authStorage.saveToken(data.access_token);
          
          // Torna alla home (Index)
          router.replace("/");
        } else {
          console.error("Errore nello scambio del token:", data);
        }
      } catch (error) {
        console.error("Errore di rete durante lo scambio:", error);
      } finally {
        setLoading(false);
      }
    };

    if (response?.type === 'success') {
      const { code } = response.params;
      if (code && request?.codeVerifier) {
        exchangeToken(code, request.codeVerifier);
      }
    } else if (response?.type === 'error') {
      console.error("Errore nel prompt di login:", response.error);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#0078d4" />
          <Text style={styles.text}>Scambio del codice in corso...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Accesso Richiesto</Text>
          <Button
            disabled={!request}
            title="Accedi con Microsoft"
            onPress={() => promptAsync()}
          />
          {!request && <Text style={styles.subtext}>Caricamento configurazione Microsoft...</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  subtext: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  }
});