import React, { useState } from 'react';
import Acolhimento from './components/Acolhimento';
import CameraMagica from './components/CameraMagica';
import ModoIA from './components/ModoIA';
import PainelEducador from './components/PainelEducador';

export default function App() {
  const [etapa, setEtapa] = useState('acolhimento'); // acolhimento, camera, ia, educador
  const [dadosCrianca, setDadosCrianca] = useState({
    nome: '',
    genero: 'menina', // 'menina' ou 'menino'
    nomeAmigoIA: 'Lola',
    objetoFoto: null
  });
  const [historicoEvidencias, setHistoricoEvidencias] = useState([]);

  return (
    <div className="min-h-screen bg-[#F9FAFC] font-sans text-gray-800 flex flex-col justify-between p-4 md:p-8">
      {/* Cabeçalho Minimalista / Segurança */}
      <header className="flex justify-between items-center max-w-4xl mx-auto w-full mb-6">
        <h1 className="text-xl font-bold text-[#2980B9]">✨ Meu Nome, Minhas Letras</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setEtapa('educador')}
            className="text-xs bg-blue-100 text-[#2980B9] font-bold px-3 py-1.5 rounded-full hover:bg-blue-200 transition"
          >
            🎓 Modo Educador / Supervisão
          </button>
        </div>
      </header>

      {/* Corpo Dinâmico */}
      <main className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
        {etapa === 'acolhimento' && (
          <Acolhimento 
            dadosCrianca={dadosCrianca} 
            setDadosCrianca={setDadosCrianca} 
            onAvancar={() => setEtapa('camera')} 
          />
        )}

        {etapa === 'camera' && (
          <CameraMagica 
            dadosCrianca={dadosCrianca} 
            setDadosCrianca={setDadosCrianca} 
            onAvancar={(objeto) => {
              setHistoricoEvidencias([...historicoEvidencias, { objeto, data: new Date().toLocaleDateString() }]);
              setEtapa('ia');
            }} 
          />
        )}

        {etapa === 'ia' && (
          <ModoIA 
            dadosCrianca={dadosCrianca} 
            onVoltar={() => setEtapa('camera')} 
          />
        )}

        {etapa === 'educador' && (
          <PainelEducador 
            dadosCrianca={dadosCrianca} 
            historico={historicoEvidencias} 
            onVoltar={() => setEtapa('acolhimento')} 
          />
        )}
      </main>

      {/* Rodapé Seguro / LGPD / ECA Digital */}
      <footer className="text-center text-xs text-gray-400 mt-8">
        Ambiente Seguro Protegido • Alinhado à BNCC & ECA Digital • Rio Preto (SP)
      </footer>
    </div>
  );
}
