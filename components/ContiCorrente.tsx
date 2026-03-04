import { TransazioniDto } from '@/types/transaction.dto';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import { Button, Card, DataTable, PaperProvider, Text } from 'react-native-paper';
import { getAllContiCorrente } from '../api/ContiCorrenteService';
import styles from '../styles/ContiCorrente.style';
import theme from '../styles/default.theme';
import AddContiCorrenteModal from './modal/AddContiCorrenteModal';

interface ContiCorrente {
  id: number;
  nome: string;
  descrizione: string;
  totale: number;
  transazioni: TransazioniDto[];
}

export default function ContiCorrente({ token }: { token: string | null }) {
  const [dati, setDati] = useState<ContiCorrente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataUltimaTransazione, setDataUltimaTransazione] = useState<Record<number, string>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  useEffect(() => {
    (token);
    if (token) {
      getAllContiCorrente(token)
        .then(data => {
          setDati(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={{ color: 'red' }}>Errore: {error}</Text>;

  //let dataUltimaTransazione = '';

  const mappa: Record<number, string> = {};

  dati.forEach((cc) => {
    if(cc.transazioni.length === 0) return;

    const ultima = cc.transazioni.reduce((a, b) =>
      new Date(b.dataTransazione) > new Date(a.dataTransazione) ? b : a
    );

    let tmp_date = new Date(ultima.dataTransazione).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    mappa[cc.id] = tmp_date;
  });

  const addContoCorrente = () => {
    setModalVisible(true); // show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // hide the modal
  };


  if(isLargeScreen) {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.button_container}>
            <Button style={styles.buttonAdd} mode='elevated' onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonAddText}>Aggiungi conto corrente</Text>
            </Button>

            {/* Modal posizionato qui, come fratello del PaperProvider */}
            <AddContiCorrenteModal
              visible={modalVisible}
              onDismiss={() => setModalVisible(false)}
              token={token}
            />
          </View>
          <DataTable>
            <DataTable.Header style={styles.header}>
              <DataTable.Title sortDirection='ascending'>
                <Text style={styles.header_text}>Nome</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.verticalDivider}>
                <Text style={styles.header_text}>Totale</Text>
              </DataTable.Title>
              <DataTable.Title sortDirection='descending' style={styles.verticalDivider}>
                <Text style={styles.header_text}>Data ultima tranasazione</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.verticalDivider}>
                <Text style={styles.header_text}>Azioni</Text>
              </DataTable.Title>
            </DataTable.Header>
            {dati.map((conto) => (
              <DataTable.Row key={conto.id} style={styles.tableRow}>
                <DataTable.Cell>
                  <Text style={styles.tableCellText}>{conto.nome}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.verticalDivider}>
                  <Text style={styles.tableCellText}>{conto.totale} €</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.verticalDivider}>
                  <Text style={styles.tableCellText}>{mappa[conto.id]}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.verticalDivider}>
                  <Button mode='text' onPress={() => {}} style={styles.actionButton}>
                    <View style={styles.actionContainer}>
                      <MaterialIcons name="turn-slight-right" size={20} color="#000000" />
                      <Text style={styles.tableCellText}>Vai a transazioni</Text>
                    </View>
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </PaperProvider>
    );
  }else {
    return (
      <PaperProvider>
        <View style={styles.mobileContainer}>
          {dati.map((conto) => (
            <Card mode='contained' style={styles.cardContainer}>
              <Card.Title title={conto.nome} theme={theme} titleStyle={{fontFamily: 'PublicSans-Regular', fontSize: 20, color: '#5e5e5e'}}/>
              <Card.Content>
                <Text style={[styles.tableCellText, {fontSize: 14}]}>Totale: </Text>
                <Text style={styles.tableCellText}>{conto.totale} €</Text>
              </Card.Content>
              <Card.Content style={{marginTop: 8}}>
                <Text style={[styles.tableCellText, {fontSize: 14}]}>Data ultima transazione: </Text>
                <Text style={styles.tableCellText}>{mappa[conto.id]}</Text>
              </Card.Content>
            </Card>
          ))} 
        </View>
      </PaperProvider>
    );
  }
}