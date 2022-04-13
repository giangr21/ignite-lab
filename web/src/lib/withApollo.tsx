import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { GetServerSidePropsContext, NextPage } from "next";

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) {
  const httpLink = createHttpLink({
    uri: "http://localhost:3000/api",
    fetch,
  });

  return new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache().restore(ssrCache ?? {}),
  });
}

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
      <Component {...props} />
    </ApolloProvider>;
  };
};
