import { View } from "react-native";
import { Text } from "react-native-paper";

export default function SettingsComponent({ token }: { token: string | null }) {

    return (
        <View>
            <Text>Impostazioni</Text>
        </View>
    );

}