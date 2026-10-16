require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(morgan("dev"));
app.use(cors());
{
  /** 
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
*/
}
app.get("/api/persons", (request, response,next) => {
  Person.find({}).then((persons) => {
   if(persons) response.json(persons);
   else response.status(404).end();
  }).catch((error)=>next(error));
});
app.get("/info", (request, response) => {
  const dateObj = new Date();
  const output = dateObj.toString();
  response.send(`<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${output}</p>
    </div>`);
});
app.get("/api/persons/:id", (request, response,next) => {
  Person.findById(request.params.id).then((person) => {
    if (person) response.json(person);
    else response.status(404).end();
  }).catch((error) => next(error));
});
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
{
  /**
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});
const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const nameExists = persons.some((p) => p.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
}); */
}
app.post("/api/persons", (request, response,next) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({ name, number });

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});
app.put('/api/persons/:id',(request,response,next)=>{
  const{name,number}=request.body
  Person.findById(request.params.id).then(person=>{
    if(!person){
      return response.status(404).end()
    }
    person.name=name
    person.number=number
    return person.save().then((updatedPerson)=>{
      response.json(updatedPerson)
    })
  }).catch(error=>next(error))
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name == "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
