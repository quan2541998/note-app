import React, { useEffect, useMemo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLoaderData, useSubmit, useLocation } from 'react-router-dom';
import { debounce } from '@mui/material';

const Note = () => {
    const { note } = useLoaderData()
    console.log(note)
    const submit = useSubmit()

    const location = useLocation();

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [rawHTML, setRawHTML] = useState(note.content);

    useEffect(() => {
        setRawHTML(note.content);
    }, [note.content]);

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content);
        console.log(blocksFromHTML)
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        console.log(state)
        setEditorState(EditorState.createWithContent(state));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note.id]);

    const handleOnChange = (newEditorState) => {
        setEditorState(newEditorState);
        const contentState = newEditorState.getCurrentContent();
        const html = draftToHtml(convertToRaw(contentState));
        setRawHTML(html);
    };

    useEffect(() => {
        debouncedMemorized(rawHTML, note, location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rawHTML, location.pathname])


    const debouncedMemorized = useMemo(() => {
        return debounce((rawHTML, note, pathname) => {
            if (rawHTML === note.content) return;

            submit({ ...note, content: rawHTML }, {
                method: 'post',
                action: pathname
            })
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder='Write Something'

        />
    );
};

export default Note;