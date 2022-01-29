function Truncate(props){
    return(
        <div
            style={{overflow: "hidden", textOverflow: "ellipsis"}}
            title={props.children}
        >
            {props.children}
        </div>
    )
}

export default Truncate
