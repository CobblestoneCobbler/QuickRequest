export function Button({cb, inner, color =""}){

    return(
        <>
            <div className={`button ${color}`} onClick={()=>cb()}>{inner}</div>
        </>
    )
}