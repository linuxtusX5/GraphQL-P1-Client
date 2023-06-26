import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { GET_PROJECTS } from "../queries/Project.queries"
import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../mutations/Project.mutation"

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}],
    });

    const handleDelete = () => {
        deleteProject({variables: { id: projectId }});
    };
    return (
    <div className="d-flex mt-5 ms-auto">
        <button className="btn btn-danger m2" onClick={handleDelete}>
            <FaTrash className='icon'/> Delete Project
        </button>
    </div>
  )
}
