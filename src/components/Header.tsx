import Image from 'next/image'
import Link from 'next/link'

const Header = (props: any) => {
  const siteLink = [
    {link: "./", name:"HOME"},
    {link: "./skills", name:"スキル"},
    {link: "./todo", name:"TODO"}
  ]
  return (
    <>
    <div style={{width:"100%", backgroundColor:"grey"}}>
      <Image
        src="/lab_logo.png"
        alt="lab_logo"
        width={100}
        height={100}
        priority
      />
      <div>{props.title}</div>
      <div style={{textAlign:"center"}}>
        <a href="./" style={{marginRight:"20px"}}>HOME</a>
        <a href="./skills" style={{marginRight:"20px"}}>スキル</a>
        <a href="./todo" style={{marginRight:"20px"}}>TODO</a>
      </div>
      
    </div>
      
    </>
  )
};

export default Header;