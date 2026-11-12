import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [editingId, setEditingId] = useState(null);

  // URL da API local do Express (Passo #7 e #9)[cite: 22, 30]
  const API_URL = 'https://unisenai-frontend-aula-05.onrender.com/';

  // Buscar todas as notas (GET) ao carregar a página[cite: 22]
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
    }
  };

  // Criar (POST) ou Atualizar (PUT) nota[cite: 22]
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) return;

    const noteData = { titulo, texto };

    try {
      if (editingId) {
        // Atualizar nota existente (PUT)[cite: 22]
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
        setEditingId(null);
      } else {
        // Criar nova nota (POST)[cite: 22]
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
      }

      setTitulo('');
      setTexto('');
      fetchNotes(); // Atualiza a listagem
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
    }
  };

  // Preencher o formulário para edição
  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitulo(note.titulo);
    setTexto(note.texto);
  };

  // Excluir nota (DELETE)[cite: 22]
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchNotes(); // Atualiza a listagem
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' }}>
      <h2>Gerenciador de Notas (CRUD com React)[cite: 20]</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Título da nota"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea
          placeholder="Texto da nota"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows="4"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {editingId ? 'Atualizar Nota' : 'Criar Nova Nota'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setTitulo(''); setTexto(''); }}
            style={{ padding: '8px', background: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      {/* Listagem */}
      <h3>Notas Salvas</h3>
      {notes.length === 0 ? (
        <p>Nenhuma nota encontrada.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {notes.map((note) => (
            <div key={note.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', background: '#f9f9f9' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>{note.titulo}</h4>
              <p style={{ margin: '0 0 10px 0' }}>{note.texto}</p>
              <small style={{ color: '#666' }}>Criado em: {new Date(note.criadoEm || Date.now()).toLocaleString('pt-BR')}</small>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEdit(note)} style={{ padding: '5px 10px', background: '#ffc107', border: 'none', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => handleDelete(note.id)} style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;