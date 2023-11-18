import React, { useState, useMemo } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'Descriotion'},
    {id: 2, title: 'React', body: 'luk'},
    {id: 3, title: 'Node', body: 'elelel'},
  ])
  const [filter, setFilter] = useState({sort: '', query: ''})


  const sortedPosts = useMemo(() => {
    console.log('Отработала функция useMemo')
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts
  }, [posts, filter.sort]);

  const sortedAndSerchadPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])


  const create = (post) => {
    setPosts([...posts, post])
  }

  const removePost = (post) => [
    setPosts(posts.filter(postI => postI.id !== post.id))
  ]

  return (
    <div className='App'>
      <PostForm  create={create} />
      <hr/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSerchadPosts} title={'First list'}/>

    </div>
  )
}

export default App;
