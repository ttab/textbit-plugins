import type { Plugin } from "@ttab/textbit"
import type { PropsWithChildren } from "react"

export const Channel = ({ options }: Plugin.ComponentProps) => {
  const ChannelComponent = options?.channelComponent as React.ComponentType<PropsWithChildren> | undefined

  return (
    <div className="border-b">
      <div contentEditable={false} className="font-semibold">Kanal</div>
      {ChannelComponent && <ChannelComponent />}
    </div>
  )
}
