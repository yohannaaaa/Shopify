import { url } from "inspector";

const Card = ({children}: {children : React.ReactNode})=>{
    return(
        <div className="px-20 py-10 object-fill  bg-gray-100 m-2 shadow-md border border-[#ddd] flex bg-cover  flex-col gap-4 justify-center items-center rounded" >
            {children}
        </div>
    )
}

export default Card;