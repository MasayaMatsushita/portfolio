import Header from "@/components/Header"

const BasicTemplate = (props: any) => {
  return (
    <>
      <Header title={"松下将也のポートフォリオ"} />
      {props.children}
    </>
  )
}


export default BasicTemplate;