import Icon from "~/components/icon";
import banner_pub from "~/assets/images/banner_pub.png";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "~/hooks/useIntersection";
import { MatchService } from "~/services/MatchService";
import { useMatchStore } from "~/store/matchStore";

type Props = {};

const Pub = (props: Props) => {
  const ref = useRef<HTMLElement>(null);
  // const isVisible = useIntersection(ref, "0px");
  // const updateMatchStore = useMatchStore((state) => state.pushData);
  // const matchStoreData = useMatchStore((state) => state.data);

  // useEffect(() => {
  //   const getOtherMatch = async () => {
  //     const res = await MatchService.getMatchByClub(skipValue);
  //     setSkipValue((prevState) => prevState + 2);
  //     updateMatchStore(res.data);
  //   };

  //   if (isVisible) {
  //     getOtherMatch();
  //   }
  // }, [isVisible]);

  // console.log("matchStoreData", matchStoreData);

  return (
    <section ref={ref}>
      <div className="flex flex-col gap-9 mt-8 lg:flex-row">
        <div className="bg-pub-img justify-center items-center flex h-[300px] rounded-[20px] lg:flex-1 xl:justify-start xl:pl-16">
          {/* <img src={banner_pub} alt="banner_pub" className="absolute" /> */}
          <div className="flex flex-col gap-8 ">
            <Icon name="LogoBease" />
            <AppButton>Voir les produits</AppButton>
          </div>
        </div>

        <div className="bg-pub-img justify-center items-center flex flex-col gap-5 h-[300px] rounded-[20px] lg:flex-1 lg:flex-row xl:justify-start xl:pl-16">
          {/* <img src={banner_pub} alt="banner_pub" className="absolute" /> */}
          <Icon name="KunheimIcon" />
          <div className="flex flex-col gap-2">
            <AppText weight="semibold" size="xl" color="white">
              Boutique du Club
            </AppText>
            <div className="flex flex-col gap-0.5">
              <AppText size="xs" color="white">
                Tout l’équipement pour votre club:
              </AppText>
              <AppText size="xs" color="white">
                maillot, short, chaussettes, etc.
              </AppText>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-9 items-center justify-center mt-16">
        <AppText color="gray" size="xs">
          © 2025 beasebasket.com. Tous droits réservés.
        </AppText>
        <div className="flex gap-4 items-center">
          <Icon name="FacebookIcon" />
          <Icon name="InstagramIcon" />
          <Icon name="YoutubeIcon" />
        </div>
      </div>
    </section>
  );
};

export default Pub;
