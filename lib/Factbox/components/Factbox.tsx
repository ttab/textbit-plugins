import type { TBComponentProps, TBElement } from '@ttab/textbit'
import { FilePen, MessageCircleWarning, SaveIcon, X, CloudCheckIcon } from 'lucide-react'
import { FactboxModified } from './FactboxModified'
import { FactboxHeaderItem } from './FactboxHeaderItem'
import { type Descendant, Transforms } from 'slate'
import { FocusBlock } from '../../components/FocusBlock'

export const Factbox = ({ children, element, options, editor }: TBComponentProps) => {
  const originalUpdated = element?.properties?.original_updated ?? ''
  const original_id = element?.properties?.original_id
  const unSaved = element?.properties?.unSaved as boolean
  const removable = options?.removable as boolean ?? false
  const locale = options?.locale as string

  const {
    headerTitle,
    modifiedLabel,
    footerTitle,
    saveToArchiveLabel,
    unsavedLabel,
    replaceVersionLabel
  } =  options as {
    headerTitle?: string
    modifiedLabel?: string
    footerTitle?: string
    saveToArchiveLabel?: string
    unsavedLabel?: string,
    replaceVersionLabel?: string
  }

  const MESSAGE = footerTitle ?? 'Changes in the factbox text only affects this article'
  const UNSAVED_MESSAGE = unsavedLabel ?? 'Factbox has not been saved to archive'

  return (
    <FocusBlock className='my-2'>
      <div className='group border-2 rounded border-slate-200'>
        <div
          contentEditable={false}
          draggable={true}
          className='flex justify-start items-center m-1 p-2 bg-slate-100 dark:bg-slate-700 border-b-2 border-slate-200 ps-0.5 pb-0.5 pt-px cursor-default'
          onMouseDown={(e) => { e.stopPropagation() }}
        >
          {unSaved
            ? (
              <FactboxHeaderItem
                title={UNSAVED_MESSAGE}
                icon={{
                  icon: MessageCircleWarning,
                  className: 'text-red-800 dark:text-red-500'
                }}
              />
              )
            :
            null
            }

          {unSaved && options?.onSave
            ? (
              <>
                <FactboxHeaderItem
                  title={saveToArchiveLabel ?? 'Save to archive'}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const onSuccess = () => {
                      const n = editor.children.findIndex((child: Descendant) => child.id === element.id)
                      if (n > -1) {
                        (Transforms.setNodes)(editor, { properties: { ...element.properties, unSaved: false } }, { at: [n] })
                      }
                    }

                    (options?.onSave as (id: string, onSuccess: () => void) => void)(original_id as string, onSuccess)
                  }}
                  icon={{
                    icon: SaveIcon
                  }}
                />
              </>
            )
            : null
          }

          {!unSaved && options?.onGetUpdatedVersion ? (
            <FactboxHeaderItem
              title={replaceVersionLabel ?? 'Replace with recent version'}
              icon={{
                icon: CloudCheckIcon,
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()

                const onSuccess = (newElement: TBElement) => {
                  const n = editor.children.findIndex((child: Descendant) => (child as TBElement).id === element.id)
                  if (n > -1) {
                    Transforms.removeNodes(editor as never, { at: [n] })
                    Transforms.insertNodes(editor as never, { ...newElement, id: element.id as string } as never, { at: [n] })
                  }
                }
                ;(options.onGetUpdatedVersion as (id: string, onSuccess: (newElement: TBElement) => void) => void)(original_id as string, onSuccess)
              }}
            />
          ) : null}

          {!unSaved && options?.onEditOriginal && typeof options.onEditOriginal === 'function' && original_id
            ? <FactboxHeaderItem
                title={headerTitle ?? 'Edit the original factbox'}
                onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (options.onEditOriginal as (id: string) => void)(original_id as string)
              }}
                icon={{
                icon: FilePen
              }} />
            : null
          }

          {!unSaved && (
            <FactboxModified
              modified={originalUpdated}
              modifiedLabel={modifiedLabel}
              locale={locale}
            />
          )}

          {removable && (
            <>
              <div className='grow'></div>
              <div className='hidden grow-0 items-center justify-end group-hover:block'>
                <FactboxHeaderItem
                  className='opacity-60 hover:opacity-100'
                  icon={{
                    icon: X
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const n = editor.children.findIndex((child: Descendant) => child.id === element.id)

                    if (n > -1) {
                      Transforms.removeNodes(editor, { at: [n] })
                    }
                  }}
                />
              </div>
            </>
          )}

        </div>

        <div className='px-6 pt-1 pb-2'>
          {children}
        </div>


        <div contentEditable={false} className='flex items-center gap-2 text-xs text-red-800 m-1 p-2 dark:text-red-500 bg-slate-100 dark:bg-slate-700 rounded-sm px-2 py-1'>
          {MESSAGE}
        </div>
      </div>
    </FocusBlock>
  )
}
