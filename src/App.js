import { useEffect, useState } from 'react'
import './App.css'
import Area from './components/Area'
import ChartItem from './components/ChartItem'

function App() {

  /* BACKEND - Start */
  const initializeFirstValue = () => {
    return Math.floor(Math.random() * (20000 - 2000 + 1)) + 2000  // Getting number number between 2000 and 20000. 
  }

  const getRandomSmallNumber=()=>{
    return Math.floor(Math.random() * 50 + 1)  // Getting number number between 0 and 50.
  }

  const getRandomBigNumber=()=>{
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100  // Getting number number between 100 and 200.
  }

  const [barData, setBarData] = useState([
    {
      id: 1,
      title: "Facebook",
      color: "#4267B2",
      value: initializeFirstValue(),
      status: "inc"   // "status" will be used for a 95% chance of "increase" or "decrease" to achieve realistic data
    },
    {
      id: 2,
      title: "Amazon",
      color: "#FF9900",
      value: initializeFirstValue(),
      status: "inc"
    },
    {
      id: 3,
      title: "Youtube",
      color: "#FF0000",
      value: initializeFirstValue(),
      status: "inc"
    },
    {
      id: 4,
      title: "Google",
      color: "#34A853",
      value: initializeFirstValue(),
      status: "inc"
    },
    {
      id: 5,
      title: "Microsoft",
      color: "#F25022",
      value: initializeFirstValue(),
      status: "inc"
    },
  ])

  const sortDataDesc = (data) => {
    return data.sort( (val1, val2) => val2.value - val1.value )
  }

  const [sortedBarData, setSortedBarData] = useState(sortDataDesc(barData))

  const addBarDataValuesWithRandom = () => {
    let data = [...barData]
    data.forEach( (item) => {

      if(item.status === 'inc') {  // If the company's customers increase, by a 95% chance, it will continue to increase
        if(Math.random() < 0.95) {
          if(Math.random() < 0.5){  // By 50% probability, it will not add any value
            if(Math.random() < 0.9){  // By 90% probability, it will add small number
              item.value += getRandomSmallNumber()
            }
            else {  // 10% probability, it will add big number
              item.value += getRandomBigNumber()
            }
          }
        }
        else {
          item.status = 'dec'  // By 5% probability, company will start to lose customer
        }
      }
      else if(item.status === 'dec') {  // If the company's customers decrease, by a 80% chance, it will continue to decrease
        if(Math.random() < 0.85) {
          let number
          if(Math.random() < 0.9){  // By 90% probability, it will subtract small number
            number = getRandomSmallNumber()
          }
          else {  // 10% probability, it will subtract big number
            number = getRandomBigNumber()
          }
          if(item.value - number < 0){
            item.value = 0
          }
          else {
            item.value -= number
          }
        }
        else {
          item.status = 'inc'  // By 20% probability, company will start to gain customer again
        }
      }

    })
    setSortedBarData(data)
    setBarData(data)
  }

  const renderBarItem = (item, index) => {
    let rate = item.value / sortedBarData[0].value
    const percentageDivWidth = rate * 95
    
    return item.value !== 0 ?
      <ChartItem
        key={item.id}
        backgroundColor={item.color}
        width={percentageDivWidth+"%"}
        title={item.title}
        value={item.value}
        top={(index===0?20:(index*40)+20)+'px'}  // Every bar has 40px height
      />
      :
      false

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
