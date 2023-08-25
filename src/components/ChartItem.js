import './styles/ChartItem.css'

const ChartItem = (props) => {
    return(
        <div className="chart-item-wrapper" style={{top: props.top, width: props.width}}>
            <div className="chart-item-bar" style={{backgroundColor: props.backgroundColor}}>
                {props.title}
            </div>
            <div className="chart-item-text">
                {props.value}
            </div>
        </div>
    )
}

export default ChartItem