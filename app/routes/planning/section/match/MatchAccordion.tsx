import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useContext, useEffect } from "react";
import { matchTableHeader } from "./matchData";
import AppText from "~/components/general/AppText/AppText";
import MatchAccordionContent from "./MatchAccordionContent";
import type { MatchType } from "./type";
import type { UserStore } from "~/store/userStore";
import { SelectAllContext } from "~/hooks/useSelectedAllContext";

interface Props {
  data: MatchType[];
  handleNavigate: (path: string, query: string) => void;
  userConnected?: UserStore["user"];
  userConnecteRole?: string;
  handleChangeSelect: (e: boolean, matchId: string) => void;
  matchsToDelete: { id: string; checked: boolean }[];
}

function MatchAccordion(props: Props) {
  const {
    data,
    handleNavigate,
    userConnecteRole,
    userConnected,
    handleChangeSelect,
    matchsToDelete,
  } = props;

  // for select all match to delete
  const selectAllMatchContext = useContext(SelectAllContext);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="w-full flex flex-col gap-3 p-6 bg-white rounded-3xl"
    >
      {data.map((match, idx) => (
        <AccordionItem
          key={`item-${idx}`}
          value={`item-${idx}`}
          className="border-b-1 border-gray1 py-1 transition-all duration-300 ease-in-out"
        >
          <AccordionTrigger>
            <AppText weight="semibold">
              {new Date(match._id).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </AppText>
          </AccordionTrigger>
          <AccordionContent>
            <MatchAccordionContent
              headerData={matchTableHeader}
              bodyData={match.matches}
              tableTitle={match._id}
              postHeaderData={matchTableHeader}
              handleNavigate={handleNavigate}
              userConnecteRole={userConnecteRole}
              userConnected={userConnected}
              handleChangeSelect={handleChangeSelect}
              matchsToDelete={matchsToDelete}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default MatchAccordion;
