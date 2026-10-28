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
