import * as TooltipHeadless from '@radix-ui/react-tooltip'
import { HelpCircle } from 'react-feather'

export const Tooltip = () => {
  return (
    <TooltipHeadless.Root>
      <TooltipHeadless.Trigger asChild>
        <button className="IconButton">
          <HelpCircle />
        </button>
      </TooltipHeadless.Trigger>
      <TooltipHeadless.Portal>
        <TooltipHeadless.Content className="TooltipContent" sideOffset={5}>
          Add to library
          <TooltipHeadless.Arrow className="TooltipArrow" />
        </TooltipHeadless.Content>
      </TooltipHeadless.Portal>
    </TooltipHeadless.Root>
  )
}
