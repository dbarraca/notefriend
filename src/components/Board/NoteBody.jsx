import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { updateNoteBody } from "../../data/Note";

const NoteBody = ({ id, body }) => {
    const [text, setText] = useState(body);

    const handleTextChange = value => {
        setText(value);
        updateNoteBody(value, id);
    };

    return (
        <Editor
            tinymceScriptSrc="./public/tinymce/tinymce.min.js" 
            id={`Editor_${id}`}
            init={{
            height: "150",
            menubar: false,
            // toolbar: false,                
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            value={text}
            onEditorChange={(value) => handleTextChange(value)}
        />
    );
}

export default NoteBody;