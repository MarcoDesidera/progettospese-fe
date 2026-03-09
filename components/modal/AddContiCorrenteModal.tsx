import { addContoCorrente } from '@/api/ContiCorrenteService';
import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import style, { ti_theme } from '../../styles/AddContiCorrenteModal.style';

interface AddContiCorrenteModalProps {
  visible: boolean;
  onDismiss: () => void;
  token: string | null;
}

const AddContiCorrenteModal = ({ visible, onDismiss, token }: AddContiCorrenteModalProps) => {
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [nome, setNome] = useState<string>("");
  const [descrizione, setDescrizione] = useState<string>("");
  const [totale, setTotale] = useState<number>(0.00);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    let value = e.target.value;

    // Permette solo numeri e punto
    value = value.replace(/[^0-9.]/g, "");

    // Evita più punti decimali
    const parts = value.split(".");
    if (parts.length > 2) return;

    setTotale(value);
  };

  const handleAdd = () => {

    let data = {
      nome: nome,
      descrizione: descrizione,
      totale: totale
    }

    if(token) {
      addContoCorrente(token, data)
      .then(() => {
        setNome('');
        setDescrizione('');
        setTotale(0.00);

        onDismiss();
      })
      .catch(err => {
        setError(err.message);
      });
    }
  }

  return (
    <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={style.modalContainer}>
            <TouchableOpacity 
                style={style.closeButton} 
                onPress={onDismiss}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Aumenta l'area cliccabile
            >
                <Text style={style.closeText}>✕</Text>
            </TouchableOpacity>
            <View style={style.formView}>
              <TextInput
                mode='flat'
                label="Nome"
                value={nome}
                onChangeText={nome => setNome(nome)}
                textColor='#000000'
                style={style.textinput}
                theme={ti_theme}
              />

              <TextInput
                mode='flat'
                label="Descrizione"
                value={descrizione}
                onChangeText={descrizione => setDescrizione(descrizione)}
                textColor='#000000'
                style={style.textinput}
                theme={ti_theme}
              />

              <TextInput
                label="Totale"
                value={totale.toString()}
                onChange={handleChange}
                placeholder="0.00"
                textColor='#000000'
                style={style.textinput}
                theme={ti_theme}
                left={<TextInput.Affix text="€ " textStyle={{color: "#000000"}} />}
              />

              <Button onPress={handleAdd} mode='elevated'>
                <Text>Aggiungi</Text>
              </Button>
            </View>
        </Modal>
    </Portal>
  );
};

export default AddContiCorrenteModal;