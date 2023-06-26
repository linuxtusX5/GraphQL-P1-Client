import Headers from "./components/Headers";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming){
            return incoming
          },
        // projects: {
        //   merge(existing, incoming){
        //     return incoming
        //   }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache,
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
        <Headers/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/projects/:id" element={<Project />}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </div>
    </ApolloProvider>
    </>
  )
}

export default App
