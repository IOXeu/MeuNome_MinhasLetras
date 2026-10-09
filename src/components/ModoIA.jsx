import React, { useState } from 'react';

export default function ModoIA({ dadosCrianca, onVoltar }) {
  const [mensagemUsuario, setMensagemUsuario] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      remetente: 'ia',
      texto: `Oie, ${dadosCrianca.nome}! Que alegria falar com você! Eu sou o/a ${dadosCrianca.nomeAmigoIA}, seu amiguinho(a) virtual. O que a gente vai descobrir hoje?`
    }
  ]);
  const [carregando, setCarregando] = useState(false);

  const enviarMensagemParaGroq = async (e) => {
    e.preventDefault();
    if (!mensagemUsuario.trim() || carregando) return;

    const novaMensagem = mensagemUsuario;
    setMensagemUsuario('');
    
    // Adiciona a fala da criança no chat
    const logAtualizado = [...chatLog, { remetente: 'crianca', texto: novaMensagem }];
    setChatLog(logAtualizado);
    setCarregando(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
        alert('Chave da API da Groq não configurada no arquivo .env!');
        setCarregando(false);
        return;
      }

      // Chamada ultrarrápida à API da Groq
      const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Modelo rápido e leve ideal para o projeto
          messages: [
            {
              role: 'system',
              content: `Você é ${dadosCrianca.nomeAmigoIA}, um(a) amiguinho(a) virtual muito carinhoso(a), lúdico(a) e acolhedor(a) para uma criança de 4 a 6 anos chamada ${dadosCrianca.nome}. Responda de forma extremamente curta, simples, alegre, incentivando a alfabetização e o carinho com a família. Nunca use termos adultos ou complexos.`
            },
            ...logAtualizado.map(msg => ({
              role: msg.remetente === 'crianca' ? 'user' : 'assistant',
              content: msg.texto
            }))
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      const dados = await resposta.json();
      const respostaIA = dados.choices?.[0]?.message?.content || 'Eba! Vamos continuar brincando com as letrinhas?';

      setChatLog([...logAtualizado, { remetente: 'ia', texto: respostaIA }]);
    } catch (erro) {
      console.error('Erro ao falar com a Groq:', erro);
      setChatLog([...logAtualizado, { remetente: 'ia', texto: 'Opa, deu um leve frizz na minha antena, mas estou aqui com você!' }]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 max-w-lg mx-auto flex flex-col h-[500px]">
      <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🤖</span>
          <div>
            <h2 className="font-bold text-[#2980B9]">{dadosCrianca.nomeAmigoIA}</h2>
            <p className="text-xs text-gray-400">Conversando com {dadosCrianca.nome}</p>
          </div>
        </div>
        <button onClick={onVoltar} className="text-xs text-gray-400 hover:text-gray-600 font-bold">Voltar</button>
      </div>

      {/* Caixa de Mensagens do Chat */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 my-2 pr-1">
        {chatLog.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.remetente === 'crianca' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-3.5 rounded-2xl max-w-[80%] text-sm ${msg.remetente === 'crianca' ? 'bg-[#2980B9] text-white rounded-br-none' : 'bg-blue-50 text-blue-900 rounded-bl-none font-medium'}`}>
              {msg.texto}
            </div>
          </div>
        ))}
        {carregando && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-100 text-gray-400 rounded-2xl text-xs animate-pulse">
              {dadosCrianca.nomeAmigoIA} está pensando... ✨
            </div>
          </div>
        )}
      </div>

      {/* Input de Envio */}
      <form onSubmit={enviarMensagemParaGroq} className="flex gap-2 pt-2 border-t">
        <input 
          type="text"
          value={mensagemUsuario}
          onChange={(e) => setMensagemUsuario(e.target.value)}
          placeholder="Digite ou fale com seu amiguinho..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2980B9] text-sm"
        />
        <button 
          type="submit"
          disabled={carregando}
          className="px-5 py-3 bg-[#2980B9] hover:bg-[#21618C] text-white font-bold rounded-xl transition text-sm disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
