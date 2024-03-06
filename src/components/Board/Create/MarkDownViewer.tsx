import MDEditor from '@uiw/react-md-editor'
import React from 'react'
import '@uiw/react-markdown-preview/markdown.css'

export default function MarkDownViewer({ content }) {
   return (
      <div>
         <MDEditor.Markdown source={content} />
      </div>
   )
}
