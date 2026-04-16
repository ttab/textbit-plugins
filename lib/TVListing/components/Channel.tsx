import type { TBComponentProps } from '@ttab/textbit'
import type { PropsWithChildren } from "react"

export const Channel = ({ options }: TBComponentProps) => {
  const ChannelComponent = options?.channelComponent as React.ComponentType<PropsWithChildren> | undefined

  return (
    <div className="border-b flex items-center gap-3 text-sm py-2">
      <label contentEditable={false} className="w-14 text-sm opacity-70">Kanal</label>
      {ChannelComponent && <ChannelComponent />}
    </div>
  )
}
