import React, { useState } from 'react';

export default function Acolhimento({ dadosCrianca, setDadosCrianca, onAvancar }) {
  const [nome, setNome] = useState(dadosCrianca.nome);
  const [genero, setGenero] = useState(dadosCrianca.genero);
  const [nomeAmigo, setNomeAmigo] = useState(dadosCrianca.nomeAmigoIA);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert('Por favor, diga seu nome para começarmos!');
    setDadosCrianca({
      ...dadosCrianca,
      nome,
      genero,
      nomeAmigoIA: nomeAmigo.trim() || 'Lola'
    });
    onAvancar();
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 text-center max-w-lg mx-auto">
      <span className="text-4xl">🌟</span>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2980B9] mt-3">Bem-vindo(a) ao seu espaço mágico!</h2>
      <p className="text-gray-500 text-sm mt-2 mb-6">Vamos descobrir as letrinhas e conversar com seu novo amiguinho.</p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Qual é o seu nome?</label>
          <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Thayna ou Luis"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2980B9]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Como você se identifica?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGenero('menina')}
              className={`py-3 rounded-xl font-bold border transition ${genero === 'menina' ? 'bg-pink-50 border-pink-400 text-pink-700' : 'bg-gray-50 text-gray-500'}`}
            >
              🌸 Menina
            </button>
            <button
              type="button"
              onClick={() => setGenero('menino')}
              className={`py-3 rounded-xl font-bold border transition ${genero === 'menino' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-50 text-gray-500'}`}
            >
              🚀 Menino
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Que nome você quer dar para a sua IA (Amigo/Amiga)?</label>
          <input 
            type="text" 
            value={nomeAmigo}
            onChange={(e) => setNomeAmigo(e.target.value)}
            placeholder="Ex: Lola, Foguete, Pipoca..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2980B9]"
          />
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-[#2980B9] hover:bg-[#21618C] text-white font-bold rounded-xl transition shadow-md"
        >
          Começar a Brincadeira 🚀
        </button>
      </form>
    </div>
  );
}
