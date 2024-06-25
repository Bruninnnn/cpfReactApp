# ConnectBills

Projeto Aplicação WEB utilizando `React` e `Springboot`.
<br>

## Pré-requisitos

- Node.js (16.20.1)
- React (v8.19.4)
- Eclipse
- JDK 17

Se você clicar nos cards abaixo, ele leva para o site da documentação/download dos requisitos listados acima

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download/prebuilt-installer)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://legacy.reactjs.org/docs/getting-started.html)
[![Eclipse](https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=eclipse&logoColor=white)](https://www.eclipse.org/downloads/)
[![SpringBoot](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://start.spring.io)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

## Requisitos para iniciar a API:

É necessário <font color="red">instalar</font> o MySQL Workbench e criar um “`schema`” com nome de sua escolha.

Depois de clonar o projeto, abrir, em sequência atualizar o projeto utilizando <span style="color: #81ecec">**_“Force update Snapshots/Releases”_**</span>.

Após este processo, abrir o arquivo <span style="color: #fab1a0">**_“application.properties”_**</span> e alterar para o nome do `schema` que foi criado no banco de dados.

> 📝 **Exemplo:** <span style="color: #fdcb6e">_“spring.datasource.url=jdbc:mysql://localhost:3306/{nomedobanco}”_</span>

Depois de configurado e _“buildado”_ pelo MAVEN deve-se rodar o <span style="color: #81ecec">**_“Maven Install”_**</span>, deverá iniciar a API na classe <span style="color: #00b894">**_“ApiApplication”_**</span>.

## Inicialização do frond-end

### É um requisito obrigatório para iniciar o FrontEnd (cpfReactApp – React v8.19.4):

- Com a versão correta do React instalada (v8.19.4);

- Após o clone do projeto, deverá abrir o mesmo e rodar no terminal o comando “`npm install`” para instalar as bibliotecas;

  ```console
  npm install
  ```

- Localizar o arquivo <span style="color: #00b894">**_“env.js”_**</span> e substituir o **Seu IP** pelo seu IPV4

  ```javascript
  export const IP = 'Seu IP'
  ```

- Para finalizar, inicializar o projeto com o comando “`npm start`”.

  ```console
  npm run start
  ```

Após irá abrir um link no navegador de forma local neste formato: http://localhost:3000
