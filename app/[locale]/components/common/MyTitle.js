'use client'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function MyTitle({title}) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active>{title}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default MyTitle;