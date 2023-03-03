import { useState } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import BasicTemplate from '@/components/Templates/BasicTemplate'
import Animation from '@/components/Animation'
import  TodoList  from '../components/TodoList.json'

const inter = Inter({ subsets: ['latin'] })

export default function Todo() {

  const [todo, setTodo] = useState(TodoList.parentTodo)
  const [inputItem, setInputItem] = useState<string>("");
  const [visible, setVisible] = useState(false);

  const deleteItem = (id: number) => {
    console.log(todo);
    let newTodo = todo; // clone

    newTodo[id].isCompleted = true; // set completed to true
    setTodo([...newTodo]);
    
    if(newTodo.every(item => item.isCompleted === true)) {
      setVisible(true); // set visible to true
    };
  };

  const insertItem = () => {
    if(inputItem === "") return; // validation

    let newTodo = todo; // clone
    let maximum = 0;
    if(newTodo.length !== 0) {
      maximum = Math.max(...newTodo.map(item => item.id)); //find max id
    }
    newTodo.push({
      id: maximum + 1,
      text: inputItem,
      isCompleted: false,
      isChildTodo: false
    });

    setTodo(newTodo);
    setInputItem(""); // clear input

    setVisible(false); // set visible to false
  };

  const TodoArray = () => {
    console.log(todo);
    return (
      <>
        {todo.map((item, index) => (
        <tr key={item.id}>
          <td>{item.isCompleted? null : item.text}</td>
          <td>
          {item.isCompleted? null : <button onClick={()=>deleteItem(item.id)}>完了</button> }
          </td>
        </tr>
      ))}
      </>
    )
    
  };

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicTemplate>
        <main className={styles.main}>
          <h1>ToDo リスト</h1>
          <div>
            <input type="text" placeholder="ToDoを追加" onChange={(e) => setInputItem(e.target.value)} value={inputItem}/>
            <button onClick={()=>insertItem()}>追加</button>
          </div>

          <table>
            <thead>
                <tr>
                  <th>TODO</th>
                  <th>Status</th>
                </tr>
              </thead>
            <tbody>
              <TodoArray />
            </tbody>
          </table>
          {visible === true ? <Animation /> : null}
        </main>
      </BasicTemplate>
      
    </>
  )
}
