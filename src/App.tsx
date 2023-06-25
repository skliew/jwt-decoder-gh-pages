import { useState, CSSProperties, ChangeEvent } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import jwt_decode from 'jwt-decode';
import SyntaxHighlighter from 'react-syntax-highlighter';

const syntaxHighlighterHeight = '250px';

const syntaxHighlightherStyle : CSSProperties = {
  minHeight: "100px",
  maxHeight: syntaxHighlighterHeight,
  overflowY: "scroll",
};

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const onInputChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const val = e.target.value;
    if (!val) {
      setOutput('');
      return;
    }

    try {
      var output = jwt_decode<object>(val);
      setOutput(JSON.stringify(output, null, 2));
    } catch (e) {
      setOutput(String(e));
    }
  };

  return (
    <div className="d-flex flex-column">
      <h2 className="row justify-content-center">JWT Decoder</h2>
      <div className="justify-content-center row">
        <Form className="w-50">
          <Form.Group className="mb-3">
            <Form.Label clasName="justify-content-left">JWT</Form.Label>
            <Form.Control as="textarea" rows={5} value={input} onChange={onInputChange} className="w-100 no-resize"/>
          </Form.Group>

          <Form.Label clasName="justify-content-left">Decoded</Form.Label>
          <div style={syntaxHighlightherStyle}>
            <SyntaxHighlighter customStyle={{minHeight: syntaxHighlighterHeight, margin: 0}} language="json">{output}</SyntaxHighlighter>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default App;
