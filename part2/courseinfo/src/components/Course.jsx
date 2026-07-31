const Course=({course})=>{
    return(
        <>
         <div>
            {course.parts.map(p=>(
                <p key={p.id}>{p.name} {p.exercises}</p>
            ))}
         </div>
        </>
   
    )
 

}
export default Course