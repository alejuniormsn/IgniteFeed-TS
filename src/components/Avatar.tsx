import style from "./Avatar.module.css";

interface AvatarProps {
  hasBorder?: boolean;
  alt?: string;
  src: string;
}

export function Avatar(props: AvatarProps) {
  return (
    <img
      className={props.hasBorder ? style.avatar : style.avatarBorderNone}
      src={props.src}
      alt="avatar"
    />
  );
}
