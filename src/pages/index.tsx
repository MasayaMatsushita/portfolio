import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import ExternalSiteCard from '@/common/ExternalSiteCard'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const externalWebsites = [
    {
      name: "Github",
      link: 'https://github.com/MasayaMatsushita',
      icon: <FontAwesomeIcon icon={faGithub} />
    },
    {
      name: "Qiita",
      link: "https://qiita.com/yuru",
      icon: 'Qiita'
    },
    {
      name: "Facebook",
      link: 'https://www.facebook.com/masaya.matsu/',
      icon: <FontAwesomeIcon icon={faFacebook} />
    }
  ];

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <h1>松下将也のポートフォリオ</h1>
            <div>
              <h2>自己紹介</h2>
              <ul>
                <li>氏名: 松下将也 (Masaya MATSUSHITA)</li>
                <li>生年月日: 1997年5月4日</li>
                <li>出身: 北海道</li>
                <li>学歴: 長岡技術科学大学情報・経営システム工学専攻 卒業 (2022年3月)</li>
              </ul>
            </div>
            <Image 
              src="/profile.jpg"
              alt="profile img"
              width={180}
              height={240}
              priority
            />
            <h2>外部サイト</h2>
            <div>
              <h3>
                {externalWebsites.map((externalWebsite) => (
                    <ExternalSiteCard 
                      siteName={externalWebsite.name}
                      siteLink={externalWebsite.link}
                      siteIcon= {externalWebsite.icon}
                      key={externalWebsite.name}
                    />
                ))}
              </h3>
              
              
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
