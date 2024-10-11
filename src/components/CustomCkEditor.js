import React from 'react';
import Editor from "ckeditor5-custom-build";
import  CKEditor  from '../config/ckeditor';

function CustomCkEditor( props ) {
  return (
    <CKEditor
      editor={ Editor }
      data={ props.initialData }
      onChange={ (event, editor ) => {
        const data = editor.getData();
        console.log( { event, editor, data } );
      } }
    />
  )
}
export default CustomCkEditor;