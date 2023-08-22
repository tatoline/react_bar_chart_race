import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const initializeFirstValue = () => {
    return Math.floor(Math.random() * (10000 - 500 + 1)) + 500  // Getting number number between 500 and 10000. 
  }

  const getRandomNumber=()=>{
    return Math.floor(Math.random() * 30 + 1)  // Getting number number between 0 and 30.
  }

  const [barData, setBarData] = useState([
    {
      id: 1,
      title: "Facebook",
      color: "#4267B2",
      value: initializeFirstValue()
    },
    {
      id: 2,
      title: "Amazon",
      color: "#FF9900",
      value: initializeFirstValue()
    },
    {
      id: 3,
      title: "Youtube",
      color: "#FF0000",
      value: initializeFirstValue()
    },
    {
      id: 4,
      title: "Google",
      color: "#34A853",
      value: initializeFirstValue()
    },
    {
      id: 5,
      title: "Microsoft",
      color: "#F25022",
      value: initializeFirstValue()
    },
  ])

  const sortDataDesc = (data) => {
    return data.sort( (val1, val2) => val2.value - val1.value )
  }

  const [sortedBarData, setSortedBarData] = useState(sortDataDesc(barData))

  const addBarDataValuesWithRandom = () => {
    let data = [...barData]
    data.forEach( (item) => {
      if(Math.random() > 0.3){  // 30% probability, it will not add any value
        item.value += getRandomNumber()
      }
    })
    setBarData(data)
  }

  const renderBarItem = (item, index) => {
    let rate = item.value / sortedBarData[0].value
    const percentageDivWidth = rate * 95
  }

  useEffect(() => {
    const updater = setInterval( () => {
      addBarDataValuesWithRandom()
    }, 500)  
  }, [])

  useEffect(() => {
     sortedBarData.map( (item) => {
      renderBarItem(item)
     })
  }, [barData])
  
  return (
    <div>
      
    </div>
  )
}

export default App
