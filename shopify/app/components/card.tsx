const Card = ({children}: {children : React.ReactNode})=>{
    return(
        <div className=" m-2 shadow-md border border-[#ddd] rounded">
            {children}
        </div>
    )
}

export default Card;