import React, { useState, useEffect } from 'react';

// Dicionário fonético institucional integrado localmente (Sem conexões externas)
const DICIONARIO_PEDAGOGICO = {
  "BONECA": "Parabéns! Você encontrou a Bo-ne-ca. O som inicial é bú, como em bola e balão.",
  "DADO": "Excelente descoberta! O Da-do começa com o som dú, igual a dedo e dinossauro.",
  "CANECA": "Muito bem! Ca-ne-ca começa com o som cú, o mesmo som de casa e de caderno."
};

export default function ProcessamentoIA({ registroEstudante, evidenciaAtual, onVoltarAoModulo, onHomologarEvidencia }) {
  const [respostaLocal, setRespostaLocal] = useState("");

  // Processador de áudio estruturado para pausas infantis naturais
  const falarTextoHumanizado = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const elos = new SpeechSynthesisUtterance(texto);
      elos.lang = 'pt-BR';
      elos.rate = 0.82; // Ritmo cadenciado para absorção do fonema
      window.speechSynthesis.speak(elos);
    }
  };

  useEffect(() => {
    if (evidenciaAtual) {
      const textoDefinido = DICIONARIO_PEDAGOGICO[evidenciaAtual.nome] || 
        `Incrível! Você localizou o objeto ${evidenciaAtual.nome}. Vamos estudar seu som!`;
      
      setRespostaLocal(textoDefinido);
      // Feedback falado automático ao abrir o módulo
      falarTextoHumanizado(textoDefinido);
    }
  }, [evidenciaAtual]);

  if (!evidenciaAtual) return null;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="text-4xl animate-pulse">🤖</span>
      <h3 className="font-bold text-base text-slate-700">Análise Fonológica Concluída</h3>

      {/* Exibição Silábica Estruturada */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full max-w-sm">
        <span className="text-3xl font-black text-indigo-600 block mb-2 tracking-widest">
          {evidenciaAtual.nome}
        </span>
        <div className="flex justify-center gap-1.5 mb-2">
          {evidenciaAtual.silabas.map((s, i) => (
            <span 
              key={i} 
              className={`px-3 py-1.5 font-black rounded-lg border text-sm shadow-sm ${
                i === 0 ? 'bg-amber-300 text-amber-950 border-amber-400' : 'bg-white text-slate-500'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        <p className="text-[10px] font-bold text-slate-400">Fonema Monitorado: "{evidenciaAtual.som}"</p>
      </div>

      {/* Caixa de Resposta Local com Botão de Áudio Dedicado */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 w-full max-w-sm text-left">
        <span className="text-[10px] font-black text-indigo-700 block uppercase tracking-wider mb-1">
          Instrução do Mascote:
        </span>
        <p className="text-xs font-semibold text-slate-600 leading-relaxed bg-white p-3 rounded-xl border shadow-inner">
          {respostaLocal}
        </p>
        <button 
          onClick={() => falarTextoHumanizado(respostaLocal)}
          className="mt-2.5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
        >
          🔊 Ouvir Explicação Fônica
        </button>
      </div>

      {/* Controles de Fluxo Operacional */}
      <div className="w-full max-w-sm flex gap-3 mt-1">
        <button 
          onClick={onVoltarAoModulo} 
          className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl font-bold text-xs border transition-colors"
        >
          🔄 Tirar Outra Foto
        </button>
        <button 
          onClick={() => onHomologarEvidencia(evidenciaAtual.nome, evidenciaAtual.letra)} 
          className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs shadow-sm transition-colors"
        >
          Salvar no Portfólio ✓
        </button>
      </div>
    </div>
  );
}
