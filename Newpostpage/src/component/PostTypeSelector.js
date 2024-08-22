import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

function PostTypeSelector({ postType, setPostType }) {
  return (
    <Form>
      <Form.Field>
        Select Post Type:
        <Radio
          label='Question'
          name='postType'
          value='question'
          checked={postType === 'question'}
          onChange={() => setPostType('question')}
        />
        <Radio
          label='Article'
          name='postType'
          value='article'
          checked={postType === 'article'}
          onChange={() => setPostType('article')}
        />
      </Form.Field>
    </Form>
  );
}

export default PostTypeSelector;