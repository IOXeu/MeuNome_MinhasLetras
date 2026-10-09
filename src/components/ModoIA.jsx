import React from 'react';

export default function ModoIA({ dadosCrianca, onVoltar }) {
  const saudacaoGenero = dadosCrianca.genero === 'menina' ? 'linda e esperta' : 'legal e corajoso';

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 text-center max-w-lg mx-auto">
      <span className="text-5xl">🤖💬</span>
      <h2 className="text-2xl font-bold text-[#2980B9] mt-3">Conversando com {dadosCrianca.nomeAmigoIA}</h2>
      
      <div className="bg-blue-50 p-5 rounded-2xl my-6 text-left border border-blue-100">
        <p className="text-sm text-blue-900 leading-relaxed font-medium">
          <em>"Oie, {dadosCrianca.nome}! Que alegria falar com você! Sabia que você é super {saudacaoGenero}? Eu adorei o objeto que você tirou foto com sua família! As letrinhas dele combinam direitinho com o seu nome!"</em>
        </p>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onVoltar}
          className="w-1/2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
        >
          Tirar Outra Foto
        </button>
        <button 
          onClick={() => alert('Parabéns! Atividade concluída e enviada ao portfólio pedagógico.')}
          className="w-1/2 py-3 bg-[#2980B9] hover:bg-[#21618C] text-white font-bold rounded-xl transition"
        >
          Concluir Desafio 🎉
        </button>
      </div>
    </div>
  );
}
