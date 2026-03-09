import ContiCorrente from "@/components/ContiCorrente";
import { authStorage } from "@/utils/authStorage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index({ token }: { token: string | null }) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await authStorage.getToken();
      setAccessToken(token);
      //setIsChecking(false);
    };
    loadToken();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    setAccessToken(null);
  };
  
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
      <View style={{ width: '100%', flex: 1}}>
            <ContiCorrente token={accessToken} />
        </View>
    </View>
    // <View />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 10 // React Native assume che siano unità dp
  },
});