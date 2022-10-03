import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ColorTabs from "../components/tabs";
import styles from "../styles/Home.module.css";

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
          <h1 className={styles.title}>Knitting Helper</h1>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#9B59B6"
              fill-opacity="1"
              d="M0,128L60,149.3C120,171,240,213,360,224C480,235,600,213,720,176C840,139,960,85,1080,96C1200,107,1320,181,1380,218.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg> */}
        </div>
        <ColorTabs />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
