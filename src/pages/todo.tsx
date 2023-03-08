import { useState } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import BasicTemplate from '@/components/Templates/BasicTemplate'
import Animation from '@/components/Animation'
import  TodoList  from '../components/TodoList.json'

const inter = Inter({ subsets: ['latin'] })

interface TodoInterface {
  id: number;
  text: string;
  isCompleted: boolean;
  isChildTodo: boolean;
  parentTodo: Array<TodoInterface>;
}
interface TodoSelectInterface {
  id: number;
  text: string;
}

export default function Todo() {

  const [todo, setTodo] = useState<Array<TodoInterface>>(TodoList.parentTodo)
  const [inputItem, setInputItem] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [inputId , setInputId] = useState(-1);

  const changeCompleted = (todo: Array<TodoInterface>, id: number) => {
    todo.map((item) => {
      if (item.id === id) {
        item.isCompleted = true;
      }
      changeCompleted(item.parentTodo, id);
    })
    return todo
  }
  const handleSelectChange = (event : string) => {
    setInputId(Number(event));

  }

  const reshapeTodo = (todo: Array<TodoInterface>) => {
    todo.map((item) => {
      if(item.parentTodo.every(item => item.isCompleted)){
        item.isChildTodo = false;
      }else{
        item.isChildTodo = true;
      }
      reshapeTodo(item.parentTodo);
    })
    return todo
  }

  const deleteItem = (id: number) => {
    let updateTodo = todo; // clone

    // updateTodo = changeCompleted(todo, id); // change completed for pushed the button
    updateTodo = reshapeTodo(changeCompleted(todo, id)); // reshape the array
    setTodo([...updateTodo]);
    
    if(updateTodo.every(item => item.isCompleted === true)) {
      setVisible(true); // set visible to true
    };
  };

  const findMaxId = (todo: Array<TodoInterface>, maxId: number) => {
    todo.map((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
      maxId = findMaxId(item.parentTodo, maxId);
    })
    return maxId;
  }

  const pushTodo = (todo: Array<TodoInterface>, parentId: number, maximum: number) => {
    if(parentId != -1){
      todo.map((item) => { //insert to except root
        if (item.id === parentId) {
          item.parentTodo.push({
            id: maximum,
            text: inputItem,
            isCompleted: false,
            isChildTodo: false,
            parentTodo: []
          })
        }
        pushTodo(item.parentTodo, parentId, maximum);
      })
    }else{ //insert to root
      todo.push({
        id: maximum,
        text: inputItem,
        isCompleted: false,
        isChildTodo: false,
        parentTodo: []
      })
    }
    
    return todo
  }
  

  const insertItem = (parentId: number = -1) => {
    if(inputItem === "") return; // validation

    let maximum = -1;
    if(todo.length !== 0) {
      maximum = findMaxId(todo, 0); //find max id
    }

    let newTodo = reshapeTodo(pushTodo(todo, parentId, maximum+1));

    setTodo(newTodo);
    setInputItem(""); // clear input
    setInputId(-1); // clear input id

    setVisible(false); // set visible to false
  };

  const FirstTodoArray = (props: Array<TodoInterface>) => {
    const todoArray = Object.entries(props).map(([key, value]) => (value)); // Change type Object to Array
    
    return (
      <>
        {TodoArray(todoArray)}
      </>
    )
  };
  const TodoArray = (parentTodo: Array<TodoInterface>) => {
    return (
      <>
        {parentTodo.map((item, index) => (
        <tr key={item.id}>
          <td>{item.isCompleted? null : item.text}</td>
          <td>
          {item.isCompleted || item.isChildTodo? null : <button onClick={()=>deleteItem(item.id)}>完了</button> }
          {item.isChildTodo?
            <table>
              <thead>
                  <tr>
                    <th>TODO</th>
                    <th>Status</th>
                  </tr>
                </thead>
              <tbody>
                {item.isChildTodo? TodoArray(item.parentTodo): null}
              </tbody>
            </table>
          : null
          }
          </td>
        </tr>
      ))}
      </>
    )
  };

  const FirstTodoOption = (props: Array<TodoInterface>) => {
    const todoArray = Object.entries(props).map(([key, value]) => (value)); // Change type Object to Array
    const todoSelectList = TodoOption(todoArray, [])
    return(
      <>
        {todoSelectList.map((item, index) => (
          <option key={item.id} value={item.id}>{item.text}</option>
          ))}
      </>
    )
  }
  const TodoOption = (parentTodo: Array<TodoInterface>, todoDat: Array<TodoSelectInterface>) => {
    parentTodo.map((item, index) => {
      todoDat.push({
        id: item.id,
        text: item.text
      })
      if(item.isChildTodo){
        TodoOption(item.parentTodo, todoDat);
      }
    });
    return todoDat;
  }

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
            <select 
              id="selectTodo" 
              onChange={(e) => handleSelectChange(e.target.value)}
              value={inputId}
            >
              <option value={-1}>TODOを挿入する場所を選択</option>
              <FirstTodoOption {...todo}/>
            </select>
            <input type="text" placeholder="ToDoを追加" onChange={(e) => setInputItem(e.target.value)} value={inputItem}/>
            <button onClick={()=>insertItem(inputId)}>追加</button>
          </div>

          <table>
            <thead>
                <tr>
                  <th>TODO</th>
                  <th>Status</th>
                </tr>
              </thead>
            <tbody>
              <FirstTodoArray {...todo} />
            </tbody>
          </table>
          {visible === true ? <Animation /> : null}
        </main>
      </BasicTemplate>
      
    </>
  )
}
