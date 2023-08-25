import { useEffect, useState } from 'react'
import './App.css'
import Area from './components/Area'
import ChartItem from './components/ChartItem'

function App() {

  /* BACKEND - Start */
  const initializeFirstValue = () => {
    return Math.floor(Math.random() * (10000 - 500 + 1)) + 500  // Getting number number between 500 and 10000. 
  }

  const getRandomNumber=()=>{
    return Math.floor(Math.random() * 50 + 1)  // Getting number number between 0 and 50.
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
      if(Math.random() > 0.5){  // 50% probability, it will not add any value
        item.value += getRandomNumber()
      }
    })
    setSortedBarData(data)
    setBarData(data)
  }

  const renderBarItem = (item, index) => {
    let rate = item.value / sortedBarData[0].value
    const percentageDivWidth = rate * 95
    
    return <ChartItem
      key={item.id}
      backgroundColor={item.color}
      width={percentageDivWidth+"%"}
      title={item.title}
      value={item.value}
      top={(index===0?10:(index*40)+20)+'px'}
    />

  }

  useEffect(() => {
    const updater = setInterval( () => {
      addBarDataValuesWithRandom()
    }, 10)  
  }, [])

  useEffect(() => {
     sortedBarData.map( (item) => {
      renderBarItem(item)
     })
  }, [barData])

  /* BACKEND - End */

  const [chartTitle, setChartTitle] = useState("Customer Number of The Companies")
  
  return (
    <>
      <div className="chart-title">{chartTitle}</div>
      <Area data={barData}>
        {barData.map( (item, index) => renderBarItem(item, index) )}
      </Area>
    </>
  )
}

export default App
