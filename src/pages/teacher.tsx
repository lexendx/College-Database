// pages/index.tsx
import { useEffect, useState } from 'react';
import '../app/globals.css'; 
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Teacher{
  id:number;
  name:string;
  subject:string;
}

const HomePage: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Teacher[]>([]);

  useEffect(()=>{
     const teacherData = async () => {
      try{
        setLoading(true);

        const response = await axios.get<Teacher[]>('/api/teachers');

        setData(response.data);

        setLoading(false);

      }
      catch(err){
        console.error(err);
        setLoading(false);
      }
     }
     //call the function 
     teacherData();
  },[])


  return (<div className='teacher-div h-[100vh]'>
    <div className='flex gap-x-[200px] '>
        <h1 className='text-4xl font-bold mb-6 flex mt-3 ml-[450px] underline  '>Details of the Teachers</h1>
       
       <button className='border mt-4 border-black  px-1  hover:bg-green-700 hover:text-white mb-2 transition-all duration-500 rounded-md'> <Link href='/'>Back to Home</Link></button>
       
    </div>
    <div className='grid grid-cols-3  gap-y-5'>
      
      {
        loading?(<div>Loading...</div>):(
          data.map((item,index)=>(
            <div key={index} className='flex flex-col w-[250px] hover:shadow-md hover:shadow-black hover:border-none mx-auto rounded-xl p-3 hover:scale-[1.07] transition-all duration-500 border border-black'>
              {/* <h1>Details of the Student are Below:</h1> */}
              <p className='text-xl font-semibold text-center'>Id :{item.id}</p>
              <p className='text-xl font-semibold text-center'>Name :{item.name}</p>
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
