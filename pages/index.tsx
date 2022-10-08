import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Feed from "../components/Feed";
import LeftMenu from "../components/LeftMenu";
import MainContent from "../components/MainContent";
import Messenger from "../components/messenger/Messenger";
import NavBar from "../components/NavBar";
import NotUserMenu from "../components/NotUserMenu";
import PostForm from "../components/PostForm";
import RightMenu from "../components/RightMenu";
import Room from "../components/Room";
import { auth } from "../firebase/firebase";

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  const [isMessenger, setIsMessenger] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsMessenger(false);
    }
  }, [user]);

  return (
    <div className="bg-[#f7f7f7] dark:bg-[#18191a]">
      <Head>
        <title>Facebook Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://clipart.info/images/ccovers/1509135366facebook-symbol-png-logo.png"
        />
      </Head>

      <NavBar
        setIsMessenger={setIsMessenger}
        isMessenger={isMessenger}
        isShow={true}
      />
      <section className="flex justify-center h-screen overflow-y-scroll">
        <LeftMenu />

        <div className="w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16 px-2 ">
          {isMessenger ? (
            <div className="flex flex-col items-center justify-center h-auto min-h-screen bg-gray-100 text-gray-800 dark:bg-[#28282B]">
              <Messenger />
            </div>
          ) : (
            <>
              {user && (
                <>
                  <MainContent />
                  <PostForm isShow={true} />
                  <Room />
                </>
              )}
              <Feed />
            </>
          )}
        </div>
        {user ? <RightMenu isMessenger={isMessenger} /> : <NotUserMenu />}
      </section>
    </div>
  );
};

export default Home;
