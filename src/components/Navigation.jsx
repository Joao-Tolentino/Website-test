
import React from 'react';
import { NavLink } from 'react-router-dom';

const footerConfig = {
  copyright: `© ${new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.`,
  contacts: {
    instagram: 'https://instagram.com/yourprofile',
    email: 'mailto:hello@example.com',
  },
  navigation: [
    { name: 'Início', url: '/' },
    { name: 'Vitrine', url: '/vitrine' },
    { name: 'Websites', url: '/web' },
    { name: 'Automação', url: '/automacao' },
    { name: 'Preços', url: '/precos' },
    { name: 'Sobre', url: '/sobre' },
  ],
};

export const Header = () => (
  <header className="site-header">
    <div className="site-header__inner">
      <div className="site-header__row site-header__row--top">
        <div className="site-header__logo">Logo/Nada</div>
        <h1 className="site-header__title">Nome Empresa</h1>
        <div className="site-header__contacts" aria-label="Contact links">
          <span className="site-header__contacts-label">Formas de Contato:</span>
          <a className="site-header__icon-link" href={footerConfig.contacts.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <ion-icon name="logo-instagram" style={{ fontSize: '24px', display: 'block' }}></ion-icon>
          </a>
          <a className="site-header__icon-link" href={footerConfig.contacts.email} aria-label="Email">
            <ion-icon name="mail-sharp" style={{ fontSize: '24px', display: 'block' }}></ion-icon>
          </a>
        </div>
      </div>
      <nav className="site-header__row site-header__row--bottom site-header__nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'is-active' : ''}>Home</NavLink>
        <NavLink to="/vitrine" className={({ isActive }) => isActive ? 'is-active' : ''}>Vitrine</NavLink>
        <NavLink to="/web" className={({ isActive }) => isActive ? 'is-active' : ''}>Websites</NavLink>
        <NavLink to="/automacao" className={({ isActive }) => isActive ? 'is-active' : ''}>Automação</NavLink>
        <NavLink to="/precos" className={({ isActive }) => isActive ? 'is-active' : ''}>Preços</NavLink>
        <NavLink to="/sobre" className={({ isActive }) => isActive ? 'is-active' : ''}>Sobre</NavLink>
      </nav>
    </div>
  </header>
);

export const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__row">
        <div className="site-footer__copyright">
          {footerConfig.copyright}
        </div>
        <div className="site-footer__contacts" aria-label="Contact links">
          <span className="site-footer__contacts-label">Siga-nos:</span>
          <a className="site-footer__icon-link" href={footerConfig.contacts.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <ion-icon name="logo-instagram" style={{ fontSize: '24px', display: 'block' }}></ion-icon>
          </a>
          <a className="site-footer__icon-link" href={footerConfig.contacts.email} aria-label="Email">
            <ion-icon name="mail-sharp" style={{ fontSize: '24px', display: 'block' }}></ion-icon>
          </a>
        </div>
      </div>
      <nav className="site-footer__nav" aria-label="Footer navigation">
        {footerConfig.navigation.map((item, index) => (
          <React.Fragment key={item.url}>
            <NavLink 
              to={item.url} 
              end={item.url === '/'}
              className={({ isActive }) => isActive ? 'is-active underline' : 'hover:underline'}
            >
              {item.name}
            </NavLink>
            {index < footerConfig.navigation.length - 1 && ' · '}
          </React.Fragment>
        ))}
      </nav>
    </div>
  </footer>
);
