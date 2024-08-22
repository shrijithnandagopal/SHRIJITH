import React, { useState } from 'react';
import PostTypeSelector from './PostTypeSelector';
import QuestionForm from './QuestionForm';
import ArticleForm from './articleform';
import './NewPostPage.css';

function NewPostPage() {
  const [postType, setPostType] = useState('question');

  return (
    <div>
      <h1>New Post</h1>
      <PostTypeSelector postType={postType} setPostType={setPostType} />
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
}

export default NewPostPage;