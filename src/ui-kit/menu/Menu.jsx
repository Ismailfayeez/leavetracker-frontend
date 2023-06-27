import React from 'react';
import { useLocation } from 'react-router-dom';
import './menu.scss';

function Menu({ menuSection }) {
  const { header, menuList } = menuSection;
  const location = useLocation();
  return (
    <div>
      <section className="menu">
        <header className="menu__header">{header}</header>
        <ul className="list menu__list">
          {menuList.map((menu) => (
            <li
              className={`menu__item ${
                location.pathname.startsWith(`/${menu.activePath || menu.path}`)
                  ? 'menu__item--active'
                  : ''
              }`}
              key={menu.path}>
              {menuSection.displayContent ? menuSection.displayContent(menu) : menu.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Menu;
