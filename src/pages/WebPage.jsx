
import Layout from '../components/Layout';

const WebPage = () => (
  <Layout>
    <section className="content-section content-section--web">
      <h2>Websites</h2>
      <h3 className="section-subtitle">Trabalhos Feitos:</h3>
      <div className="carousel" aria-label="Carrossel de trabalhos realizados">
        <div className="carousel-viewport">
          <div className="carousel-track">
            <div className="carousel-item">
              <a href="https://example.com/projeto1" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img1.jpg`} alt="Trabalho web 1" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto2" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img6.jpg`} alt="Trabalho web 2" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto3" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img2.jpg`} alt="Trabalho web 3" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto4" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img7.jpg`} alt="Trabalho web 4" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto5" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img3.jpg`} alt="Trabalho web 5" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto6" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img8.jpg`} alt="Trabalho web 6" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto7" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img4.jpg`} alt="Trabalho web 7" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto8" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img9.jpg`} alt="Trabalho web 8" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto9" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img5.jpg`} alt="Trabalho web 9" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto10" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img10.jpg`} alt="Trabalho web 10" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="content-grid-2">
        <div>
          <p>
            Primeira área de texto em duas colunas: descreva aqui os serviços de
            desenvolvimento web, tipos de sites e tecnologias que utiliza.
          </p>
        </div>
        <div>
          <p>
            Segunda coluna: prazos, metodologia ou casos de sucesso. Pode adaptar
            o conteúdo conforme a oferta da empresa.
          </p>
        </div>
      </div>

      <div className="content-grid-2 content-grid-2--align-center">
        <div>
          <p>
            Texto à esquerda desta linha: explique o processo, demonstrações ou
            detalhes adicionais sobre os trabalhos apresentados no carrossel.
          </p>
        </div>
        <div className="automacao-gif-wrap" aria-label="Demonstração">
          <img src={`${import.meta.env.BASE_URL}gif/test_gif.gif`} alt="Demonstração" className="automacao-gif" />
        </div>
      </div>
    </section>
  </Layout>
);

export default WebPage;
