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
          {modulo === 'ia' && objeto && (
            <div className="flex flex-col items-center gap-4 text-center">
              <h3 className="font-black text-lg text-slate-800">{objeto.nome}</h3>
              <div className="flex gap-2">
                {objeto.silabas.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-amber-300 rounded-xl font-black text-sm text-amber-950 border border-amber-400">{s}</span>
                ))}
              </div>
              <button 
                onClick={() => { 
                  setEstudante({
                    ...estudante, 
                    pontos: estudante.pontos + 50,
                    letras: [...new Set([...estudante.letras, objeto.letra])]
                  }); 
                  setHistorico([{ id: Date.now(), objeto: objeto.nome, letra: objeto.letra, data: new Date().toLocaleDateString() }, ...historico]); 
                  setModulo('acolhimento'); 
                  falar("Parabéns, você validou a palavra!"); 
                }} 
                className="w-full py-3.5 bg-emerald-500 text-white font-black rounded-xl text-sm shadow-sm"
              >
                ✅ Confirmar Palavra!
              </button>
            </div>
          )}

          {modulo === 'auditoria' && (
            <div className="text-xs text-left">
              <h3 className="font-black text-sm mb-3 text-slate-800 border-b pb-1.5 uppercase tracking-wider">🎓 Relatório do Educador</h3>
              <p className="text-[10px] text-slate-400 mb-4 font-medium">Histórico de evidências em conformidade com as diretrizes educacionais.</p>
              {historico.length === 0 ? (
                <p className="text-slate-400 italic text-center py-6 border border-dashed rounded-xl bg-slate-50">Nenhum registro de leitura nesta sessão.</p>
              ) : (
                <div className="max-h-40 overflow-y-auto border border-slate-100 rounded-xl divide-y bg-slate-50">
                  {historico.map(h => (
                    <div key={h.id} className="p-2.5 flex justify-between items-center font-bold text-slate-600 bg-white">
                      <span>{h.objeto}</span>
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-black">{h.letra}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
