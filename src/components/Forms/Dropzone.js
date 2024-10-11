import React from 'react';
import { Row, Col, Card, Form, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

const Dropzone = (props) => {
  const [files, setFiles] = React.useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (files) =>
      setFiles(
        files.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      ),
  });

  const DropzoneFile = (props) => {
    const { path, preview } = props;

    return (
      <Col xs={3} className="dropzone-preview">
        <Image src={preview} className="dropzone-image" />
        <Card.Text className="dropzone-filename">{path}</Card.Text>
      </Col>
    );
  };

  return (
    <React.Fragment>
      <Form
        {...getRootProps({
          className: 'dropzone rounded d-flex align-items-center justify-content-center mb-4',
        })}
      >
        <Form.Control {...getInputProps()} />
        <div className="dz-default dz-message text-center">
          <p className="dz-button mb-0">Drop files here to upload</p>
        </div>
      </Form>
      <Row className="dropzone-files">
        {files.map((file) => (
          <DropzoneFile key={file.path} {...file} />
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Dropzone;
