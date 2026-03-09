import { configureFonts, MD3LightTheme } from "react-native-paper";

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

export default theme;