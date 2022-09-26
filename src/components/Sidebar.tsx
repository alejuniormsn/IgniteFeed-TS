import style from "./Sidebar.module.css";
import { PencilSimpleLine } from "phosphor-react";
import { Avatar } from "./Avatar";

import user from "../backend/user.json";

export function Sidebar() {
  return (
    <aside className={style.sidebar}>
      <img className={style.cover} src={user.urlBackground} />

      <div className={style.profile}>
        <Avatar src={user.urlAvatar} hasBorder />
        <span className={style.title}>{user.name}</span>
        <span className={style.subtitle}>{user.role}</span>
      </div>
      <footer>
        <a href="#">
          <PencilSimpleLine size={20} />
          <span>Editar perfil</span>
        </a>
      </footer>
    </aside>
  );
}
