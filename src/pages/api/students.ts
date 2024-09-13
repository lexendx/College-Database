import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for student
interface Student {
  id: number;
  name: string;
  age: number;
  subject: string;
}

// Mock data for students
let students = [
    { id: 1, name: 'JP Mishra', age: 30,subject:'Math' },
    { id: 2, name: 'Baibhav Tiwari', age: 21,subject: 'Java'},
    { id: 3, name: 'Suryansh Pandey', age: 21 ,subject:'Java'},
    { id: 4, name: 'Piyush Tripathi', age: 21,subject:'Web Tech ' },
    { id: 5, name: 'Ashutosh Tripathi', age: 28,subject:'SQL' },
    { id: 6, name: 'Alok Singh', age: 27,subject:'OS' },
    { id: 7, name: 'Akhil Dubey', age: 19 ,subject:'DBMS'},
    { id: 8, name: 'Satyam Tiwari', age: 18,subject:'Computer Networks'},
    { id: 9, name: 'Prashant Tiwari', age: 20,subject:'RTS' },
    { id: 10, name: 'Pragya Dubey', age: 21 ,subject:'BEE'},
  ];
  
  

// Define request body types
interface PostRequestBody {
  name: string;
  age: number;
  subject: string;
}

interface PutRequestBody extends PostRequestBody {
  id: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(students);

    case 'POST': {
      const { name, age, subject } = req.body as PostRequestBody;
      if (!name || !age || !subject) {
        return res.status(400).json({ error: 'Name, age, and subject are required.' });
      }
      const newStudent: Student = { id: Date.now(), name, age, subject };
      students.push(newStudent);
      return res.status(201).json(newStudent);
    }

    case 'PUT': {
      const { id, name, age, subject } = req.body as PutRequestBody;
      if (!id || !name || !age || !subject) {
        return res.status(400).json({ error: 'ID, name, age, and subject are required for update.' });
      }
      const index = students.findIndex((student) => student.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Student not found.' });
      }
      students[index] = { id, name, age, subject };
      return res.status(200).json(students[index]);
    }

    case 'DELETE': {
      const id = parseInt(req.query.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID is required and must be a number.' });
      }
      students = students.filter((student) => student.id !== id);
      return res.status(200).json({ message: 'Student deleted successfully.' });
    }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
