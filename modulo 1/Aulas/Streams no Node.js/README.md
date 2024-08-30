Readable Streams -> são streamers de leitura Usuário envia pro servidor
Writable Stremas -> são streamers de escrita Servidor envia pro usuário

process.stdin
    .pipe(stdout) 

stdin - stream de leitura
stdout - stream de saida

# **Qual a diferença entre Writable e Transform Stream?**

A primeira e principal diferença é que a WriteableStream não consegue enviar dados para outra Stream, ela só **RECEBE** dados e faz algo com esses dados.

Imagine a seguinte situação:

Você está criando um script de processamento de áudio, a ideia é ler um arquivo de áudio, normalizar o volume do áudio, ou seja, cuidar para não ficar nem muito alto, nem muito baixo e, após a normalização, salvar novamente em um arquivo do sistema.

Utilizando o conceito de Streams logo nos vem a cabeça poder ler/escrever esse arquivo no sistema utilizando Streams, dessa forma evitamos que o arquivo fique salvo em memória poupando recursos.

Se usarmos o `fs.createReadStream` para ler o conteúdo do arquivo, estamos criando uma Stream de leitura, ou seja, podemos ler os dados gradualmente e enviar para alguma outra Stream.

Se enviarmos esses dados para uma Stream de escrita (`WriteableStream`), essa poderá receber os dados aos poucos, normalizar o áudio normalmente, mas não conseguirá enviar os pedacinhos do áudio normalizado para outra Stream porque uma `WriteableStream` sempre é um ponto final, não consigo encaminhar nada dali para frente.

Se eu usar uma `TransformStream`, posso também ler a Stream de leitura do arquivo de áudio, normalizar o volume e reencaminhar os dados processados para fora dessa Stream, para então usar um `fs.createWriteStream` para escrever o arquivo em disco com o áudio normalizado.