# Leitura de arquivos CNAB

Projeto consiste na leitura de um arquivo posicional e melhoramento de CLI.

- Para o primeiro item - busca de arquivo passando o diretório - o mesmo é agora possível passando o parametro `-d` e `-n`. Caso não se passe o parametro `-d` o mesmo buscará no root do projeto. Além disso, é criado uma indexação para que casos onde há grandes arquivos de leitura, seja mais fácil realizar a busca; Para essa busca é possivel selecionar a linha `-i` ou buscar por todas as linhas onde se tem o segmento `-s` passado como parametro

- Para o segundo ponto, tem-se uma busca de nome da empresa de forma agnóstica, ou seja, o nome é passado como parametro `-c` e será buscado em todos os tipos de segmento, independente de visualmente só se ter o segmento Q com nomes de empresa. Dessa forma, evita-se qualquer tipo de falha caso alguma outra linha apresente nome de empresa.

- Para o terceiro item, fez-se uma escrita em um arquivo json com o nome e endereço da empresa, independente do comando passado no terminal, esse arquivo é registrado.

## Diretórios

- `files` - contem os arquivos cnab
- `methods` - contém as funçoes chamadas para cada item anterior
- `storage` - contem todo arquivo gerado no processo
- `utils` - funções auxiliares para o projeto

## Execução

```bash
node cnabRows.js
```

temos o seguinte output:

```bash
node cnabRows.js --help
Uso: cnabRows.js [options]

Opções:
      --help      Exibe ajuda                                         [booleano]
      --version   Exibe a versão                                      [booleano]
  -f, --from      posição inicial de pesquisa da linha do Cnab
                                                          [número] [obrigatório]
  -t, --to        posição final de pesquisa da linha do Cnab
                                                          [número] [obrigatório]
  -s, --segment   tipo de segmento                        [string] [obrigatório]
  -d, --dir       Nome do diretório onde se encontra o arquivo          [string]
  -n, --fileName  Nome do arquivo especificado            [string] [obrigatório]
  -i, --line      Linha do arquivo para buscar o segmento (opcional)    [número]
  -c, --company   Busca pelo nome da empresa                            [string]

Exemplos:
  node cnabRows.js -d /path/to/directory -  lista a linha e campo que from e to
  n cnabFile.rem -f 21 -t 34 -s p           do cnab
```
