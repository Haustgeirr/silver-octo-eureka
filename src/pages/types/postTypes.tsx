import { Dispatch, SetStateAction } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostProps {
  postId: number;
  setPostId: Dispatch<SetStateAction<number>>;
}

interface PostsProps {
  setPostId: Dispatch<SetStateAction<number>>;
}

export type { Post, PostProps, PostsProps };
