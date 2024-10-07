import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function Navitem({children} : Props){
    return(
        <div className="flex items-center rounded-lg bg-bg-color w-full h-12 gap-3 px-4">
            {children}
        </div>
    )
}