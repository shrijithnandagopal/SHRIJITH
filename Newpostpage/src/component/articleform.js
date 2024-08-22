import React, { useState } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, abstract, articleText });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Title</label>
        <Input 
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Abstract</label>
        <TextArea
          placeholder="Enter a 1-paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Article Text</label>
        <TextArea
          placeholder="Enter the full text of your article"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
        />
      </Form.Field>
      <Button type="submit">Post</Button>
    </Form>
  );
}

export default ArticleForm;