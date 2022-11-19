import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';

import { NoteData, Tag } from '../interfaces/types';


type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export const NoteForm = ({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const naavigateBack = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current?.value || '',
      markdown: markdownRef.current?.value || '',
      tags: selectedTags,
    });

    naavigateBack('..');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} defaultValue={title}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                onCreateOption={label => {
                  const nerwTag = { id: uuidv4(), label }
                  onAddTag(nerwTag)
                  setSelectedTags( prev => [...prev, nerwTag])
                }}
                options={availableTags.map(tag => ({ value: tag.id, label: tag.label }))}
                onChange={tags => {
                    setSelectedTags(tags.map(tag => ({label: tag.label, id:tag.value})))
                }}
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows={15} ref={markdownRef} defaultValue={markdown}/>
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-danger">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};
