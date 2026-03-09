import { StyleSheet } from 'react-native';

const styles_web = StyleSheet.create({
  container: { 
    padding: 20, 
    width: '100%' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15,
    fontFamily: 'PublicSans-Regular'
  },
  header: { 
    backgroundColor: '#8e4afc',
    borderBottomWidth: 0, 
    borderTopWidth: 0,
    borderRightColor: '#727272',
    borderLeftColor: '#727272',
    borderWidth: 1,
  },
  header_text: { 
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'PublicSans-Regular'
  },
  tableRow: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightColor: '#727272',
    borderLeftColor: '#727272'
  },
  verticalDivider: {
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0', // Un grigio chiaro e sottile
    paddingLeft: 10,           // Spazio tra la linea e il testo
    marginLeft: 10,            // Spazio tra la linea e la colonna precedente
  },
  tableCellText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'PublicSans-Regular'
  },
  button_container: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  buttonAdd: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: '#ffffff',
  },
  buttonAddText: {
    color: '#000000',
    fontFamily: 'PublicSans-Regular',
    fontSize: 16
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: '33%',
    height: '33%',
    alignSelf: 'center',
    borderRadius: 20
  },
  modalButtonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
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
  title: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center'
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  actionButton: {

  },
  mobileContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    columnGap: 0,
    rowGap: 20,
    justifyContent: 'space-around'
  },
  cardContainer: {
    backgroundColor: '#dadada',
  }
});

export default styles_web;