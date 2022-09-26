import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import "./global.css";
import styles from "./App.module.css";

import postList from "./backend/posts.json";

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {postList.map((post) => {
            return (
              <Post
                key={post.postId}
                author={post.author}
                publishedAt={post.publishedAt}
                content={post.content}
                comments={post.comments || []}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
