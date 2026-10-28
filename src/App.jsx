import React, { useState, useEffect } from 'react';

export default function App() {
  const [modulo, setModulo] = useState('acolhimento');
  const [estudante, setEstudante] = useState({
    nome: '',
    avatar: '🦊',
    pontos: 0,
    letras: ['A']
  });
  
  const [objeto, setObjeto] = useState(null);
  const [historico, setHistorico] = useState([]);

  const falar = (t) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = 'pt-BR';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-800">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-md min-h-[480px] flex flex-col justify-between border">
        
        <header className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="font-black text-indigo-600 text-xs uppercase tracking-wider">✨ ALFA AVENTURA</h1>
          <button 
            onClick={() => setModulo(modulo === 'auditoria' ? 'acolhimento' : 'auditoria')} 
            className="text-[10px] bg-slate-100 px-2.5 py-1.5 rounded-xl font-bold"
          >
            {modulo === 'auditoria' ? '🧒 Voltar' : '🎓 Painel'}
          </button>
        </header>

        <main className="flex-1 flex flex-col justify-center">
          {modulo === 'acolhimento' && (
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-xl font-black text-indigo-600">Caçadores de Som</h2>
              <input 
                type="text" 
                placeholder="Digite seu nome..." 
                value={estudante.nome}
                onChange={(e) => setEstudante({...estudante, nome: e.target.value})}
                className="w-full p-3 rounded-xl bg-slate-50 border-2 font-bold text-center outline-none focus:border-indigo-400"
              />
              <button 
                disabled={!estudante.nome.trim()} 
                onClick={() => { setModulo('captura'); falar("Ache um objeto com a letra inicial do seu nome!"); }} 
                className="w-full py-3.5 bg-indigo-600 disabled:opacity-40 text-white font-black rounded-xl shadow-sm text-sm"
              >
                Iniciar Missão ➔
              </button>
            </div>
          )}

          {modulo === 'captura' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-xs font-bold text-slate-400">Aponte a câmera para um objeto escolar</p>
              <div className="w-full h-36 bg-slate-900 rounded-2xl flex items-center justify-center border-4 border-dashed border-slate-700 text-slate-500 text-[11px] px-6">Lente de Reconhecimento Ativa</div>
              <button 
                onClick={() => { 
                  setObjeto({ nome: 'BONECA', letra: 'B', silabas: ['BO','NE','CA'] }); 
                  setModulo('ia'); 
                }} 
                className="w-full py-3.5 bg-indigo-600 text-white font-black rounded-xl text-sm"
              >
                📸 Tirar Foto Mágica!
              </button>
            </div>
          )}
