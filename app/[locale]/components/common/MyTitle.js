'use client'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from "next-intl/link"

function MyTitle({title}) {
  return (
    <Breadcrumb>
      <Link href={'/'} className='text-decoration-none'>Home</Link>
      <Breadcrumb.Item active>/{title}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default MyTitle;