import { getSession, useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home() {
  const { user } = useUser();

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  return !session
    ? {
        redirect: {
          destination: "/api/auth/login",
          permanent: false,
        },
      }
    : {
        redirect: {
          destination: "/app",
          permanent: false,
        },
      };
};
