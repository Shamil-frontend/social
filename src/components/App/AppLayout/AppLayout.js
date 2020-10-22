import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
import AppNestedSidebar from '../AppNestedSidebar/AppNestedSidebar';
import { faHome, faCog, faBook, faFileArchive, faEdit, faCopy, faUsers } from '@fortawesome/free-solid-svg-icons';

import './AppLayout.scss';


const AppLayout = ({ children }) => {

  const NAV_LIST = React.useMemo(
    () => [
      {
        label: 'Главная',
        link: '/home',
        icon: faHome,
        id: 1,
        nestedNav: []
      },
      {
        label: 'Новое обращение',
        link: '/newAppeal',
        icon: faEdit,
        id: 2,
        nestedNav: []
      },
      {
        label: 'Обращение',
        link: '/appeal',
        icon: faCopy,
        id: 3,
        nestedNav: []
      },
      {
        label: 'Физические лица',
        link: '/individuals',
        icon: faUsers,
        id: 4,
        nestedNav: []
      },
      {
        label: 'Справочники',
        link: '',
        icon: faFileArchive,
        id: 5,
        nestedNav: [
          {
            label: 'Прожиточный минимум',
            link: '/references/social',
            childId: 1.1,
          },
          {
            label: 'Адресса',
            link: '/references/addresses',
            childId: 1.2,
          },
          {
            label: 'ССЖКУ',
            link: '/references/standards',
            childId: 1.3,
          },
          {
            label: 'Организационные структуры',
            link: '/references/orgstructures',
            childId: 1.4,
          },
          {
            label: 'Должности',
            link: '/references/jobpositions',
            childId: 1.5,
          },
          {
            label: 'Роли',
            link: '/references/roles',
            childId: 1.6,
          },
          {
            label: 'Сотрудники',
            link: '/references/employees',
            childId: 1.7,
          },
          {
            label: 'Отношения Физ.лиц',
            link: '/references/relations',
            childId: 1.8,
          },
          {
            label: 'Банки',
            link: '/references/banks',
            childId: 1.9,
          },
          {
            label: 'Максимальные доли расходов',
            link: '/references/maxcosts',
            childId: 1.11,
          },
          {
            label: 'Коммунальные услуги',
            link: '/references/servicescommunal',
            childId: 1.12,
          },
        ]
      },
      {
        label: 'Система',
        link: '',
        icon: faCog,
        id: 6,
        nestedNav: [
          {
            label: 'Смена периода',
            link: '/system/1',
            childId: 2.1,
          },
          {
            label: 'Настройки',
            link: '/system/2',
            childId: 2.2,
          },
          {
            label: 'Выплаты',
            link: '/system/3',
            childId: 2.3,
          },
        ]
      },
      {
        label: 'Журналы',
        link: '',
        icon: faBook,
        id: 7,
        nestedNav: [
          {
            label: 'Корректировки',
            link: '/journal/1',
            childId: 3.1,
          },
          {
            label: 'Выплаты',
            link: '/journal/2',
            childId: 3.2,
          },
          {
            label: 'Услуги',
            link: '/journal/3',
            childId: 3.3,
          },
          {
            label: 'Проверки',
            link: '/journal/4',
            childId: 3.4,
          },
          {
            label: 'Перерасчеты',
            link: '/journal/5',
            childId: 3.5,
          },
          {
            label: 'Начисления',
            link: '/journal/6',
            childId: 3.,
          },
        ]
      },
    ],
    []
  );

  const [toggleNestedSidebar, setToggleNestedSidebar] = useState(true);
  const [nestedNavList, setNestedNavList] = useState([]);
  const [nestedLabel, setNestedLabel] = useState([]);

  const getNestedNav = (id) => {
    setNestedNavList(NAV_LIST[id - 1].nestedNav);
    setNestedLabel(NAV_LIST[id - 1].label)
  };

  return (
    <div className="app">
      <section className="header-section">
        <AppHeader />
      </section>

      <section className="navigation-section">
        <AppSidebar
          toggleNestedSidebar={(bool) => setToggleNestedSidebar(bool)}
          navList={NAV_LIST}
          clearId={toggleNestedSidebar}
          itemId={(id) => getNestedNav(id)} />
      </section>

      <section className={`${!toggleNestedSidebar ? "nestedNav-section" : "d-none"}`}>
        <AppNestedSidebar
          navList={nestedNavList}
          navLabel={nestedLabel}
          toggleSidebar={(bool) => setToggleNestedSidebar(bool)} />
      </section>

      <section className="main-section">
        <main className="main-content">
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