/* eslint-disable @next/next/no-html-link-for-pages */
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import { useGetProductsQuery } from "../../graphql/generated/graphql";
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home() {
  const { user } = useUser();
  // const { data, loading, error } = useGetProductsQuery();

  return (
    <>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a href="/api/auth/logout">Logout</a>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const data = await getServerPageGetProducts(null, ctx);

    return {
      props: data.props,
    };
    // console.log(getAccessToken(req, res));
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
