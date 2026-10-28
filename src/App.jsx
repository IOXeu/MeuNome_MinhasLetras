  // Estado para armazenar o banco de palavras carregado do repositório
  const [bancoPalavras, setBancoPalavras] = useState([]);

  // Carrega o arquivo JSON assim que o aplicativo inicia na Cloud
  useEffect(() => {
    fetch('/dicionario.json') // Lê o arquivo na raiz pública ou caminho do repositório
      .then(res => res.json())
      .then(dados => {
        // Formata os dados para o padrão que a IA e o motor de voz utilizam
        if (Array.isArray(dados)) setBancoPalavras(dados);
      })
      .catch(err => console.log("Modo offline ativo: usando banco reserva."));
  }, []);

  // Função para buscar correspondência fônica exata quando a câmera captura um item
  const buscarMetadadosObjeto = (nomeObjeto) => {
    const palavraLimpa = nomeObjeto.toLowerCase().strip();
    return bancoPalavras.find(item => 
      item.expressao?.toLowerCase() === palavraLimpa || 
      item.termo?.toLowerCase() === palavraLimpa
    ) || { expressao: nomeObjeto, texto_fala: nomeObjeto, silabas: [nomeObjeto] };
  };
          {modulo === 'captura' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-xs font-bold text-slate-400">Aponte a câmera para um objeto escolar</p>
              <div className="w-full h-36 bg-slate-900 rounded-2xl flex items-center justify-center border-4 border-dashed border-slate-700 text-slate-500 text-[11px] px-6">Lente de Reconhecimento Ativa</div>
              <button 
                onClick={() => { 
                  // Simula o processamento do banco fônico local
                  setObjeto({ nome: 'BONECA', letra: 'B', silabas: ['BO','NE','CA'] }); 
                  setModulo('ia'); 
                  falar('BONECA', ['BO','NE','CA']);
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
                onClick={() => falar(objeto.nome, objeto.silabas)} 
                className="text-[11px] bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-full hover:bg-indigo-200 transition"
              >
                🔊 Ouvir Sílabas
              </button>
              <button 
                onClick={() => { 
                  setEstudante({
                    ...estudante, 
                    pontos: estudante.pontos + 50,
                    letras: [...new Set([...estudante.letras, objeto.letra])]
                  }); 
                  setHistorico([{ id: Date.now(), objeto: objeto.nome, letra: objeto.letra, data: new Date().toLocaleDateString('pt-BR') }, ...historico]); 
                  setModulo('acolhimento'); 
                  falar("Parabéns, você validou a palavra!"); 
                }} 
                className="w-full py-3.5 bg-emerald-500 text-white font-black rounded-xl text-sm shadow-sm"
              >
                ✅ Salvar no Portfólio!
              </button>
            </div>
          )}

          {modulo === 'auditoria' && (
            <div className="text-xs text-left">
              <h3 className="font-black text-sm mb-3 text-slate-800 border-b pb-1.5 uppercase tracking-wider">🎓 Relatório do Educador</h3>
              <p className="text-[10px] text-slate-400 mb-4 font-medium">Histórico de evidências em conformidade com as diretrizes educacionais locais.</p>
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
