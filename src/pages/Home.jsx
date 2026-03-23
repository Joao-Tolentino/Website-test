
import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <section id="section-web" className="content-section content-section--web">
      <h2>Trabalhos Feitos Anteriormente</h2>
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
                <img src={`${import.meta.env.BASE_URL}images/img8.jpg`} alt="Trabalho web 1" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto7" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img4.jpg`} alt="Trabalho web 2" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto8" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img9.jpg`} alt="Trabalho web 3" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto9" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img5.jpg`} alt="Trabalho web 4" />
              </a>
            </div>
            <div className="carousel-item">
              <a href="https://example.com/projeto10" target="_blank" rel="noreferrer">
                <img src={`${import.meta.env.BASE_URL}images/img10.jpg`} alt="Trabalho web 5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="section-automacao" className="content-section content-section--automacao">
      <h2>Sistemas de Automação</h2>
      <div className="content-grid-2 content-grid-2--align-center">
        <div>
          <p>
            Descreva aqui as soluções de automação que você oferece, como integrações,
            rotinas automáticas e redução de tarefas manuais para os seus clientes.
          </p>
        </div>
        <div className="automacao-gif-wrap" aria-label="GIF de automação">
          <img src={`${import.meta.env.BASE_URL}gif/test_gif.gif`} alt="Automação em ação" className="automacao-gif" />
        </div>
      </div>
    </section>

    <section id="section-sobre" className="content-section content-section--sobre">
      <h2>Sobre Nós</h2>
      <div className="content-grid-2">
        <div>
          <p>
            Aqui você pode apresentar um resumo da empresa, da sua história e da forma
            como trabalha com os clientes no dia a dia.
          </p>
        </div>
        <div>
          <p>
            Use este espaço para reforçar diferenciais, valores e a forma como os seus
            serviços ajudam pessoas e negócios a alcançarem resultados.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;
