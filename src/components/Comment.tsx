import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ptBR from "date-fns/locale/pt-BR";
import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
  id: number;
  author: {
    urlAvatar: string;
    name: string;
  };
  publishedAtComment: string;
  content: string;
  likes: number;
  onDeleteComment: (id: number) => void;
}

export function Comment({
  id,
  author,
  publishedAtComment,
  content,
  likes,
  onDeleteComment,
}: CommentProps) {
  const [likeCount, setLikeCount] = useState(likes);

  const publishedDateFormatRelativeNow = formatDistanceToNow(
    new Date(publishedAtComment),
    { locale: ptBR, addSuffix: true }
  );

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleLikeComment() {
    setLikeCount((state) => state + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar src={author.urlAvatar} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time title={publishedAtComment}>
                {publishedDateFormatRelativeNow}
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar Comentário">
              <Trash size={20} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            <span>Like</span>
            <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
