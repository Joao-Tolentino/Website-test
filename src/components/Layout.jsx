
import { Header, Footer } from './Navigation';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="content">{children}</main>
    <Footer />
  </>
);

export default Layout;
