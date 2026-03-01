import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import style from '../../styles/ContiCorrente.style';

interface AddContiCorrenteModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const AddContiCorrenteModal = ({ visible, onDismiss }: AddContiCorrenteModalProps) => {
  const containerStyle = {backgroundColor: 'white', padding: 20};

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
            <Text style={style.modalText}>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
    </Portal>
  );
};

export default AddContiCorrenteModal;