import Image from 'next/image';
import Form from './form';

export default function Home() {
  return (
    <main className=''>
      <section>
        <Image
          src={'/background.jpg'}
          alt='Picture of the background'
          width={500}
          height={500}
          className='w-[100vw] h-[600px] object-cover'></Image>
        {/* <h1>WELCOME TO VIRTUALVERSE</h1> */}
      </section>
      <section className='bg-black flex justify-center items-center h-[70vh]'>
        <Form />
      </section>
      <footer className='bg-blue-600 h-20 w-full'></footer>
    </main>
  );
}
