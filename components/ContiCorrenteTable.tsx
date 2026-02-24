import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getAllContiCorrente } from '../api/ContiCorrenteService';

interface ContiCorrente {
  id: number;
  nome: string;
  descrizione: string;
  totale: number;
}

export default function ContiCorrenteTable({ token }: { token: string }) {
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
      <Text style={styles.title}>I Tuoi Conti Corrente</Text>
      <View style={styles.table}>
        {/* Header della Tabella */}
        <View style={[styles.row, styles.header]}>
          <Text style={styles.cell}>Id</Text>
          <Text style={styles.cell}>Nome</Text>
          <Text style={styles.cell}>Descrizione</Text>
          <Text style={styles.cell}>Totale</Text>
        </View>
        
        {/* Righe della Tabella */}
        {dati.map((conto) => (
          <View key={conto.id} style={styles.row}>
            <Text style={styles.cell}>{conto.id}</Text>
            <Text style={styles.cell}>{conto.nome}</Text>
            <Text style={styles.cell}>€ {conto.descrizione}</Text>
            <Text style={styles.cell}>{conto.totale}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  table: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 10 },
  header: { backgroundColor: '#f0f0f0' },
  cell: { flex: 1, fontSize: 14 }
});