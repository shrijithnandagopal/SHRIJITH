import React, { useState } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';

function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, tags });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Title</label>
        <Input 
          placeholder="Start your question with how, what, why, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Describe your problem</label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <Input 
          placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Field>
      <Button type="submit">Post</Button>
    </Form>
  );
}

export default QuestionForm;