import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import '../../assets/scss/tiptap-editor.scss';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }
    return (
        <div className="tiptap-menu-bar">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}><b>B</b></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}><i>I</i></button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}><u>U</u></button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}><s>S</s></button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>• List</button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>1. List</button>
            <button onClick={() => {
                const url = window.prompt('Enter image URL');
                if (url) editor.chain().focus().setImage({ src: url }).run();
            }}>Image</button>
            <button onClick={() => {
                const url = window.prompt('Enter link URL');
                if (url) editor.chain().focus().setLink({ href: url }).run();
            }}>Link</button>
            <button onClick={() => editor.chain().focus().unsetLink().run()}>Unlink</button>
            <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>H1</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>H3</button>
            <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
            <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
        </div>
    );
};

const TiptapEditor = ({ content, onChange, placeholder = 'Start typing...' }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link,
            Underline,
            Placeholder.configure({ placeholder }),
        ],
        content,
        onUpdate: ({ editor }) => {
            // Send HTML to parent state
            if (onChange) onChange(editor.getHTML());
        },
    });

    // 2. Add this Effect to handle navigation/data loading
    useEffect(() => {
        if (!editor) return;

        // Get what is currently inside the editor
        const currentEditorContent = editor.getHTML();

        // ONLY update if the prop 'content' is different from the current editor state
        // This allows navigation to update the text, but prevents focus-loss while typing
        if (content !== currentEditorContent) {
            editor.commands.setContent(content, false); // 'false' prevents an update loop
        }
    }, [content, editor]);

    return (
        <div className="tiptap-editor-wrapper">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="tiptap-editor" />
        </div>
    );
};

export default TiptapEditor; 