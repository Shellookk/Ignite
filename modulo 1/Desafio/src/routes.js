import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});
};

export const routes = [
  { 
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      if (!req.body) {
        return res.writeHead(400).end("Corpo da requisição está vazio!");
      }

      const { title, description, } = req.body

      if (!title || !description) {
        return res.writeHead(400).end("É necessário enviar title e description!");
      }      

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null, 
      created_at: formatDate(Date.now()), 
      updated_at: formatDate(Date.now())  
    };
  
      database.insert('tasks', task)
  
      return res.writeHead(201).end("Nova task cadastrada com sucesso")
    }
  },
{
  method: 'GET',
  path: buildRoutePath('/tasks'),
  handler: (req, res) => {
    let search = req.query?.search || '';

    search = decodeURIComponent(search).trim();

    search = search.replace(/\s+/g, ' ');

    const tasks = database.select('tasks', search ? {
      title: search,
      description: search
    } : null);

    return res.end(JSON.stringify(tasks));
  }
},

{
  method: 'PUT',
  path: buildRoutePath('/tasks/:id'),
  handler: (req, res) => {
    if (!req.body) {
      return res.writeHead(400).end("Corpo da requisição está vazio!");
    }

    const { id } = req.params;
    const { title, description } = req.body;

    const existingTask = database.select('tasks').find(task => task.id === id);

    if (!existingTask) {
      return res.writeHead(404).end("A task não foi localizada!");
    }

    if (!title && !description) {
      return res.writeHead(400).end("É necessário passar o title e/ou description!");
    }

    const updatedData = {
      ...(title && { title }), 
      ...(description && { description }), 
      updated_at: formatDate(Date.now())  
    };

    database.update('tasks', id, updatedData);

    return res.writeHead(204).end("Atualizado com sucesso!");
  }
},

  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const existingTask = database.select('tasks').find(task => task.id === id);

      if (!existingTask) {
        return res.writeHead(404).end("A task não foi localizada!");
      }  

      database.delete('tasks', id)

      return res.writeHead(204).end("A task foi excluida com sucesso!")
    }
  },

  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const existingTask = database.select('tasks').find(task => task.id === id);
      
      if (!existingTask) {
        return res.writeHead(404).end("A task não foi localizada!");
      }
      
      const updatedData = {
        ...(existingTask.completed_at ? { completed_at: null } : { completed_at: formatDate(Date.now()) }),
        updated_at: formatDate(Date.now())
      };

      database.update('tasks', id,updatedData)
      return res.writeHead(200).end("")
        
    }
  }
]
