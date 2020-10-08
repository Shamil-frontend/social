import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NavLink, withRouter } from 'react-router-dom';
import { Button, Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setId } from '../../../redux/LivingWages/actions';

import './AppSidebar.scss';


const AppSidebar = ({ toggleNestedSidebar, navList, clearId, itemId, parentHistory }) => {

  const dispatch = useDispatch();
  const [visibleParentNav, setVisibleParentNav] = useState('');
  const [activeNav, setActiveNav] = useState('');
  const [pathName, setPathName] = useState(parentHistory);

  const iconStyles = { width: "28px", height: "28px", margin: "0px", color: "rgb(114 131 143)" };

  const onSetId = (id) => {
    dispatch(setId(id))
  };

  useEffect(() => {
    if (clearId) {
      setVisibleParentNav('')
    }
  }, [clearId, parentHistory])

  return (
    <aside className="app-sidebar">
      <Nav>
        {navList.map(({ label, link, icon, id }) => {
          return (

            <NavItem key={id} className="main-nav-item">
              {link.length ? (
                <NavLink
                  to={link}
                  activeClassName={` ${link !== pathName ? "not-active-nav" : "active-nav"}`}
                  className="main-nav-link"
                  onClick={() => {
                    setPathName(link);
                    setVisibleParentNav(id);
                    toggleNestedSidebar(true);
                    setActiveNav(id);
                  }}>
                  <span>
                    <FontAwesomeIcon
                      icon={icon}
                      style={iconStyles} />
                  </span>
                  <span className="nav-item-label">{label}</span>
                </NavLink>
              ) : (
                  <Button
                    className={`main-nav-link btn-link ${id !== activeNav ? null : "active-nav"}`}
                    onClick={() => {
                      onSetId(1);
                      itemId(id);
                      setPathName(link);
                      setActiveNav(id);
                      id === visibleParentNav ? setVisibleParentNav('') : setVisibleParentNav(id);
                      id === visibleParentNav ? toggleNestedSidebar(true) : toggleNestedSidebar(false);
                    }}>
                    <span>
                      <FontAwesomeIcon
                        icon={icon}
                        style={iconStyles} />
                    </span>
                    <span className="nav-item-label">{label}</span>
                  </Button>
                )}
            </NavItem>
          )
        })}
      </Nav>
    </aside >
  );
};



export default withRouter(AppSidebar);
