
import Layout from '../components/Layout';

const SobrePage = () => (
  <Layout>
    <section className="content-section content-section--sobre">
      <h2>Sobre</h2>
      <div className="content-grid-2">
        <div>
          <p>
            Texto da primeira coluna: apresente aqui a história da empresa, a equipa
            e os valores que guiam o vosso trabalho.
          </p>
        </div>
        <div>
          <p>
            Texto da segunda coluna: missão, visão, ou o que vos diferencia no mercado.
            Pode editar este conteúdo conforme necessário.
          </p>
        </div>
      </div>
    </section>

    <section className="content-section content-section--sobre">
      <h2>Nossa História</h2>
      <div className="content-grid-2">
        <div>
          <p>
            Texto da primeira coluna: apresente aqui a história da empresa, a equipa
            e os valores que guiam o vosso trabalho.
          </p>
        </div>
        <div>
          <p>
            Texto da segunda coluna: missão, visão, ou o que vos diferencia no mercado.
            Pode editar este conteúdo conforme necessário.
          </p>
        </div>
      </div>
    </section>

    <section className="content-section content-section--sobre">
      <h2>Imagem Context sla</h2>
      <div className="content-grid-2">
        <div className="carousel-item">
          <a href="https://example.com/projeto6" target="_blank" rel="noreferrer">
            <img src={`${import.meta.env.BASE_URL}images/img6.jpg`} alt="Trabalho web 1" />
          </a>
        </div>
        <div className="carousel-item">
          <a href="https://example.com/projeto6" target="_blank" rel="noreferrer">
            <img src={`${import.meta.env.BASE_URL}images/img8.jpg`} alt="Trabalho web 1" />
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default SobrePage;
