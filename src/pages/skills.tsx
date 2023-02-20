import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Skills() {

  const skills = ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js'];

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        My Skills
        <ul>
          {skills.map((skill) => (
            <div key={skill}>
              <li>{skill}</li>
            </div>
          ))}
        </ul>
      </main>
    </>
  )
}
