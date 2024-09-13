// pages/index.tsx
import { useEffect, useState } from 'react';
import '../app/globals.css'; 
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Student{
  id:number;
  name:string;
  age:number;
  subject:string;
}

const HomePage: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Student[]>([]);

  useEffect(()=>{
     const studentData = async () => {
      try{
        setLoading(true);

        const response = await axios.get<Student[]>('/api/students');

        setData(response.data);

        setLoading(false);

      }
      catch(err){
        console.error(err);
        setLoading(false);
      }
     }
     //call the function 
     studentData();
  },[])


  return (<div className='student-div h-[500vh]'>
    <div className='flex gap-x-[100px] '>
        <h1 className='text-3xl font-bold mb-6 flex mt-3 ml-[400px] underline  '>Details of the Student</h1>
       
       <button className='border mt-4 border-black  px-1  hover:bg-blue-400 hover:text-white mb-2 transition-all duration-500 rounded-md'> <Link href='/'>Back to Home</Link></button>
       
    </div>
    <div className='grid grid-cols-3  gap-y-5'>
      
      {
        loading?(<div>Loading...</div>):(
          data.map((item,index)=>(
            <div key={index} className='  w-[250px] hover:shadow-md hover:shadow-black hover:border-none mx-auto rounded-xl p-3 hover:scale-[1.07] transition-all duration-500 border border-black'>
              {/* <h1>Details of the Student are Below:</h1> */}
              <p className='text-xl font-semibold text-center'>Id :{item.id}</p>
              <p className='text-xl font-semibold text-center'>Name :{item.name}</p>
              <p className='text-xl font-semibold text-center'>Age :{item.age}</p>
              <p className='text-xl font-semibold text-center'>Subject :{item.subject}</p>
            </div>
          ))
        )
      }

    </div>
  </div>
  
  );
};

export default HomePage;
