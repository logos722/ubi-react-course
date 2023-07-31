import React, { useRef, useState } from 'react';
import Counter from './components/counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import { PostItem } from './components/PostItem';
import { PostList } from './components/PostList';
import { MyButton } from './components/UI/button/MyButton';
import { MyInput } from './components/UI/input/MyInput';
import { PostForm } from './components/PostForm';
import { MySelect } from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'aa', body: 'rrr' },
    { id: 2, title: 'zz', body: 'aaa' },
    { id: 3, title: 'dd', body: 'mmm' },
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function getSortedPosts() {
    console.log('Отработала функция СОРТЕР ПОСТ');
    if (selectedSort) {
      return [...posts].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return posts;
  }

  const sortedPosts = getSortedPosts();

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className='App'>
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Поиск...'
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
          defaultValue='Сортировка по...'
        />
      </div>
      {posts.length !== 0 ? (
        <PostList
          remove={removePost}
          posts={sortedPosts}
          title='Посты про JS'
        />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
      )}
    </div>
  );
}

export default App;
