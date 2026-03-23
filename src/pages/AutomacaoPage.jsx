
import Layout from '../components/Layout';

const AutomacaoPage = () => (
  <Layout>
    <section className="content-section content-section--automacao">
      <h2>Automação</h2>

      <div className="content-grid-2">
        <div>
          <p>
            Primeira linha em duas colunas: descreva o que são automações, a quem
            se destinam e que problemas resolvem no dia a dia dos clientes.
          </p>
        </div>
        <div>
          <p>
            Segunda coluna: tipos de automação, ferramentas ou integrações que
            utiliza. Pode incluir exemplos ou casos de uso.
          </p>
        </div>
      </div>

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
  </Layout>
);

export default AutomacaoPage;
