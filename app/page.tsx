import styles from './page.module.css'
import CustomBtn from './components/CustomBtn';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome 👋🏽 </h1>
      <Link href='/auth/login'>
        <CustomBtn title='Please Proceed to login' className={styles.button} />
      </Link>
    </main>
  )
}
