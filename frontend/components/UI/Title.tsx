import Head from "next/head";
import React from "react";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return (
    <Head>
      <title>{title ?? "Seent"}</title>
      <meta property="og:title" content={title} key="title" />
    </Head>
  );
};

export default Title;
