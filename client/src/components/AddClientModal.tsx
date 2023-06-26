import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from '../mutations/Client.mutation';
import { GET_CLIENTS } from '../queries/Client.queries';

export default function AddClientModal() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: ''
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const [addClient] = useMutation(ADD_CLIENT, {
      variables: {name: input.name, email: input.email, phone: input.phone},
      update(cache, {data: {addClient}}){
        const {clients} = cache.readQuery<{clients: ClientTypes[]}>({
          query: GET_CLIENTS
        }) || { clients: [] };
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {clients: [...clients, addClient]},
        })
      }
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if(input.name === '' || input.email === '' || input.phone === ''){
          return alert('Fill in all fields')
        }
        addClient({
        variables: { name: input.name, email: input.email, phone: input.phone },
        });

        // Reset the input fields
        setInput({ name: '', email: '', phone: '' });
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModalLabel'>
                Add Client
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
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={input.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    name='phone'
                    value={input.phone}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-secondary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
