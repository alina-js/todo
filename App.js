import React, { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import {randomColor} from 'randomcolor';
import Draggable from 'react-draggable';
import './App.css';

function App() {
const [item, setItem] = useState('');
  const[items, setItems] = useState (
    JSON.parse(localStorage.getItem('items')) || []
  )
  useEffect(() => {
localStorage.setItem('items', JSON.stringify(items))
  },[items])
const newItem = () => {
  if (item.trim() !=='') {
    const newItem = {
      id: uuidv4(),
      item: item, 
      color: randomColor({
        luminosity:'light',
      }),
      defaultPos: {
        x: 500,
        y: -500
      }
    }
  
  setItems((item) => [...items, newItem])
  setItem('')
}
  else {
    alert('Enter something...')
    setItem('')
  }
}
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }
  const updatePosition = (data, index) => {
    let newArr = [...items]
    newArr[index].defaultPos = {x: data.x, y: data.y}
    setItems(newArr)

  }
  const keyPress = (e) => {
    const code = e.keyCode || e.wich
    if (code === 13) {
      newItem()
    }

  }
  return (
    <div className="App">
      <div className="wrapper">
      <input value={item}
      placeholder="Enter something..." 
      type="text" 
      onChange={(e) => setItem(e.target.value)}
      onKeyDown={(e)=> keyPress(e)}
      />
      <button className="enter" onClick={newItem}>Enter</button>
      </div>
      {
        items.map((item, index) => {
          return (
            <Draggable 
            key={index}
            defaultPosition={item.defaultPos}
            onStop={(e, data)=> {
              updatePosition(data, index)
            }}
            >
              <div className='todo__item' style={{backgroundColor: item.color}}>
              {`${item.item}`}
              <button className='delete'
              onClick={() => deleteItem(item.id)}
              >
                X
              </button>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
