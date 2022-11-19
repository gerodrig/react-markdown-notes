export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
  };
  
export type Tag = {
    label: string;
    id: string;
  };

  export type Note = {
    id: string;
  } & NoteData;

  export type RawNoteData = {
    id: string;
    markdown: string;
    tagIds: string[];
  }

  export type RawNote = {
    id: string;
  } & RawNoteData;