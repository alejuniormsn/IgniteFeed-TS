import { useState, FormEvent, ChangeEvent } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import style from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";

import user from "../backend/user.json";

interface Comments {
  id: number;
  author: {
    urlAvatar: string;
    name: string;
  };
  publishedAtComment: string;
  content: string;
  likes: number;
}

interface Links {
  id: number;
  link: string;
}

interface Hashtags {
  id: number;
  hashtag: string;
}

interface PropsPost {
  author: {
    urlAvatar: string;
    name: string;
    role: string;
  };
  content: {
    paragraph: string;
    links: Links[];
    hashtags: Hashtags[];
  };
  publishedAt: string;
  comments: Comments[];
}

export function Post({ author, content, publishedAt, comments }: PropsPost) {
  const [newCommentText, setNewCommentText] = useState("");
  const [commentState, setCommentState] = useState(comments);

  const publishedDateFormatted = format(
    new Date(publishedAt),
    "'Publicado em' d 'de' LLLL 'de' yyyy 'às' HH:mm:ss'h'",
    { locale: ptBR }
  );

  const publishedDateFormatRelativeNow = formatDistanceToNow(
    new Date(publishedAt),
    { locale: ptBR, addSuffix: true }
  );

  function handleCreateComment(event: FormEvent) {
    event.preventDefault();

    let lastId = 0;
      commentState.forEach((item) => {
        if (item.id > lastId) lastId = item.id;
      });

    const newComment = {
      id: lastId + 1,
      author: {
        urlAvatar: user.urlAvatar,
        name: user.name,
      },
      publishedAtComment: new Date().toISOString(),
      content: newCommentText,
      likes: 0,
    };

    setCommentState([...commentState, newComment]);
    setNewCommentText("");
  }

  function handleNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
  }

  function deleteComment(id: number) {
    const commentsWithoutDeleted = commentState.filter((item) => {
      return item.id !== id;
    });
    setCommentState(commentsWithoutDeleted);
  }

  return (
    <>
      <article className={style.post}>
        <header>
          <div className={style.author}>
            <Avatar src={author.urlAvatar} hasBorder />
            <div>
              <span className={style.title}>{author.name}</span>
              <span className={style.subtitle}>{author.role}</span>
            </div>
          </div>
          <time title={publishedDateFormatted}>
            {publishedDateFormatRelativeNow}
          </time>
        </header>
        <div className={style.content}>
          <p>{content.paragraph}</p>
          <p>
            {content.links.map((item) => {
              return (
                <a key={item.id} href="#">
                  {item.link + " "}
                </a>
              );
            })}
          </p>
          <p>
            {content.hashtags.map((item) => {
              return (
                <a key={item.id} href="#">
                  {item.hashtag + " "}
                </a>
              );
            })}
          </p>
        </div>

        <form onSubmit={handleCreateComment} className={style.commentForm}>
          <span className={style.title}>Deixe seu comentário</span>
          <textarea
            onChange={handleNewComment}
            name="commentText"
            value={newCommentText}
            placeholder="deixe um comentário"
            required
          />
          <footer>
            <button type="submit" disabled={newCommentText.trim().length === 0}>
              Publicar
            </button>
          </footer>
        </form>

        {commentState.length > 0 ? (
          <div className={style.commentList}>
            {commentState.map((item) => {
              return (
                <Comment
                  key={item.id}
                  id={item.id}
                  author={item.author}
                  publishedAtComment={item.publishedAtComment}
                  content={item.content}
                  likes={item.likes}
                  onDeleteComment={(id: number) => deleteComment(id)}
                />
              );
            })}
          </div>
        ): null}
      </article>
    </>
  );
}
