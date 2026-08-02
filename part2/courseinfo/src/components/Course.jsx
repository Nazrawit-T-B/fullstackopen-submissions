const Course = ({ course }) => {
  
  return (
    <>
      {course.map((c) => (
        <div key={c.id}>
          <h2>{c.name}</h2>
          <div>
            {c.parts.map((p) => (
              <p key={p.id}>
                {p.name} {p.exercises}
              </p>
            ))}
            <h4>
              total of {c.parts.reduce((sum, p) => sum + p.exercises, 0)} exercises
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default Course;