import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for a teacher
interface Teacher {
  id: number;
  name: string;
  subject: string;
}

// Mock data for teachers
let teachers: Teacher[] = [
  { id: 1, name: 'JP Mishra', subject: 'Math' },
  { id: 2, name: 'Anmol Pandey', subject: 'SQL' },
  { id: 3, name: 'Shambhu Kumar', subject: 'Java' },
  { id: 4, name: 'Anshu Pandey', subject: 'Web Tech' },
  { id: 5, name: 'Himanshu Pandey', subject: 'OS' },
  { id: 6, name: 'Anurag Mishra', subject: 'BEE' },
  { id: 7, name: 'Swati Singh', subject: 'Computer Networks' },
  { id: 8, name: 'Kartik Verma', subject: 'DBMS' },
  { id: 9, name: 'Arpita', subject: 'RTS' },
];

// Define request body types for POST and PUT
interface PostRequestBody {
  name: string;
  subject: string;
}

interface PutRequestBody extends PostRequestBody {
  id: number;
}

// Main handler for API routes
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetRequest(res);

    case 'POST':
      return handlePostRequest(req, res);

    case 'PUT':
      return handlePutRequest(req, res);

    case 'DELETE':
      return handleDeleteRequest(req, res);

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

// GET handler to return all teachers
function handleGetRequest(res: NextApiResponse) {
  res.status(200).json(teachers);
}

// POST handler to add a new teacher
function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const { name, subject } = req.body as PostRequestBody;

  if (!name || !subject) {
    return res.status(400).json({ error: 'Name and subject are required.' });
  }

  const newTeacher: Teacher = { id: Date.now(), name, subject };
  teachers.push(newTeacher);
  res.status(201).json(newTeacher);
}

// PUT handler to update an existing teacher's information
function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, subject } = req.body as PutRequestBody;

  if (!id || !name || !subject) {
    return res.status(400).json({ error: 'ID, name, and subject are required for update.' });
  }

  const teacherIndex = teachers.findIndex((teacher) => teacher.id === id);

  if (teacherIndex === -1) {
    return res.status(404).json({ error: 'Teacher not found.' });
  }

  teachers[teacherIndex] = { id, name, subject };
  res.status(200).json(teachers[teacherIndex]);
}

// DELETE handler to remove a teacher by ID
function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID is required and must be a number.' });
  }

  teachers = teachers.filter((teacher) => teacher.id !== id);
  res.status(200).json({ message: 'Teacher deleted successfully.' });
}
