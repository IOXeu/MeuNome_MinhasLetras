  const falar = (textoOriginal, silabasArray = []) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Se houver sílabas, reconstrói o texto com pausas para a IA falar igual ao seu Python
    // Exemplo: "BONECA" -> "BO... NE... CA..."
    const textoTratado = silabasArray.length > 0 
      ? silabasArray.join('... ') + '...' 
      : textoOriginal;

    const utterance = new SpeechSynthesisUtterance(textoTratado.toLowerCase());
    utterance.lang = 'pt-BR';
    utterance.rate = 0.75; // Velocidade reduzida para melhor percepção do fonema
    utterance.pitch = 1.1; // Tom amigável de robô assistente
    
    window.speechSynthesis.speak(utterance);
  };
