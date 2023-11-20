import copyrightIcon from '../../static/droits-dauteur.png';



export default function Footer(){

    return(
        <div className="h-20 bg-white flex items-center justify-center">
            <img src={copyrightIcon} alt="icon" className='h-6 mr-2'></img>
            <h1 className='font-semibold text-base'> 2023 Container Tracker </h1>
        </div>
    )
}