import { projects ,clients } from '../sampleData';
import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} from 'graphql';
import ClientModel from '../models/client.model';
import ProjectModel from '../models/project.model';
//client
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return ClientModel.findById(parent.clientId);
            }
        }
    })
})

//client
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return ProjectModel.find();
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return ProjectModel.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return ClientModel.find();
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return ClientModel.findById(args.id);
            }
        }
    }
})
export = new GraphQLSchema({
    query: RootQuery
})