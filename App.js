import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from './src/config';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // READ - buscar as tarefas no backend
  async function carregarTarefas() {
    try {
      const resposta = await fetch(`${API_URL}/tarefas`);
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      Alert.alert('Erro', 'Não consegui conectar na API. Confira o IP no config.js');
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  // CREATE e UPDATE - o mesmo botão faz os dois
  async function salvarTarefa() {
    if (titulo.trim() === '') {
      Alert.alert('Atenção', 'Digite o título da tarefa');
      return;
    }

    try {
      if (editandoId) {
        await fetch(`${API_URL}/tarefas/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo }),
        });
      } else {
        await fetch(`${API_URL}/tarefas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo }),
        });
      }
      setTitulo('');
      setEditandoId(null);
      carregarTarefas();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  }

  // UPDATE - marcar como concluída / não concluída
  async function alternarConcluida(tarefa) {
    try {
      await fetch(`${API_URL}/tarefas/${tarefa._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluida: !tarefa.concluida }),
      });
      carregarTarefas();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível atualizar');
    }
  }

  // DELETE - excluir
  function confirmarExclusao(tarefa) {
    Alert.alert('Excluir', `Excluir "${tarefa.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await fetch(`${API_URL}/tarefas/${tarefa._id}`, { method: 'DELETE' });
            carregarTarefas();
          } catch (erro) {
            Alert.alert('Erro', 'Não foi possível excluir');
          }
        },
      },
    ]);
  }

  function iniciarEdicao(tarefa) {
    setTitulo(tarefa.titulo);
    setEditandoId(tarefa._id);
  }

  function cancelarEdicao() {
    setTitulo('');
    setEditandoId(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa..."
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarTarefa}>
        <Text style={styles.botaoTexto}>{editandoId ? 'Salvar edição' : 'Adicionar'}</Text>
      </TouchableOpacity>

      {editandoId && (
        <TouchableOpacity onPress={cancelarEdicao}>
          <Text style={styles.cancelar}>Cancelar edição</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa ainda</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => alternarConcluida(item)}>
              <Text style={[styles.cardTexto, item.concluida && styles.concluida]}>
                {item.concluida ? '✅ ' : '⬜ '}
                {item.titulo}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => iniciarEdicao(item)}>
              <Text style={styles.acao}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmarExclusao(item)}>
              <Text style={styles.acao}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 20, paddingTop: 50 },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  botao: { backgroundColor: '#4f46e5', padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelar: { textAlign: 'center', color: '#c00', marginTop: 10 },
  vazio: { textAlign: 'center', marginTop: 30, color: '#888' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  cardTexto: { fontSize: 16 },
  concluida: { textDecorationLine: 'line-through', color: '#999' },
  acao: { fontSize: 20, marginLeft: 12 },
});
