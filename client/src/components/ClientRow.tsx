import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/Client.mutation";
import { GET_CLIENTS } from "../queries/Client.queries";
import { GET_PROJECTS } from "../queries/Project.queries";

interface ClientType {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ClientRowProps {
  client: ClientType;
  refetch?: () => void; // Make refetch function optional
}

export default function ClientRow({ client, refetch }: ClientRowProps) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries:[{query: GET_CLIENTS}, {query: GET_PROJECTS}]
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery<{ clients: ClientType[] }>({
    //     query: GET_CLIENTS,
    //   }) || { clients: [] }; // Provide a default value when readQuery returns null
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  const handleDeleteClient = () => {
    deleteClient()
      .then(() => {
        console.log("Successfully deleted client");
        if (refetch) {
          refetch(); // Check if refetch function is available before calling it
        }
      })
      .catch((error) => {
        console.log("Error deleting client:", error);
      });
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={handleDeleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
