import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Editor } from 'react-draft-wysiwyg';
import { Box } from './helpers';

interface EditTextProps {
  editorState?: EditorState;
  onChange: (editorState: EditorState) => void;
}

export const EditText = ({ editorState, onChange }: EditTextProps) => {
  return (
    <Box mt={20} width="100%" height={600} bg="#edebeb">
      <Editor editorState={editorState} onEditorStateChange={onChange} />
    </Box>
  );
};
