import {gql} from "@apollo/client";

const GET_PROJECTS = gql`
    query getProject {
        projects{
            id
            name
            status
        }
    }
`

//for single project
const GET_PROJECT = gql`
    query getProject($id: ID!){
        project(id: $id){
            id
            name
            description
            status
            client{
                id
                name
                email
                phone
            }
        }
    }
`

export {GET_PROJECTS, GET_PROJECT}