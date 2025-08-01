import React from 'react'
import type { Props as MatchProps } from './Match'
import AppText from '~/components/general/AppText/AppText';
import { Checkbox } from '@radix-ui/react-checkbox';
import Icon from '~/components/icon';

function MatchAccordionContent(props: MatchProps) {
  const {
    headerData,
    bodyData,
    tableTitle
  } = props;
  return (
    <div>
      <Checkbox />
      <AppText>Masquer les matchs exterieurs</AppText>
      <div className="mt-4 mb-1">
        <AppText weight="semibold">Matchs</AppText>
      </div>
      <div className="flex flex-col gap-6">
        {
          bodyData.map((data, idx) => (
            <ul
             key={`match-${idx}`}
             className="flex flex-col gap-1.5"
            >
              <li 
                className="p-2 bg-gray2"
              >
                <AppText>{data.equipeA}</AppText>
                <AppText>{data.equipeB}</AppText>
              </li>
              {
                headerData.map((head, idx) => {
                  if(head.dataKey === "message") {
                    return "";
                  }

                  return (
                    <li
                     key={`match-${idx}`}
                     className="flex justify-between"
                    >
                      <div className="match-info">
                        <div className="self-center justify-self-center">
                          <Icon name={head.iconName} />
                        </div>
                        <AppText weight="semibold" color="gray">{head.label}</AppText>
                      </div>
                      <AppText weight="light" size="sm">{data[head.dataKey as keyof typeof data]}</AppText>
                    </li>
                  )
                })
              }
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default MatchAccordionContent