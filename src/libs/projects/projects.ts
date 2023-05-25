export interface IProject{
    _id?: string; //Generado por el gestor de base da datos ..? es opcional)
    name: string;
    description: string;
    isActive: boolean
    createdAt?: Date;
    updateAt?: Date;
}

/*const newProject: IProject = {
    name: '',
    description: '',
    isActive: false
};*/

//const newProject: Required<IProject>={};

//Variable interna
const memoryProjects: IProject[] = []; //Arreglo de IProject
let createdProjects: number = 0;

//mecanismos en  memoria para manejar los proyectos
export const createProject = async(project: IProject) => {
    const newProject = { ...project }; //shallowcoopy
    newProject._id = (++createdProjects).toString();
    newProject.createdAt = new Date();
    newProject.updateAt = newProject.createdAt;
    memoryProjects.push(newProject);  //push = metodo de los arreglo, agrega el metodo asignado al final del arreglo
    return newProject;
};

export const getProjects = async() => {
    return memoryProjects
};

export const getProject = async(id:string) => {
    const project = memoryProjects.find(p => p._id === id);
    if (!project){
        throw new Error('Project not found')
    };
    return project;
};

export const updateProject =  async(id:string, project:IProject) => {
    const index = memoryProjects.findIndex(p => p._id === id);
    if (index  === -1){
        throw new Error('Project not found')
    };
    memoryProjects[index] = {...memoryProjects[index], ...project, 
        updateAt: new Date()};  
    return memoryProjects[index];
 };

 export const deleteProject = (id:string) => {
    const index = memoryProjects.findIndex(p => p._id === id);
    if (index === -1){
        throw new Error('Project not found')
    };
    memoryProjects.splice(index, 1);
    return true;
  }