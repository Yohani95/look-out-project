'use client'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from "next-intl/link"
import AppInfo from './AppInfo';
function MyTitle({title}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <Breadcrumb>
      <Link href={'/'} className='text-decoration-none'>Home</Link>
      <Breadcrumb.Item active>&nbsp;/&nbsp;{title}</Breadcrumb.Item>
    </Breadcrumb>
    <AppInfo />
  </div>
  );
}

export default MyTitle;