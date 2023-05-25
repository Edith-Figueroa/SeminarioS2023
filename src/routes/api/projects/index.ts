import express from 'express';
const router = express.Router();

import { createProject, deleteProject, getProjects, updateProject, getProject } from '@libs/projects/projects';

router.get('/', (_req, res) => {
    res.json({ version: 1, scope: 'projects' });
});

router.get('/echo/:msg', (req, res) => {
    const { msg } = req.params;
    const { variable1 = 'Hola', variable2 = 'Mundo' } = req.query;
    res.json({ msg, variable1, variable2 });
});

router.post('/echo2', (req, res) => {
    const { variable1 = 'Hola', variable2 = 'Mundo' } = req.body;
    res.json({ variable1, variable2 });
});

router.get('/all', async (_req, res) => {
    try {
        const projects = await getProjects();
        res.json(projects);
    } catch (ex: any) {
        return res.status(500).json({ error: ex?.message });
    }
});

router.get('/byid/:id', async (req, res) =>{
    try{
        const {id=''} = req.params;
        const project = await getProject(id);
        return res.json(project)
    }catch (ex: any) {
        return res.status(500).json({ error: ex?.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { name = '', description = '', isActive = false } = req.body;
        const newProject = { name, description, isActive: (isActive && true) };
        const createdProject = await createProject(newProject);
        res.json(createdProject);
    } catch (ex: any) {
        return res.status(500).json({ error: ex?.message });
    }
});

router.put('/upd/:id', async (req, res) => {
    try {
        const { id = '' } = req.params
        const { name = '', description = '', isActive = false } = req.body;
        const updatedProject = await updateProject(id, { name, description, isActive: (isActive && true) });
        res.json(updatedProject);
    } catch (ex: any) {
        return res.status(500).json({ error: ex?.message });
    }
});

router.delete('/del/:id', async (req, res) => {
    try {
        const { id = '' } = req.params;
        const deletedProject = await deleteProject(id);
        res.json({ delete: deletedProject, id });
    } catch (ex: any) {
        return res.status(500).json({ error: ex?.message });
    }
});
export default router; 