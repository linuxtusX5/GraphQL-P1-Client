import { useState } from "react";
import { GET_PROJECTS } from "../queries/Project.queries"
import { useMutation } from "@apollo/client"
import { UPDATE_PROJECT } from "../mutations/Project.mutation";

interface EditButtonProps {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface EditButtonProps2 {
    project: EditButtonProps;
}
export default function EditProjectForm({project}: EditButtonProps2) {
    const [input, setInput] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }   
    const handleChange3 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInput((prev) => ({
            ...prev,
            status: e.target.value
        }))
    }
    const [updateProject] = useMutation(UPDATE_PROJECT,{
        variables: {id: project.id, name: input.name, description: input.description, status: input.status},
        refetchQueries: [{query: GET_PROJECTS, variables: {id: project.id}}]
    })

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!input.name || !input.description || !input.status){
            return alert('Fill up the form')
        }
        updateProject({
        variables: {id: project.id, name: input.name, description: input.description, status: input.status },
        })
    }
    return (
    <div className="mt-5">
        <h3>Update Project Details</h3>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={input.name}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>description</label>
                  <textarea
                    className='form-control'
                    id='description'
                    name='description'
                    value={input.description}
                    onChange={handleChange2}
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>status</label>
                  <select name="status" 
                    id="status" 
                    className="form-select"
                    value={input.status}
                    onChange={handleChange3}>
                        <option value={'new'}>Not Started</option>
                        <option value={'progress'}>In Progress</option>
                        <option value={'completed'}>Completed</option>
                    </select>
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-primary'
                >
                  Submit
                </button>
              </form>

    </div>
  )
}
