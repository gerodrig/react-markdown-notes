import { NoteData, Tag } from "../interfaces/types";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddtag: (tag: Tag) => void;
    availableTags: Tag[];
}

export const NewNote = ({onSubmit, onAddtag, availableTags}: NewNoteProps) => {
    return (
        <>
            <h1 className="mb-4">
            New Note  
            </h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddtag} availableTags={availableTags}/>
        </>
    )
}
