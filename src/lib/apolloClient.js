// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://invespy.pixl.ae/index.php?graphql', // Replace with your actual WPGraphQL endpoint
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const cache = new InMemoryCache({
	resultCaching: false,
});

/**
 * The credentials: 'include' allows cookies to be automatically sent
 * along with the request 'include' because backend is on another domain.
 *
 * @see https://www.apollographql.com/docs/react/networking/authentication/#cookie
 */
const link = createHttpLink({
	uri: "http://invespy.pixl.ae/index.php?graphql",
})

const client = new ApolloClient({
	connectToDevTools: true,
	link,
	cache,
	defaultOptions
});

export default client;
// import { HttpLink } from "@apollo/client";
// import {
//   registerApolloClient,
//   ApolloClient,
//   InMemoryCache,
// } from "@apollo/experimental-nextjs-app-support";

// export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       // this needs to be an absolute url, as relative urls cannot be used in SSR
//       uri: "http://invespy.pixl.ae/index.php?graphql",
//       // you can disable result caching here if you want to
//       // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//       // fetchOptions: { cache: "no-store" },
//     }),
//   });
// });