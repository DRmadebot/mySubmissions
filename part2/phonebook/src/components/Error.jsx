const Error = ({message})=>{
    if(message==null){
        return null;
    }
    return(
        <div className="errors">
            {message}
        </div>
    )
}
export default Error