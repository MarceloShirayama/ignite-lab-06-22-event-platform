import classNames from 'classnames'
import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CheckCircle, Lock } from 'phosphor-react'
import { Link, useParams } from 'react-router-dom'

type Props = {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson(props: Props) {
  const { slug } = useParams<{ slug: string }>()
  const isLessonAvailable = isPast(props.availableAt)
  const availableAtFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR }
  )

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableAtFormatted}</span>

      <div
        //   className={`
        //   rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500
        //   ${isActiveLesson && 'bg-green-500'}
        // `}
        className={classNames(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',
          {
            'bg-green-500': isActiveLesson
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              //     className={`
              //   text-sm text-blue-500 font-medium flex items-center gap-1
              //   ${isActiveLesson ? 'text-white' : 'text-blue-500}
              // `}
              className={classNames(
                'text-sm font-medium flex items-center gap-1',
                {
                  'text-white': isActiveLesson,
                  'text-blue-500': !isActiveLesson
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className={`
            text-sm text-orange-500 font-medium flex items-center gap-1
          `}
            >
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            //   className={`
            //   text-xs rounded py-[0.125rem] px-2 text-white font-bold
            //   ${isActiveLesson ? 'border-white' : 'border-green-300'}
            // `}
            className={classNames(
              `text-xs rounded py-[0.125rem] px-2 text-white font-bold border`,
              {
                'border-white': isActiveLesson,
                'border-green-300': !isActiveLesson
              }
            )}
          >
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong
          className={classNames('mt-5 block', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  )
}
