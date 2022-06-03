import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useEffect } from "react";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { User } from "../../backend/src/users/entities/user.entity";
import { NextPageWithLayout } from "./_app";
import MainLayout from "../components/layouts/MainLayout";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

const Home: NextPageWithLayout = () => {
  const { data, error, isValidating } = useSWR(
    `http://localhost:3000/api/users`,
    fetcher
  );

  if (isValidating) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      {data?.map((user: User) => (
        <div key={user.userId}>{user.name}</div>
      ))}
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
