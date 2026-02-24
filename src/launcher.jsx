import { Button } from "./Button";

export function Launcher({pages,setPage}){


    return (
        <>
        <div className="launcher">
            {pages && pages.map((n,i)=>{
                return(
                    <div key={`button${i}`}>
                        <Button color={n.color} inner={n.name} cb={()=>setPage(n.slot)} />
                    </div>
                )
            })}
        </div>
        </>
    )


}