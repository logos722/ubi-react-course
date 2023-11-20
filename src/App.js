import React, { useEffect, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModa/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';

function App() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalCount, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  let pagesArray = getPagesArray(totalCount)

  const [fetchPosts, isPostLoading, error] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
    console.log(totalCount)
  });

  useEffect(() => {
    console.log('Mount work!')
    fetchPosts()
  }, [page])

  const changePage = (page) => {
    setPage(page)
  }

  const create = (post) => {
    setPosts([...posts, post])
    setModal(false)
  }

  const removePost = (post) => [
    setPosts(posts.filter(postI => postI.id !== post.id))
  ]

  const sortedAndSerchadPosts = usePosts(posts, filter.sort, filter.query);

  return (
    <div className='App'>
      <MyButton onClick={() => fetchPosts()}>Get Posts</MyButton>
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}><PostForm  create={create} /></MyModal>
      <hr/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {error && <h1>Error happend ${error}</h1>}
      {isPostLoading 
      ?  <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      : <PostList remove={removePost} posts={sortedAndSerchadPosts} title={'First list'}/>}
      <div className='page__wrapper'>{pagesArray.map(p =>
        <span onClick={() => changePage(p)} key={p} className={page === p ? 'page page__current' : 'page'}>{p}</span>)}</div>
      
    </div>
  )
}

export default App;
