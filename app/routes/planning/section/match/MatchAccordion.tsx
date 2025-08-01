import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import React from 'react'
import { matchTableHeader, type matchData } from './matchData'
import AppText from '~/components/general/AppText/AppText'
import MatchAccordionContent from './MatchAccordionContent'

interface Props {
  data: typeof matchData
}

function MatchAccordion({ data }: Props) {
  return (
    <Accordion
       type="single"
       collapsible
       defaultValue='item-0'
       className='w-full flex flex-col gap-3 p-6 bg-white rounded-3xl'
    >
      {
        data.map((match, idx) => (
          <AccordionItem
           key={`item-${idx}`} value={`item-${idx}`}
           className="border-b-1 border-gray1 py-1 transition-all duration-300 ease-in-out"
           >
            <AccordionTrigger>
              <AppText weight="semibold">{new Date(match.date).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}</AppText>
            </AccordionTrigger>
            <AccordionContent>
              <MatchAccordionContent headerData={matchTableHeader} bodyData={match.data} tableTitle={match.date} />
            </AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}

export default MatchAccordion