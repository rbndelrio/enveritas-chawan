import { Project } from '@chawan/forms'
import {
  ChevronRightIcon,
  PencilIcon
} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

export type ProjectWithStatus = Project & {
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived' | 'deleted'
}

interface Props {
  projects: Array<ProjectWithStatus>
}

const ACTIVE_STATUSES = [ 'approved', 'published' ]
const EDIT_STATUSES = [ 'draft', 'review' ]

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

export const ProjectList = (props: Props) => {

  return (
    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
      {props.projects.map((project, i) => (
        <li
          key={project.id}
          className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6 delay-[var(--i)]"
        >
          <div className="flex items-center justify-between space-x-4">
            {/* Repo name and link */}
            <div className="min-w-0 space-y-3">
              <div className="flex items-center space-x-3">
                {/* TODO: Better solution than these ternaries */}
                <span
                  className={classNames(
                    ACTIVE_STATUSES.includes(project.status)
                      ? 'bg-enveritas-500/10'
                      : EDIT_STATUSES.includes(project.status)
                        ? 'bg-yellow-500/10'
                        : 'bg-gray-100'
                    ,
                    'h-4 w-4 rounded-full flex items-center justify-center'
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={classNames(
                      ACTIVE_STATUSES.includes(project.status)
                        ? 'bg-enveritas-500/75'
                        : EDIT_STATUSES.includes(project.status)
                          ? 'bg-yellow-400'
                          : 'bg-gray-400'
                      ,
                      'h-2 w-2 rounded-full'
                    )}
                  />
                </span>

                <h2 className="text-sm font-medium">
                  <Link to={`/projects/${project.uuid}`}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {project.name}{' '}
                    <span className="sr-only">{project.name ? 'Running' : 'Not running'}</span>
                  </Link>
                </h2>
              </div>
              <Link to={`/projects/${project.uuid}`} className="group relative flex items-center space-x-2.5">
                <span className="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  {project.description}
                </span>
              </Link>
            </div>
            <div className="sm:hidden">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>

            {/* Repo meta info */}
            <div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
              <p className="flex items-center space-x-4">
                <Link
                  to={`/projects/${project.uuid}`}
                  className="flex items-center relative text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  <PencilIcon
                    className='h-4 w-4'
                    aria-hidden="true"
                  />
                </Link>
              </p>
              <p className="flex space-x-2 text-sm text-gray-500">
                <span>{project.status}</span>
                <span aria-hidden="true">&middot;</span>
                <span>Last Modified {project.modified_on.toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
