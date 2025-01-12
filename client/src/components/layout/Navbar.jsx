import { Link } from "react-router-dom"

export default function Navbar(){
    const theme = 'light'
    const links = [
        {
            to:"/",
            label:"Home"
        },
        {
            to:"#features",
            label:"Features"
        },
        {
            to:"#howitworks",
            label:"How It Works"
        },
        {
            to:"#pricing",
            label:"Pricing"
        },
        {
            to:"#testimonials",
            label:"Testimonials"
        },
        {
            to:"#contact",
            label:"Contact"
        },
        {
            to:"#signup",
            label:"Signup"
        },
        {
            to:"#signin",
            label:"Singin"
        }
    ]
    return <div className={`flex justify-between p-2 ${theme === 'light' ? "bg-white text-black":"bg-black"}`}>
        <div className="logo">
            <Link to="/" className="text-xl">TaskFlow</Link>
        </div>
        <div className="links">
            <ul className="flex gap-8">
                {links.map(link =>{
                    return <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                })}
            </ul>
        </div>
    </div>
}
