
import Layout from '../components/Layout';

const PrecosPage = () => (
  <Layout>
    <section className="content-section content-section--precos">
      <h2>Preços</h2>

      <div className="content-grid-2">
        <div>
          <p>
            Primeira linha: descreva pacotes ou modalidades de preço (por projeto,
            mensalidade, etc.) na primeira coluna.
          </p>
        </div>
        <div>
          <p>
            Segunda coluna: o que está incluído, prazos de pagamento ou condições.
            Pode usar listas ou parágrafos.
          </p>
        </div>
      </div>

      <h2>Benefícios</h2>
      <div className="content-grid-2">
        <div>
          <p>
            Segunda linha de duas colunas: preços para websites, valores base ou
            intervalos conforme o tipo de projeto.
          </p>
        </div>
        <div>
          <p>
            Detalhes adicionais: manutenção, domínio, hosting ou extras que
            influenciam o preço final.
          </p>
        </div>
      </div>

      <h2>Hosting e Domínio</h2>
      <div className="content-grid-2">
        <div>
          <p>
            Terceira linha: preços para automações, integrações ou serviços
            recorrentes, na primeira coluna.
          </p>
        </div>
        <div>
          <p>
            Última coluna: como solicitar orçamento, contacto ou link para
            formulário. Adapte o texto às suas ofertas.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default PrecosPage;
