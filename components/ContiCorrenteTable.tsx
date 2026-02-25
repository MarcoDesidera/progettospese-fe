import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { getAllContiCorrente } from '../api/ContiCorrenteService';

interface ContiCorrente {
  id: number;
  nome: string;
  descrizione: string;
  totale: number;
}

export default function ContiCorrenteTable({ token }: { token: string | null }) {
  const [dati, setDati] = useState<ContiCorrente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      {dati.map((conto) => (
        <Card mode='contained'>
          <Card.Title title={conto.nome}/>
          <Card.Content>
            <Text>{conto.totale} €</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.table}>
  //       <View style={[styles.row, styles.header]}>
  //         <Text style={styles.cell}>Id</Text>
  //         <Text style={styles.cell}>Nome</Text>
  //         <Text style={styles.cell}>Descrizione</Text>
  //         <Text style={styles.cell}>Totale</Text>
  //       </View>
        
  //       {dati.map((conto) => (
  //         <View key={conto.id} style={styles.row}>
  //           <Text style={styles.cell}>{conto.id}</Text>
  //           <Text style={styles.cell}>{conto.nome}</Text>
  //           <Text style={styles.cell}>{conto.descrizione}</Text>
  //           <Text style={styles.cell}>{conto.totale} €</Text>
  //         </View>
  //       ))}
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: { padding: 20, width: '50%' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  table: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 10 },
  header: { backgroundColor: '#f0f0f0' },
  cell: { flex: 1, fontSize: 14 }
});