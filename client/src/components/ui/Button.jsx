export default function Button({label,style}){
    return <button className={`${style} py-2 px-3 rounded-lg text-white font-bold`}>{label}</button>
}
