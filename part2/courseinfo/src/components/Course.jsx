const Course=({course})=>{
    return(
        <>
         <div>
            {course.parts.map(p=>(
                <p key={p.id}>{p.name} {p.exercises}</p>
            ))}
            <h4> total of {course.parts.reduce((sum, p) => sum + p.exercises, 0)} exercises </h4>
         </div>
        </>
   
    )
 

}
export default Course