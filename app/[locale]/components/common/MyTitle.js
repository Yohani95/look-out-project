'use client'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from "next-intl/link"

function MyTitle({title}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <Breadcrumb>
      <Link href={'/'} className='text-decoration-none'>Home</Link>
      <Breadcrumb.Item active>&nbsp;/&nbsp;{title}</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ marginLeft: 'auto' }}>
      <h6 style={{ margin: '0' }}>Version 1.0.0 10-01-2024</h6>
    </div>
  </div>
  );
}

export default MyTitle;