import { StyleSheet } from 'react-native';

export const ti_theme = {
    colors: {
        onSurfaceVariant: "#383838",
        primary: "#383838",
    },
}

const styles_web = StyleSheet.create({
  textinput: {
    backgroundColor: "#dddddd",
    color: "#000000"
  },
  formView: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
    display: 'flex',
    rowGap: 30
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1, // Assicura che sia sopra altri elementi
  },
  closeText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: '33%',
    height: 'auto',
    alignSelf: 'center',
    borderRadius: 20
  },
});

export default styles_web;