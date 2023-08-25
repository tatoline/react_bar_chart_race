import './styles/Area.css'

const Area = (props) => {
    return(
        <div className="chart-area" style={{height: props.data.length*40}}>
            {props.children}
        </div>
    )
}

export default Area