import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from '../mutations/Project.mutation';
import { GET_PROJECTS } from '../queries/Project.queries';
import { GET_CLIENTS } from '../queries/Client.queries';


interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}
interface Project{
  id: string;
  name: string;
  description: string;
  status: string;
  clientId: string;
}
export default function AddProjectModal() {
  const [input, setInput] = useState({
    name: '',
    description: '',
    status: 'new',
    clientId: ''
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
            [e.target.name]: e.target.value
        }))
    }

const [addProject] = useMutation(ADD_PROJECT, {
  variables: {
    name: input.name,
    description: input.description,
    status: input.status,
    clientId: input.clientId
  },
  update(cache, { data: { addProject } }) {
    const { projects } = cache.readQuery<{ projects: Project[]}>({
      query: GET_PROJECTS
    }) || { projects: [] };
    cache.writeQuery({
      query: GET_PROJECTS,
      data: { projects: [...projects, addProject] }
    });
  }
});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if(input.name === '' || input.description === '' || input.status === '' || input.clientId === ''){
          return alert('Fill in all fields')
        }
        addProject({
        variables: { name: input.name, description: input.description, status: input.status, clientId: input.clientId },
        });

        // Reset the input fields
        setInput({ name: '', description: '', status: 'new', clientId: '' });
      } catch (error) {
        console.log(error)
      }
    }
    const {loading, error, data} =useQuery(GET_CLIENTS);

    if(loading) return null;
    if(error) return <p>Something Went Wrong</p>
  return (
    <>
    {!loading && !error && (
        <>
            <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addProjectModal'
      >
        <div className='d-flex align-items-center'>
          <FaList className='icon' />
          <div>Add Project</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addProjectModal'
        aria-labelledby='addProjectModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addProjectModalLabel'>
                Add Project
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
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
                <div className='mb-3'>
                  <label className='form-label'>Client</label>
                  <select name="clientId" 
                    id="clientId" 
                    className="form-select"
                    value={input.clientId}
                    onChange={handleChange3}>
                        <option value={''}>Select Client</option>
                        {data.clients.map((client: Client) => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
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
          </div>
        </div>
      </div>
        </>
    )}
    </>
  );
}
