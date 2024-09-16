import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for a student
interface Student {
  id: number;
  name: string;
  age: number;
  subject: string;
}

// Mock data for students
let students: Student[] = [
  { id: 1, name: 'JP Mishra', age: 30, subject: 'Math' },
  { id: 2, name: 'Baibhav Tiwari', age: 21, subject: 'Java' },
  { id: 3, name: 'Suryansh Pandey', age: 21, subject: 'Java' },
  { id: 4, name: 'Piyush Tripathi', age: 21, subject: 'Web Tech' },
  { id: 5, name: 'Ashutosh Tripathi', age: 28, subject: 'SQL' },
  { id: 6, name: 'Alok Singh', age: 27, subject: 'OS' },
  { id: 7, name: 'Akhil Dubey', age: 19, subject: 'DBMS' },
  { id: 8, name: 'Satyam Tiwari', age: 18, subject: 'Computer Networks' },
  { id: 9, name: 'Prashant Tiwari', age: 20, subject: 'RTS' },
  { id: 10, name: 'Pragya Dubey', age: 21, subject: 'BEE' },
];

// Define request body types for POST and PUT
interface PostRequestBody {
  name: string;
  age: number;
  subject: string;
}

interface PutRequestBody extends PostRequestBody {
  id: number;
}

// Handler for the API route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      handleGetRequest(res);
      break;

    case 'POST':
      handlePostRequest(req, res);
      break;

    case 'PUT':
      handlePutRequest(req, res);
      break;

    case 'DELETE':
      handleDeleteRequest(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

// Handler functions
function handleGetRequest(res: NextApiResponse) {
  res.status(200).json(students);
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const { name, age, subject } = req.body as PostRequestBody;
  
  if (!name || !age || !subject) {
    return res.status(400).json({ error: 'Name, age, and subject are required.' });
  }

  const newStudent: Student = { id: Date.now(), name, age, subject };
  students.push(newStudent);
  res.status(201).json(newStudent);
}

function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, age, subject } = req.body as PutRequestBody;

  if (!id || !name || !age || !subject) {
    return res.status(400).json({ error: 'ID, name, age, and subject are required for update.' });
  }

  const studentIndex = students.findIndex((student) => student.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found.' });
  }

  students[studentIndex] = { id, name, age, subject };
  res.status(200).json(students[studentIndex]);
}

function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID is required and must be a number.' });
  }

  students = students.filter((student) => student.id !== id);
  res.status(200).json({ message: 'Student deleted successfully.' });
}
