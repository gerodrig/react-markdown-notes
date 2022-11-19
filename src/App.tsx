import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router';

import { NewNote, NoteList, NoteLayout, Note, EditNote} from './components/';
import { useLocalStorage } from './hooks/useLocalStorage';
import { RawNote, Tag, NoteData } from './interfaces/types';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      const noteTags = tags.filter((tag) => note.tagIds.includes(tag.id));
      return { tags: noteTags, title: note.markdown, ...note };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  };

  const onEditNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const addTag = (tag: Tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };


  const deleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notesWithTags} availableTags={tags} onUpdateTag={updateTag} onDeleteTag={deleteTag} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddtag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote}/>} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onEditNote}
                onAddtag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
