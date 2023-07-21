import { useContext, useState } from "react";
import { ModalAbout } from "./ModalAbout";
import component from "../images/teste.png";
import useStateImg from "../images/useState.png";
import useStateCtx from "../images/useCtx.png";
import stylesAbout from "./StylesAbout.module.css";
import react from "../images/reactLogo.png";
import { Context } from "../../Context";

function AboutTech() {
  const [open, setOpen] = useState(false);
  const [openUseState, setOpenUseState] = useState(false);
  const [openUseContext, setOpenUseContext] = useState(false);
  const { userContext, setContext } = useContext(Context);

  return (
    <>
      <div className={stylesAbout.test}>
        <div>
          <img src={react} className={stylesAbout.img} />
          <h1 className={stylesAbout.text_h1}>
            <strong>React.JS</strong>
          </h1>
        </div>
        <br />
        <div>
          <h2>
            <strong>O que é Front-End?</strong>
          </h2>
          <br />
          <p>
            Front-end pode ser classificado como a parte visual de um site, a
            interface com a qual podemos interagir.
          </p>
          <br />
          <p>
            Essas interfaces podem ser construídas de diferentes formas e
            estilos, utilizando várias tecnologias, como HTML, CSS, JavaScript e
            React, que apresentaremos abaixo.
          </p>
        </div>
        <br />
        <div>
          <h2>
            <strong>O que é React?</strong>
          </h2>
          <br />
          <p>
            React é uma biblioteca e framework de desenvolvimento JavaScript
            para criação de interfaces, combinando HTML e JavaScript, além de
            outras características que auxiliam no desenvolvimento de interfaces
            front-end.
          </p>
        </div>
        <br />
        <div>
          <h2>
            <strong>De onde surgiu o React?</strong>
          </h2>
          <br />
          <p>
            Em 2011, a empresa Meta (proprietária do Facebook, Instagram...)
            enfrentava desafios no desenvolvimento da interface do usuário à
            medida que a plataforma crescia. Para resolver esses problemas, uma
            equipe liderada por Jordan Walke começou a trabalhar em uma solução
            para melhorar a eficiência e a manutenibilidade do código front-end.
            Esse trabalho resultou no desenvolvimento de uma biblioteca
            JavaScript posteriormente chamada "React".
          </p>
          <br />
          <p>
            O React foi usado em projetos internos da empresa Meta, como o "Feed
            de Notícias" do Facebook e do Instagram. Com o sucesso do framework,
            a empresa lançou o React como um projeto de código aberto em maio de
            2013.
          </p>
        </div>
        <br />
        <div>
          <h2>
            <strong>Benefícios:</strong>
          </h2>
          <br />
          <p>
            A principal ideia por trás do React é a criação de componentes
            reutilizáveis que representam partes específicas da interface do
            usuário. O React também introduziu o conceito de Virtual DOM
            (Documento Objeto Modelo Virtual), que é uma representação virtual
            da estrutura do DOM real. Isso permite ao React atualizar apenas as
            partes necessárias da interface do usuário, minimizando o custo
            computacional e aumentando o desempenho, junto com o fato da
            estrutura do React ser baseada em SPA (Single Page Application), que
            otimiza a renderização desses componentes.
          </p>
          <br />
          <p>
            O ecossistema do React cresceu rapidamente, com a criação de
            ferramentas e bibliotecas complementares, como o React Router para
            navegação, o Redux para gerenciamento de estado e o Next.js para
            renderização do lado do servidor. O Facebook lançou várias versões
            do React, adicionando recursos como os Hooks, que permitem o uso de
            estado e outras funcionalidades do React em componentes funcionais.
            Além disso, o React Native foi lançado em 2015 para permitir que os
            desenvolvedores criem aplicativos móveis nativos usando o React.
          </p>
        </div>
        <br />
        <div>
          <button className={stylesAbout.btn} onClick={() => setOpen(true)}>
            Componente
          </button>
          <button
            className={stylesAbout.btn}
            onClick={() => setOpenUseState(true)}
          >
            UseState
          </button>
          <button
            className={stylesAbout.btn}
            onClick={() => setOpenUseContext(true)}
          >
            UseContextImg
          </button>
          <button
            className={stylesAbout.btn}
            onClick={() => alert("Olá " + userContext.name)}
          >
            UseContextFunc
          </button>
        </div>
        {open && (
          <ModalAbout
            imagem={component}
            closeModalAbout={() => setOpen(false)}
          />
        )}
        {openUseState && (
          <ModalAbout
            imagem={useStateImg}
            closeModalAbout={() => setOpenUseState(false)}
          />
        )}
        {openUseContext && (
          <ModalAbout
            imagem={useStateCtx}
            closeModalAbout={() => setOpenUseContext(false)}
          />
        )}
      </div>
    </>
  );
}

export default AboutTech;
