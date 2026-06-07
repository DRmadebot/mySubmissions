const Notification = ({message})=>{
    if(message==null){
        return null;
    }
    return(
        <div className="notifications">
            {message}
        </div>
    )
}
export default Notification