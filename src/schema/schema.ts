import { projects ,clients } from '../sampleData';
import {
    GraphQLObjectType, 
    GraphQLID, GraphQLString, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} from 'graphql';
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

//mutations
const MyMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //adding client
        addClient: {
            type: ClientType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const client = new ClientModel({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        //delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
            return ClientModel.findByIdAndRemove(args.id).then((deletedClient) => {
              // Delete associated projects
                return ProjectModel.deleteMany({ clientId: args.id }).then(() => {
                return deletedClient;
                });
            });
            }
        },


        //adding a Project
        addProject: {
            type: ProjectType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                //we're using GraphQLEnumType cuz in the project models we are using enum.
                status: {type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        'new': {value: 'Not Started'},
                        'progress': {value: 'In Progress'},
                        'completed': {value: 'Completed'}
                    }
                }), defaultValue: 'Not Started'},
                clientId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const Project = new ProjectModel({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });
                return Project.save();
            }
        },
        //deleting project
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return ProjectModel.findByIdAndRemove(args.id)
            }
        },
        //updating project
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {type: new GraphQLEnumType({
                    name: 'ProjectStatusUpdate',
                    values: {
                        'new': {value: 'Not Started'},
                        'progress': {value: 'In Progress'},
                        'completed': {value: 'Completed'}
                    }
                })},
            },
            resolve(parent, args){
                return ProjectModel.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        },
                    },
                    {new: true}
                );
            }
        }
    }
})
export = new GraphQLSchema({
    query: RootQuery,
    mutation: MyMutation
})