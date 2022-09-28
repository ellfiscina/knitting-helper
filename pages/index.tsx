import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ColorTabs from '../components/tabs';
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Knitting Helper</title>
        <meta name="description" content="Knitting Helper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Knitting Helper
          </h1>
        </div>
        <ColorTabs />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
