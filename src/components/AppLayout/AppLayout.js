import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';

import './AppLayout.css';

const AppLayout = ({ children }) => {

  const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
    <div className="app">
      <section className="header-section">
        <AppHeader tglSidebar={() => setToggleSidebar(!toggleSidebar)} />
      </section>

      <section className={`${toggleSidebar ? "navigation-section-full" : "navigation-section"}`}>
        <AppSidebar toggleSidebar={toggleSidebar} />
      </section>

      <section className={`${toggleSidebar ? "main-section-full" : "main-section"}`}>
        <main>
          <div className="main-content-body">{children}</div>
        </main>
      </section>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;