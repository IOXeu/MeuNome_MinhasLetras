import React, { useState } from 'react';

export default function CameraMagica({ dadosCrianca, onAvancar }) {
  const [objetoEscolhido, setObjetoEscolhido] = useState('Colher');

  const objetosExemplo = [
    { nome: 'Colher', letra: 'C', cor: 'bg-amber-100 text-amber-800' },
    { nome: 'Cadeira', letra: 'C', cor: 'bg-blue-100 text-blue-800' },
    { nome: 'Janela', letra: 'J', cor: 'bg-emerald-100 text-emerald-800' },
    { nome: 'Livro', letra: 'L', cor: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 text-center max-w-lg mx-auto">
      <span className="text-4xl">📸</span>
      <h2 className="text-2xl font-bold text-[#2980B9] mt-3">A Câmera Mágica</h2>
      <p className="text-gray-500 text-sm mt-2 mb-6">Com a ajuda de um adulto, escolha ou tire a foto de um objeto da sua casa!</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {objetosExemplo.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setObjetoEscolhido(item.nome)}
            className={`p-4 rounded-2xl border font-bold text-center transition flex flex-col items-center justify-center gap-2 ${objetoEscolhido === item.nome ? 'border-[#2980B9] bg-blue-50 text-[#2980B9]' : 'border-gray-100 bg-gray-50 text-gray-600'}`}
          >
            <span className="text-2xl">🔍</span>
            <span>{item.nome}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={() => onAvancar(objetoEscolhido)}
        className="w-full py-3.5 bg-[#27AE60] hover:bg-[#219653] text-white font-bold rounded-xl transition shadow-md"
      >
        Analisar com {dadosCrianca.nomeAmigoIA} ✨
      </button>
    </div>
  );
}
