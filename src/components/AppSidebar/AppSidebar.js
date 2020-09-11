import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faHome, faCog, faBook, faFileArchive, faEdit, faCopy, faUsers } from '@fortawesome/free-solid-svg-icons';

import { setId } from '../../redux/LivingWages/actions';

import './AppSidebar.scss';
import { id } from 'date-fns/locale';


const NAV_ITEMS = [
  {
    label: 'Главная',
    link: '/home',
    icon: faHome,
    id: 101,
  },
  {
    label: 'Новое обращение',
    link: '/newAppeal',
    icon: faEdit,
    id: 102,
  },
  {
    label: 'Обращение',
    link: '/appeal',
    icon: faCopy,
    id: 103,
  },
  {
    label: 'Физические лица',
    link: '/individuals',
    icon: faUsers,
    id: 104,
  },
];

const NAV_CATALOGUE = [
  {
    label: "Справочники",
    icon: faFileArchive,
    id: 1,
    nestedNav: [
      {
        label: 'Прожиточный минимум',
        link: '/references/socialPage',
        childId: 1.1,
      },
      {
        label: 'Адресса',
        link: '/references/adressesPage',
        childId: 1.2,
      },
      {
        label: 'ССЖКУ',
        link: '/references/1',
        childId: 1.3,
      },
      {
        label: 'Услуги',
        link: '/references/2',
        childId: 1.4,
      },
      {
        label: 'СМЭВ',
        link: '/references/3',
        childId: 1.5,
      },
      {
        label: 'Виды доходов',
        link: '/references/4',
        childId: 1.6,
      },
    ]
  },
  {
    label: "Система",
    icon: faCog,
    id: 2,
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
    label: "Журналы",
    icon: faBook,
    id: 3,
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
  }
]




const AppSidebar = ({ toggleSidebar }) => {

  const dispatch = useDispatch();
  const [visibleParentNav, setVisibleParentNav] = useState('');
  const [visibleChildNav, setVisibleChildNav] = useState('');
  const [showChildNav, setShowChildNav] = useState(false);
  // console.log(NAV_CATALOGUE.filter(({ id }) => id === visibleParentNav)[0])

  const widthIcon = `${toggleSidebar ? "28px" : "30px"}`;
  const heightIcon = `${toggleSidebar ? "28px" : "30px"}`;
  const iconStyles = { width: `${widthIcon}`, height: `${heightIcon}`, margin: "6px 6px", color: "rgb(114 131 143)" };
  const elementPadding = `${toggleSidebar ? "pl-3" : "pl-0"}`;
  const elementHidden = `${!toggleSidebar && "d-none"}`;


  const onSetId = (id) => {
    dispatch(setId(id))
  }

  return (
    <aside className="app-sidebar">
      <nav>
        <Accordion>
          {NAV_ITEMS.map(({ label, link, icon, id }) => (
            <Card key={link}>
              <NavLink
                className={`nav-item ${elementPadding} ${visibleParentNav === id && "active-nav"}`} to={link}
                onClick={() => { setVisibleParentNav(id); setShowChildNav(false) }}>
                <span>
                  <FontAwesomeIcon
                    className={`${visibleParentNav === id && "active-icon"}`}
                    icon={icon}
                    style={iconStyles} />
                </span>
                <Card.Body className={`card-title ${elementHidden}`}>{label}</Card.Body>
              </NavLink>
            </Card>
          ))}
        </Accordion>
        <Accordion>
          {NAV_CATALOGUE.map(({ label, icon, id, nestedNav }) => (
            <Card key={id}>
              <Accordion.Toggle as={Button} variant="link"
                onClick={() => {
                  id !== visibleParentNav ? setVisibleParentNav(id) : setVisibleParentNav('');
                  id !== visibleParentNav ? setShowChildNav(true) : setShowChildNav(false)
                }}
                className={`nav-item-btn ${elementPadding}  ${visibleParentNav === id && (toggleSidebar ? "active-btn" : "active-nav")}`} >
                <span className="icon-nav">
                  <FontAwesomeIcon
                    className={`${visibleParentNav === id && "active-icon"}`}
                    icon={icon}
                    style={iconStyles} />
                </span>
                <Card.Body className={`card-title ${elementHidden}`}>{label}</Card.Body>
                <span className={`svg-icon ${elementHidden}`}>
                  <FontAwesomeIcon
                    icon={visibleParentNav !== id ? faPlus : faMinus}
                    style={{ color: `${visibleParentNav !== id ? "#329de8" : "rgb(181 48 48)"}` }} />
                </span>
              </Accordion.Toggle>
              {nestedNav.map(({ label, link, childId }) => (
                <Accordion.Collapse className={elementHidden} key={link} style={{ display: `${visibleParentNav === id ? 'block' : 'none'}` }}>
                  <NavLink
                    className={`nav-item ${elementPadding} ${visibleChildNav === childId && "active-nav"}`} to={link}
                    onClick={() => { onSetId(1); childId !== visibleChildNav ? setVisibleChildNav(childId) : setVisibleChildNav('') }}>
                    <Card.Body className="card-title">{label}</Card.Body>
                  </NavLink>
                </Accordion.Collapse>
              ))
              }
            </Card>
          ))
          }
        </Accordion>
        {!toggleSidebar ? (
          <Accordion className={`child-nav ${showChildNav ? "d-block" : "d-none"}`}>
            {/* {
              NAV_CATALOGUE.filter(({ id }) => id === visibleParentNav).map(({ label, link, childId }) => (
                <Card key={childId}>
                  <NavLink className={`nav-item active-nav`} to={link}>
                    <Card.Body className="card-title">{label}</Card.Body>
                  </NavLink>
                </Card>
              ))} */}
          </Accordion>
        ) : null
        }
      </nav>
    </aside >
  );
};



export default AppSidebar;
