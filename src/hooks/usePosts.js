import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {

  const sortedPosts = useMemo(() => {
    console.log('Отработала функция useMemo')
    if(sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts
  }, [posts, sort]);

  return sortedPosts
}

export const usePosts = (post, sort, query) => {
  const sortedPosts = useSortedPosts(post, sort);
  const sortedAndSerchadPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedPosts])

  return sortedAndSerchadPosts;
}