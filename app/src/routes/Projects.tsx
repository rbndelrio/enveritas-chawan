import { useEffect, useState } from 'react'
import { ProjectHeader, ProjectList, ProjectWithStatus } from '../components/Project'

type ProjectArray = Array<ProjectWithStatus>
const projectCache: ProjectArray = [
  { status: 'review', id: 0, name: 'Testing 1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', usage_limit: 'normal', questions: [], uuid: 'aaaa-bbbb-cccc-dddd', created_on: new Date(), modified_on: new Date()},
  { status: 'approved', id: 1, name: 'Project Two', description: 'Beatae ducimus magni voluptate praesentium perferendis obcaecati corporis quidem eius', usage_limit: 'normal', questions: [], uuid: 'aaaa-bbbb-cccc-dddd', created_on: new Date(), modified_on: new Date()},
  { status: 'published', id: 2, name: '3-Part Field Study', description: 'Asperiores culpa aliquid odio nostrum nulla et dolore illum, veniam eveniet. Officiis!', usage_limit: 'normal', questions: [], uuid: 'aaaa-bbbb-cccc-dddd', created_on: new Date(), modified_on: new Date()},
  { status: 'archived', id: 3, name: 'Foreground Interview', description: 'Similique rem neque consequuntur ducimus in perspiciatis.', usage_limit: 'normal', questions: [], uuid: 'aaaa-bbbb-cccc-dddd', created_on: new Date(), modified_on: new Date()},
  { status: 'deleted', id: 4, name: 'Taken Five', description: 'Unused Draft', usage_limit: 'normal', questions: [], uuid: 'aaaa-bbbb-cccc-dddd', created_on: new Date(), modified_on: new Date()},
]
export const Projects = () => {
  const [projectsState, setProjectsState] = useState<ProjectArray>([])

  useEffect(() => {
    const fetchUserState = () => {
      new Promise<ProjectArray>((resolve) => { setTimeout(() => resolve(projectCache), 5) })
        .then((result) => setProjectsState(result))
        .catch((error) => console.log('Somehow failed to set state'));
    };

    fetchUserState();
  }, []);

  return (
    <>
      <ProjectHeader />
      <ProjectList projects={projectsState} />
    </>
  )
}

export default Projects