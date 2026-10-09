import React, { useState } from 'react';

export default function PainelEducador({ dadosCrianca, historico, onVoltar }) {
  const [senha, setSenha] = useState('');
  const [autorizado, setAutorizado] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (senha === '1234') { // Senha padrão de teste do educador/prefeitura
      setAutorizado(true);
    } else {
      alert('Senha incorreta. Use 1234 para teste.');
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#2980B9]">🎓 Painel de Supervisão e BNCC</h2>
        <button onClick={onVoltar} className="text-sm text-gray-400 hover:text-gray-600">Voltar</button>
      </div>

      {!autorizado ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <p className="text-sm text-gray-500">Área restrita a educadores, terapeutas ou supervisores autorizados pela rede municipal.</p>
          <input 
            type="password" 
            placeholder="Senha do Educador (Teste: 1234)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-center"
            required
          />
          <button type="submit" className="w-full py-3 bg-[#2980B9] text-white font-bold rounded-xl">
            Acessar Dados
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-2xl">
            <p className="font-bold text-blue-900">Aluno(a): {dadosCrianca.nome || 'Não informado'}</p>
            <p className="text-xs text-blue-700">Amigo IA Atribuído: {dadosCrianca.nomeAmigoIA} | Gênero: {dadosCrianca.genero}</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-2 text-sm">📋 Portfólio de Evidências (BNCC):</h3>
            <ul className="space-y-2 text-sm">
              {historico.length > 0 ? (
                historico.map((item, idx) => (
                  <li key={idx} className="flex justify-between p-3 bg-gray-50 rounded-xl">
                    <span>📸 Objeto: <strong>{item.objeto}</strong></span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Habilidade Registrada</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-400 italic text-sm">Nenhuma evidência registrada nesta sessão ainda.</p>
              )}
            </ul>
          </div>

          <button 
            onClick={() => alert('Relatório PDF exportado com sucesso para a Secretaria de Educação!')}
            className="w-full py-3 bg-[#27AE60] text-white font-bold rounded-xl"
          >
            📥 Exportar Relatório Pedagógico (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
