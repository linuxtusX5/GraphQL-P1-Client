import {useQuery} from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/Client.queries";
import Spinner from "./Spinner";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function Clients() {
    const {loading, error, data} = useQuery(GET_CLIENTS)

    if(loading) return <Spinner/>
    if(error) return <p>Something Went Wrong</p>

  return (
    <>
    {!loading && !error && 
    (
        <table className="table table-hover mt-3">
            <thead>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.clients.map((client: Client) => (
                    <ClientRow key={client.id} client={client}/>
                ))}
            </tbody>
        </table>
    )
    }
    </>
  )
}
