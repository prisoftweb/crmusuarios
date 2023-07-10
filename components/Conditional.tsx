const Conditional = ({showComp, children} : {showComp:boolean; children:any}) => {
    if(showComp) return <>
        { children }
    </>
    return (
        <div>            
        </div>
    )
}

export default Conditional;