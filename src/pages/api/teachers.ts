import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for teacher
interface Teacher {
  id: number;
  name: string;
  subject: string;
}

// Mock data for teachers
let teachers = [
  
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

// Define request body types
interface PostRequestBody {
  name: string;
  subject: string;
}

interface PutRequestBody extends PostRequestBody {
  id: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(teachers);

    case 'POST': {
      const { name, subject } = req.body as PostRequestBody;
      if (!name || !subject) {
        return res.status(400).json({ error: 'Name and subject are required.' });
      }
      const newTeacher: Teacher = { id: Date.now(), name, subject };
      teachers.push(newTeacher);
      return res.status(201).json(newTeacher);
    }

    case 'PUT': {
      const { id, name, subject } = req.body as PutRequestBody;
      if (!id || !name || !subject) {
        return res.status(400).json({ error: 'ID, name, and subject are required for update.' });
      }
      const index = teachers.findIndex((teacher) => teacher.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Teacher not found.' });
      }
      teachers[index] = { id, name, subject };
      return res.status(200).json(teachers[index]);
    }

    case 'DELETE': {
      const id = parseInt(req.query.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID is required and must be a number.' });
      }
      teachers = teachers.filter((teacher) => teacher.id !== id);
      return res.status(200).json({ message: 'Teacher deleted successfully.' });
    }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
