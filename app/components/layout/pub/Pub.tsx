import Icon from "~/components/icon";
import banner_pub from "~/assets/images/banner_pub.png"
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import "./styles.css"

type Props = {}

const Pub = (props: Props) => {
  return (
    <section>
      <div className="flex gap-9 mt-8">
        <div className="flex-1 w-fit h-[300px] pl-16 bg-pub-img justify-start items-center flex">
          {/* <img src={banner_pub} alt="banner_pub" className="absolute" /> */}
          <div className="flex flex-col gap-8 ">
            <Icon name="LogoBease" />
            <AppButton>Voir les produits</AppButton>
          </div>
        </div>

        <div className="flex-1 flex justify-start gap-9 items-center pl-16 w-fit h-[300px] bg-pub-img">
          {/* <img src={banner_pub} alt="banner_pub" className="absolute" /> */}
          <Icon name="KunheimIcon" />
          <div className="flex flex-col gap-2">
            <AppText weight="semibold" size="xl" color="white">Boutique du Club</AppText>
            <div className="flex flex-col gap-0.5">
              <AppText size="xs" color="white">Tout l’équipement pour votre club:</AppText>
              <AppText size="xs" color="white">maillot, short, chaussettes, etc.</AppText>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-9 items-center justify-center mt-16">
        <AppText color="gray" size="xs">© 2025 beasebasket.com. Tous droits réservés.</AppText>
        <div className="flex gap-4 items-center">
          <Icon name="FacebookIcon" />
          <Icon name="InstagramIcon" />
          <Icon name="YoutubeIcon" />
        </div>
      </div>
    </section>
  )
}

export default Pub