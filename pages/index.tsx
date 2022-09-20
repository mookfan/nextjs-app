import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SignIn from '../components/login';

const Home: NextPage = () => {

  return (
    <div>
    <SignIn />
    </div>
  )
}

export default Home;
