# API TypeScript

#### Resumo
Este projeto trata-se de uma API em TypeScript voltada para o gerenciamento de escolas.

#### Objetivo
Este projeto tem um objetivo didático para aplicação prática e aprimoramento dos conhecimentos adquiridos sobre as tecnologias utilizadas.

#### Tecnologias utilizadas
Para o desenvovimento desta API, utilizei as seguintes tecnologias:
* **TypeScript**: linguagem de programação utilizada no desenvolvimento deste projeto. O TypeScript é uma linguagem de programação baseada no JavaScript. Ela introduz recursos de tipagem que são particularmente interessantes para garantir a consistência e integridade dos objetos, diminuindo a chance de erros causados por inconsistências nos objetos em comparação com o JavaScript.
* **Express**: Biblioteca utilizada para criar o servidor da API. O Express fornece os recursos básicos necessários para criar um servidor de API.
* **Jest**: Biblioteca utilizada para o desenvolvimento dos testes automatizados da API. O Jest é uma ferramena muito prática para o desenvolvimento de testes. Com ela é possível agilizar a etapa de testagem dos recursos da API e aferir se esses recursos estão funcionando conforme o esperado.
* **ESLint**: Biblioteca para criar regras de padronização e formatação do código, proporcinado uma maior organização da codificação realizada.
* **Typeorm**: Biblioteca utilizada para a interação da API com o Banco de Dados. Typeorm é uma biblioteca muito versátil que fornece uma enorme gama de recursos para manipulação de banco de dados. Através das entidades, as tabelas são definidas no banco de dados, e por meio delas podemos utilizar a funcionalidade de repositórios para desenvolver consultas e criar, atualizar e excluir registros em um banco de dados de forma simples e prática.
* **JWT**: JSON Web Token foi utilizado para a criação de tokens de autenticação. É de extrema importância que recursos importantes da API sejam protegidos e exijam que o cliente esteja devidamente autenticado para a sua utilização, proporcionando segurança aos recursos da API e impedindo que clientes não autorizados acessem ou manipulem os dados fornecidos pela API.

#### Estrutura
Neste projeto foi utilizada a seguinte estrutura:

```shell
├──src
│  ├──server
│  │  ├──controllers - "aqui foram definidos os controladores, separados por entidades"
│  │  │  ├──entidades - "dentro de cada entidade estão os recursos implementados"
│  │  │  │  ├──recursos
│  │  │  │  └──index.ts - "arquivo de definição do controlador e seus métodos"
│  │  │  └──index.ts - "arquivo para exportar os controladores"
│  │  ├──database
│  │  │  ├──entities - "aqui estão definidas todas as entidades da aplicação"
│  │  │  │  └──index.ts - "arquivo para exportar as entidades"
│  │  │  ├──migrations
│  │  │  ├──repositories - "aqui estão os repositórios que interagem com o banco de dados,"
│  │  │  │  ├──entidades - "aqui estão os métodos do repositório"
│  │  │  │  │  ├──metodos
│  │  │  │  │  └──index.ts - "arquivo de definição do repositório e seus métodos"
│  │  │  │  └──index.ts - "arquivo para exportar os repositórios"
│  │  │  └──index.ts - "arquivo de configuração da conexão com o banco de dados"
│  │  ├──routes
│  │  │  └──index.ts - "arquivo que define todas as rotas disponíbilizadas pela API"
│  │  └──shared - "contém os recusos que podem ser compartilhados por todo o projeto"
│  │     ├──exceptions - "contém as exceções customizadas"
│  │     ├──middleware - "contém os middlewares da API"
│  │     ├──services - "contém os serviços que podem ser utilizados na API"
│  │     └──index.ts - "arquivo para exportar os recursos compartilhados"
│  └──index.ts - "inicialização do servidor express"
└──tests - "os testes foram divididos por entidades"
   └──entidades - "dentro de cada entidade estão os testes dos seus recursos"
      └──recursos
```

#### Modelagem dos dados
![teste](/db_modeling.jpg)

#### Referência
Os conceitos, tecnologias e estrutura foram baseados no curso de "Construção de APIs REST utilizando Node e TypeScript" do canal **Lucas Souza Dev**.

🎬[Canal do YouTube](https://www.youtube.com/@LucasSouzaDev)
🎬[Playlist do curso](https://youtube.com/playlist?list=PL29TaWXah3iaaXDFPgTHiFMBF6wQahurP&si=EfeqL5bkWtbTFcnY) 


