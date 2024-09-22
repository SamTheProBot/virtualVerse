'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (email !== '') {
      router.push('/lobby');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='h-72 w-80 flex flex-col justify-center items-center'>
        <input
          value={email}
          type='email'
          placeholder='email'
          onChange={handleChange}
          className='m-3 rounded-lg p-1'
        />
        <button
          type='submit'
          className='rounded-lg m-3 p-2 bg-gradient-to-t from-blue-500 via-blue-600 to-blue-500'>
          Click To Join!
        </button>
      </form>
    </>
  );
};

export default Form;
