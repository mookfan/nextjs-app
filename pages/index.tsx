import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SignIn from '../components/sign_in';

const Home: NextPage = () => {

  return (
    <div>
    <SignIn />
    </div>
  )
}

export default Home;
